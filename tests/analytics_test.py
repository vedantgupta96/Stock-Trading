#!/usr/bin/env python3
"""Unit tests for the dashboard analytics parsers/metrics — pure, no API calls.

Feeds a synthetic TRADE-LOG string into the parser/metric functions from
dashboard/server.py and asserts the computed metrics. Run: python3 tests/analytics_test.py
"""
import sys
from pathlib import Path

# Import the pure functions from the dashboard server (Flask run is __main__-guarded).
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "dashboard"))
import server  # noqa: E402

SAMPLE_LOG = """# Trade Log

## Format: Trade Entry

```
### [DATE] BUY/SELL [SYMBOL] — [STATUS: open/closed]
- Side: buy | sell
- Shares: N
- Sector: [sector]
- Realized P&L: $X.XX / X% (if closed)
```

---

## 2026-06-09 — EOD Snapshot
Equity: $10,000.00 | Cash: $10,000.00 | Day P&L: $0.00 (0.00%) | Phase P&L: $0.00 (0.00%)

## 2026-06-10 — EOD Snapshot
Equity: $10,500.00 | Cash: $5,000.00 | Day P&L: +$500.00 (5.00%) | Phase P&L: +$500.00 (5.00%)

### 2026-06-10 BUY AAPL — closed
- Side: buy
- Shares: 50
- Entry price: $100.00
- Stop level: $88.00 (12% trailing)
- Target: $124.00 (3:1 R/R)
- Catalyst: breakout above 3-month high
- Thesis: momentum continuation
- Sector: Technology
- Exit price: $106.00
- Realized P&L: $300.00 / 6.0%
- Exit reason: target hit

### 2026-06-10 BUY NVDA — closed
- Side: buy
- Shares: 10
- Entry price: $200.00
- Sector: Technology
- Exit price: $184.00
- Realized P&L: -$160.00 / -8.0%
- Exit reason: hard stop -8%

## 2026-06-11 — EOD Snapshot
Equity: $9,800.00 | Cash: $9,800.00 | Day P&L: -$700.00 (-6.67%) | Phase P&L: -$200.00 (-2.00%)

### 2026-06-11 BUY XOM — closed
- Side: buy
- Shares: 40
- Entry price: $50.00
- Sector: Energy
- Exit price: $60.00
- Realized P&L: $400.00 / 20.0%
- Exit reason: target hit

### 2026-06-11 BUY GOOG — closed
- Side: buy
- Shares: 10
- Entry price: $150.00
- Exit price: $157.50
- Realized P&L: $75.00 / 5.0%
- Exit reason: target hit

### 2026-06-12 BUY MSFT — open
- Side: buy
- Shares: 5
- Entry price: $400.00
- Sector: Technology

## 2026-06-12 — EOD Snapshot
Equity: $10,200.00 | Cash: $8,200.00 | Day P&L: +$400.00 (4.08%) | Phase P&L: +$200.00 (2.00%)
"""

PASS = 0
FAIL = 0


def check(name, got, want):
    global PASS, FAIL
    if got == want:
        print(f"  ✓ {name}")
        PASS += 1
    else:
        print(f"  ✗ {name} — got {got!r}, want {want!r}")
        FAIL += 1


print("== parse_closed_trades ==")
closed = server.parse_closed_trades(SAMPLE_LOG)
check("ignores format-doc block and open trade -> 4 closed", len(closed), 4)
by_sym = {t["symbol"]: t for t in closed}
check("AAPL realized P&L", by_sym["AAPL"]["realized_pnl"], 300.0)
check("NVDA negative P&L parsed", by_sym["NVDA"]["realized_pnl"], -160.0)
check("NVDA realized pct", by_sym["NVDA"]["realized_pct"], -8.0)
check("AAPL sector", by_sym["AAPL"]["sector"], "Technology")
check("GOOG missing sector -> Unknown", by_sym["GOOG"]["sector"], "Unknown")
check("AAPL shares int", by_sym["AAPL"]["shares"], 50)
check("NVDA exit price", by_sym["NVDA"]["exit_price"], 184.0)

