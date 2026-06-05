#!/usr/bin/env bash
set -euo pipefail

# Buy-Gate (decision + sizing only — places NO orders)
# ----------------------------------------------------
# Runs the 11-check buy gate from memory/TRADING-STRATEGY.md and computes
# risk-based position sizing. Regime / breakout / volume / is-stock are computed
# deterministically from Alpaca data (no flaky web read). Sector, trades-this-week,
# earnings, and catalyst are caller inputs and FAIL CLOSED if not affirmatively passed.
#
# Usage:
#   buy_gate.sh SYMBOL [--entry PRICE] --sector-count N --trades-this-week N \
#               --earnings-days N|none --catalyst yes|no [--json]
#
# Exit: 0 = GATE PASS, 2 = GATE FAIL, 1 = argument/API error.
#
# Testability (no API): set BUYGATE_ACCOUNT_FILE / BUYGATE_POSITIONS_FILE /
# BUYGATE_ASSET_FILE / BUYGATE_BARS_FILE / BUYGATE_SPY_BARS_FILE to JSON files.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ALPACA="${BUYGATE_ALPACA:-$SCRIPT_DIR/alpaca.sh}"

SYMBOL=""; ENTRY=""; SECTOR_COUNT=""; TRADES_WEEK=""; EARNINGS=""; CATALYST=""; JSON=0
# Entry-timing band for the SHADOW c12 pullback check (advisory only — does NOT
# affect the gate verdict). See memory/STRATEGY-PROPOSALS.md (2026-06-05).
PMIN="3"; PMAX="12"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --entry)            ENTRY="${2:?}"; shift 2 ;;
    --sector-count)     SECTOR_COUNT="${2:?}"; shift 2 ;;
    --trades-this-week) TRADES_WEEK="${2:?}"; shift 2 ;;
    --earnings-days)    EARNINGS="${2:?}"; shift 2 ;;
    --catalyst)         CATALYST="${2:?}"; shift 2 ;;
    --pullback-min)     PMIN="${2:?}"; shift 2 ;;
    --pullback-max)     PMAX="${2:?}"; shift 2 ;;
    --json)             JSON=1; shift ;;
    -*)                 echo "buy_gate: unknown flag $1" >&2; exit 1 ;;
    *)                  SYMBOL="$1"; shift ;;
  esac
done

[[ -z "$SYMBOL" ]] && { echo "Usage: buy_gate.sh SYMBOL [--entry P] --sector-count N --trades-this-week N --earnings-days N|none --catalyst yes|no [--json]" >&2; exit 1; }
SYMBOL="$(echo "$SYMBOL" | tr '[:lower:]' '[:upper:]')"

# Normalize caller inputs to fail-closed sentinels.
[[ "$SECTOR_COUNT" =~ ^[0-9]+$ ]] || SECTOR_COUNT="-1"
[[ "$TRADES_WEEK"  =~ ^[0-9]+$ ]] || TRADES_WEEK="-1"
[[ "$EARNINGS" == "none" || "$EARNINGS" =~ ^[0-9]+$ ]] || EARNINGS="missing"
[[ "$CATALYST" == "yes" || "$CATALYST" == "no" ]] || CATALYST="missing"

# --- Load data (live Alpaca, or injected fixtures) ---
load() { # $1=env file var name, $2... = alpaca args
  local var="$1"; shift
  if [[ -n "${!var:-}" ]]; then cat "${!var}"; else bash "$ALPACA" "$@"; fi
}
ACCOUNT="$(load BUYGATE_ACCOUNT_FILE account)"
POSITIONS="$(load BUYGATE_POSITIONS_FILE positions)"
ASSET="$(load BUYGATE_ASSET_FILE asset "$SYMBOL")"
BARS="$(load BUYGATE_BARS_FILE bars "$SYMBOL")"
SPY_BARS="$(load BUYGATE_SPY_BARS_FILE bars SPY)"

jq -e 'type=="object"' >/dev/null 2>&1 <<<"$ACCOUNT" || { echo "buy_gate: bad account data" >&2; exit 1; }
jq -e 'type=="array"'  >/dev/null 2>&1 <<<"$POSITIONS" || POSITIONS='[]'

