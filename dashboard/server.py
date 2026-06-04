import os
import re
import subprocess
import json
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder="dist", static_url_path="")

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
                ("sector", r"- Sector:\s*(.+)"),
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


# Risk basis per the strategy: the protective stop sits 8% below entry, so the
# dollars at risk on a position = entry * 0.08 * shares. R-multiple normalizes a
# trade's realized P&L by this risk so wins/losses are comparable across sizes.
STOP_RISK_PCT = 0.08

# Default tickers always worth a news headline, even with an empty book.
DEFAULT_WATCHLIST = ["SPY", "QQQ", "NVDA", "AAPL", "MSFT", "AMZN", "META", "GOOGL", "TSLA", "AMD"]

# R-multiple histogram buckets (label, lower-inclusive, upper-exclusive).
R_BUCKETS = [
    ("< -1R", float("-inf"), -1.0),
    ("-1–0R", -1.0, 0.0),
    ("0–1R", 0.0, 1.0),
    ("1–2R", 1.0, 2.0),
    ("2–3R", 2.0, 3.0),
    ("3R+", 3.0, float("inf")),
]


def _money(s: str):
    """Parse '$1,234.56', '-$50.00', '+$3.10' -> float. None if unparseable."""
    if s is None:
        return None
    m = re.search(r"([+\-]?)\s*\$?\s*([0-9,]+\.?\d*)", s)
    if not m:
        return None
    val = float(m.group(2).replace(",", ""))
    return -val if m.group(1) == "-" else val


def parse_closed_trades(trade_log: str):
    """Extract closed trade entries (with realized P&L, sector, reason) for analytics."""
    trades = []
    # Split on trade-entry headers; the format-doc example block uses [DATE] so it
    # never matches the real-date header regex and is harmless.
    blocks = re.split(r"(?=^### \d{4}-\d{2}-\d{2} (?:BUY|SELL) )", trade_log, flags=re.MULTILINE)
    for block in blocks:
        header = re.match(r"^### (\d{4}-\d{2}-\d{2}) (BUY|SELL) (\w+) — (open|closed)", block)
        if not header or header.group(4) != "closed":
            continue
        t = {"date": header.group(1), "side": header.group(2), "symbol": header.group(3)}

        shares_m = re.search(r"- Shares:\s*([0-9,]+)", block)
        entry_m = re.search(r"- Entry price:\s*(.+)", block)
        exit_m = re.search(r"- Exit price:\s*(.+)", block)
        pnl_m = re.search(r"- Realized P&L:\s*([^/\n]+?)\s*/\s*([+\-]?[0-9.]+)\s*%", block)
        reason_m = re.search(r"- Exit reason:\s*(.+)", block)
        sector_m = re.search(r"- Sector:\s*(.+)", block)

        t["shares"] = int(shares_m.group(1).replace(",", "")) if shares_m else 0
        t["entry_price"] = _money(entry_m.group(1)) if entry_m else None
        t["exit_price"] = _money(exit_m.group(1)) if exit_m else None
        t["realized_pnl"] = _money(pnl_m.group(1)) if pnl_m else None
        t["realized_pct"] = float(pnl_m.group(2)) if pnl_m else None
        t["exit_reason"] = reason_m.group(1).strip() if reason_m else ""
        sector = sector_m.group(1).strip() if sector_m else ""
        t["sector"] = sector if sector else "Unknown"
        trades.append(t)
    return trades


def compute_streaks(closed):
    """Current W/L streak at the tail + best historical win streak."""
    pnls = [(t["date"], t.get("realized_pnl")) for t in sorted(closed, key=lambda x: x["date"])
            if t.get("realized_pnl") is not None]
    if not pnls:
        return {"current_streak": 0, "current_type": None, "best_win_streak": 0}

    current = 1
    current_type = "W" if pnls[-1][1] > 0 else "L"
    for _, pnl in reversed(pnls[:-1]):
        t = "W" if pnl > 0 else "L"
        if t == current_type:
            current += 1
        else:
            break

    best = 0
    run = 0
    for _, pnl in pnls:
        if pnl > 0:
            run += 1
            best = max(best, run)
        else:
            run = 0

    return {"current_streak": current, "current_type": current_type, "best_win_streak": best}


