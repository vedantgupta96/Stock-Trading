#!/usr/bin/env bash
# Unit tests for scripts/buy_gate.sh — pure fixtures, no API calls.
set -uo pipefail

TEST_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$TEST_DIR/.." && pwd)"
GATE="$ROOT/scripts/buy_gate.sh"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

PASS=0; FAIL=0
ok()  { echo "  ✓ $1"; PASS=$((PASS+1)); }
bad() { echo "  ✗ $1"; FAIL=$((FAIL+1)); }
assert_contains() { if grep -qF -- "$2" <<<"$1"; then ok "$3"; else bad "$3 — missing: $2"; fi; }
assert_rc()       { if [[ "$1" == "$2" ]]; then ok "$3 (rc=$1)"; else bad "$3 — rc $1 != $2"; fi; }

# --- Base fixtures (all-pass) ---
echo '{"cash":"100000","equity":"100000","daytrade_count":"0"}' > "$TMP/account.json"
echo '[]' > "$TMP/positions.json"
echo '{"class":"us_equity","tradable":true,"status":"active"}' > "$TMP/asset.json"
# Candidate: 30 daily bars; last 5 make a new high (110>100) on 3x volume; close 100.
jq -n '{bars: [range(0;30) as $i | {o:100,h:(if $i>=25 then 110 else 100 end),l:99,c:100,
        v:(if $i>=25 then 300000 else 100000 end),t:"d"}]}' > "$TMP/bars.json"
# SPY: 25 rising closes -> last close above 20d SMA -> regime ON.
jq -n '{bars: [range(0;25) as $i | {o:(700+$i),h:(700+$i),l:(699+$i),c:(700+$i),v:1000000,t:"d"}]}' > "$TMP/spy.json"

# run_gate <extra-env...> -- <gate-args...>
run_gate() {
  local envs=(); while [[ "$1" != "--" ]]; do envs+=("$1"); shift; done; shift
  OUT="$(env \
    BUYGATE_ACCOUNT_FILE="$TMP/account.json" \
    BUYGATE_POSITIONS_FILE="$TMP/positions.json" \
    BUYGATE_ASSET_FILE="$TMP/asset.json" \
    BUYGATE_BARS_FILE="$TMP/bars.json" \
    BUYGATE_SPY_BARS_FILE="$TMP/spy.json" \
    ${envs[@]+"${envs[@]}"} bash "$GATE" "$@" 2>&1)"
  RC=$?
}
PASSINPUTS=(--sector-count 0 --trades-this-week 0 --earnings-days none --catalyst yes)

echo "== all checks pass =="
run_gate -- TEST "${PASSINPUTS[@]}"
echo "$OUT" | sed 's/^/    /'
assert_contains "$OUT" "GATE: PASS" "verdict PASS"
assert_rc "$RC" 0 "exit 0 on pass"
assert_contains "$OUT" "Shares: 25" "sizing: \$200 cap / 0.08 = \$2500 / \$100 = 25 sh"
assert_contains "$OUT" "Cost ~\$2500" "cost 25*100"

echo "== #1 regime OFF (SPY below SMA) =="
jq -n '{bars: [range(0;25) as $i | {o:(724-$i),h:(724-$i),l:(723-$i),c:(724-$i),v:1000000,t:"d"}]}' > "$TMP/spy_off.json"
run_gate BUYGATE_SPY_BARS_FILE="$TMP/spy_off.json" -- TEST "${PASSINPUTS[@]}"
assert_contains "$OUT" "GATE: FAIL — c1_regime" "fails on regime off"
assert_rc "$RC" 2 "exit 2 on fail"

echo "== #2 positions full (5 held) =="
echo '[{"symbol":"A","qty":"1"},{"symbol":"B","qty":"1"},{"symbol":"C","qty":"1"},{"symbol":"D","qty":"1"},{"symbol":"E","qty":"1"}]' > "$TMP/pos5.json"
run_gate BUYGATE_POSITIONS_FILE="$TMP/pos5.json" -- TEST "${PASSINPUTS[@]}"
assert_contains "$OUT" "c2_positions" "fails on 6th position"

echo "== #3 sector full =="
run_gate -- TEST --sector-count 2 --trades-this-week 0 --earnings-days none --catalyst yes
assert_contains "$OUT" "c3_sector" "fails on 3rd same-sector"

