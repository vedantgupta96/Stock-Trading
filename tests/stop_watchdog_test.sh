#!/usr/bin/env bash
# Unit tests for scripts/stop_watchdog.sh — pure fixtures, no API calls.
set -uo pipefail

TEST_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$TEST_DIR/.." && pwd)"
WATCHDOG="$ROOT/scripts/stop_watchdog.sh"
FIX="$TEST_DIR/fixtures"
MOCK="$TEST_DIR/mock_alpaca.sh"

PASS=0; FAIL=0
ok()   { echo "  ✓ $1"; PASS=$((PASS+1)); }
bad()  { echo "  ✗ $1"; FAIL=$((FAIL+1)); }

assert_contains()     { if grep -qF -- "$2" <<<"$1"; then ok "$3"; else bad "$3 — missing: $2"; fi; }
assert_not_contains() { if grep -qF -- "$2" <<<"$1"; then bad "$3 — unexpected: $2"; else ok "$3"; fi; }

# ---------------------------------------------------------------------------
echo "== dry-run plan (fixtures) =="
OUT="$(WATCHDOG_POSITIONS_FILE="$FIX/positions.json" \
       WATCHDOG_ORDERS_FILE="$FIX/orders.json" \
       bash "$WATCHDOG")"
echo "$OUT" | sed 's/^/    /'

assert_not_contains "$OUT" "ACTION AAPL" "AAPL fully protected -> no action"
assert_not_contains "$OUT" "ACTION SHORTX" "short position ignored"
# MSFT +4% can't support a 12% trailing stop above the -8% floor -> fixed -8% stop instead.
assert_contains "$OUT" "ACTION MSFT qty=5 pnl=4% action=place_stop detail=fixed_-8%_@368 result=planned" "MSFT +4% -> fixed -8% stop (trail would sit below floor)"
assert_contains "$OUT" "ACTION NVDA qty=8 pnl=18% action=place_trailing detail=trail_7.0% result=planned" "NVDA +18% -> 7% trail (dead order ignored)"
assert_contains "$OUT" "ACTION AMD qty=4 pnl=22% action=place_trailing detail=trail_5.0% result=planned" "AMD +22% -> 5% trail"
assert_contains "$OUT" "ACTION TSLA qty=6 pnl=-9% action=close detail=hard_stop_-8% result=planned" "TSLA -9% -> close"
assert_contains "$OUT" "ACTION GOOG qty=10 pnl=5% action=place_trailing detail=trail_12.0% result=planned" "GOOG partial coverage -> treated unprotected"
assert_contains "$OUT" "WATCHDOG: 6 positions, 5 unprotected, 0 actions" "summary counts (short excluded, dry-run)"

# ---------------------------------------------------------------------------
echo "== --fix execution path (mock alpaca) =="
CALLS="$(mktemp)"
OUT="$(MOCK_CALLS="$CALLS" WATCHDOG_ALPACA="$MOCK" \
       WATCHDOG_POSITIONS_FILE="$FIX/positions.json" \
       WATCHDOG_ORDERS_FILE="$FIX/orders.json" \
       bash "$WATCHDOG" --fix)"
CALLLOG="$(cat "$CALLS")"
echo "$CALLLOG" | sed 's/^/    /'

assert_contains "$OUT" "WATCHDOG: 6 positions, 5 unprotected, 5 actions" "all 5 fixes executed"
assert_contains "$CALLLOG" "stop MSFT 5 368" "places fixed -8% stop on MSFT (+4%)"
assert_contains "$CALLLOG" "trailing_stop NVDA 8 7.0" "places 7% trail on NVDA"
assert_contains "$CALLLOG" "trailing_stop AMD 4 5.0" "places 5% trail on AMD"
assert_contains "$CALLLOG" "close TSLA" "closes TSLA"
assert_contains "$CALLLOG" "cancel ord-goog-partial" "cancels GOOG partial order before replacing"
assert_contains "$CALLLOG" "trailing_stop GOOG 10 12.0" "replaces GOOG stop for full qty"
assert_not_contains "$CALLLOG" "AAPL" "never touches protected AAPL"
rm -f "$CALLS"

