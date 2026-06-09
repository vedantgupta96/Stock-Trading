# Trading Strategy

*Last updated: 2026-06-02. Only update on Fridays if a rule has proven out for 2+ weeks or failed badly. Call out the change in the weekly review.*

*2026-06-08 (operator-directed, non-rule): added research query #9 (congressional/STOCK-Act disclosures) as an idea-generation input only. No hard rules, gates, sizing, or risk controls changed — surfaced names must still clear the full 11-check buy gate.*

## What this is

Momentum-breakout swing trading, stocks only. We buy stocks that have just broken out to multi-month highs on strong volume, then enter on the first meaningful pullback. We only trade when the broad market is in an uptrend. Discipline and patience are the edge.

## Market regime filter (highest priority rule)

**Only go long when the S&P 500 is above its 20-day simple moving average.**

Check this every pre-market. If S&P is below its 20-day SMA:
- Place no new buys that day
- Do not close existing winning positions just because of the filter — let stops do that
- Note the filter status in the research log

When the regime filter is off, the right answer is almost always cash.

## Hard rules (non-negotiable)

- No options. Ever. Stocks only.
- Maximum **5 open positions** at a time.
- Maximum **2 positions in the same sector** at a time.
- Maximum **3 new trades per week**.
- Every buy immediately gets a **12% trailing stop** placed as a real GTC order on Alpaca.
- **Never hold through earnings.** If a position's earnings date falls within the next 10 trading days, close or avoid it. Overnight gaps blow through stops.
- Cut any position that hits **-8% from entry**. No averaging down. No hoping.
- Tighten trailing stop to **7%** when a position is up +15%.
- Tighten trailing stop to **5%** when a position is up +20%.
- Never tighten a stop to within 3% of current price. Never move a stop down.
- Close any position that is flat (< +5% gain) after **15 trading days**. Dead money has opportunity cost.
- Exit an entire sector after 2 consecutive failed trades in that sector for the current month.

## Buy-side gate (all checks must pass before any order)

1. Market regime filter: S&P 500 is above its 20-day SMA today
2. Total open positions after this fill will be ≤ 5
3. Positions in this stock's sector after fill ≤ 2
4. Total trades placed this week (including this one) ≤ 3
5. Position cost ≤ available cash
6. PDT day-trade count leaves room (under 3 on a sub-$25k account)
7. No earnings announcement within the next 10 trading days for this stock
8. A specific catalyst is documented in today's research log entry
9. Breakout confirmation: stock made a 3-month or 52-week high within the last 5 trading days
10. Volume confirmation: breakout day volume was ≥ 1.5x the 20-day average daily volume
11. The instrument is a stock (not an option or anything else)

If any check fails: skip the trade, log the reason in the research log.

## Position sizing (risk-based)

Size every position so that **hitting the initial stop costs 1.5% of account equity**.

On a $10,000 account:
- Risk per trade = $10,000 × 1.5% = **$150**
- Initial stop = 8% below entry
- Position size = $150 / 8% = **$1,875 max notional**

Recalculate based on current equity each time. Never risk more than $200 per trade regardless of account size growth.

## Entry timing

Do not buy breakouts the moment they happen — you will overpay. Wait for the **first pullback of 3–8% from the breakout high**, then enter if:
- The stock holds above a key support level (breakout pivot, 8 or 21-day EMA)
- Volume on the pullback is below average (sellers drying up)
- The catalyst that caused the breakout is still intact

If the pullback exceeds 10% from the high before you enter, the setup is broken — skip it.

## Sell-side rules

Evaluate at the midday scan and opportunistically throughout the day:

- Loss hits **-8% from entry**: close immediately
- **Earnings within 10 days**: close if still open
- **15 trading days elapsed** with < +5% gain: close (time stop)
- Thesis broken (catalyst invalidated, sector rolling over): close even if not at -8%
- Up **+15% or more**: cancel old trailing stop, place new one at trail 7%
- Up **+20% or more**: cancel old trailing stop, place new one at trail 5%
- Sector with 2 consecutive failed trades this month: exit all positions in that sector

## Entry checklist (document all of these in research log before placing)

- What was the breakout event and when did it occur?
- Is S&P 500 above its 20-day SMA right now?
- Is the sector in momentum (top half of sector performance this month)?
- What is the pullback % from the breakout high? (Target: 3–8%)
- Was breakout volume ≥ 1.5x 20-day average?
- Next earnings date? (Must be > 10 trading days away)
- Stop level: entry price × 0.92 = $X.XX
- Position size: $150 / 8% = $1,875 max → N shares at $X entry
- Target: entry × 1.24 minimum (3:1 R/R on 8% risk) = $X.XX

## Research queries to run every pre-market

Use `bash scripts/gemini.sh` for each:

1. "S&P 500 20-day moving average vs current price — is it above or below?"
2. "VIX level and trend today"
3. "Top performing stock market sectors this week"
4. "Pre-market movers with high volume today [DATE]"
5. "Earnings calendar this week — stocks reporting next 10 days"
6. "WTI crude oil price and trend"
7. "Economic calendar today — CPI, FOMC, jobs data, other releases"
8. News on each currently-held ticker
9. "Recent notable US congressional / senator stock purchase disclosures (STOCK Act) in the last 2 weeks — which stocks, who, filing date"
   - **Idea-generation only — never a buy reason.** Disclosures lag the trade by up to
     ~45 days, hide size/exits, and are frequently options (which we never trade). Any
     name surfaced this way is just a watchlist candidate and must independently pass all
     11 buy-gate checks like any other idea. If it doesn't clear the gate, drop it.

## Alpaca implementation notes

- `trail_percent` in the order JSON is a **float** (e.g., `12.0`), not a string — Alpaca rejects strings
- Market data base URL: `data.alpaca.markets`; trading API: `paper-api.alpaca.markets`
- Trailing stops only work during market hours — overnight gaps can bypass them
- PDT rule: 3 day trades per 5 rolling business days on accounts under $25k
- Same-day trailing stop on a same-day buy may be rejected (PDT). Fallback: fixed 8% stop → queue trailing stop for next morning
- When tightening a stop: cancel the old trailing stop order first, then place the new one

## Why this beats the original guide's strategy

| Original | This strategy | Why |
|---|---|---|
| No market regime filter | S&P 20-day SMA filter | Avoids trading into bear markets — single highest-alpha rule |
| Buy on any catalyst | Buy on pullback after breakout | Better entry price, lower false-positive rate |
| No volume filter | 1.5x breakout volume required | Filters out low-conviction moves |
| 20% of equity sizing | 1.5% risk sizing | Consistent risk per trade regardless of position cost |
| No earnings rule | Never hold through earnings | Overnight gaps blow through stops |
| No time stop | 15-day time stop | Clears dead money, frees capital for better setups |
| 10% trailing stop | 12% trailing stop | Less whipsaw on volatile momentum names |
