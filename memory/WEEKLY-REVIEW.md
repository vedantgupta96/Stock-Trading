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

## Week of AUG 31 – SEP 04

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,432.19 *(8/28 close — no 8/31 snapshot committed; 8/31 pre-market read $99,419.45)* |
| Ending equity (Fri close) | $99,147.92 |
| Week return | -$284.27 (-0.29%) |
| S&P 500 week return | +0.1% |
| Trades taken | 1 closed (PLTR), 0 new buys |
| Win / Loss / Open | W:0 L:1 O:0 |
| Win rate (closed only) | 0% (0 of 1) |
| Best trade | N/A (no winners) |
| Worst trade | PLTR -4.60% |
| Profit factor | 0.00 (no winners) |
| Regime filter days | 0 ON / 5 OFF (flipped OFF Mon 8/31, stayed OFF all week) |

### Closed Trades
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| PLTR | $173.70 (8/13) | $165.72 (9/2) | -$111.77 / -4.60% | 12% trailing-stop GTC (id c89fba0d) triggered and filled automatically. PLTR fell ~5–7% intraday on Google DeepMind's entry into government/defense AI (direct competitive threat to Palantir's core niche) plus post-August profit-taking and ARK trimming; the 15-day time stop (~9/2–9/3, back <+5%) was also coming due. Ran to a +8.4% hwm ($188.37) on 8/27–8/28 before rolling over. |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| — | — | — | — | — |

*100% cash — zero open positions, zero open orders (flat since the 9/2 PLTR stop exit).*

### What Worked
- **The mechanical trailing stop did exactly its job.** PLTR's 12% trailing GTC filled automatically at $165.72 on 9/2 with no manual intervention — capping the loss at -4.60% ($111.77) after the name rolled over on a real competitive-threat headline. No mental stops, no hesitation, no "hoping."
- **The regime filter earned its keep.** It flipped OFF on Mon 8/31 (SPY 766.105 < 20d SMA 769.60) and stayed OFF all five sessions; zero new buys were forced into a sub-SMA, choppy tape ahead of the Aug jobs report. The S&P finished the week essentially flat (+0.1%) — cash was the correct posture, not a missed opportunity.
- **Capital preservation held.** A single small, controlled loss (-0.29% on the week). No averaging down, no -8% breach, no rule violations, no forced entries.
- **Watchlist discipline held.** MRK, the one name that had cleared checks 2–11 on 8/31, was correctly blocked by the regime filter (c1) and then faded on its own (c9/c10) within days — vindicating patience over chasing.

### What Didn't Work
- **The only realized trade of the week was a loss** (PLTR -4.60%, -$111.77; win rate 0%).
- **Gave back the entire unrealized gain.** PLTR was +7.09% at the 8/28 close and ran to a +8.4% high-water mark, yet the wide 12% trail meant it surrendered all of that and exited red. On a high-beta name that reverses fast, a 12% trail is a lot of give-back.
- **Idea flow stayed thin.** The one gate-near name (MRK) faded within days; the week's high-volume movers were junk micro-caps (LHAI, PPBT, VIVK) and post-earnings gaps (SNOW +23.6%) — no fresh qualifying breakout-on-volume setup emerged even setting the regime block aside.
- **Slightly lagged a flat market** (-0.29% vs S&P +0.1%), though the gap is small and driven entirely by the single PLTR reversal, not broad underperformance.

### Key Lessons
- **A 12% trail on an ultra-high-beta name (PLTR, ~159x earnings) can turn a +8% unrealized gain into a realized loss.** The stop-tighten ladder only engages at +15%/+20%; PLTR never reached +15%, so the trail never tightened from 12%. Worth watching whether the +15% first-tighten threshold is too slow for the fastest-reversing momentum names — but a single occurrence is not grounds to change a rule.
- **Cash during a regime-OFF, flat market is a win, not a cost.** Last week the lesson was that sitting in cash lagged a +1.76% market; this week the S&P was +0.1% and our one held position lost money — being flat would have beaten our actual result. The regime filter's value shows up precisely in weeks like this.

### Adjustments for Next Week
- **No rule changes.** PLTR's give-back is a single data point, not a pattern proven or failed over 2+ consecutive weeks, so `TRADING-STRATEGY.md` is left unchanged (per STEP 5). Flagged for observation only: whether the +15% first stop-tighten threshold is too high for ultra-high-beta names — revisit only if it recurs with data.
- **Re-read the regime at the Tue 9/9 pre-market** (Mon 9/7 is Labor Day, market closed). The Aug jobs report (9/4) may have moved the tape; buy only if the regime confirms back ON *and* a leader offers a valid 3–8% pullback clearing the full 11-check gate.
- **Expect volatility from a heavy data cluster** — PPI 9/10, CPI 9/11, FOMC 9/16 — plus a two-sided oil/geopolitics wildcard (WTI ~$91 on Strait-of-Hormuz strike risk). Do not force entries into it.
- **Watchlist reset.** MRK faded; no live candidate carries over. Rebuild from fresh post-jobs-report breakouts on volume.

### Grade: B-
*Negative week (-0.29%) and 0% win rate cap the grade, but the process was clean and disciplined: the mechanical stop fired on schedule, the regime filter was honored for all five OFF sessions, no trades were forced, no rules broken, and the single loss was a normal, well-managed outcome rather than an error. In a flat market, the discipline was the right call.*
