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

## Week of MON 2026-06-22 – FRI 2026-06-26

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,681.72 |
| Ending equity (Fri close) | $99,692.03 |
| Week return | +$10.31 (+0.01%) |
| S&P 500 week return | -2.33% (SPY $746.75 6/18 close → $729.35 6/26 close; 6/19 Juneteenth holiday) |
| Trades taken | 1 (JPM buy) |
| Win / Loss / Open | W:0 L:0 O:1 |
| Win rate (closed only) | N/A (no closed trades) |
| Best trade | JPM +0.53% (open, unrealized) |
| Worst trade | JPM +0.53% (only trade) |
| Profit factor | N/A (no closed trades) |
| Regime filter days | 0 ON / 5 OFF on a closing-price basis (see note) |

### Closed Trades This Week
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| — | — | — | — | None — no positions were closed this week |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| JPM (6 sh, Financials) | $327.17 | $328.89 | +$10.32 (+0.53%) | 12% trailing GTC $302.23 (hwm $343.45) |

### What Worked
- **Capital preservation beat a falling tape.** The portfolio finished essentially flat (+0.01%) while the S&P 500 fell -2.33% on the week — a ~+2.34% relative outperformance earned almost entirely by sitting in cash through a down week rather than by stock selection.
- **Discipline held: only one trade, and it cleared the full 11-check gate.** JPM was the single name to pass the deterministic buy_gate on 6/22 (genuine 3-month-high breakout on >1.5x volume, ~3% pullback inside the 3–8% band, earnings safely ~14 trading days out, documented intact catalyst). Three other screened names (CAT, FCX, XOM, NEM) were correctly rejected on volume/breakout failures.
- **Stop protection was placed immediately and is intact.** JPM's 12% trailing-stop GTC ($302.23, hwm $343.45) went on the same session as the buy — no mental stops, no naked positions.
- **Position sizing stayed conservative.** JPM filled 6/7 shares (~$1,963 notional) in thin morning liquidity and the remainder was canceled rather than chased, keeping risk under the $200 cap.

### What Didn't Work
- **The JPM entry rested on a razor-thin, intraday-only regime read.** The 6/22 buy_gate passed check #1 on a live SPY print of 749.08 vs SMA20 747.38 (+1.70, ON). But on a closing-price basis the S&P was *below* its 20-day SMA on all five sessions this week, including Monday 6/22 (close 744.27 vs SMA20 747.14). The regime filter is the highest-priority rule; entering on an intraday tick the daily close did not confirm is a marginal call that should be flagged.
- **JPM gave back its early gain and faded with the tape.** Bought at $327.17, it printed a 3-month high of ~$343 (hwm) but closed the week at $328.89, down -1.86% on Friday alone. The position is still green but momentum has stalled as the broad market rolled over.
- **EOD snapshot discipline was patchy.** No EOD snapshots were committed across 6/22–6/25 (only the JPM trade entry), so day-over-day P&L this week had to be reconstructed against the 6/15 snapshot rather than a clean daily chain.

### Key Lessons
- **Confirm regime on the daily close, not just the intraday gate tick.** A marginal intraday ON read (+1.70 above SMA20) that the close immediately contradicts is exactly the kind of whipsaw the filter exists to avoid. When the gate's regime check is within ~0.5% of the SMA, treat it as a coin-flip and demand the prior close also be above the line before initiating.
- **Cash is a position, and it won this week.** Outperforming the index by ~2.3% with one small trade confirms the strategy's core thesis: in a down/choppy tape, not trading is the alpha.
- **Per the rulebook, regime-OFF does NOT force closing JPM.** "Do not close existing winning positions just because of the filter — let stops do that." JPM stays under standard sell-side rules; no action is forced by the regime flip.

### Adjustments for Next Week
- **No rule changes.** Only one full week of activity under the current ruleset (and the marginal-regime observation is a single data point) — nothing has proved out or failed badly enough over 2+ weeks to justify editing TRADING-STRATEGY.md. Leaving it unchanged.
- **Watch the binding JPM earnings exit.** JPM reports Q2 before open on 2026-07-14; the position MUST be closed on/before **2026-07-13** (never hold through earnings). The 15-day time stop (~7/14) is secondary — the earnings exit binds first.
- **Focus area: tighten daily EOD snapshot discipline** so day-over-day P&L doesn't have to be reconstructed, and add the close-confirmation check to the regime read before any new entry.

### Grade: B
Capital was preserved and the book beat the S&P by ~2.3% through disciplined cash and a single fully-gated entry — solid process. Held back from an A by the marginal intraday-only regime read underpinning the JPM buy (close-basis regime was OFF all week) and patchy daily snapshot logging.
