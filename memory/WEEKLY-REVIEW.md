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

## Week of JUL 20 – JUL 24

*Two positions carried the whole week (MS opened ~7/16 prior week, UNH opened ~7/20 this week); no positions closed. The market regime flipped OFF mid-week and closed the week OFF. No committed EOD snapshot exists for Mon 7/20, so the Monday-close equity ($99,546.49, Alpaca balance_asof 7/20) is used as the week-open baseline; the first committed EOD this week was 7/21 ($99,683.14).*

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon 7/20 close) | $99,546.49 *(Alpaca balance_asof 7/20; no committed 7/20 snapshot — first committed EOD this week was 7/21 at $99,683.14)* |
| Ending equity (Fri 7/24 close) | $99,579.13 |
| Week return | +$32.64 (+0.03%) *(vs first committed 7/21 EOD: -$104.01 / -0.10%)* |
| S&P 500 week return | -0.60% (7,475.69 on 7/17 → ~7,408–7,430 on 7/24) |
| Trades taken | 1 new buy (UNH ~7/20); 0 closed |
| Win / Loss / Open | W:0 L:0 O:2 |
| Win rate (closed only) | N/A (no closed trades) |
| Best trade | N/A closed — best open: UNH -0.69% |
| Worst trade | N/A closed — worst open: MS -3.59% |
| Profit factor | N/A (no closed trades) |
| Regime filter days | 2 ON / 3 OFF (7/20 OFF, 7/21 ON, 7/22 ON, 7/23 OFF, 7/24 OFF — deterministic SPY-vs-SMA20 read) |

### Closed Trades
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| — | — | — | — | No positions closed this week |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| MS (Financials) | $222.47 (~7/16) | $214.48 | -$87.92 (-3.59%) | 12% trailing GTC $195.65 (hwm $222.33) |
| UNH (Healthcare) | $423.22 (~7/20) | $420.29 | -$14.65 (-0.69%) | 12% trailing GTC $384.51 (hwm $436.95) |

*Portfolio: equity $99,579.13 | cash $95,118.40 | long market value $4,460.73 | 2 positions, 2 live trailing stops. Both positions well above the -8% cut and fully stop-protected.*

### What Worked
- **Slightly beat a down tape.** Equity was ~flat (+0.03% off the Monday baseline) while the S&P fell -0.60% on the week — a small relative outperformance driven by low net exposure (~$4.5k long / ~96% cash).
- **Stops all live and correct.** Both open positions carried real 12% trailing-stop GTC orders the entire week (MS $195.65, UNH $384.51), verified in the orders feed. No mental stops, no naked positions.
- **No panic selling on the regime flip.** Regime went OFF mid-week (SPY closed below its 20-day SMA 3 of 5 days), and the strategy's rule to let stops — not the filter — exit existing positions was honored. Neither MS nor UNH hit any sell-side trigger.
- **Risk stayed tiny.** Combined open risk is a fraction of the $200/trade cap; drawdown on the two names is contained (-3.59% / -0.69%), nowhere near the -8% cut.

### What Didn't Work
- **Fifth stretch of undocumented trading.** Neither MS (~7/16) nor UNH (~7/20) has a committed research/trade-log entry documenting the fill, catalyst, gate result, or earnings check. This is the same audit-trail failure flagged for CVX (6/12), JPM (~7/01), and the missed 7/10–7/20 snapshots — it is now chronic.
- **UNH was likely bought into a regime-OFF day.** UNH's trailing stop was created 7/20, and a deterministic SPY-vs-SMA20 read shows 7/20 closed OFF (SPY 742.15 < SMA20 744.74). Without a committed research entry, the intraday regime read at buy time can't be confirmed — but by the close, that entry sits against the highest-priority rule. (MS's ~7/16 entry, by contrast, was on a legitimate regime-ON day: SPY 750.87 > 744.86.)
- **UNH earnings exposure never verified in-log.** UnitedHealth typically reports mid-July; whether the ~7/20 entry cleared the "no earnings within 10 trading days" gate is undocumented and unconfirmed.
- **Both open names are underwater.** Neither entry is working yet; MS in particular is -3.59% and drifting, and the week's small outperformance is entirely a function of low exposure, not stock selection.

### Key Lessons
- **The documentation gap is now the dominant risk, not the market.** Five consecutive stretches of untracked entries/exits mean the account is being managed with no auditable record of why positions exist. Every fill must be logged to RESEARCH-LOG.md/TRADE-LOG.md at the moment the order is placed — including the buy-gate output and next-earnings date — or the position should not be opened.
- **A regime read must be captured and committed at every buy.** The UNH 7/20 entry shows why: after the fact, a deterministic read says the regime was OFF, and there is no record to reconcile against. The buy_gate regime check (SPY vs SMA20) must be logged verbatim with each entry.

### Adjustments for Next Week
- **No rule changes.** Nothing this week has proven out or failed for 2+ consecutive weeks with data to justify a rulebook edit; `TRADING-STRATEGY.md` left unchanged.
- **Regime is OFF going into next week** (7/24 close: SPY 738.90 < SMA20 746.15) — standing posture is cash. Place no new buys until a fresh pre-market confirms the S&P has reclaimed its 20-day SMA; manage MS and UNH purely via standard sell-side rules and their live trailing stops.
- **Process (operator action required):** (1) reconstruct and commit the MS (~7/16) and UNH (~7/20) entry records — fill, catalyst, gate result, and next-earnings date; (2) confirm UNH did not violate the earnings gate at entry; (3) confirm/annotate the UNH 7/20 regime status; (4) log every future fill in real time.

### Grade: C
