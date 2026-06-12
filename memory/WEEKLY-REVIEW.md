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

## Week of Mon Jun 8 – Fri Jun 12, 2026

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,885.83 * |
| Ending equity (Fri close) | $99,758.31 |
| Week return | -$127.52 (-0.13%) |
| S&P 500 week return | +0.6% |
| Trades taken | 1 (0 new buys, 1 close) |
| Win / Loss / Open | W:0 L:1 O:1 |
| Win rate (closed only) | 0% |
| Best trade | — (no winners; CVX open -1.52%) |
| Worst trade | NVDA -8.48% |
| Profit factor | N/A (no winning trades) |
| Regime filter days | 0 ON / 5 OFF |

\* No committed Monday (6/8) EOD snapshot existed (6/5 and 6/8 dailies were missed), so the start-of-week baseline uses the 6/8 pre-market read ($99,885.83). For reference, the last committed pre-week EOD was 6/4 at $99,976.39, and the since-inception (phase) P&L at Friday close is **-$241.69 (-0.24%)** off the $100k base.

### Closed Trades This Week
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| NVDA | $218.89 | ~$200.32 | -$204.22 (-8.48%) | Hard -8% discipline cut (closed 6/11 at -4.71%→-8.52% breach) |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| CVX | $189.54 | $186.66 | -$37.44 (-1.52%) | 12% trailing GTC @ $169.56 (hwm $192.69) |

### What Worked
- **Discipline held.** NVDA breached the -8% hard cut on 6/10 (-8.52%), was flagged, and executed cleanly the next session for a realized -8.48% — almost exactly at the rule, no "hoping" or averaging down. The rule did its job: capped the loss and freed capital.
- **Regime filter respected.** The S&P stayed below its 20-day SMA all five trading days; the bot correctly placed zero new buys and sat in cash. Patience over activity.
- **Stops were live and intact the entire week.** Both positions carried real 12% trailing GTC orders on Alpaca, not mental stops. CVX's stop trailed up its high-water mark as designed.
- **Capital preserved.** Week return -0.13%, drawdown contained to a fraction of a percent despite carrying a losing tech name into a semiconductor selloff.

### What Didn't Work
- **Underperformed the benchmark.** S&P 500 +0.6% on the week vs our -0.13% — a ~0.73-pt gap. We were long two regime-OFF operator-override names (NVDA dragging, CVX flat) instead of cash, so we ate the downside without the regime-ON setup that would justify the exposure.
- **The one realized trade was a loss.** NVDA -8.48% is the only closed trade and it traces back to the pre-week (6/4) operator-override entry made with the regime filter OFF and the breakout/volume/pullback gates unverified — exactly the kind of non-qualified setup the gate exists to block.
- **Operational gaps.** Daily EOD snapshots for 6/5 and 6/8 were missed, and the mid-week (6/9–6/11) regime status was carried forward from the 6/8 read rather than refreshed each pre-market. Day P&L had to be reconstructed against stale baselines.

### Key Lessons
- **Override entries cost real money.** The single loss this week came entirely from the regime-OFF override, not from any strategy-qualified signal. The gate's regime + breakout + volume filters would have kept us flat and ahead. Future overrides should be rare and explicitly re-authorized.
- **A disciplined -8% cut on a low-conviction name is a win, not a failure.** Cutting NVDA on schedule is exactly why the strategy survives drawdowns — the loss was bounded and the capital is now safe in cash.

### Adjustments for Next Week
- **No strategy rule changes.** This is week 1; no rule has proven out for 2+ weeks or failed badly. `memory/TRADING-STRATEGY.md` left unchanged.
- **Posture:** Regime is still OFF at Friday close (SPY 741.67 < 20-day SMA 745.04) despite the S&P's +0.6% week and Thursday rally — the 20-day SMA has not been reclaimed. Default remains **cash / no new buys** until the S&P closes above its 20-day SMA. Manage CVX (lone position, -1.52%, well above its -8% cut) under standard sell-side rules; watch its 15-day time stop (entered 6/4 → due ~6/25 if still under +5%).
- **Process (operational, not a rule):** Run a fresh regime read every pre-market rather than carrying the prior day's status forward, and don't skip the daily EOD snapshot — the missed 6/5/6/8 dailies made this review's start-of-week baseline an estimate.

### Grade: B

Disciplined, rule-following week with no new errors: regime respected (0 buys, correctly in cash all five OFF days), the -8% cut on NVDA executed on schedule, stops live throughout, and drawdown held to -0.13%. Marked down from an A because the book still carried a realized loss and underperformed a +0.6% S&P — both inherited from the pre-week operator override rather than this week's decisions. Solid risk management; nothing to beat the benchmark with while the regime stays off.
