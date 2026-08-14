# Weekly Review

*Friday EOD recap. One entry per week. Append only.*

---

## Format

```
## Week of [MON DATE] – [FRI DATE]

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $X,XXX.XX |
| Ending equity (Fri close) | $X,XXX.XX |
| Week return | +/-$X.XX (X%) |
| S&P 500 week return | X% |
| Trades taken | N |
| Win / Loss / Open | W:N L:N O:N |
| Win rate (closed only) | X% |
| Best trade | SYM +X% |
| Worst trade | SYM -X% |
| Profit factor | X.X |

### Closed Trades
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| ...    | ...   | ...  | ... | ...    |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| ...    | ...   | ...     | ...         | ...  |

### What Worked
- ...

### What Didn't Work
- ...

### Key Lessons
- ...

### Adjustments for Next Week
- ...

### Grade: [A/B/C/D/F]
```

---

## Week of JUN 29 – JUL 03

*Markets closed Fri Jul 3 (Independence Day observed); the last session of the week was Thu Jul 2. All Friday-close figures are Thu Jul 2 close.*

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,689.21 *(6/26 close — no 6/29 snapshot committed)* |
| Ending equity (Fri close) | $99,681.72 *(Thu 7/2 close)* |
| Week return | -$7.49 (-0.01%) |
| S&P 500 week return | +1.76% |
| Trades taken | 1 closed (JPM), 0 new buys |
| Win / Loss / Open | W:0 L:0 O:0 (1 scratch/breakeven) |
| Win rate (closed only) | N/A (1 breakeven scratch) |
| Best trade | JPM ~+0.00% |
| Worst trade | JPM ~+0.00% |
| Profit factor | N/A (no losers) |
| Regime filter days | 3 ON / 1 OFF (6/29 OFF; 6/30, 7/1, 7/2 ON) |

### Closed Trades
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| JPM | $327.17 (6/22) | ~$327.17 (~7/1) | ~+$0.01 / ~0.00% | Discretionary/manual close, reconstructed from cash — UNDOCUMENTED (no committed trade-log entry). Above the $302.23 trailing stop, so not a stop fill; likely a pre-emptive close well ahead of the binding 7/13 earnings exit. Operator confirmation still pending. |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| — | — | — | — | — |

*100% cash — zero open positions, zero open orders.*

### What Worked
- **Capital fully preserved.** Equity essentially flat (-0.01%) with zero drawdown; no losing trade, no stop breach, no rule violation on new entries.
- **Earnings discipline intact.** JPM was exited flat rather than carried into its 7/14 report — the binding "never hold through earnings" rule was honored (if early), avoiding overnight-gap risk.
- **The gate kept us out of low-conviction chases.** The prior screen (CAT, DE, JPM re-test) all failed the 1.5x-volume check; none were forced.

### What Didn't Work
- **We badly lagged an up market.** S&P +1.76% while we sat 100% cash for essentially the whole week — a real opportunity cost. Regime was ON for 3 of 4 sessions, yet no new qualifying setup was hunted or taken.
- **Third undocumented exit on this account.** JPM's close (this week) joins CVX (~6/12) and prior missed snapshots — all reconstructed after the fact from cash balances, none logged at the time. This is a process/audit-trail failure, not a strategy one.
- **Thin idea flow.** Only one gate-qualifying name (JPM) has appeared in weeks, and it produced a breakeven scratch — weak follow-through on the single setup we did take.

### Key Lessons
- **Log every fill in real time.** Reconstructing exits from cash deltas is unreliable and erodes the audit trail; the trade/research log must be written at the moment an order is placed, not backfilled.
- **Regime-ON weeks demand active screening.** Being flat during a +1.76% week is a cost, not neutrality. When the regime filter is ON, run a fresh gate screen every session and pursue disciplined pullback-on-volume setups intraday — patience is the edge, but so is not missing every clean setup.

### Adjustments for Next Week
- **No rule changes.** Nothing this week has proven out or failed for 2+ consecutive weeks with data to justify a rulebook edit; `TRADING-STRATEGY.md` left unchanged.
- **Process focus:** (1) log each order at fill time; (2) run a fresh pre-market + midday gate screen every regime-ON session; (3) operator to confirm the JPM (and prior CVX) exit records.

### Grade: C

---

## Week of AUG 10 – AUG 14

