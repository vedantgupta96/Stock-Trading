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

## Week of JUL 13 – JUL 17

*No weekly review was committed for the prior week (JUL 06 – JUL 10) — that gap is noted but not reconstructed here. This entry covers Mon 7/13 – Fri 7/17. All Friday-close figures are the live Alpaca read on 7/17 (equity $99,603.36; account balance_asof 2026-07-16 for last_equity).*

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,681.72 *(7/09 close — account was 100% cash and static; no 7/10 or 7/13 snapshot committed)* |
| Ending equity (Fri close) | $99,603.36 |
| Week return | -$78.36 (-0.08%) |
| S&P 500 week return | ~-1.6% |
| Trades taken | 1 new buy (MS), 0 closed |
| Win / Loss / Open | W:0 L:0 O:1 |
| Win rate (closed only) | N/A (no closed trades) |
| Best trade | MS -3.20% (open, unrealized) |
| Worst trade | MS -3.20% (open, unrealized) |
| Profit factor | N/A (no closed trades) |
| Regime filter days | 4 ON / 1 OFF (ON Mon 7/13–Thu 7/16; flipped OFF Fri 7/17, SPY 743.28 < SMA20 744.97) |

### Closed Trades This Week
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| — | — | — | — | No positions were closed this week. |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| MS | $222.47 (7/16) | $215.35 | -$78.35 (-3.20%) | 12% trailing GTC ($195.65, hwm $222.33) |

### What Worked
- **Beat a down tape.** S&P fell ~-1.6% on the week while the book was essentially flat (-0.08%); the single new position (MS) is a modest -3.20% unrealized, well inside the -8% cut. Small relative outperformance in a week the market gave back ground.
- **The one new entry was fully stop-protected from the start.** MS got its mandatory 12% trailing-stop GTC placed the same session it was opened (7/16, ~1 min after the buy order per the order timestamps), stop $195.65 — the "every buy immediately gets a real GTC trailing stop" rule was honored.
- **New entry was taken while regime was ON.** MS was bought Thu 7/16 with SPY (750.87) above its 20-day SMA (744.86) — consistent with the highest-priority regime gate, even though that read was never written to the research log.

### What Didn't Work
- **The MS buy is completely undocumented.** There is NO committed research-log or trade-log entry for the 7/16 MS purchase — the research log still ends at 6/22, and the last committed EOD snapshot (7/09) shows 100% cash. The position and its trailing stop were reconstructed entirely from the live Alpaca account (cash $99,681.72 → $97,234.51 = $2,447.21 = the 11-sh × $222.47 cost basis). This is the **fourth** undocumented event on this account (after CVX ~6/12, the missed 6/29–7/01 snapshots, and the JPM ~7/01 exit).
- **No gate evidence on record.** Because nothing was logged, there is no documented catalyst, breakout/volume confirmation, pullback %, earnings-date check, or position-sizing record for MS. We cannot verify from the repo that the 11-check gate was actually run — only that regime happened to be ON and a stop was placed.
- **A whole week's worth of EOD/research routine commits are missing.** No snapshots were committed for 7/10, 7/13, 7/14, 7/15, 7/16, or 7/17, and no weekly review exists for the prior week (7/06–7/10). The git audit trail has large holes.

### Key Lessons
- **The documentation failure is now systemic, not incidental.** Four undocumented events across six weeks means the logging discipline — not the trading discipline — is the account's biggest live risk. An undocumented buy is only recoverable because Alpaca is the source of truth; the repo alone would show "100% cash" and miss an open position.
- **Regime just flipped OFF into the weekend.** SPY closed 7/17 below its 20-day SMA for the first time this week. Per the rulebook, no new buys until it reclaims the SMA — but MS is held (don't sell winners/holds on the filter alone; let stops and sell-side rules work).

### Adjustments for Next Week
- **No rule changes.** Nothing has proven out or failed for 2+ consecutive weeks with data that justifies a rulebook edit; `TRADING-STRATEGY.md` left unchanged.
- **Hold MS under standard sell-side rules:** -8% hard cut (~$204.67), 12% trailing GTC already live, watch for its next earnings date (verify it is >10 trading days out — this was never documented at entry and must be checked), and the 15-day time stop if it stays under +5%.
- **Regime is OFF — default to cash on new ideas** until SPY reclaims its 20-day SMA.
- **Process (repeat and escalate):** (1) log EVERY order in the research + trade log at fill time — the MS gap must not recur; (2) operator to confirm/annotate the MS entry (catalyst, gate inputs, earnings date) and the still-open CVX/JPM exit records; (3) commit an EOD snapshot every session so the repo state matches Alpaca.

### Grade: C-
