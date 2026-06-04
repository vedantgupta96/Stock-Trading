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
assert_contains "$OUT" "ACTION MSFT qty=5 pnl=4% action=place_trailing detail=trail_12.0% result=planned" "MSFT missing stop -> 12% trail"
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
assert_contains "$CALLLOG" "trailing_stop MSFT 5 12.0" "places 12% trail on MSFT"
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
OUT="$(MOCK_CALLS="$CALLS" WATCHDOG_ALPACA="$MOCK" MOCK_FAIL_TRAILING="MSFT" \
       WATCHDOG_POSITIONS_FILE="$FIX/positions.json" \
       WATCHDOG_ORDERS_FILE="$FIX/orders.json" \
       bash "$WATCHDOG" --fix)"
CALLLOG="$(cat "$CALLS")"
assert_contains "$CALLLOG" "trailing_stop MSFT 5 12.0" "attempts trailing stop first"
assert_contains "$CALLLOG" "limit_sell MSFT 5 368.00" "falls back to limit sell @ 400*0.92=368.00"
assert_contains "$OUT" "result=limit_fallback_368.00" "reports limit fallback result"
rm -f "$CALLS"

# ---------------------------------------------------------------------------
echo "== all positions protected -> silent, zero actions =="
OUT="$(WATCHDOG_POSITIONS_FILE="$FIX/positions.json" \
       WATCHDOG_ORDERS_FILE=<(jq -nc '[
         {id:"a",symbol:"AAPL",qty:"10",side:"sell",type:"trailing_stop",status:"accepted"},
         {id:"b",symbol:"MSFT",qty:"5", side:"sell",type:"trailing_stop",status:"accepted"},
         {id:"c",symbol:"NVDA",qty:"8", side:"sell",type:"trailing_stop",status:"accepted"},
         {id:"d",symbol:"AMD", qty:"4", side:"sell",type:"trailing_stop",status:"accepted"},
         {id:"e",symbol:"TSLA",qty:"6", side:"sell",type:"trailing_stop",status:"accepted"},
         {id:"f",symbol:"GOOG",qty:"10",side:"sell",type:"trailing_stop",status:"accepted"}]') \
       bash "$WATCHDOG")"
assert_not_contains "$OUT" "ACTION " "no action lines when fully protected"
assert_contains "$OUT" "0 unprotected, 0 actions — all protected" "summary reports all protected"

# ---------------------------------------------------------------------------
echo "== empty portfolio =="
OUT="$(WATCHDOG_POSITIONS_FILE=<(echo '[]') WATCHDOG_ORDERS_FILE=<(echo '[]') bash "$WATCHDOG")"
assert_contains "$OUT" "WATCHDOG: 0 positions, 0 unprotected, 0 actions" "handles no positions"

echo ""
echo "RESULTS: $PASS passed, $FAIL failed"
[[ "$FAIL" -eq 0 ]]
