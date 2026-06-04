#!/usr/bin/env bash
set -euo pipefail

# Stop-Loss Watchdog
# ------------------
# Verifies every open LONG position has a protective stop covering its full size,
# and (with --fix) heals any that don't:
#   - already <= -8% from entry  -> close the position (hard-stop rule)
#   - otherwise                  -> place a trailing stop at the strategy-correct
#                                    tier (>=+20% ->5%, >=+15% ->7%, else 12%),
#                                    falling back to a limit sell at entry*0.92
#                                    if the trailing stop is rejected (PDT).
#
# Rules encoded from memory/TRADING-STRATEGY.md.
#
# Usage:
#   stop_watchdog.sh           # dry-run: print the action plan, change nothing
#   stop_watchdog.sh --fix     # execute the plan via scripts/alpaca.sh
#
# Testability (no API calls): set WATCHDOG_POSITIONS_FILE / WATCHDOG_ORDERS_FILE
# to JSON files and the script reads those instead of calling Alpaca.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# WATCHDOG_ALPACA lets tests inject a mock wrapper; defaults to the real one.
ALPACA="${WATCHDOG_ALPACA:-$SCRIPT_DIR/alpaca.sh}"

FIX=0
[[ "${1:-}" == "--fix" ]] && FIX=1

# Active (open) order statuses that count as real protection.
ACTIVE_STATUSES='["new","accepted","held","partially_filled","pending_new","replaced","pending_replace","calculated","accepted_for_bidding"]'
PROTECTIVE_TYPES='["trailing_stop","stop","stop_limit","limit"]'

# --- Load positions and orders (live Alpaca, or injected fixtures for tests) ---
if [[ -n "${WATCHDOG_POSITIONS_FILE:-}" ]]; then
  POSITIONS="$(cat "$WATCHDOG_POSITIONS_FILE")"
else
  POSITIONS="$(bash "$ALPACA" positions)"
fi
if [[ -n "${WATCHDOG_ORDERS_FILE:-}" ]]; then
  ORDERS="$(cat "$WATCHDOG_ORDERS_FILE")"
else
  ORDERS="$(bash "$ALPACA" orders)"
fi

# Guard: both must be JSON arrays (an Alpaca error returns an object).
if ! jq -e 'type=="array"' >/dev/null 2>&1 <<<"$POSITIONS"; then
  echo "stop_watchdog: positions response is not a JSON array — aborting" >&2
  exit 1
fi
if ! jq -e 'type=="array"' >/dev/null 2>&1 <<<"$ORDERS"; then
  ORDERS='[]'
fi

POS_COUNT="$(jq 'map(select((.qty|tonumber) > 0)) | length' <<<"$POSITIONS")"

# --- Build the action plan: one object per unprotected long position ---
PLAN="$(jq -nc \
  --argjson positions "$POSITIONS" \
  --argjson orders "$ORDERS" \
  --argjson active "$ACTIVE_STATUSES" \
  --argjson protypes "$PROTECTIVE_TYPES" '
  [ $positions[]
    | select((.qty|tonumber) > 0)
    | . as $p
    | ($p.symbol) as $sym
    | ($p.qty|tonumber) as $q
    | ($p.unrealized_plpc|tonumber) as $pnl
    | ( [ $orders[]
          | select(.side=="sell"
              and (.symbol==$sym)
              and (.type as $t | $protypes | index($t))
              and (.status as $s | $active | index($s))) ] ) as $prot
    | ( ($prot | map(.qty|tonumber) | add) // 0 ) as $covered
    | if $covered >= $q then empty
      else
        { symbol: $sym,
          qty: $q,
          pnl_pct: (($pnl*10000|round)/100),
          entry: ($p.avg_entry_price|tonumber),
          cancel_ids: [ $prot[].id ],
          action: (if $pnl <= -0.08 then "close" else "place_trailing" end),
          trail_pct: (if $pnl <= -0.08 then null
                      elif $pnl >= 0.20 then 5.0
                      elif $pnl >= 0.15 then 7.0
                      else 12.0 end) }
      end ]')"

UNPROTECTED_COUNT="$(jq 'length' <<<"$PLAN")"
ACTIONS_TAKEN=0

# --- Execute / report each planned action ---
while IFS= read -r item; do
  [[ -z "$item" || "$item" == "null" ]] && continue

  sym="$(jq -r '.symbol' <<<"$item")"
  qty="$(jq -r '.qty' <<<"$item")"
  pnl="$(jq -r '.pnl_pct' <<<"$item")"
  action="$(jq -r '.action' <<<"$item")"
  entry="$(jq -r '.entry' <<<"$item")"
  trail="$(jq -r '.trail_pct // empty' <<<"$item")"
  cancel_ids=()
  while IFS= read -r _cid; do
    [[ -n "$_cid" ]] && cancel_ids+=("$_cid")
  done < <(jq -r '.cancel_ids[]?' <<<"$item")

  result="planned"

  if [[ "$FIX" -eq 1 ]]; then
    # Clear any partial/leftover protective orders first.
    if [[ ${#cancel_ids[@]} -gt 0 ]]; then
      for oid in "${cancel_ids[@]}"; do
        bash "$ALPACA" cancel "$oid" >/dev/null 2>&1 || true
      done
    fi

    if [[ "$action" == "close" ]]; then
      if bash "$ALPACA" close "$sym" >/dev/null 2>&1; then
        result="closed"; ACTIONS_TAKEN=$((ACTIONS_TAKEN+1))
      else
        result="close_failed"
      fi
    else
      if bash "$ALPACA" trailing_stop "$sym" "$qty" "$trail" >/dev/null 2>&1; then
        result="trailing_${trail}"; ACTIONS_TAKEN=$((ACTIONS_TAKEN+1))
      else
        # PDT fallback: fixed limit sell at entry * 0.92
        limit="$(awk -v e="$entry" 'BEGIN{printf "%.2f", e*0.92}')"
        if bash "$ALPACA" limit_sell "$sym" "$qty" "$limit" >/dev/null 2>&1; then
          result="limit_fallback_${limit}"; ACTIONS_TAKEN=$((ACTIONS_TAKEN+1))
        else
          result="queued"
        fi
      fi
    fi
  fi

  if [[ "$action" == "close" ]]; then
    detail="hard_stop_-8%"
  else
    detail="trail_${trail}%"
  fi
  echo "ACTION ${sym} qty=${qty} pnl=${pnl}% action=${action} detail=${detail} result=${result}"
done < <(jq -c '.[]' <<<"$PLAN")

if [[ "$UNPROTECTED_COUNT" -eq 0 ]]; then
  echo "WATCHDOG: ${POS_COUNT} positions, 0 unprotected, 0 actions — all protected"
else
  echo "WATCHDOG: ${POS_COUNT} positions, ${UNPROTECTED_COUNT} unprotected, ${ACTIONS_TAKEN} actions"
fi
