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

## Week of SEP 28 – OCT 02

*S&P figure is an SPY proxy from Alpaca's IEX feed — `gemini.sh` declined the dated query ("future date, no real-time data"). Book has been 100% cash the entire week (and since the 9/2 PLTR trailing-stop exit, realized −$111.77); equity has printed $99,147.92 every session since.*

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,147.92 *(no 9/28 snapshot committed; last committed EOD 9/22 = same — equity unchanged since the 9/2 PLTR exit)* |
| Ending equity (Fri close) | $99,147.92 |
| Week return | $0.00 (0.00%) |
| S&P 500 week return | ≈ −0.22% (SPY Fri/Fri proxy: 771.35 → 769.65) / +0.16% (Mon-open→Fri-close) — roughly flat |
| Trades taken | 0 (0 closed, 0 new buys) |
| Win / Loss / Open | W:0 L:0 O:0 |
| Win rate (closed only) | N/A (no closed trades) |
| Best trade | N/A |
| Worst trade | N/A |
| Profit factor | N/A (no closed trades) |
| Regime filter days | 1 ON / 2 OFF documented (9/30 OFF −0.08%, 10/1 OFF −0.02%, 10/2 ON +0.80%); 9/28–9/29 no committed regime read |

### Closed Trades This Week
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| — | — | — | — | No trades closed this week |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| — | — | — | — | — |

*100% cash — zero open positions, zero open orders ($99,147.92).*

### What Worked
- **Capital fully preserved.** Equity exactly flat ($99,147.92), zero drawdown, zero rule violations, through a choppy, event-heavy week (Sep NFP missed badly +29k vs +90k on 10/2; post-9/16 "higher-for-longer" hike backdrop).
- **Regime discipline was correct, not costly.** The filter read sub-SMA (OFF) on 9/30 and 10/1 and no buys were forced below the line — and because the benchmark itself was roughly flat (≈ −0.2%), sitting in cash cost nothing this week (unlike the Jun 29–Jul 03 all-cash week that lagged a +1.76% tape).
- **Entry-timing discipline held on Friday's ON flip.** On the 10/2 OFF→ON flip, `$NVDA` was the only mechanical full-gate PASS but was correctly declined — price was ~0.1% off its high, not the required 3–8% pullback. Chasing a parabolic megacap semi into a live NFP-miss tape was refused, consistent with the prior CHPT/DG/AMD declines.

### What Didn't Work
- **Weekly-review cadence has lapsed badly.** This is the first committed weekly review since the week of Jun 29–Jul 03 — roughly 13 weeks (≈ all of Q3) with no Friday recap committed to `WEEKLY-REVIEW.md`, even though daily EOD snapshots kept running. The weekly-level audit trail and reflection cadence is broken.
- **Thin idea flow; nothing clears on quality.** Regime was ON only on Friday, and the single momentum pocket (AI/semis — NVDA/AVGO/AMD) is extended/parabolic with no orderly 3–8% pullbacks; every evaluated name failed the gate on breakout (c9), volume (c10), or entry-timing. A familiar pattern across recent weeks that leaves the book idle.
- **Missing pre-market / regime reads.** Several sessions committed no pre-market read (9/28, 9/29, and the 9/23–9/30 gap), and Friday's regime read had to be produced inline because the pre-market entry was missing — a recurring process gap.

### Key Lessons
- **Flat is only costless when the market is flat.** Being 100% cash cost nothing this week (benchmark ≈ −0.2%); the discipline is sound and the real differentiator is whether a clean gate-clearing setup actually existed (it didn't) — not the cash posture itself.
- **The weekly review must fire and commit every Friday.** A 13-week gap means no trend-level reflection and no rule-review cadence; the daily routine persisted but the weekly one silently did not.

### Adjustments for Next Week
- **No rule changes.** Nothing this week (or the idle Q3 stretch) has proven out or failed for 2+ consecutive weeks with data that would justify a rulebook edit; `TRADING-STRATEGY.md` left unchanged.
- **Process focus:** (1) ensure the weekly-review routine actually fires and commits every Friday going forward; (2) run a fresh pre-market regime + gate screen every session — no missing pre-markets; (3) with the regime back ON into earnings season, prioritize fresh breakout leaders offering an orderly 3–8% pullback outside the 10-trading-day earnings window — but force nothing.

### Grade: B
