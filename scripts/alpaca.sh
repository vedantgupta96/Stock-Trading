#!/usr/bin/env bash
set -euo pipefail

# Load .env if present (local mode); cloud mode uses injected env vars
if [[ -f "$(dirname "$0")/../.env" ]]; then
  # shellcheck disable=SC1091
  source "$(dirname "$0")/../.env"
fi

ENDPOINT="${ALPACA_ENDPOINT:-https://paper-api.alpaca.markets}"
DATA_ENDPOINT="${ALPACA_DATA_ENDPOINT:-https://data.alpaca.markets}"

if [[ -z "${ALPACA_API_KEY:-}" || -z "${ALPACA_SECRET_KEY:-}" ]]; then
  echo "ERROR: ALPACA_API_KEY or ALPACA_SECRET_KEY not set in environment" >&2
  exit 1
fi

_headers=(
  -H "APCA-API-KEY-ID: ${ALPACA_API_KEY}"
  -H "APCA-API-SECRET-KEY: ${ALPACA_SECRET_KEY}"
  -H "Content-Type: application/json"
)

_get()  { curl -sf "${_headers[@]}" "$1"; }
_post() { curl -sf -X POST "${_headers[@]}" -d "$2" "$1"; }
_delete() { curl -sf -X DELETE "${_headers[@]}" "$1"; }

CMD="${1:-}"
shift || true

case "$CMD" in
  account)
    _get "$ENDPOINT/v2/account"
    ;;

  positions)
    _get "$ENDPOINT/v2/positions"
    ;;

  orders)
    _get "$ENDPOINT/v2/orders?status=open&limit=100"
    ;;

  quote)
    SYMBOL="${1:?Usage: alpaca.sh quote SYMBOL}"
    _get "$DATA_ENDPOINT/v2/stocks/${SYMBOL}/quotes/latest"
    ;;

  bars)
    SYMBOL="${1:?Usage: alpaca.sh bars SYMBOL [LOOKBACK_DAYS]}"
    LOOKBACK="${2:-120}"
    # IEX feed needs an explicit start date to return history (free tier).
    START=$(date -u -v-"${LOOKBACK}"d +%Y-%m-%d 2>/dev/null || date -u -d "${LOOKBACK} days ago" +%Y-%m-%d)
    _get "$DATA_ENDPOINT/v2/stocks/${SYMBOL}/bars?timeframe=1Day&start=${START}&limit=200&feed=iex&adjustment=split"
    ;;

  asset)
    SYMBOL="${1:?Usage: alpaca.sh asset SYMBOL}"
    _get "$ENDPOINT/v2/assets/${SYMBOL}"
    ;;

  news)
    SYMBOLS="${1:?Usage: alpaca.sh news SYMBOLS [LIMIT]}"
    LIMIT="${2:-15}"
    _get "$DATA_ENDPOINT/v1beta1/news?symbols=${SYMBOLS}&limit=${LIMIT}&sort=desc"
    ;;

  buy)
    SYMBOL="${1:?Usage: alpaca.sh buy SYMBOL QTY}"
    QTY="${2:?Usage: alpaca.sh buy SYMBOL QTY}"
    _post "$ENDPOINT/v2/orders" \
      "{\"symbol\":\"${SYMBOL}\",\"qty\":\"${QTY}\",\"side\":\"buy\",\"type\":\"market\",\"time_in_force\":\"day\"}"
    ;;

  sell)
    SYMBOL="${1:?Usage: alpaca.sh sell SYMBOL QTY}"
    QTY="${2:?Usage: alpaca.sh sell SYMBOL QTY}"
    _post "$ENDPOINT/v2/orders" \
      "{\"symbol\":\"${SYMBOL}\",\"qty\":\"${QTY}\",\"side\":\"sell\",\"type\":\"market\",\"time_in_force\":\"day\"}"
    ;;

  trailing_stop)
    SYMBOL="${1:?Usage: alpaca.sh trailing_stop SYMBOL QTY TRAIL_PCT}"
    QTY="${2:?Usage: alpaca.sh trailing_stop SYMBOL QTY TRAIL_PCT}"
    TRAIL_PCT="${3:?Usage: alpaca.sh trailing_stop SYMBOL QTY TRAIL_PCT}"
    # trail_percent must be a float (number), not a string — Alpaca rejects strings
    _post "$ENDPOINT/v2/orders" \
      "{\"symbol\":\"${SYMBOL}\",\"qty\":\"${QTY}\",\"side\":\"sell\",\"type\":\"trailing_stop\",\"time_in_force\":\"gtc\",\"trail_percent\":${TRAIL_PCT}}"
    ;;

  limit_sell)
    SYMBOL="${1:?Usage: alpaca.sh limit_sell SYMBOL QTY LIMIT_PRICE}"
    QTY="${2:?Usage: alpaca.sh limit_sell SYMBOL QTY LIMIT_PRICE}"
    LIMIT_PRICE="${3:?Usage: alpaca.sh limit_sell SYMBOL QTY LIMIT_PRICE}"
    # limit_price must be a float (number), not a string — Alpaca rejects strings
    _post "$ENDPOINT/v2/orders" \
      "{\"symbol\":\"${SYMBOL}\",\"qty\":\"${QTY}\",\"side\":\"sell\",\"type\":\"limit\",\"time_in_force\":\"gtc\",\"limit_price\":${LIMIT_PRICE}}"
    ;;

  cancel)
    ORDER_ID="${1:?Usage: alpaca.sh cancel ORDER_ID}"
    _delete "$ENDPOINT/v2/orders/${ORDER_ID}"
    ;;

  close)
    SYMBOL="${1:?Usage: alpaca.sh close SYMBOL}"
    _delete "$ENDPOINT/v2/positions/${SYMBOL}"
    ;;

  *)
    echo "Usage: alpaca.sh <account|positions|orders|quote|bars|asset|news|buy|sell|trailing_stop|limit_sell|cancel|close> [args]" >&2
    exit 1
    ;;
esac
