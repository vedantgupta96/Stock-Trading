#!/usr/bin/env bash
set -euo pipefail

# Load .env if present (local mode)
if [[ -f "$(dirname "$0")/../.env" ]]; then
  # shellcheck disable=SC1091
  source "$(dirname "$0")/../.env"
fi

if [[ -z "${GEMINI_API_KEY:-}" ]]; then
  echo "GEMINI_API_KEY not set in environment — caller should fall back to WebSearch" >&2
  exit 3
fi

# Default to a model available on the free tier. NOTE: gemini-*-pro and the
# 3.x models are NOT granted on the free tier (they return HTTP 429 "limit: 0").
MODEL="${GEMINI_MODEL:-gemini-2.5-flash}"
QUERY="${1:?Usage: gemini.sh \"<query>\"}"

ENDPOINT="https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}"

PAYLOAD=$(jq -n \
  --arg q "$QUERY" \
  '{
    contents: [{parts: [{text: $q}]}],
    tools: [{google_search: {}}],
    generationConfig: {maxOutputTokens: 4096}
  }')

# Capture HTTP status separately so any API failure (404 bad model, 429 quota,
# 5xx) exits 3 — the documented "fall back to WebSearch" code — instead of
# letting `set -e` kill the script with curl's opaque exit code.
RESP_FILE="$(mktemp)"
trap 'rm -f "$RESP_FILE"' EXIT

HTTP_CODE=$(curl -s -o "$RESP_FILE" -w '%{http_code}' -X POST \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  "$ENDPOINT") || true

if [[ "$HTTP_CODE" != "200" ]]; then
  echo "gemini.sh: model '$MODEL' returned HTTP $HTTP_CODE — caller should fall back to WebSearch" >&2
  jq -r '.error.message // empty' "$RESP_FILE" 2>/dev/null >&2 || true
  exit 3
fi

# Join all text parts (grounded responses can split text across parts);
# fall back to the raw response if the shape is unexpected.
jq -e -r '[.candidates[0].content.parts[]?.text] | join("\n")' "$RESP_FILE" 2>/dev/null \
  || cat "$RESP_FILE"
