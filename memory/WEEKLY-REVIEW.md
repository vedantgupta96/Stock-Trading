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

## Week of SEP 21 – SEP 25

*Book was FLAT — 100% cash, 0 open positions, 0 open orders — every session this week (unchanged since the 9/2 PLTR trailing-stop exit). No trades placed, none closed. Friday-close figures are the Alpaca account read (equity $99,147.92, balance_asof 2026-09-24; the account has printed identical equity every session since the 9/2 exit).*

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,147.92 *(9/18 close; no 9/21 snapshot, equity unchanged all week)* |
| Ending equity (Fri close) | $99,147.92 |
| Week return | $0.00 (0.00%) |
| S&P 500 week return | +0.67% *(Gemini: 7,692.08 Mon open → 7,743.41 Fri close)* |
| Trades taken | 0 (0 new buys, 0 closed) |
| Win / Loss / Open | W:0 L:0 O:0 |
| Win rate (closed only) | N/A (no closed trades) |
| Best trade | N/A (no trades) |
| Worst trade | N/A (no trades) |
| Profit factor | N/A (no trades) |
| Regime filter days | 2 ON / 1 OFF on committed reads (9/21 OFF -0.35%; 9/24 ON +0.35%; 9/25 ON +0.26%) — 9/22 EOD-only carried stale OFF, 9/23 no committed read |

### Closed Trades
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| — | — | — | — | None. Book flat all week. |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| — | — | — | — | — |

*100% cash — $99,147.92, zero open positions, zero open orders.*

### What Worked
- **Regime discipline held.** SPY sat below its 20-day SMA Mon (9/21, -0.35%) and only completed its post-FOMC repair back above the line Thu 9/24 (+0.35%) → Fri 9/25 (+0.26%). For the sub-SMA half of the week the designed posture is cash, and that is exactly what the book was. No front-running of the razor-thin ON flip.
- **No forced chase once the regime flipped ON.** On both ON days the only mechanical full-gate PASS ($AMD) was extended right at its highs (1.5% then 0.3% off-high vs the 3–8% pullback band, parabolic +35.7% on the month) — a textbook no-pullback chase the entry-timing rule rejects. AKAM/AVGO failed c9 (no fresh breakout). The gate and entry-timing rule correctly kept us out.
- **Capital fully preserved.** Equity flat at $99,147.92, zero drawdown, no stop breach, no rule violation, PDT 0/3, new buys 0/3.
- **Regime flip was alerted.** The 9/24 OFF→ON flip triggered the required Discord alert per pre-market STEP 5.

### What Didn't Work
- **Modest opportunity cost.** S&P +0.67% while flat all week. Most of the lag came during regime-OFF/repairing sessions where cash is mandated, so the true "missed" window is only the two thin-margin ON days (9/24–25) — and neither offered a gate-clearing orderly pullback, so there was no disciplined entry to take. Cost is real but small and largely unavoidable under the rules.
- **Thin, low-quality idea flow.** Weeks of screening keep surfacing only parabolic no-pullback names (AMD this week; CHPT/DG/MRK prior). No fresh breakout leader has offered a clean 3–8% pullback on ≥1.5x volume — the setup the strategy is built to buy — for an extended stretch.
- **Logging gaps persist.** No committed EOD snapshot for 9/23 (and 9/22 was EOD-only carrying a stale regime read); equity was unchanged so nothing was lost, but the audit trail still has holes — the recurring process issue flagged in prior reviews.

### Key Lessons
- **A thin ON flip is not a buy signal.** The regime turning ON at +0.35%/+0.26% is permission to *evaluate*, not to enter. Quality (a real 3–8% pullback in a fresh breakout leader on volume) still governs, and it was absent — cash by quality, not just by regime, was correct.
- **Being flat in a +0.67% week is acceptable when the regime was OFF for the buyable part of it.** Unlike the Jun 29–Jul 3 week (regime ON 3/4 days, flat = a real miss), this week the regime only cleared the line late and thin, so flat is close to the right answer, not a lapse.

### Adjustments for Next Week
- **No rule changes.** Nothing this week has proven out or failed for 2+ consecutive weeks with data to justify a rulebook edit; `TRADING-STRATEGY.md` left unchanged.
- **Focus:** (1) with the regime now ON but thin (+0.26%) and month-end binaries looming (PCE 9/30, jobs 10/2), do not force a chase — wait for a genuine orderly pullback that clears all 11 checks on judgment; (2) close the EOD-logging gaps — commit a snapshot every session even when flat/unchanged; (3) stay ready to act fast if a fresh breakout leader finally offers a textbook pullback while the regime holds ON.

### Grade: B
