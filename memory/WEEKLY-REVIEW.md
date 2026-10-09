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

## Week of OCT 05 – OCT 09

*First weekly review committed since the week of Jun 29 – Jul 03; the intervening weeks ran daily routines (logged in TRADE-LOG / RESEARCH-LOG) but no Friday recap was committed. Book has been flat / 100% cash since the 9/2 PLTR trailing-stop exit — equity has printed the identical $99,147.92 every session for ~5 weeks.*

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,147.92 *(first snapshot this week, 10/6; unchanged since the 9/2 exit — no committed 10/5 snapshot)* |
| Ending equity (Fri close) | $99,147.92 |
| Week return | $0.00 (0.00%) |
| S&P 500 week return | +1.14% *(7,722.72 on 10/2 → 7,810.76 on 10/9, Gemini)* |
| Trades taken | 0 (0 new buys, 0 closed) |
| Win / Loss / Open | W:0 L:0 O:0 |
| Win rate (closed only) | N/A (no closed trades) |
| Best trade | N/A (no trades) |
| Worst trade | N/A (no trades) |
| Profit factor | N/A (no closed trades) |
| Regime filter days | 5 ON / 0 OFF *(last-read ON carried from the 10/2 OFF→ON flip Mon–Thu; fresh read ON Fri 10/9, SPY 776.49 > 20d SMA 767.88, +1.11%)* |

### Closed Trades This Week
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| — | — | — | — | No trades closed this week (last close was PLTR on 9/2, realized -$111.77). |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| — | — | — | — | — |

*100% cash — zero open positions, zero open orders ($99,147.92).*

### What Worked
- **Capital fully preserved — zero drawdown, zero rule violations.** Equity flat (0.00%) with no losing trade, no stop breach, no gate violation; the account carries a clean risk record for a fifth straight week.
- **The volume gate did its job.** Regime was ON all week, yet every candidate worked on 10/9 (OKTA, META, DINO, PBF, NVDA, AMD) failed c10 (breakout volume ≥ 1.5× 20-day avg); even SPY itself failed c10. Low-conviction breakouts are exactly what that filter exists to reject — none were forced.
- **Entry-timing discipline held.** The AI/semi pullbacks (NVDA ~4.8%, AMD ~5.8%) finally landed in the 3–8% entry band this week, but without volume confirmation they stayed watchlist, not buys — no chasing extended, parabolic names at fresh highs.

### What Didn't Work
- **Lagged an up market again — the recurring cost.** S&P +1.14% while we sat 100% cash the entire week with the regime ON all five sessions; this is the same opportunity-cost pattern flagged in the Jul 2 review, now in its fifth consecutive flat week since the 9/2 exit.
- **Idea flow is persistently thin.** For ~5 weeks no name has cleared the full 11-check gate on judgment as well as mechanically; the failures rotate (entry-timing on parabolic leaders, c9 no-fresh-breakout, c10 volume) but the net result is an unbroken cash position through both OFF and ON regimes.
- **Cadence gaps persist.** Several sessions this week (10/5, 10/7, 10/8) committed no EOD snapshot, and multiple pre-market entries were "MISSING / run inline per market-open STEP 1." Equity was unchanged across the gaps, but the audit trail still has holes — the same process weakness noted in July.

### Key Lessons
- **Flat in an ON-regime up week is a real cost, not neutrality.** Five straight weeks of 100% cash while the S&P grinds higher is defensible only if the gate is genuinely finding nothing — and it is (c10 volume is the binding failure). The lesson is to keep screening every ON session and be ready to act the moment a fresh breakout prints on ≥1.5× volume, not to lower the bar.
- **Volume, not price level, is the current bottleneck.** Pullbacks are finally reaching the entry band, but conviction volume is absent. Watch NVDA/AMD specifically for a fresh high on ≥1.5× 20-day volume — that is the single trigger most likely to end the cash stretch cleanly.

### Adjustments for Next Week
- **No rule changes.** No rule has proven out for 2+ consecutive weeks or failed badly with data to justify a rulebook edit; the gate is working as designed (preserving capital, rejecting low-conviction breakouts), so `TRADING-STRATEGY.md` is left unchanged. The five-week cash stretch is an idea-supply/market-quality outcome, not a rule failure.
- **Event-risk map:** CPI Wed 10/14 and PPI Thu 10/15 are next week's binaries; bank earnings open the week (JPM/WFC/C/GS 10/13, BAC/MS 10/14), which narrows the clean (earnings >10 trading days out) candidate set. Do not force an entry into the CPI print.
- **Watchlist:** NVDA, AMD — in the 3–8% pullback band, awaiting a volume-confirmed fresh high. Keep running a fresh pre-market + midday gate screen every regime-ON session and commit an EOD snapshot every session to close the audit-trail gaps.

### Grade: C