# ---------------------------------------------------------------------------
echo "== PDT fallback: trailing rejected -> limit sell at entry*0.92 =="
CALLS="$(mktemp)"
OUT="$(MOCK_CALLS="$CALLS" WATCHDOG_ALPACA="$MOCK" MOCK_FAIL_TRAILING="GOOG" \
       WATCHDOG_POSITIONS_FILE="$FIX/positions.json" \
       WATCHDOG_ORDERS_FILE="$FIX/orders.json" \
       bash "$WATCHDOG" --fix)"
CALLLOG="$(cat "$CALLS")"
assert_contains "$CALLLOG" "trailing_stop GOOG 10 12.0" "attempts trailing stop first"
assert_contains "$CALLLOG" "limit_sell GOOG 10 138.00" "falls back to limit sell @ 150*0.92=138.00"
assert_contains "$OUT" "result=limit_fallback_138.00" "reports limit fallback result"
rm -f "$CALLS"

# ---------------------------------------------------------------------------
echo "== stop fallback: fixed stop rejected -> limit sell at the -8% floor =="
CALLS="$(mktemp)"
OUT="$(MOCK_CALLS="$CALLS" WATCHDOG_ALPACA="$MOCK" MOCK_FAIL_STOP="MSFT" \
       WATCHDOG_POSITIONS_FILE="$FIX/positions.json" \
       WATCHDOG_ORDERS_FILE="$FIX/orders.json" \
       bash "$WATCHDOG" --fix)"
CALLLOG="$(cat "$CALLS")"
assert_contains "$CALLLOG" "stop MSFT 5 368" "attempts fixed stop first"
assert_contains "$CALLLOG" "limit_sell MSFT 5 368" "falls back to limit sell @ the -8% floor"
assert_contains "$OUT" "result=limit_fallback_368" "reports limit fallback result"
rm -f "$CALLS"

# ---------------------------------------------------------------------------
echo "== floor-aware gap logic (the Issue #3 fix) =="
GAP_POS="$(jq -nc '[
  {symbol:"FOO",qty:"10",avg_entry_price:"100.00",unrealized_plpc:"-0.05"},
  {symbol:"BAR",qty:"10",avg_entry_price:"100.00",unrealized_plpc:"0.30"},
  {symbol:"BAZ",qty:"10",avg_entry_price:"100.00",unrealized_plpc:"0.10"},
  {symbol:"QUX",qty:"10",avg_entry_price:"100.00",unrealized_plpc:"-0.03"}]')"
GAP_ORD="$(jq -nc '[
  {id:"foo-trail",symbol:"FOO",qty:"10",side:"sell",type:"trailing_stop",status:"accepted",stop_price:"89.00"},
  {id:"bar-trail",symbol:"BAR",qty:"10",side:"sell",type:"trailing_stop",status:"accepted",stop_price:"110.00"},
  {id:"baz-stop", symbol:"BAZ",qty:"10",side:"sell",type:"stop",         status:"accepted",stop_price:"92.00"}]')"
OUT="$(WATCHDOG_POSITIONS_FILE=<(echo "$GAP_POS") WATCHDOG_ORDERS_FILE=<(echo "$GAP_ORD") bash "$WATCHDOG")"
echo "$OUT" | sed 's/^/    /'
assert_contains "$OUT" "ACTION FOO qty=10 pnl=-5% action=place_stop detail=fixed_-8%_@92 result=planned" "FOO: below-floor trailing stop (89<92) -> heal with fixed -8% stop"
assert_not_contains "$OUT" "ACTION BAR" "BAR: trailing stop above floor (110>=92) -> adequately protected, no action"
assert_contains "$OUT" "ACTION BAZ qty=10 pnl=10% action=place_trailing detail=trail_12.0% result=planned" "BAZ: fixed stop + up +10% -> upgrade to trailing"
assert_contains "$OUT" "ACTION QUX qty=10 pnl=-3% action=place_stop detail=fixed_-8%_@92 result=planned" "QUX: young, unprotected, underwater -> fixed -8% stop"
# and on --fix it cancels the under-floor FOO trailing before placing the fixed stop
CALLS="$(mktemp)"
OUT="$(MOCK_CALLS="$CALLS" WATCHDOG_ALPACA="$MOCK" \
       WATCHDOG_POSITIONS_FILE=<(echo "$GAP_POS") WATCHDOG_ORDERS_FILE=<(echo "$GAP_ORD") \
       bash "$WATCHDOG" --fix)"