*Regime filter ON all five sessions. One new entry (PLTR, 8/13) — the first name in weeks to clear both the 11-check hard gate and the 3–8% pullback entry band. No closes this week.*

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,384.82 *(= Fri 8/07 close / Mon 8/10 open, per the 8/10 snapshot's last_equity; the 8/10 EOD close was $99,417.31)* |
| Ending equity (Fri close) | $99,280.63 *(live Alpaca read 8/14; the 8/14 EOD snapshot logged $99,282.43)* |
| Week return | -$104.19 (-0.10%) |
| S&P 500 week return | +0.36% *(closed 7785.76; third consecutive weekly gain, record high Thu 8/13)* |
| Phase P&L (vs $100k base) | -$719.37 (-0.72%) |
| Trades taken | 1 new buy (PLTR); 0 closed |
| Win / Loss / Open | W:0 L:0 O:1 (PLTR open) |
| Win rate (closed only) | N/A (no closed trades) |
| Best trade | N/A (no realized trades) |
| Worst trade | N/A (no realized trades) |
| Profit factor | N/A (no closed trades) |
| Regime filter days | 5 ON / 0 OFF (fresh ON reads 8/10, 8/12, 8/13, 8/14; 8/11 no committed read, regime carried ON) |

### Closed Trades This Week
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| — | — | — | — | No positions closed this week. |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| AMZN | $276.95 (9 sh, ~8/04) | $262.74 | -$127.90 (-5.13%) | 12% trailing GTC $248.85 (id 26477093) |
| PLTR | $173.70 (14 sh, 8/13) | $173.81 | +$1.49 (+0.06%) | 12% trailing GTC $158.54 (id c89fba0d) |

*2 open positions (≤5). Sectors: Consumer Discretionary (AMZN) + Technology (PLTR) — no crowding. Both fully stop-protected; ~$94,483 cash.*

### What Worked
- **Textbook disciplined entry on PLTR.** The first name in weeks to clear *both* the 11-check hard gate *and* the 3–8% entry-timing band — a 4.7% pullback on declining, below-average volume holding the 8/07 breakout shelf after a ~+30% earnings gap. Sized at the risk cap (8% stop risk ≈ $192 < $200), executed mechanically at midday only after a benign 8:30 ET PPI/claims print, and immediately protected with a live 12% trailing-stop GTC. Fully documented in the trade and research logs — the cleanest execution in weeks.
- **Capital preserved through a binary-macro week.** Equity essentially flat (-0.10%) with a tiny drawdown, no rule breaches, no stop breaches. The book held through CPI (8/12), PPI (8/13), and Retail Sales (8/14) without a thesis break on either name.
- **The gate kept us out of low-conviction chases.** Multiple leaders were screened and correctly rejected — MRK (breakout-on-volume but pinned to its high, 0.1% pullback), NVDA/GOOGL/AAPL/AVGO (real pullbacks but stale breakouts or thin volume). None were forced.
- **Every position stop-protected and correctly sized.** Both trailing stops verified live in the orders feed all week; two positions, two sectors, no crowding.

### What Didn't Work
- **Slight lag vs a modestly up market.** S&P +0.36% while we finished -0.10% — a small opportunity cost, driven mostly by AMZN's steady drift lower.
- **AMZN is dead-money drift.** Entered ~8/04, it bled from -3.40% (8/12) to -5.13% at week end, sits at a <+5% gain, and its ~8/25 15-day time stop is now close. It was the week's main drag.
- **Thin qualifying idea flow persists.** Only 1 of 3 allowed weekly slots was used despite the regime being ON all week; most leaders were pinned to their highs with no valid pullback to enter on.
- **Recurring documentation gap on AMZN.** AMZN remains an undocumented original entry (same pattern flagged for CVX 6/12, JPM ~7/01, MS/UNH 7/10–7/20) — stop-protected, but no committed buy record; operator confirmation of its original fill/date/catalyst is still pending.

### Key Lessons
- **The pullback wait is the edge.** PLTR only cleared once it offered a genuine 3–8% pullback on drying volume — not when it first broke out. Waiting for that entry (and not forcing the other two weekly slots just because they were open) is exactly what the strategy is built to do.
- **Enforce AMZN's time stop mechanically (~8/25).** A <+5%-gain drifter is precisely what the 15-trading-day time stop exists to clear; if AMZN hasn't moved by the deadline next week, cut it without hoping.
- **The undocumented-entry pattern is now multi-name.** Real-time logging of every fill remains the standing process fix — reconstructing from cash balances after the fact erodes the audit trail.

### Adjustments for Next Week
- **No rule changes.** Nothing this week has proven out or failed for 2+ consecutive weeks with data to justify a rulebook edit; `TRADING-STRATEGY.md` left unchanged.
- **Focus:** (1) enforce AMZN's ~8/25 time stop if it's still at a <+5% gain; (2) keep hunting valid 3–8% pullback entries while the regime is ON (2 of 3 weekly slots still open); (3) operator to confirm AMZN's original fill/date/catalyst.

### Grade: B
