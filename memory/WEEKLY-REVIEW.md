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

## Week of AUG 24 – AUG 28

*Book ran PLTR-only + cash for most of the week after Monday's AUG 24 AMZN time-stop exit. Zero new buys — a fourth-straight largely-cash week into a binary macro stretch (Core PCE + Q2 GDP + NVDA on Wed 8/26, Jackson Hole Fed Chair keynote Fri 8/28).*

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,329.47 *(Fri 8/21 close = Mon 8/24 open; Alpaca last_equity, balance_asof 8/21)* |
| Ending equity (Fri close) | $99,428.83 *(live Alpaca account call; 8/28 EOD close snapshot $99,432.19)* |
| Week return | +$99.36 (+0.10%) |
| S&P 500 week return | +0.49% |
| Trades taken | 0 new buys, 1 closed (AMZN time-stop exit) |
| Win / Loss / Open | W:0 L:1 O:1 |
| Win rate (closed only) | 0% (0/1) |
| Best trade | N/A realized (no winning close) — PLTR best *open* +6.95% |
| Worst trade | AMZN -6.58% |
| Profit factor | 0.00 (no winning closes) |
| Regime filter days | 5 ON / 0 OFF (marginal all week: +0.44% on 8/24, +0.41% on 8/28; SPY held above its 20d SMA every session) |

### Closed Trades This Week
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| AMZN | $276.95 (~8/04) | ~$258.72 (8/24 open fill) | ~-$164 / -6.58% | 15-trading-day time stop — 16 sessions held at a <+5% gain (dead money). Due Fri 8/21, resolved Mon 8/24 (no 8/21 pre-market ran). Cancelled the 12% trailing GTC, then market-sold 9 sh at the open. Undocumented original entry (operator confirmation still pending). |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| PLTR | $173.70 | $185.78 | +$169.07 (+6.95%) | 12% trailing GTC ($165.77, hwm $188.37, id c89fba0d, exp 11/11) |

*1 open position (≤5). Sector: Technology only — no crowding. Cash $96,827.91.*

### What Worked
- **Time-stop discipline executed cleanly.** AMZN — dead money for 16 sessions at a loss — was cut mechanically on 8/24 per the 15-day time stop, not "hoped," freeing capital and the Consumer-Discretionary sector slot. Discipline held over the constructive same-day news (Zoox SF robotaxi launch, Citizens $315 PT).
- **PLTR carried the book.** The one documented, correctly-sized position kept working (+2.79% → +6.95% across the week, printing fresh highs), and its 12% trailing stop ratcheted up ($160.55 → $165.77), locking in a rising floor. That gain more than offset the realized AMZN loss → a small green week.
- **The gate kept us out of a binary event week.** No name offered a valid gate-clearing 3–8% pullback into the Wed 8/26 cluster (PCE + GDP + NVDA) and the Fri 8/28 Jackson Hole keynote, so cash stayed parked instead of forcing a low-quality entry into two-sided event risk.
- **Risk stayed contained.** Equity never left a tight ~$99.2k–99.4k band; no -8% cut, no stop breach, no rule violation on any new entry.

### What Didn't Work
- **Lagged the tape again.** S&P +0.49% vs our +0.10% — roughly a fourth consecutive week largely in cash while the market grinds higher; the persistent "no valid pullback" idea drought continues to cost relative performance.
- **AMZN was a realized loser and an audit-trail failure.** It was an undocumented original entry (the recurring CVX / JPM / MS / UNH pattern) that ended as a -6.58% time-stop loss; its original fill price/date/catalyst were never logged and remain unconfirmed by the operator.
- **The 8/21 time stop was missed.** AMZN's 15-day stop came due Fri 8/21, but no pre-market ran that day, so the exit slipped to Mon 8/24 (day 16) — a small process gap that let a losing position drift ~one more session.
- **Thin idea flow persists.** MRK / JPM / PSX have sat on the watchlist for weeks without ever offering a valid pullback; only PLTR (8/13) has been a live, documented setup in that stretch.

### Key Lessons
- **The time stop earns its keep even when the news is good.** AMZN closed on constructive headlines, but 16 sessions of <+5% dead money is exactly what the rule exists for — mechanical beats narrative.
- **One clean, documented, well-sized winner can carry an otherwise-flat week.** PLTR alone turned a realized-loss week green; position quality and a ratcheting trailing stop matter more than trade count — 0 new buys was still a positive week.
- **Don't skip a session while a position is inside its time-stop window.** The missed 8/21 pre-market let AMZN slip to day 16; the 8/24 catch-up worked but shouldn't have been necessary.

### Adjustments for Next Week
- **No rule changes.** Nothing has proven out or failed for 2+ consecutive weeks with data to justify a rulebook edit; `TRADING-STRATEGY.md` left unchanged.
- **Process focus:** (1) operator to confirm the AMZN (and prior CVX / JPM / MS / UNH) undocumented entries — the audit-trail gap is now four-plus instances; (2) don't skip any pre-market session while a position sits inside its 15-day time-stop window; (3) with Jackson Hole done and the 9/4 jobs report ahead, run a fresh full-gate screen each regime-ON session for a valid 3–8% pullback in MRK / JPM / PSX; (4) watch PLTR for +15% to tighten its trailing stop to 7%.

### Grade: B-
