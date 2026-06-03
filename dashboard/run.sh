#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v python3 &>/dev/null; then
  echo "ERROR: python3 not found" >&2
  exit 1
fi

pip install -q -r requirements.txt

echo "Starting dashboard at http://localhost:5050"
python3 server.py
