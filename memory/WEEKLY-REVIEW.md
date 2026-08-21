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

## Week of AUG 17 – AUG 21

*Full trading week (Mon 8/17 – Fri 8/21). EOD snapshots committed for 8/17, 8/19, 8/20; no 8/18 or 8/21 pre-market/EOD entries committed (EOD-only cadence + gaps). Friday figures are the live Alpaca read at review time (8/21).*

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,282.43 *(Fri 8/14 close — no committed Mon 8/17-open snapshot; first committed EOD this week, 8/17, was $99,249.37)* |
| Ending equity (Fri close) | $99,331.13 *(live 8/21 read)* |
| Week return | +$48.70 (+0.05%) |
| S&P 500 week return | -0.84% *(SPX 7,745 → 7,680, Gemini)* |
| Relative to S&P 500 | **+0.89%** (outperformed a down tape) |
| Trades taken | 0 new buys, 0 closed |
| Win / Loss / Open | W:0 L:0 O:2 (AMZN, PLTR) |
| Win rate (closed only) | N/A (no closed trades) |
| Best trade | PLTR +3.43% (open, unrealized) |
| Worst trade | AMZN -6.39% (open, unrealized) |
| Profit factor | N/A (no closed trades) |
| Regime filter days | 5 ON / 0 OFF (fresh read 8/17 ON: SPY 776.30 > 20d SMA 756.15, +2.67%; no OFF signal all week) |

### Closed Trades This Week
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| — | — | — | — | No positions closed this week |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| AMZN | $276.95 (~8/04) | $259.25 | -$159.30 (-6.39%) | 12% trailing GTC ($248.85, hwm $282.78, id 26477093) |
| PLTR | $173.70 (8/13) | $179.66 | +$83.39 (+3.43%) | 12% trailing GTC ($160.55, hwm $182.44, id c89fba0d) |

*Book: AMZN + PLTR + cash ($94,482.64). 2 open positions ≤ 5; sectors Consumer Discretionary (AMZN) + Technology (PLTR), no crowding. Both trailing stops verified live in the orders feed.*

### What Worked
- **Beat the benchmark in a down week.** Equity +0.05% while the S&P fell -0.84% — a ~+0.89% relative gain, with zero drawdown of consequence and no rule breach on new entries. Capital preserved through a mildly risk-off, Jackson-Hole-anticipation tape.
- **PLTR earned its entry.** The 8/13 pullback-on-blowout-Q2 entry (documented, +93% y/y rev) finished the week +3.43% and ran to a fresh intraday high ($182.44 hwm), lifting its trailing stop to $160.55 — a clean, gate-compliant trade doing exactly what the setup promised.
- **The gate kept discipline intact.** MRK cleared the full 11-check hard gate again but stayed pinned to its high (0.1% pullback → entry-timing FAIL); JPM/PNC/PSX failed volume. No marginal entry was forced — patience over activity held.

### What Didn't Work
- **AMZN's time stop went unaddressed.** AMZN hit its 15-trading-day time stop (~8/21) at a <+5% gain — in fact a -6.39% loss — yet no 8/21 pre-market/midday scan ran to execute the close. It is fully stop-protected, but the "close dead/losing money at 15 days" rule should have fired and didn't. This is a live, overdue action item, not a strategy failure.
- **Still no new idea flow.** 0 new trades for a second straight regime-ON stretch; the same names (MRK pinned to highs, financials without volume) recycle through the screen. Consumer Discretionary led the week but was earnings-blocked (HD/TGT/LOW/WMT/DE), removing the one hot sector as a source.
- **AMZN remains an undocumented original entry.** The recurring audit-trail gap (CVX 6/12, JPM ~7/01, MS/UNH 7/10–7/20) still applies to AMZN — no committed research/trade-log buy record. Operator confirmation of fill price/date/catalyst is still pending.

### Key Lessons
- **A time stop needs a session that actually runs.** AMZN's 15-day clock came due on a day with no pre-market/midday routine committed, so the rule couldn't execute. Time-stop-eligible positions must be resolved at the *first* scan on/after the due date — a losing name drifting past its time stop is exactly the dead-money the rule exists to cut.
- **Relative outperformance in a down week is a real win, but it's mostly the book we already held.** The edge this week came from sitting in one healthy position (PLTR) and one stop-protected laggard (AMZN), not from any new decision. Sustained results still need gate-qualifying entries to appear — and being early to cut AMZN would have added, not subtracted.

### Adjustments for Next Week
- **No rule changes.** Nothing this week has proven out or failed for 2+ consecutive weeks with data to justify a rulebook edit; `TRADING-STRATEGY.md` left unchanged.
- **Action items:** (1) **Resolve AMZN's overdue time stop at Monday 8/25 pre-market** — close vs. keep-and-let-the-12%-stop-work, per the 15-day rule (it's a losing position past its clock). (2) Run a fresh pre-market regime read + full gate screen every session — Jackson Hole (Powell 8/22, symposium 8/27–29) is the near-term macro pivot; a hawkish tone could flip the rotation. (3) Operator to confirm AMZN's undocumented original entry record.

### Grade: B