echo "== #4 trades this week full =="
run_gate -- TEST --sector-count 0 --trades-this-week 3 --earnings-days none --catalyst yes
assert_contains "$OUT" "c4_trades" "fails at 3 trades this week"

echo "== #5 cost exceeds cash =="
echo '{"cash":"1000","equity":"100000","daytrade_count":"0"}' > "$TMP/account_poor.json"
run_gate BUYGATE_ACCOUNT_FILE="$TMP/account_poor.json" -- TEST "${PASSINPUTS[@]}"
assert_contains "$OUT" "c5_cash" "fails when cost > cash"

echo "== #6 PDT at limit =="
echo '{"cash":"100000","equity":"100000","daytrade_count":"3"}' > "$TMP/account_pdt.json"
run_gate BUYGATE_ACCOUNT_FILE="$TMP/account_pdt.json" -- TEST "${PASSINPUTS[@]}"
assert_contains "$OUT" "c6_pdt" "fails at 3 day-trades"

echo "== #7 earnings within 10d =="
run_gate -- TEST --sector-count 0 --trades-this-week 0 --earnings-days 5 --catalyst yes
assert_contains "$OUT" "c7_earnings" "fails on earnings in 5d"

echo "== #8 catalyst = no =="
run_gate -- TEST --sector-count 0 --trades-this-week 0 --earnings-days none --catalyst no
assert_contains "$OUT" "c8_catalyst" "fails when catalyst not affirmed"

echo "== #9 no breakout (prior high above last-5) =="
jq -n '{bars: [range(0;30) as $i | {o:100,h:(if $i>=25 then 110 else 120 end),l:99,c:100,v:(if $i>=25 then 300000 else 100000 end),t:"d"}]}' > "$TMP/bars_nobreak.json"
run_gate BUYGATE_BARS_FILE="$TMP/bars_nobreak.json" -- TEST "${PASSINPUTS[@]}"
assert_contains "$OUT" "c9_breakout" "fails without a fresh 3-month high"

echo "== #10 weak volume =="
jq -n '{bars: [range(0;30) as $i | {o:100,h:(if $i>=25 then 110 else 100 end),l:99,c:100,v:100000,t:"d"}]}' > "$TMP/bars_lowvol.json"
run_gate BUYGATE_BARS_FILE="$TMP/bars_lowvol.json" -- TEST "${PASSINPUTS[@]}"
assert_contains "$OUT" "c10_volume" "fails without 1.5x volume"

echo "== #11 not a stock =="
echo '{"class":"crypto","tradable":true}' > "$TMP/asset_crypto.json"
run_gate BUYGATE_ASSET_FILE="$TMP/asset_crypto.json" -- TEST "${PASSINPUTS[@]}"
assert_contains "$OUT" "c11_stock" "fails on non-equity"

echo "== sizing too small (entry > max notional) =="
run_gate -- TEST --entry 5000 --sector-count 0 --trades-this-week 0 --earnings-days none --catalyst yes
assert_contains "$OUT" "sizing_ok" "flags un-sizeable position"
assert_contains "$OUT" "c5_cash" "and fails cash/size check"

echo "== fail-closed: no research inputs provided =="
run_gate -- TEST
assert_contains "$OUT" "c3_sector" "sector fails closed"
assert_contains "$OUT" "c4_trades" "trades fails closed"
assert_contains "$OUT" "c7_earnings" "earnings fails closed"
assert_contains "$OUT" "c8_catalyst" "catalyst fails closed"

echo "== multi-failure listing =="
run_gate BUYGATE_SPY_BARS_FILE="$TMP/spy_off.json" -- TEST --sector-count 0 --trades-this-week 0 --earnings-days none --catalyst no
assert_contains "$OUT" "c1_regime" "lists regime"
assert_contains "$OUT" "c8_catalyst" "lists catalyst too"

echo "== --json verdict =="
run_gate -- TEST "${PASSINPUTS[@]}" --json
assert_contains "$OUT" '"verdict":"PASS"' "json emits verdict"
assert_contains "$OUT" '"shares":25' "json includes sizing"

echo ""
echo "RESULTS: $PASS passed, $FAIL failed"
[[ "$FAIL" -eq 0 ]]