# --- Compute everything in one jq pass ---
R="$(jq -nc \
  --argjson account "$ACCOUNT" \
  --argjson positions "$POSITIONS" \
  --argjson asset "$ASSET" \
  --argjson bars "$BARS" \
  --argjson spy "$SPY_BARS" \
  --arg sym "$SYMBOL" \
  --arg entry_in "$ENTRY" \
  --arg sector "$SECTOR_COUNT" \
  --arg trades "$TRADES_WEEK" \
  --arg earnings "$EARNINGS" \
  --arg catalyst "$CATALYST" \
  --arg pmin "$PMIN" \
  --arg pmax "$PMAX" '
  ($account.cash|tonumber) as $cash
  | ($account.equity|tonumber) as $equity
  | (($account.daytrade_count // 0)|tonumber) as $dtc
  | ($bars.bars // []) as $b
  | ($spy.bars // []) as $s
  | ($b|length) as $bn
  | (if $bn>0 then ($b[-1].c|tonumber) else 0 end) as $last_close
  | (if ($entry_in|length)>0 then ($entry_in|tonumber) else $last_close end) as $entry
  | (($s|length)>0) as $have_spy
  | (if $have_spy then ($s[-1].c|tonumber) else 0 end) as $spy_close
  | (if ($s|length)>=20 then ([$s[-20:][].c|tonumber]|add/20) else 0 end) as $spy_sma20
  | ([ $positions[] | select((.qty|tonumber)>0) | .symbol ]) as $held
  | ($held|length) as $pos_count
  | ($held | index($sym) != null) as $already
  | ([ $b[-5:][]?.h|tonumber ]) as $last5h
  | ([ $b[:-5][]?.h|tonumber ]) as $priorh
  | (if ($last5h|length)>0 then ($last5h|max) else 0 end) as $last5_high
  | (if ($priorh|length)>0 then ($priorh|max) else 0 end) as $prior_high
  | (if $bn>=20 then ([$b[-20:][].v|tonumber]|add/20) else 0 end) as $avg20v
  | (if ($b|length)>=1 then ([$b[-5:][]?.v|tonumber]|max) else 0 end) as $last5_volmax
  | ([$equity*0.015, 200]|min) as $risk
  | ($risk/0.08) as $notional
  | (if $entry>0 then ($notional/$entry|floor) else 0 end) as $shares
  | ($shares*$entry) as $cost
  | (($entry*0.92*100|round)/100) as $stop
  | (($entry*1.24*100|round)/100) as $target
  | (if ($last5_high>0 and $entry>0) then (($last5_high-$entry)/$last5_high*100) else -1 end) as $pullback
  | {
      symbol: $sym, entry: $entry, equity: $equity, cash: $cash, daytrade_count: $dtc,
      pos_count: $pos_count, already_held: $already,
      spy_close: $spy_close, spy_sma20: (($spy_sma20*100|round)/100),
      bars_n: $bn, last5_high: $last5_high, prior_high: $prior_high,
      avg20_vol: ($avg20v|round), vol_threshold: ((1.5*$avg20v)|round), last5_vol_max: $last5_volmax,
      risk: ($risk|round), notional: ($notional|round), shares: $shares,
      cost: ($cost|round), stop: $stop, target: $target,
      sector_count: ($sector|tonumber), trades_week: ($trades|tonumber),
      earnings: $earnings, catalyst: $catalyst,
      pullback_pct: (($pullback*10|round)/10), pullback_min: ($pmin|tonumber), pullback_max: ($pmax|tonumber),
      shadow_c12_pullback: ($pullback >= ($pmin|tonumber) and $pullback <= ($pmax|tonumber)),
      checks: {
        c1_regime:   ($have_spy and $spy_close > $spy_sma20),
        c2_positions:(($pos_count + (if $already then 0 else 1 end)) <= 5),
        c3_sector:   (($sector|tonumber) >= 0 and (($sector|tonumber)+1) <= 2),
        c4_trades:   (($trades|tonumber) >= 0 and (($trades|tonumber)+1) <= 3),
        c5_cash:     ($shares >= 1 and $cost <= $cash),
        c6_pdt:      ($dtc < 3),
        c7_earnings: ($earnings=="none" or (($earnings|test("^[0-9]+$")) and ($earnings|tonumber) > 10)),
        c8_catalyst: ($catalyst=="yes"),
        c9_breakout: ($bn>=25 and $last5_high >= $prior_high and $prior_high > 0),
        c10_volume:  ($bn>=20 and $avg20v>0 and $last5_volmax >= 1.5*$avg20v),
        c11_stock:   ($asset.class=="us_equity" and ($asset.tradable==true)),
        sizing_ok:   ($shares >= 1)
      }
    }')"

# --- Render ---
get() { jq -r "$1" <<<"$R"; }
pf()  { [[ "$(get ".checks.$1")" == "true" ]] && echo "PASS" || echo "FAIL"; }

SHARES="$(get '.shares')"; ENTRYV="$(get '.entry')"

if [[ "$JSON" -eq 1 ]]; then
  PASS_ALL="$(jq -r '[.checks[]] | all' <<<"$R")"
  jq -c --argjson pass "$PASS_ALL" '. + {verdict: (if $pass then "PASS" else "FAIL" end)}' <<<"$R"
else
  echo "=== BUY GATE: $SYMBOL ==="
  echo " 1. Regime (SPY > 20d SMA)      $(pf c1_regime)   [SPY $(get '.spy_close') vs SMA20 $(get '.spy_sma20')]"
  echo " 2. Open positions ≤ 5          $(pf c2_positions)   [$(get '.pos_count') held, already_held=$(get '.already_held')]"
  echo " 3. Same-sector ≤ 2             $(pf c3_sector)   [--sector-count $(get '.sector_count')]"
  echo " 4. Trades this week ≤ 3        $(pf c4_trades)   [--trades-this-week $(get '.trades_week')]"
  echo " 5. Cost ≤ cash & sizeable      $(pf c5_cash)   [cost \$$(get '.cost') vs cash \$$(get '.cash')]"
  echo " 6. PDT day-trades < 3          $(pf c6_pdt)   [$(get '.daytrade_count')]"
  echo " 7. No earnings within 10d      $(pf c7_earnings)   [--earnings-days $(get '.earnings')]"
  echo " 8. Catalyst documented         $(pf c8_catalyst)   [--catalyst $(get '.catalyst')]"
  echo " 9. 3-month high in last 5d     $(pf c9_breakout)   [last5 high $(get '.last5_high') vs prior $(get '.prior_high'), $(get '.bars_n') bars]"
  echo "10. Volume ≥ 1.5x 20d avg       $(pf c10_volume)   [last5 maxvol $(get '.last5_vol_max') vs threshold $(get '.vol_threshold') (1.5x avg $(get '.avg20_vol'))]"
  echo "11. Instrument is a stock       $(pf c11_stock)"
  C12="$([[ "$(get '.shadow_c12_pullback')" == "true" ]] && echo PASS || echo FAIL)"
  echo "--- Shadow (advisory only — does NOT affect verdict) ---"
  echo "c12. Pullback in band           $C12   [pullback $(get '.pullback_pct')% vs band $(get '.pullback_min')–$(get '.pullback_max')%]"
  echo "--- Sizing ---"
  echo "Entry ~\$$ENTRYV | Risk \$$(get '.risk') (1.5% eq capped \$200) | Notional \$$(get '.notional')"
  echo "Shares: $SHARES | Cost ~\$$(get '.cost') | Stop \$$(get '.stop') (-8%) | Target \$$(get '.target') (+24%)"
fi

# --- Verdict / exit code ---
if [[ "$(jq -r '[.checks[]] | all' <<<"$R")" == "true" ]]; then
  [[ "$JSON" -eq 0 ]] && echo "GATE: PASS"
  exit 0
else
  if [[ "$JSON" -eq 0 ]]; then
    FAILS="$(jq -r '[.checks | to_entries[] | select(.value==false) | .key] | join(", ")' <<<"$R")"
    echo "GATE: FAIL — $FAILS"
  fi
  exit 2
fi
