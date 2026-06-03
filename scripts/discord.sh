#!/usr/bin/env bash
set -euo pipefail

# Load .env if present (local mode)
if [[ -f "$(dirname "$0")/../.env" ]]; then
  # shellcheck disable=SC1091
  source "$(dirname "$0")/../.env"
fi

FALLBACK_LOG="$(dirname "$0")/../discord_fallback.log"

# Usage: discord.sh "<message>" [--embed <color_decimal>]
# color examples: 3066993 (green), 15158332 (red), 16776960 (yellow)
MESSAGE="${1:?Usage: discord.sh \"<message>\" [--embed COLOR_DECIMAL]}"
EMBED_COLOR=""

if [[ "${2:-}" == "--embed" && -n "${3:-}" ]]; then
  EMBED_COLOR="${3}"
fi

if [[ -z "${DISCORD_WEBHOOK_URL:-}" ]]; then
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] ${MESSAGE}" >> "$FALLBACK_LOG"
  echo "DISCORD_WEBHOOK_URL not set — message written to discord_fallback.log" >&2
  exit 0
fi

if [[ -n "$EMBED_COLOR" ]]; then
  PAYLOAD=$(jq -n \
    --arg msg "$MESSAGE" \
    --argjson color "$EMBED_COLOR" \
    '{embeds: [{description: $msg, color: $color}]}')
else
  PAYLOAD=$(jq -n --arg msg "$MESSAGE" '{content: $msg}')
fi

HTTP_CODE=$(curl -sf -o /dev/null -w "%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  "$DISCORD_WEBHOOK_URL") || true

if [[ "$HTTP_CODE" != "204" && "$HTTP_CODE" != "200" ]]; then
  echo "Discord webhook returned HTTP $HTTP_CODE — writing to fallback log" >&2
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] ${MESSAGE}" >> "$FALLBACK_LOG"
fi
