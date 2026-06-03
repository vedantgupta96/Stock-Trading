import os
import re
import subprocess
import json
from pathlib import Path
from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder=".")

BASE_DIR = Path(__file__).parent.parent
MEMORY_DIR = BASE_DIR / "memory"
SCRIPTS_DIR = BASE_DIR / "scripts"


def load_env():
    env_file = BASE_DIR / ".env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, val = line.partition("=")
                os.environ.setdefault(key.strip(), val.strip())


def run_alpaca(subcommand, *args):
    result = subprocess.run(
        ["bash", str(SCRIPTS_DIR / "alpaca.sh"), subcommand, *args],
        capture_output=True, text=True, timeout=10
    )
    if result.returncode != 0:
        return None, result.stderr
    try:
        return json.loads(result.stdout), None
    except json.JSONDecodeError:
        return result.stdout, None


def parse_eod_snapshots(trade_log: str):
    """Extract daily equity values from EOD snapshot lines for the sparkline."""
    snapshots = []
    current_date = None
    for line in trade_log.splitlines():
        # Match: "## 2026-06-02 — EOD Snapshot" or "## 2026-06-02 — Day 0 Baseline"
        date_match = re.match(r"^## (\d{4}-\d{2}-\d{2})", line)
        if date_match:
            current_date = date_match.group(1)
        equity_match = re.search(r"Equity:\s*\$([0-9,]+\.?\d*)", line)
        if equity_match and current_date:
            snapshots.append({
                "date": current_date,
                "equity": float(equity_match.group(1).replace(",", ""))
            })
    return snapshots


def parse_open_trades(trade_log: str):
    """Extract open trade entries from the trade log."""
    trades = []
    current = {}
    for line in trade_log.splitlines():
        m = re.match(r"^### (\d{4}-\d{2}-\d{2}) (BUY|SELL) (\w+) — (open|closed)", line)
        if m:
            if current and current.get("status") == "open":
                trades.append(current)
            current = {
                "date": m.group(1),
                "side": m.group(2),
                "symbol": m.group(3),
                "status": m.group(4),
            }
        if current:
            for field, pattern in [
                ("shares", r"- Shares:\s*(.+)"),
                ("entry_price", r"- Entry price:\s*(.+)"),
                ("stop_level", r"- Stop level:\s*(.+)"),
                ("target", r"- Target:\s*(.+)"),
                ("catalyst", r"- Catalyst:\s*(.+)"),
                ("time_stop", r"- Time stop:\s*(.+)"),
            ]:
                fm = re.match(pattern, line.strip())
                if fm:
                    current[field] = fm.group(1).strip()

    if current and current.get("status") == "open":
        trades.append(current)
    return trades


def parse_latest_research(research_log: str):
    """Extract the most recent research log entry."""
    sections = re.split(r"(?=^## \d{4}-\d{2}-\d{2})", research_log, flags=re.MULTILINE)
    if len(sections) < 2:
        return {"raw": "No research entries yet."}

    latest = sections[-1]
    result = {"raw": latest[:2000]}

    regime_m = re.search(r"(?i)(regime|S&P.*20.day|above|below).*", latest)
    if regime_m:
        result["regime_note"] = regime_m.group(0)[:120]

    vix_m = re.search(r"(?i)VIX[:\s]+([0-9.]+)", latest)
    if vix_m:
        result["vix"] = vix_m.group(1)

    decision_m = re.search(r"(?i)Decision[:\s]+(.*)", latest)
    if decision_m:
        result["decision"] = decision_m.group(1).strip()[:120]

    return result


@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/api/snapshot")
def snapshot():
    """Returns data parsed from memory files — no API calls."""
    try:
        trade_log = (MEMORY_DIR / "TRADE-LOG.md").read_text()
        research_log = (MEMORY_DIR / "RESEARCH-LOG.md").read_text()
        weekly_review = (MEMORY_DIR / "WEEKLY-REVIEW.md").read_text()
    except FileNotFoundError as e:
        return jsonify({"error": f"Memory file not found: {e}"}), 500

    snapshots = parse_eod_snapshots(trade_log)
    open_trades = parse_open_trades(trade_log)
    research = parse_latest_research(research_log)

    # Weekly stats from last review
    week_match = re.search(r"Week return[|\s]+([+\-$0-9.,% ]+)", weekly_review)
    week_return = week_match.group(1).strip() if week_match else "N/A"

    # Phase P&L from last EOD
    phase_match = re.search(r"Phase P&L:\s*([+\-$0-9.,% ]+)", trade_log)
    phase_pnl = phase_match.group(1).strip() if phase_match else "N/A"

    return jsonify({
        "source": "snapshot",
        "equity_history": snapshots,
        "open_trades": open_trades,
        "research": research,
        "phase_pnl": phase_pnl,
        "week_return": week_return,
    })


@app.route("/api/live")
def live():
    """Fetches fresh data from Alpaca — called by the Refresh button."""
    load_env()

    account, err = run_alpaca("account")
    if err:
        return jsonify({"error": f"Alpaca account error: {err}"}), 500

    positions, err = run_alpaca("positions")
    if err:
        return jsonify({"error": f"Alpaca positions error: {err}"}), 500

    orders, err = run_alpaca("orders")
    if err:
        orders = []

    # Build enhanced position list with stop order cross-reference
    stop_symbols = set()
    if isinstance(orders, list):
        for o in orders:
            if o.get("type") == "trailing_stop" and o.get("status") == "accepted":
                stop_symbols.add(o.get("symbol", ""))

    enriched_positions = []
    if isinstance(positions, list):
        for p in positions:
            sym = p.get("symbol", "")
            enriched_positions.append({
                "symbol": sym,
                "qty": p.get("qty"),
                "avg_entry_price": p.get("avg_entry_price"),
                "current_price": p.get("current_price"),
                "unrealized_pl": p.get("unrealized_pl"),
                "unrealized_plpc": p.get("unrealized_plpc"),
                "has_stop": sym in stop_symbols,
            })

    equity = float(account.get("equity", 0)) if isinstance(account, dict) else 0
    cash = float(account.get("cash", 0)) if isinstance(account, dict) else 0
    day_pnl = float(account.get("unrealized_pl", 0)) if isinstance(account, dict) else 0

    return jsonify({
        "source": "live",
        "equity": equity,
        "cash": cash,
        "day_pnl": day_pnl,
        "positions": enriched_positions,
        "orders": orders if isinstance(orders, list) else [],
    })


if __name__ == "__main__":
    load_env()
    import logging
    logging.basicConfig(filename="server.log", level=logging.INFO)
    print("Dashboard running at http://localhost:5050")
    app.run(port=5050, debug=False)