print("== compute_trade_stats ==")
stats = server.compute_trade_stats(closed)
check("total trades", stats["total_trades"], 4)
check("wins", stats["wins"], 3)
check("losses", stats["losses"], 1)
check("win rate", round(stats["win_rate"], 4), 0.75)
check("profit factor", round(stats["profit_factor"], 5), round(775 / 160, 5))
check("net pnl", stats["net_pnl"], 615.0)

print("== compute_drawdown ==")
eq = server.parse_eod_snapshots(SAMPLE_LOG)
check("4 EOD snapshots", len(eq), 4)
dd = server.compute_drawdown(eq)
check("max drawdown %", dd["max_drawdown"], -6.67)
check("current drawdown %", dd["current_drawdown"], -2.86)

print("== compute_r_multiples ==")
rm = server.compute_r_multiples(closed)
rs = {t["symbol"]: t["r"] for t in rm["trades"]}
check("AAPL R = 300/(100*0.08*50)=0.75", rs["AAPL"], 0.75)
check("NVDA R = -160/(200*0.08*10)=-1.0", rs["NVDA"], -1.0)
check("XOM R = 400/(50*0.08*40)=2.5", rs["XOM"], 2.5)
check("GOOG R = 75/(150*0.08*10)=0.625", rs["GOOG"], 0.62)  # round(0.625,2)=0.62 (banker's)
check("avg R", rm["avg_r"], 0.72)
buckets = {b["label"]: b["count"] for b in rm["buckets"]}
check("bucket < -1R", buckets["< -1R"], 0)
check("bucket -1-0R (NVDA -1.0)", buckets["-1–0R"], 1)
check("bucket 0-1R (AAPL, GOOG)", buckets["0–1R"], 2)
check("bucket 1-2R", buckets["1–2R"], 0)
check("bucket 2-3R (XOM)", buckets["2–3R"], 1)
check("bucket 3R+", buckets["3R+"], 0)

print("== compute_sector_pnl ==")
sec = server.compute_sector_pnl(closed)
check("Technology pnl (300 - 160)", sec["Technology"]["pnl"], 140.0)
check("Technology count", sec["Technology"]["count"], 2)
check("Energy pnl", sec["Energy"]["pnl"], 400.0)
check("Unknown sector pnl (GOOG)", sec["Unknown"]["pnl"], 75.0)

print("== compute_streaks ==")
# Sequence: AAPL win, NVDA loss, XOM win, GOOG win → tail is 2W
st = server.compute_streaks(closed)
check("current streak count = 2", st["current_streak"], 2)
check("current streak type = W", st["current_type"], "W")
check("best win streak = 2", st["best_win_streak"], 2)

print("== parse_open_trades sector field ==")
open_trades = server.parse_open_trades(SAMPLE_LOG)
by_open = {t["symbol"]: t for t in open_trades}
check("MSFT open trade present", "MSFT" in by_open, True)
check("MSFT sector parsed", by_open["MSFT"]["sector"], "Technology")

print("== empty-state (no closed trades) ==")
empty = server.parse_closed_trades("# Trade Log\n\nNo trades yet.\n")
check("no closed trades", len(empty), 0)
estats = server.compute_trade_stats(empty)
check("empty win_rate is None", estats["win_rate"], None)
check("empty total", estats["total_trades"], 0)
erm = server.compute_r_multiples(empty)
check("empty avg_r is None", erm["avg_r"], None)
check("empty sector pnl", server.compute_sector_pnl(empty), {})
edd = server.compute_drawdown([])
check("empty drawdown max", edd["max_drawdown"], 0.0)
est = server.compute_streaks([])
check("empty streak type None", est["current_type"], None)
check("empty best streak 0", est["best_win_streak"], 0)

print()
print(f"RESULTS: {PASS} passed, {FAIL} failed")
sys.exit(1 if FAIL else 0)
