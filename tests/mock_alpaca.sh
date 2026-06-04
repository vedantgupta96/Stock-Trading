#!/usr/bin/env bash
# Mock of scripts/alpaca.sh for tests. Records each invocation to $MOCK_CALLS
# and simulates success/failure without touching the network.
#   MOCK_FAIL_TRAILING=SYM  -> `trailing_stop SYM ...` exits non-zero (PDT path)
#   MOCK_FAIL_LIMIT=SYM     -> `limit_sell SYM ...` exits non-zero (queued path)
set -euo pipefail
CMD="${1:-}"; shift || true
echo "$CMD $*" >> "${MOCK_CALLS:?MOCK_CALLS not set}"

case "$CMD" in
  trailing_stop)
    [[ "${1:-}" == "${MOCK_FAIL_TRAILING:-}" ]] && exit 1
    ;;
  limit_sell)
    [[ "${1:-}" == "${MOCK_FAIL_LIMIT:-}" ]] && exit 1
    ;;
esac
exit 0
