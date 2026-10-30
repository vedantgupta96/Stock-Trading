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

---

## Week of OCT 19 – OCT 23

*Sixth consecutive flat / 100% cash week since the 9/2 PLTR trailing-stop exit — equity has printed the identical $99,147.92 every session for ~7 weeks. This week ran **no pre-market routine at all** (zero research-log entries 10/19–10/23); only two EOD-only snapshots were committed (10/19, 10/22), so **no fresh deterministic regime read was placed the entire week** — the regime has been carried on the stale 10/15 OFF read (SPY 769.65 < 20d SMA 770.65, −0.13%) for five-plus sessions.*

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,147.92 *(first snapshot this week, 10/19 EOD; unchanged since the 9/2 exit — no committed 10/19 open snapshot)* |
| Ending equity (Fri close) | $99,147.92 *(live Alpaca, balance_asof 10/22; portfolio_value $99,147.92, 100% cash)* |
| Week return | $0.00 (0.00%) |
| S&P 500 week return | +0.44% *(SPY $767.23 open 10/19 → $770.59 close 10/23, Gemini)* |
| Trades taken | 0 (0 new buys, 0 closed) |
| Win / Loss / Open | W:0 L:0 O:0 |
| Win rate (closed only) | N/A (no closed trades) |
| Best trade | N/A (no trades) |
| Worst trade | N/A (no trades) |
| Profit factor | N/A (no closed trades) |
| Regime filter days | 0 fresh reads placed this week — both committed runs (10/19, 10/22) were EOD-only. Last deterministic read OFF (10/15 pre-market, −0.13%), carried stale Mon–Fri. **Gemini's Fri 10/23 read shows SPY $770.59 > 20d SMA $766.61 (+0.52%) → likely flipped back ON, but no `buy_gate.sh` confirmation was committed this week.** |

### Closed Trades This Week
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| — | — | — | — | No trades closed this week (last close was PLTR on 9/2, realized −$111.77). |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| — | — | — | — | — |

*100% cash — zero open positions, zero open orders ($99,147.92).*

### What Worked
- **Capital fully preserved — zero drawdown, zero rule violations.** Equity flat (0.00%) with no losing trade, no stop breach, no gate violation; the account carries a clean risk record for a sixth straight week.
- **No forced chase into a two-sided, event-heavy tape.** The week sat inside Q3 earnings season (NFLX/ISRG 10/20, META/TSLA/IBM 10/21, MSFT/GOOGL 10/27–28) and a post-hot-CPI/PPI "higher-for-longer" Fed backdrop with the regime last-read OFF — exactly the conditions the discipline is built to sit out. Nothing was forced.
- **Flat book meant no sell-side exposure.** With 0 positions there were no stops to maintain, no earnings exits, no time-stop clocks — the account needed no defense and took none unnecessarily.

### What Didn't Work
- **No pre-market routine ran all week — the regime read went stale.** Zero research-log entries 10/19–10/23; the deterministic `buy_gate.sh` regime read has not been refreshed since 10/15 (OFF, −0.13%). Meanwhile Gemini's Friday read shows SPY back **above** its 20-day SMA (+0.52%), i.e. the regime has very likely flipped OFF→ON and we never confirmed it. Sitting in cash under a five-session-stale OFF read is a process failure, not a disciplined decision — the regime filter only works if it is actually read each session.
- **Lagged a (modestly) up market again — the recurring cost, now six weeks running.** S&P +0.44% while we sat 100% cash the entire week; the opportunity-cost pattern flagged every review since July persists. The miss is smaller this week (a +0.44% market), but the structural cause (no active screening + stale regime) is the same.
- **Cadence gaps are the worst they have been.** Only two EOD snapshots committed (10/19, 10/22); 10/20, 10/21, and 10/23 (today, pre-review) have no snapshot, and **no** session this week ran the pre-market/research step. Equity was unchanged across every gap, but the audit trail and — more importantly — the live regime signal both have holes.

