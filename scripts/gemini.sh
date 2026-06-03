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

MODEL="${GEMINI_MODEL:-gemini-3.1-pro}"
QUERY="${1:?Usage: gemini.sh \"<query>\"}"

ENDPOINT="https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}"

PAYLOAD=$(jq -n \
  --arg q "$QUERY" \
  '{
    contents: [{parts: [{text: $q}]}],
    tools: [{google_search: {}}],
    generationConfig: {maxOutputTokens: 1024}
  }')

RESPONSE=$(curl -sf -X POST \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  "$ENDPOINT")

# Extract text from response; fall back to raw response if jq parse fails
echo "$RESPONSE" | jq -r '.candidates[0].content.parts[0].text // .candidates[0].content.parts[0].text' 2>/dev/null \
  || echo "$RESPONSE"
