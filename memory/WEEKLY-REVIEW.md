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

## Week of NOV 09 – NOV 13

*Ninth consecutive flat / 100% cash week since the 9/2 PLTR trailing-stop exit — equity has printed the identical $99,147.92 every session for ~10 weeks. Unlike the 10/19–23 process-failure week, the regime posture this week was **earned, not assumed**: two fresh deterministic `buy_gate.sh` reads were placed (Tue 11/10 OFF −1.23%; Fri 11/13 OFF −0.31%), both confirming the regime OFF. Cadence still thin — only those two sessions ran the pre-market routine (11/9, 11/11, 11/12 carried the last-read OFF), and no EOD snapshot was committed this week (last EOD 11/6). Note: no Friday recap was committed for the two intervening weeks (10/26–30, 11/2–6); the account was flat and regime-OFF across both.*

### Stats
| Metric | Value |
|--------|-------|
| Starting equity (Mon open) | $99,147.92 *(research-log balance_asof 11/9; unchanged since the 9/2 exit — no committed 11/9 open snapshot)* |
| Ending equity (Fri close) | $99,147.92 *(live Alpaca, balance_asof 11/12; portfolio_value $99,147.92, 100% cash, 0 positions, 0 open orders)* |
| Week return | $0.00 (0.00%) |
| S&P 500 week return | +2.51% *(7,549.94 Mon 11/9 → ~+2.51–2.52% for the week, Gemini; recovery that snapped a four-week losing streak)* |
| Trades taken | 0 (0 new buys, 0 closed) |
| Win / Loss / Open | W:0 L:0 O:0 |
| Win rate (closed only) | N/A (no closed trades) |
| Best trade | N/A (no trades) |
| Worst trade | N/A (no trades) |
| Profit factor | N/A (no closed trades) |
| Regime filter days | 5 OFF / 0 ON. Two fresh deterministic `buy_gate.sh` reads, both OFF (Tue 11/10 SPY 752.72 < 20d SMA 762.13, −1.23%; Fri 11/13 SPY 757.16 < 20d SMA 759.50, −0.31%); 11/9, 11/11, 11/12 carried the last-read OFF (no committed routine). Regime OFF continuously since the 10/15 ON→OFF flip. |

### Closed Trades This Week
| Symbol | Entry | Exit | P&L | Reason |
|--------|-------|------|-----|--------|
| — | — | — | — | No trades closed this week (last close was PLTR on 9/2, realized −$111.77). |

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
|--------|-------|---------|-------------|------|
| — | — | — | — | — |

*100% cash — zero open positions, zero open orders ($99,147.92). Phase P&L −$852.08 (−0.85%) off the live $100k base.*

### What Worked
- **Capital fully preserved — zero drawdown, zero rule violations.** Equity flat (0.00%) with no losing trade, no stop breach, no gate violation; a clean risk record now holds for a ninth straight week.
- **The regime posture was earned this week, not assumed.** The single biggest process failure flagged in the 10/19–23 review was a stale regime read. This week two fresh deterministic `buy_gate.sh` reads were actually placed (11/10, 11/13) and both returned OFF — so sitting in cash was a current, confirmed decision under the highest-priority rule, not a five-day-old carry. That is the specific fix from last review working.
- **No forced chase into a two-sided, event-heavy tape.** The week straddled a **hot October CPI (Tue 11/10, +0.4% m/m headline / +0.3% core)** and **October PPI (Fri 11/13)**, with AI/semis selling off (NVDA reports 11/17) and leadership narrow/defensive-and-energy-tilted — exactly the conditions the discipline is built to sit out. Nothing was forced into the binaries.
- **Flat book meant no sell-side exposure.** With 0 positions there were no stops to maintain, no earnings exits, no time-stop clocks — the account needed no defense and took none unnecessarily.

### What Didn't Work
- **Lagged a sharply up market — the recurring opportunity cost, and the largest gap yet.** The S&P rose **+2.51%** (its best week in over a month, snapping a four-week losing streak) while we sat 100% cash all five sessions. This is the biggest single-week lag of the nine-week cash stretch. It is defensible — SPY's +2.5% bounce came *off a low within a downtrend* and still closed the week **below** its (declining) 20-day SMA (757.16 < 759.50), so the regime filter correctly read it as an unconfirmed bear-market-rally bounce, not a trend reclaim — but the cost is real and worth naming plainly.
- **Cadence gaps persist.** Only two of five sessions ran the pre-market routine (11/9, 11/11, 11/12 have no research-log entry), and **no EOD snapshot was committed this week** (last EOD 11/6). The two reads that mattered (regime) were fresh, but the audit trail still has holes, and two prior weekly recaps (10/26–30, 11/2–6) were never committed at all.
- **Idea flow remains non-existent.** For ~10 weeks no name has cleared the full 11-check gate; with the regime OFF, STEP 4 generated no ideas at all this week. The binding constraint rotates (now regime-OFF + AI/semi weakness), but the net result is an unbroken cash position.

### Key Lessons
- **A +2.5% up-week with the regime OFF is the filter doing its job, not a miss to regret.** The whole point of the S&P-vs-20-day-SMA rule is to decline bear-market rallies: a sharp bounce that leaves price below a falling 20-day line is precisely the false-start the filter exists to reject. The lesson is to hold the line through the FOMO of a big green week, not to second-guess the rule because the tape popped.
- **"Cash is correct" was *earned* this week — keep it that way.** The distinction drawn last review (screened-today-and-nothing-qualified vs didn't-screen) held up: fresh reads were placed and confirmed OFF. The remaining gap is pure cadence — commit an EOD snapshot every session and run the pre-market routine every session, so the audit trail matches the (now sound) decision quality.
- **Watch for a genuine regime flip, not a narrow cross.** SPY firmed from −1.23% (Tue) to −0.31% (Fri) — the first prerequisite moving the right way — but a flip to ON requires a fresh read with SPY *closing above* ~759.50, ideally with the 20-day line itself turning up. Don't pre-position on a narrow sub-line cross.

### Adjustments for Next Week
- **No rule changes.** No rule has proven out for 2+ consecutive weeks or failed badly with data to justify a rulebook edit; the regime filter performed exactly as designed this week (keeping us out of an unconfirmed bounce that closed below a falling 20-day line), so `memory/TRADING-STRATEGY.md` is left unchanged. The nine-week cash stretch is a market-quality + regime outcome, not a rule failure.
- **Process focus (the one binding issue):** (1) run the **pre-market routine every session** and place a fresh `buy_gate.sh` regime read — the fix from two reviews ago is working; keep it from slipping; (2) commit an **EOD snapshot every session** to close the audit-trail gaps (none committed this week); (3) the moment a fresh read shows SPY **closing above ~759.50**, run a full fresh gate screen rather than carrying the OFF posture.
- **Event-risk map:** **NVDA reports Mon/Tue 11/17** — the single biggest AI/semi headline risk and a reason to keep conviction capped on semis even on a regime flip; **FOMC minutes (Oct 27–28) due Wed 11/18.** Sticky CPI/PPI keep the rate path two-sided. Do not force an entry into the NVDA print or the minutes.
- **Watchlist:** energy (the week's only firm sector — XLE led 11/12) and any leader printing a *fresh* 3-month/52-week high on ≥1.5× 20-day volume with an orderly 3–8% pullback — but only after a fresh regime read confirms ON. Force nothing.

### Grade: C