def compute_trade_stats(closed):
    """Win rate, profit factor, and win/loss counts from closed trades with P&L."""
    pnls = [t["realized_pnl"] for t in closed if t.get("realized_pnl") is not None]
    wins = [p for p in pnls if p > 0]
    losses = [p for p in pnls if p < 0]
    gross_win = sum(wins)
    gross_loss = abs(sum(losses))
    total = len(pnls)
    return {
        "total_trades": total,
        "wins": len(wins),
        "losses": len(losses),
        "win_rate": (len(wins) / total) if total else None,
        "profit_factor": (gross_win / gross_loss) if gross_loss else (None if not wins else float("inf")),
        "net_pnl": sum(pnls),
        "gross_win": gross_win,
        "gross_loss": gross_loss,
    }


def compute_drawdown(equity_history):
    """Running peak -> max drawdown % and current drawdown % from EOD equity."""
    peak = None
    max_dd = 0.0
    cur_dd = 0.0
    series = []
    for snap in equity_history:
        eq = snap["equity"]
        if peak is None or eq > peak:
            peak = eq
        dd = ((eq - peak) / peak * 100) if peak else 0.0
        cur_dd = dd
        if dd < max_dd:
            max_dd = dd
        series.append({"date": snap["date"], "drawdown": round(dd, 2)})
    return {"max_drawdown": round(max_dd, 2), "current_drawdown": round(cur_dd, 2), "series": series}


def compute_r_multiples(closed):
    """R = realized_$ / (entry * 0.08 * shares). Returns per-trade Rs, buckets, avg R."""
    rs = []
    for t in closed:
        entry = t.get("entry_price")
        shares = t.get("shares") or 0
        pnl = t.get("realized_pnl")
        if entry and shares and pnl is not None:
            risk = entry * STOP_RISK_PCT * shares
            if risk > 0:
                rs.append({"symbol": t["symbol"], "date": t["date"], "r": round(pnl / risk, 2)})
    buckets = []
    for label, lo, hi in R_BUCKETS:
        count = sum(1 for x in rs if lo <= x["r"] < hi)
        buckets.append({"label": label, "count": count})
    avg_r = (sum(x["r"] for x in rs) / len(rs)) if rs else None
    return {
        "trades": rs,
        "buckets": buckets,
        "avg_r": round(avg_r, 2) if avg_r is not None else None,
        "count": len(rs),
    }


def compute_sector_pnl(closed):
    """Aggregate realized P&L and trade count by sector."""
    sectors = {}
    for t in closed:
        if t.get("realized_pnl") is None:
            continue
        sec = t.get("sector", "Unknown")
        bucket = sectors.setdefault(sec, {"pnl": 0.0, "count": 0})
        bucket["pnl"] += t["realized_pnl"]
        bucket["count"] += 1
    for sec in sectors:
        sectors[sec]["pnl"] = round(sectors[sec]["pnl"], 2)
    return sectors