CALLLOG="$(cat "$CALLS")"
assert_contains "$CALLLOG" "cancel foo-trail" "cancels FOO's below-floor trailing stop"
assert_contains "$CALLLOG" "stop FOO 10 92" "places FOO fixed -8% stop"
assert_contains "$CALLLOG" "cancel baz-stop" "cancels BAZ's fixed stop before upgrading"
assert_contains "$CALLLOG" "trailing_stop BAZ 10 12.0" "upgrades BAZ to a trailing stop"
assert_not_contains "$CALLLOG" "BAR" "never touches adequately-protected BAR"
rm -f "$CALLS"

# ---------------------------------------------------------------------------
echo "== adequately-protected positions left alone; -8% hard-cut still overrides =="
# All six carry a full-size trailing stop (no stop_price yet = benefit of the doubt).
# Five are left untouched; TSLA at -9% is closed because a trailing stop cannot sit
# at/above the -8% floor on an already -9% position — the hard cut must win.
OUT="$(WATCHDOG_POSITIONS_FILE="$FIX/positions.json" \
       WATCHDOG_ORDERS_FILE=<(jq -nc '[
         {id:"a",symbol:"AAPL",qty:"10",side:"sell",type:"trailing_stop",status:"accepted"},
         {id:"b",symbol:"MSFT",qty:"5", side:"sell",type:"trailing_stop",status:"accepted"},
         {id:"c",symbol:"NVDA",qty:"8", side:"sell",type:"trailing_stop",status:"accepted"},
         {id:"d",symbol:"AMD", qty:"4", side:"sell",type:"trailing_stop",status:"accepted"},
         {id:"e",symbol:"TSLA",qty:"6", side:"sell",type:"trailing_stop",status:"accepted"},
         {id:"f",symbol:"GOOG",qty:"10",side:"sell",type:"trailing_stop",status:"accepted"}]') \
       bash "$WATCHDOG")"
assert_not_contains "$OUT" "ACTION AAPL" "AAPL protected -> left alone"
assert_not_contains "$OUT" "ACTION MSFT" "MSFT protected -> left alone"
assert_not_contains "$OUT" "ACTION NVDA" "NVDA protected -> left alone"
assert_not_contains "$OUT" "ACTION AMD" "AMD protected -> left alone"
assert_not_contains "$OUT" "ACTION GOOG" "GOOG protected -> left alone"
assert_contains "$OUT" "ACTION TSLA qty=6 pnl=-9% action=close detail=hard_stop_-8% result=planned" "TSLA -9% closed despite trailing stop (hard cut overrides)"
assert_contains "$OUT" "WATCHDOG: 6 positions, 1 unprotected, 0 actions" "only the -8% hard-cut position is actioned"

# ---------------------------------------------------------------------------
echo "== empty portfolio =="
OUT="$(WATCHDOG_POSITIONS_FILE=<(echo '[]') WATCHDOG_ORDERS_FILE=<(echo '[]') bash "$WATCHDOG")"
assert_contains "$OUT" "WATCHDOG: 0 positions, 0 unprotected, 0 actions" "handles no positions"

echo ""
echo "RESULTS: $PASS passed, $FAIL failed"
[[ "$FAIL" -eq 0 ]]