### Key Lessons
- **A stale regime read is a silent failure mode.** The single highest-priority rule (S&P vs its 20-day SMA) is only protective if refreshed every session. Running EOD-only snapshots for a week left the book governed by a five-day-old OFF read while the market quietly reclaimed its 20-day SMA. The fix is operational, not strategic: the pre-market routine must run (or the regime must be explicitly re-read) before relying on cash-is-correct-by-rule as the justification for inaction.
- **"Cash is correct" requires a current read to be true.** For five weeks the cash posture was genuinely earned (the full gate found nothing on fresh reads). This week it was *assumed* from a stale OFF read, not earned — a meaningfully weaker basis. Distinguish "screened today, nothing qualified" from "didn't screen today."

### Adjustments for Next Week
- **No rule changes.** No rule has proven out for 2+ consecutive weeks or failed badly with data to justify a rulebook edit; the gate continues to do its job (preserving capital, rejecting low-conviction breakouts), so `TRADING-STRATEGY.md` is left unchanged. The six-week cash stretch is an idea-supply/market-quality + process outcome, not a rule failure.
- **Process focus (the binding issue):** (1) run the **pre-market routine every session** and place a fresh deterministic `buy_gate.sh` regime read — do not let it go stale; (2) the regime has **likely flipped OFF→ON** (Gemini 10/23: SPY $770.59 > 20d SMA $766.61) — the very first task Monday is to confirm this with `buy_gate.sh`, and if ON, run a full fresh gate screen rather than carrying the stale OFF posture; (3) commit an EOD snapshot **every** session to close the audit-trail gaps.
- **Event-risk map:** FOMC 10/27–28 (hold widely expected) is next week's binary; mega-cap tech earnings cluster 10/27–28 (MSFT/GOOGL and peers), which both narrows the clean (earnings >10 trading days out) candidate set and adds overnight-gap risk. Do not force an entry into the FOMC print.
- **Watchlist:** re-screen the AI/semi leaders (NVDA/AMD) and any energy names for a *fresh* 3-month high on ≥1.5× 20-day volume with an orderly 3–8% pullback — but only after a fresh regime read confirms ON. Force nothing.

### Grade: C-

---

## Week of OCT 26 – OCT 30