def extract_idea_tickers(research: dict):
    """Pull $-prefixed tickers from the latest research entry.

    Research logs cite tickers in freeform prose (including penny names the bot
    is explicitly *avoiding*), so bare-caps extraction is too noisy/misleading.
    We only honor the unambiguous `$TICKER` convention — an intentional signal.
    Held positions + the default watchlist cover the important names anyway.
    """
    raw = research.get("raw", "") if isinstance(research, dict) else ""
    found = []
    for sym in re.findall(r"\$([A-Z]{1,5})\b", raw):
        if sym not in found:
            found.append(sym)
    return found[:6]


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path: str):
    # Serve the React SPA; fall back to index.html for client-side routes.
    full = Path(app.static_folder) / path  # type: ignore[arg-type]
    if path and full.exists():
        return send_from_directory(app.static_folder, path)
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

    # Cross-reference trade log for stop/target/sector (memory read, no extra API call).
    try:
        trade_log_ctx = {
            t["symbol"]: t
            for t in parse_open_trades((MEMORY_DIR / "TRADE-LOG.md").read_text())
        }
    except Exception:
        trade_log_ctx = {}

    enriched_positions = []
    if isinstance(positions, list):
        for p in positions:
            sym = p.get("symbol", "")
            ctx = trade_log_ctx.get(sym, {})
            enriched_positions.append({
                "symbol": sym,
                "qty": p.get("qty"),
                "avg_entry_price": p.get("avg_entry_price"),
                "current_price": p.get("current_price"),
                "unrealized_pl": p.get("unrealized_pl"),
                "unrealized_plpc": p.get("unrealized_plpc"),
                "has_stop": sym in stop_symbols,
                "stop_level": ctx.get("stop_level"),
                "target": ctx.get("target"),
                "sector": ctx.get("sector", ""),
                "time_stop": ctx.get("time_stop"),
                "entry_date": ctx.get("date"),
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


@app.route("/api/analytics")
def analytics():
    """Performance analytics parsed purely from memory files — no API calls."""
    try:
        trade_log = (MEMORY_DIR / "TRADE-LOG.md").read_text()
    except FileNotFoundError as e:
        return jsonify({"error": f"Memory file not found: {e}"}), 500

    equity_history = parse_eod_snapshots(trade_log)
    closed = parse_closed_trades(trade_log)

    open_trades = parse_open_trades(trade_log)

    return jsonify({
        "equity_history": equity_history,
        "drawdown": compute_drawdown(equity_history),
        "stats": compute_trade_stats(closed),
        "r_multiples": compute_r_multiples(closed),
        "sector_pnl": compute_sector_pnl(closed),
        "streaks": compute_streaks(closed),
        "open_trades": open_trades,
        "closed_count": len(closed),
    })


@app.route("/api/news")
def news():
    """Latest headlines for held positions + research ideas + a default watchlist."""
    load_env()

    symbols = []

    positions, _ = run_alpaca("positions")
    if isinstance(positions, list):
        for p in positions:
            sym = p.get("symbol")
            if sym and sym not in symbols:
                symbols.append(sym)

    try:
        research_log = (MEMORY_DIR / "RESEARCH-LOG.md").read_text()
        ideas = extract_idea_tickers(parse_latest_research(research_log))
        for sym in ideas:
            if sym not in symbols:
                symbols.append(sym)
    except FileNotFoundError:
        pass

    for sym in DEFAULT_WATCHLIST:
        if sym not in symbols:
            symbols.append(sym)

    symbols = symbols[:10]

    data, err = run_alpaca("news", ",".join(symbols), "20")
    if err or not isinstance(data, dict):
        return jsonify({"symbols": symbols, "headlines": [], "error": err or "no news data"})

    headlines = []
    seen = set()
    for item in data.get("news", []):
        title = item.get("headline", "")
        if not title or title in seen:
            continue
        seen.add(title)
        headlines.append({
            "headline": title,
            "source": item.get("source", ""),
            "created_at": item.get("created_at", ""),
            "url": item.get("url", ""),
            "symbols": item.get("symbols", []),
        })
    headlines = headlines[:15]

    return jsonify({"symbols": symbols, "headlines": headlines})


@app.route("/api/sparklines")
def sparklines():
    """30-day daily closes for up to 5 symbols, fetched in parallel via alpaca.sh bars."""
    load_env()
    raw_symbols = request.args.get("symbols", "")
    days = min(int(request.args.get("days", "30")), 60)
    symbols = [s.strip().upper() for s in raw_symbols.split(",") if s.strip()][:5]
    if not symbols:
        return jsonify({})

    def fetch_bars(sym):
        data, err = run_alpaca("bars", sym, str(days))
        if err or not isinstance(data, dict):
            return sym, []
        bars = data.get("bars", [])
        return sym, [
            {"date": b["t"][:10], "close": b["c"]}
            for b in bars if "t" in b and "c" in b
        ]

    result = {}
    with ThreadPoolExecutor(max_workers=5) as pool:
        futures = {pool.submit(fetch_bars, sym): sym for sym in symbols}
        for future in as_completed(futures, timeout=12):
            sym, series = future.result()
            result[sym] = series

    return jsonify(result)


if __name__ == "__main__":
    load_env()
    import logging
    logging.basicConfig(filename="server.log", level=logging.INFO)
    print("Dashboard running at http://localhost:5050")
    app.run(port=5050, debug=False)
