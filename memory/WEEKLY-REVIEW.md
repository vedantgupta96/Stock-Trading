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

## Week of SEP 14 – SEP 18

*Regime filter OFF for essentially the whole week; book 100% cash start to finish. FOMC raised the fed funds rate 25bp to 3.75–4.00% on Wed 9/16 — the first hike since 2023.*

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,147.92 *(first EOD snapshot this week, 9/14; account has printed the same equity every session since the 9/2 PLTR exit)* |
| Ending equity (Fri close) | $99,147.92 *(Alpaca 9/18, balance_asof 9/17)* |
| Week return | $0.00 (0.00%) |
| S&P 500 week return | ~-0.08% *(≈7,656.98 on 9/11 → ≈7,650.50 on 9/18)* |
| Trades taken | 0 (0 new buys, 0 closed) |
| Win / Loss / Open | W:0 L:0 O:0 |
| Win rate (closed only) | N/A (no closed trades) |
| Best trade | N/A |
| Worst trade | N/A |
| Profit factor | N/A (no closers) |
| Regime filter days | 1 ON / 4 OFF (9/14 carried a stale razor-thin ON read; fresh reads 9/15 and 9/17 both OFF; 9/16 & 9/18 EOD-only, OFF stale) |
| Phase P&L (vs $100k base) | -$852.08 (-0.85%) — unchanged all week |

### Closed Trades This Week
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| — | — | — | — | No trades closed — book flat/all-cash all week |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| — | — | — | — | — |

*100% cash — zero open positions, zero open orders.*

### What Worked
- **Cash was exactly the right posture.** The regime filter flipped ON→OFF on the 9/15 pre-market (SPY 760.755 < 20d SMA 766.06) and deepened on 9/17 (SPY 754.05 < 764.63, -1.38%). With the highest-priority rule OFF, sitting flat was the disciplined answer — and this time it cost nothing: the S&P finished the week ~-0.08%, so 100% cash marginally beat a flat-to-down tape.
- **Sidestepped a live binary event.** The FOMC decision + dot-plot (25bp hike to 3.75–4.00%, first since 2023) landed mid-week and triggered an initial sell-off. Forcing an entry into that event was avoided — exactly the event-risk trade the discipline exists to prevent.
- **Full rule compliance, clean audit trail.** No new buys forced, no stop breaches, no averaging down, no undocumented exits this week. EOD snapshots committed 9/14, 9/15, 9/16, 9/18; pre-market regime reads run and logged 9/15 and 9/17.
- **Quality gate held.** The only mechanically gate-passing names remained low-quality (CHPT a parabolic EV-charging squeeze; DG a no-pullback +5% gap-extension) and MRK stayed faded off the gate — none were chased.

### What Didn't Work
- **Still no idea flow.** Weeks of an all-cash book with no clean, orderly 3–8%-pullback breakout leader clearing the full 11-check gate on quality. Patience is the edge, but the pipeline of qualifying setups remains thin.
- **Phase P&L stuck at -0.85%.** The book has not generated a winning trade to work off the small phase drawdown (rooted in the 9/2 PLTR -$111.77 stop and prior); flat weeks preserve capital but don't repair it.
- **One missing EOD snapshot (9/17).** That session ran a pre-market regime read but committed no EOD snapshot; equity was unchanged across it, but the daily audit trail had a one-session gap.

### Key Lessons
- **A regime-OFF week is not a failure — being flat while the index is flat-to-down is a win, not opportunity cost.** Contrast with the JUN 29–JUL 03 week, where flat cost us a +1.76% up market; the same posture is correct or costly depending entirely on where the tape is relative to its 20-day SMA. The filter earned its keep this week.
- **Hawkish "higher-for-longer" backdrop keeps rate-sensitive growth/Technology leadership suppressed** — until the regime flips back ON above the 20-day SMA and a durable non-defensive leader offers an orderly pullback, forcing entries would be fighting both the filter and the tape.

### Adjustments for Next Week
- **No rule changes.** Nothing this week has proven out or failed for 2+ consecutive weeks with data to justify a rulebook edit; `TRADING-STRATEGY.md` left unchanged.
- **Focus:** (1) re-read the regime every pre-market — no new buys until SPY closes back above its 20-day SMA; (2) commit an EOD snapshot every session, including days that also run a pre-market; (3) keep a fresh gate screen ready so the first clean, orderly post-hike pullback in a real leader is not missed once the regime flips ON.

### Grade: A-