*Seventh consecutive flat / 100% cash week since the 9/2 PLTR trailing-stop exit — equity has printed the identical $99,147.92 every session for ~9 weeks. **This was a DOWN week** (S&P ≈ −0.57%, incl. a sharp −1.8% Friday selloff), so for the first time in the cash stretch the rule-mandated flat posture **outperformed the tape** with zero drawdown. The regime was OFF all week (continuing the 10/15 ON→OFF flip); a fresh pre-market read ran Wed 10/28 (first in over a week) and today's review read confirms OFF and widening.*

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,147.92 *(no committed 10/26 snapshot; first this week 10/27 EOD; unchanged since the 9/2 exit)* |
| Ending equity (Fri close) | $99,147.92 *(live Alpaca, balance_asof 10/29; 100% cash — nothing to mark through Friday's selloff)* |
| Week return | $0.00 (0.00%) |
| S&P 500 week return | ≈ **−0.57%** *(S&P ~7,623 prior-Fri close → 7,580.07 close Fri 10/30, incl. a −1.8% Friday; SPY ≈ −0.86%, $762.25 → $755.72 — Gemini + Alpaca)* |
| Trades taken | 0 (0 new buys, 0 closed) |
| Win / Loss / Open | W:0 L:0 O:0 |
| Win rate (closed only) | N/A (no closed trades) |
| Best trade | N/A (no trades) |
| Worst trade | N/A (no trades) |
| Profit factor | N/A (no closed trades) |
| Regime filter days | **0 ON / 5 OFF.** 2 fresh deterministic `buy_gate.sh` reads this week (Wed 10/28 pre-market: SPY 769.7 < SMA20 770.41, −0.09%; Fri 10/30 review: SPY 755.72 < SMA20 770.48, −1.92%), both OFF; 10/26/27/29 carried-OFF (EOD-only / no snapshot). OFF since the 10/15 flip. |

### Closed Trades This Week
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| — | — | — | — | No trades closed this week (last close was PLTR on 9/2, realized −$111.77). |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| — | — | — | — | — |

*100% cash — zero open positions, zero open orders ($99,147.92).*

### What Worked
- **For the first time in the cash stretch, flat BEAT the tape.** The regime was OFF all week and the S&P fell ≈−0.57% with a −1.8% Friday selloff that drove SPY further below its 20-day line (−1.92%). Sitting 100% cash under a rule-mandated OFF regime wasn't merely defensible this week — it **outperformed with zero drawdown**. The single highest-priority rule did exactly its job.
- **Fresh regime reads were placed (vs zero last week).** Wed 10/28 was the first pre-market routine in over a week, and today's review read confirms OFF and widening — directly addressing last week's stale-regime failure. This week's cash posture was *earned*, not assumed.
- **No forced entry into a two-sided event tape.** FOMC (10/28 hold at 3.75–4.00%, "higher-for-longer"), GDP 3Q advance (10/29), ECI (10/30) and a mega-cap earnings cluster (MSFT/GOOGL/META ~10/28–29) all passed with no chase — exactly the binaries the discipline exists to sit out. Friday's −1.8% selloff validated the caution.
- **Flat book meant no sell-side exposure.** With 0 positions there were no stops to maintain, no earnings exits, no time-stop clocks — the account needed no defense and took none unnecessarily.

### What Didn't Work
- **No Monday 10/26 snapshot, and three EOD-only sessions.** The pre-market routine ran only once (10/28); 10/26 committed nothing at all, and 10/27/29 were EOD-only. Cadence improved over last week (2 fresh reads vs 0), but the audit trail still has a Monday hole and the deterministic regime read went 1–2 sessions stale mid-week.
- **Seventh consecutive flat week.** Equity has printed the identical $99,147.92 every session since the 9/2 PLTR exit (~9 weeks). This week the cash posture was correct and rewarded, but the structural reality is unchanged: no name has cleared the full 11-check gate in two months. (This week it is fully rule-justified — regime OFF forbids entries outright.)
- **Idea flow remains absent.** Even SPY itself fails the breakout check (c9: last-5 high 773.33 below the prior 781.59) and now sits −1.92% under its 20-day line. With the regime OFF, STEP 4 generates no ideas by design — nothing to act on even if conviction appeared.

### Key Lessons
- **Cash is only "correct" when the regime is actually read — and this week it was.** The distinction last week's review drew ("screened today, nothing qualified" vs "didn't screen today") held up: 2 fresh OFF reads make this week's cash defensible in a way last week's five-day-stale OFF carry was not. Keep placing a fresh deterministic read every session, not just EOD snapshots.
- **A down week is where the regime filter repays six weeks of lag.** The recurring opportunity-cost complaint (sitting out mild up-markets for six weeks) is the premium paid for weeks exactly like this one: regime OFF, market −0.57% with a −1.8% Friday, book flat and untouched. The filter's edge is asymmetric — it shows up in the down tapes, not the grind-higher ones.

### Adjustments for Next Week
- **No rule changes.** No rule has proven out for 2+ consecutive weeks or failed badly with data to justify a rulebook edit; the regime filter did precisely its job (kept us out of a down week), so `TRADING-STRATEGY.md` is left unchanged.
- **Process focus:** (1) run the **pre-market routine every session** and place a fresh deterministic `buy_gate.sh` regime read — close the Monday gap; (2) commit an EOD snapshot **every** session; (3) the regime is OFF and **widening** (−1.92%), so cash remains correct by rule — do not anticipate an ON flip, let the next fresh read govern any entry.
- **Event-risk map:** Jobs report Fri 11/6 and CPI 11/10 are the next binaries; Q3 earnings season continues to narrow the clean (earnings >10 trading days out) candidate set. Force nothing.
- **Watchlist:** re-screen the AI/semi leaders (NVDA/AMD) and any emerging names for a *fresh* 3-month high on ≥1.5× 20-day volume with an orderly 3–8% pullback — but only after a fresh read confirms the regime back ON. Nothing qualifies while OFF.

### Grade: B−
*Cash was both rule-mandated and vindicated — it outperformed a down tape with zero drawdown, and 2 fresh regime reads addressed last week's stale-read failure. Held back from higher by the missing Monday snapshot and three EOD-only sessions.*
