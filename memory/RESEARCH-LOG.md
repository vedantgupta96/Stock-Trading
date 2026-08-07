# Research Log

*One dated entry per trading day, written by the pre-market routine. Midday addendum optional.*

---

## Format

```
## [DATE] — Pre-Market Research

### Account Snapshot
Equity: $X,XXX | Cash: $X,XXX | Buying power: $X,XXX | Day trades used: N/3

### Market Context
- Oil (WTI/Brent): $X / $X
- S&P 500 futures: +/-X%
- VIX: X.X
- Notable releases today: [CPI / FOMC / earnings / nothing]

### Sector Momentum
[Brief sector rundown — which sectors are leading/lagging]

### Trade Ideas
#### Idea 1: [SYMBOL]
- Catalyst: [specific reason]
- Entry: $X.XX | Stop: $X.XX (-X%) | Target: $X.XX (+X%) | R/R: X:1
- Sector momentum: [yes/no]
- Gate check: [all 7 pass / fails: ...]

#### Idea 2: [SYMBOL]
[same format]

### Risk Factors
[2-3 bullets on what could go wrong today]

### Decision
HOLD | TRADE [SYMBOL] — [one-sentence reason]
```

---

## 2026-06-04 — Pre-Market Research

### Research source note
Gemini wrapper (`scripts/gemini.sh`) failed for all queries — HTTP 404 from the
`gemini-3.1-pro` endpoint (curl exit 22, not the documented exit 3). Fell back to
native WebSearch for all market-context queries. Flagging the broken Gemini model
endpoint for maintenance; out of scope to fix during this routine.

### Account Snapshot
Equity: $100,000.00 | Cash: $100,000.00 | Buying power: $400,000 (4x) | Day trades used: 0/3 | PDT flagged: no

> ⚠️ Discrepancy: live Alpaca paper account is funded at **$100,000**, not the
> $10,000 baseline in TRADE-LOG.md / TRADING-STRATEGY.md (account recreated
> 2026-06-04). Position-sizing rule still binds: risk is hard-capped at **$200
> per trade** regardless of equity → max notional ≈ $200 / 0.08 = **$2,500**.
> Not adjusting the strategy doc here (rules only change on Fridays w/ review).

### Market Regime Status
**ON.** S&P 500 ≈ 7,580 (last close 6/2 = 7,609.78), 20-day MA ≈ 7,398 → index is
**above** its 20-day SMA. Also above 50-day (~7,100) and 200-day (~6,842). Buy
gate is open today on the regime check. (First logged run — no prior state, so no
ON/OFF flip to report.)

### Market Context
- Oil (WTI): ~$95.68, +2.0% — third straight up session on Middle East / US-Iran
  geopolitical risk premium. Elevated.
- S&P 500: trading well above all key MAs; risk-on tone.
- VIX: ~15.8 (closed 15.77 on 6/2), down from a March spike >30 → calm, low fear.
- Notable releases today (Thu 6/4): weekly initial jobless claims; CPI update flagged
  for the week plus Fed speakers. Watch for inflation-print volatility.

### Sector Momentum
- **Leading (week):** Information Technology +3.18%, driven by AI infrastructure —
  Dell (+88% rev, AI servers +757%) sparked a semis rally; MRVL, INTC sympathy.
- **Strong (month):** Consumer Cyclical, Healthcare, Financial Services.
- **Lagging / rolling over:** Energy −3.99% on the week (YTD leader at +27%, but
  diverging from the high oil price — avoid chasing energy).

### Earnings Watch
No open positions, so nothing to flag for an earnings exit. Earnings calendar for
the next 10 days was not resolvable to specific tickers via WebSearch — must verify
the exact next-earnings date before any buy (gate check #7).

### Trade Ideas (regime ON, so ideas allowed)
Today's strongest names are **gapping up**, not pulling back. Entering now means
chasing extended moves — a direct violation of the "enter on the first 3–8%
pullback" entry-timing rule. No qualifying pullback setups identified.

#### Idea 1: MRVL (Marvell) — semiconductor / AI-infra momentum
- Catalyst: broad semi rally off Dell's AI-server blowout; MRVL +10.2% pre-market
  on heavy ($3.3B) dollar volume.
- Gate check:
  - Regime ON ✅ | Stock (not option) ✅ | Volume ≥1.5x ✅ (heavy)
  - **Entry timing FAIL** — gapping +10% to/through highs, 0% pullback. Chasing.
  - **Earnings FAIL/UNVERIFIED** — Marvell reports late May/early June; cannot
    confirm next date is >10 trading days out. Blocks the buy.
  - → **SKIP.** Would revisit only on a 3–8% pullback that holds the breakout pivot
    on light volume, and only after confirming earnings are >10 days away.

#### Idea 2: INTC (Intel) — semi sympathy
- Catalyst: +5.6% pre-market in the same semis rally.
- Gate check: **Entry timing FAIL** — gapping up, no pullback. Quality/conviction
  on Intel as a momentum-breakout name is weak. → **SKIP.**

#### Idea 3: Energy — explicitly avoided
- Oil at $95 but the Energy sector is −3.99% on the week (price/sector divergence,
  sector rolling over). Fails sector-momentum intent. → **SKIP.**

### Risk Factors
- CPI / inflation data this week + Fed speakers → potential intraday whipsaw.
- Oil's geopolitical premium (US-Iran) can spike VIX fast on a headline.
- Semis are extended after the Dell-driven gap; buyers here risk buying the top.

### Decision
**HOLD.** Regime is ON and the buy gate is open, but every momentum name is gapping
up with no qualifying pullback — chasing them violates entry-timing discipline.
Zero trades is the right answer today. Wait for a 3–8% pullback in a confirmed
tech/semis breakout with earnings >10 days out before committing capital.

---

## 2026-06-04 — Pre-Market Research (updated re-run)

### Research source note
Re-run of today's pre-market after the Gemini wrapper fix (now `gemini-2.5-flash`).
The earlier 2026-06-04 entry above was produced when Gemini was returning HTTP 404
and was done entirely on WebSearch fallback. Gemini now works: queries Q1–Q6
returned cleanly; Q7 (economic calendar) hit HTTP 429 (rate limit, exit 3) so it
fell back to native WebSearch as the routine directs. Not editing the prior entry
(append-only); this entry supersedes it with live state.

### Account Snapshot — MATERIAL CHANGE
Equity: **$0.00** | Cash: **$0.00** | Buying power: **$0.00** | Day trades used: 0/3 | PDT flagged: no
- The Alpaca paper account was **recreated again** (created 2026-06-04T03:52Z,
  acct PA38LG589EST) and is currently **unfunded — $0 across equity, cash, and
  buying power**. Multiplier 1 (cash account, no margin). No open positions, no
  open orders.
- This differs from BOTH the strategy doc's $10,000 baseline AND the $100,000 noted
  in the earlier 2026-06-04 entry. The account has zero capital right now.
- **Consequence: the buy gate is hard-closed on cash/buying-power.** No order of any
  size can fill. No trades are possible until the account is funded. Nothing to
  manage on the sell side (no positions).

### Market Regime Status
**ON.** S&P 500 ≈ 7,541 vs 20-day SMA ≈ 7,489 → index is **above** its 20-day SMA.
No regime flip vs the earlier entry (was ON, still ON). Regime check passes, but it
is moot today because the account is unfunded.

### Market Context
- S&P 500: ~7,541, holding above its 20-day MA; broadly risk-on.
- VIX: ~16.0–16.4, up ~2–3% on the day from 15.77 — a modest uptick but still a
  low/calm absolute level.
- Oil (WTI): ~$94.5–95.2, **down ~1.6%** on the day on Israel–Lebanon ceasefire
  hopes and falling US crude inventories — the geopolitical risk premium is easing
  vs the earlier "third straight up session" read.
- Economic releases: weekly initial jobless claims (standard Thursday print); an
  inflation update plus Fed speakers are on the docket this week. Exact June-4
  release specifics were not resolvable via WebSearch — watch for inflation-print /
  Fed-speak volatility.

### Sector Momentum
- Gemini's day-level sector answer returned Indian Nifty indices (noise — ignored).
- US-relevant read: month-to-date strength in **Industrials, Consumer Cyclical, and
  Technology**; 2026 YTD leadership in Energy, Industrials, Consumer Defensive.
- Healthcare, Financials and Materials cited as favored on a 6–12 month outlook.

### Earnings Watch
No open positions → nothing to flag for an earnings exit. For future setups, note a
heavy reporting calendar in the next 10 trading days: LULU, DOCU, RBRK, NOW (6/4);
GME, ASO (6/9); ORCL (6/10); ADBE, LEN, RH (6/11). Any future buy must clear the
>10-trading-day earnings gate (#7) against this list.

### Trade Ideas
**None.** Two independent blockers:
1. **Account unfunded ($0 cash / $0 buying power)** → buy gate check #5 (cost ≤
   available cash) and #6 fail for any order. Hard stop.
2. Even ignoring funding, today's high-volume pre-market movers are all low-quality
   micro-caps / penny names (SBEV $0.41, CXAI $0.24, XOS, STI, SDOT, etc.) — not
   liquid multi-month-high breakout candidates, and none present a clean 3–8%
   pullback setup. They fail the breakout/quality intent of the strategy.

No idea passes the gate, so no per-idea entry checklist is warranted today.

### Risk Factors
- Account is unfunded — the bot is currently **non-operational for trading**; this
  needs human action (fund the paper account) before any routine can place orders.
- Inflation data / Fed speakers this week → potential intraday whipsaw if/when funded.
- VIX ticking up modestly; calm but not complacent.

### Decision
**HOLD (forced).** Regime is ON, but the paper account is unfunded ($0 cash /
buying power), so no trade is possible regardless of setup — and no quality pullback
setups exist anyway. Zero trades. **Action item for the operator: fund the Alpaca
paper account** so the strategy can resume. Sending a Discord alert flagging the
unfunded account, as it blocks all operation.


---

## 2026-06-04 — Pre-Market Research (run 3 — account now FUNDED)

*Third run today. Material change since the prior two entries: the Alpaca paper account is now funded. Earlier entries today recorded it as unfunded ($0); the live account now shows $100,000 equity. Account created 2026-06-04 12:02 UTC.*

### Account Snapshot
Equity: $100,000 | Cash: $100,000 | Buying power: $400,000 (4x) | Day trades used: 0/3 | PDT: false
- Live Alpaca read (paper). Account number PA3HSZYWDFS7, status ACTIVE.
- **Open positions: 0. Open orders: 0.** Nothing to manage on the sell side.
- Note: equity is $100,000, not the $10,000 baseline in the strategy doc. Position
  sizing recalculated on live equity below.

### Market Regime Status
**OFF (borderline / conflicted reads).** Today's Gemini read: S&P 500 closed 7,553.68
on Jun 3 vs a 20-day SMA of 7,591.22 → index is **below** its 20-day SMA → regime
filter is OFF, no new buys today.
- ⚠️ Conflict with earlier-today entries, which read S&P ~7,541 **above** a 20-day SMA
  of ~7,489 (regime ON). The two SMA figures (~7,489 vs ~7,591) are mutually
  inconsistent and cannot both be correct for the same week. Today's read is more
  specific (dated close + exact SMA), and the strategy's tie-breaker is conservatism:
  "When the regime filter is off, the right answer is almost always cash."
- **Practical impact: none for the action.** With zero positions and only low-quality
  penny-stock movers available, the decision is HOLD regardless of how the regime
  ambiguity resolves. Treating regime as OFF → buy gate check #1 FAILS today.

### Market Context
- S&P 500: ~7,553.68 (Jun 3 close), sitting just below its 20-day SMA (~7,591). Mild
  pullback / consolidation, not a breakdown.
- VIX: ~16.0–16.1, up ~1.8% from 15.77; ~15% below its long-term avg (18.55). Calm
  but with a noted divergence — single-stock (constituent) vol trending higher even as
  index VIX stays low. Watch for stock-specific turbulence.
- Oil (WTI): ~$93.6–95.5 intraday (July contract settled $96.02 on Jun 3); soft/choppy.
- Notable releases today (Jun 4, via WebSearch fallback — Gemini Q7 hit HTTP 429):
  Initial Jobless Claims 8:30 ET (fcst 211K, prev 215K), Continuing Claims (fcst
  1,780K), Nonfarm Productivity (fcst 0.8%), and **FOMC's Mary Daly speaks 12:10 ET.**

### Sector Momentum
- Week ending Jun 3: leaders **Information Technology (+3.75%)** and **Energy (+3.17%)**.
- Laggards: Communication Services, Consumer Discretionary, Consumer Staples (declines).
- Materials (+0.43%) and Industrials (+0.01%) roughly flat.

### Earnings Watch
No open positions → nothing to flag for an earnings exit. For future setups, heavy
reporting in the next ~10 trading days (carried from earlier entries): LULU, DOCU,
RBRK, NOW (6/4); GME, ASO (6/9); ORCL (6/10); ADBE, LEN, RH (6/11). Gemini's earnings
query was truncated/empty this run and WebSearch returned only calendar sources, not a
clean list — any future buy must still clear the >10-trading-day earnings gate (#7).

### Position Sizing (recalculated on live equity)
- Equity $100,000 → 1.5% risk = $1,500, but strategy hard-caps risk at **$200/trade**.
- Max notional = $200 / 8% stop = **$2,500 per position** (≈ the binding cap; the
  CLAUDE.md 20%-of-equity cap = $20,000 is far looser and does not bind here).

### Trade Ideas
**None.** Two independent blockers:
1. **Regime filter OFF** (S&P below 20-day SMA) → buy gate check #1 FAILS. No new longs.
2. Even ignoring the regime, today's high-volume movers are all low-float penny / micro-cap
   names (SBEV, CXAI, STI, FOXX, AUUD on the upside; HUBC, SNBR, ADCT on the downside) —
   not liquid multi-month-high breakouts with a clean 3–8% pullback. They fail the
   breakout-quality intent of the strategy (gate checks #9–#10).
No idea passes the gate, so no per-idea checklist is warranted today.

### Risk Factors
- Regime reads are conflicting day-to-day; data quality is shaky. Lean conservative (cash).
- Fed speaker (Daly, 12:10 ET) + jobless claims → potential intraday whipsaw.
- VIX/constituent-vol divergence: index calm but individual names can gap. Penny-stock
  movers are pure noise — do not chase.

### Decision
**HOLD.** Account is now funded ($100k, fully operational), but the regime filter reads
OFF and the only high-volume movers are un-tradeable penny names. Zero new trades, no
positions to manage. The bot is operational and ready to act once a clean breakout-and-
pullback setup appears with the regime ON.


---

## 2026-06-04 — Market-Open Routine (OPERATOR OVERRIDE)

**Decision: 2 buys placed via explicit operator override of the regime filter.**

### Regime (re-confirmed, fresh)
S&P 500 7,553.68 vs 20-day SMA 7,591.22 → **below → regime OFF.** Cross-checked with
live Alpaca SPY quote (~$753.2, implying S&P ~7,532, below implied ~759 SPY SMA). The
earlier conflicting "regime ON" reads from today's first two runs were stale/low SMA
figures; current data agrees with run 3. Under strategy rules this is a no-buy day.

### Override
The operator explicitly authorized a **one-time** override to open a starter position
on an otherwise-empty portfolio, with normal strategy (including the regime filter) to
resume on all subsequent runs. Stated goal: best-effort to beat the S&P 500. Logged
here as a manual operator override, NOT a strategy-driven signal. All other risk
controls were kept: $2,500/position notional cap, immediate 12% trailing GTC stops,
≤5 positions / ≤2 per sector, well within cash/PDT limits.

### Trades placed
- **NVDA** — 11 sh @ $218.89 (Tech, offensive engine). Trailing stop 12% GTC @ $192.61.
- **CVX** — 13 sh @ $189.54 (Energy, lower-beta ballast). Trailing stop 12% GTC @ $166.81.
Total deployed ~$4,872 (~4.9% of $100k equity). Diversified across the week's two
leading sectors to limit single-name/sector risk on an unverified, regime-off entry.

### Caveats / unverified gates
Neither name had its breakout-within-5-days, 3–8%-pullback, or 1.5x-volume gates
verified (Alpaca wrapper has no bars endpoint; Gemini screens were flaky). Earnings
dates are approximate (NVDA ~Aug 26, CVX ~Aug 7) and clear the 10-day gate but were
not hard-verified. Both positions are protected by live 12% trailing stops.

### Going forward
Strategy resumes fully on the next run: no new buys while regime is OFF; manage these
two via the standard sell-side rules (–8% cut, 15-day time stop on <+5%, tighten to 7%
at +15% / 5% at +20%, earnings exits). Re-run gate verification before adding any name.


---

## 2026-06-05 (Fri) — Market-Open Routine (research run inline; pre-market entry was missing)

**Decision: HOLD — zero new trades.** Regime is ON, but no name clears the buy gate
(all candidates fail volume and/or breakout + lack a documented catalyst). Existing
NVDA and CVX positions left to the standard sell-side rules / midday scan; both are
within tolerance and protected by live 12% trailing-stop GTC orders.

### Account Snapshot (live Alpaca, paper)
Equity: $99,919.90 | Cash: $95,128.18 | Buying power: $390,096 | Day trades: 0/3 | PDT: false
- Open positions: 2 — **NVDA** 11 sh @ $218.89 (now ~$213.26, **-2.6%**), **CVX** 13 sh
  @ $189.54 (now ~$188.16, **-0.7%**). Neither near the -8% cut.
- Open orders: 2 — NVDA trailing stop 12% GTC (stop ~$195.01, hwm $221.60); CVX trailing
  stop 12% GTC (stop ~$166.90, hwm $189.66). Both stops live and intact.
- Position sizing (recalc on live equity): 1.5% of $99,920 = $1,499, but hard-capped at
  **$200 risk/trade** → max notional $200 / 8% = **$2,500/position** (binding cap).

### Market Regime Status
**ON.** S&P 500 ~7,540 intraday Jun 5 (Dow at a record closing high; majors at/near
all-time highs), trading well above its 20-day MA (~7,398). Cross-checked with the buy
gate's live SPY read: **SPY 751.59 vs 20-day SMA 746.95 → above → regime ON.** This is a
cleaner, less ambiguous read than yesterday's borderline-OFF figures; gate check #1 PASSES.

### Market Context
- S&P 500 ~7,540 (Jun 5 intraday, -0.58% on day but near record); Dow record closing high.
- VIX ~15.40, **down ~4%** on the day — calm, low-fear tape.
- Oil (WTI): **dropped ~10%** on Iran peace hopes — a headwind for energy/CVX thesis,
  though CVX is holding (-0.7% today). Falling oil + falling yields = bullish equity backdrop.
- **May jobs report (released pre-open today): +172K vs ~85K forecast** (prior revised to
  +179K); unemployment ~4.3%, AHE +0.3% m/m. Strong print; market absorbed it well (no
  hawkish shock — majors at highs).
- Note: Kevin Warsh's first FOMC meeting as Fed chair begins Sat Jun 6 — no decision today.

### Sector Momentum
- Rotation in progress: **Healthcare and Financials leading** (Dow led by UNH +5.4%,
  GS +5.0%, MRK +4.9%); **Information Technology selling off** Thursday, dragging the Nasdaq.
- iShares Software ETF (IGV) breaking above its 200-day SMA (ETF — not tradeable per rules).

### Earnings Watch (held names)
- NVDA next earnings ~late Aug 2026; CVX ~early Aug 2026. Both clear the >10-trading-day
  gate. No earnings exit triggered for either open position.

### Trade Ideas — tested, none qualify
Candidates surfaced from momentum/breakout screens: **MTLS, LXFR, ARKO**. Ran each through
`scripts/buy_gate.sh` (deterministic breakout/volume from Alpaca; honest inputs:
sector-count 0, trades-this-week 2, catalyst=no — no specific documented catalyst for these):
- **MTLS** — GATE FAIL: c10 volume (last-5 max 8,059 vs 17,415 = 1.5x avg), c8 catalyst.
  Breakout (c9) passes but on weak volume → low conviction.
- **LXFR** — GATE FAIL: c10 volume (10,715 vs 10,888 threshold — narrowly short), c8 catalyst.
- **ARKO** — GATE FAIL: c9 no 3-month high in last 5d, c10 volume, c8 catalyst.
None has volume confirmation (the 1.5x conviction filter), none has a documented catalyst,
and none presents a clean 3–8% pullback entry. Buy gate correctly rejects all three.
Leadership names (UNH/GS/MRK) are at record highs — extended, not in a pullback buy zone;
chasing them violates entry timing. Tech is rotating out → wrong moment to add tech.

### Trades this week
2 placed Mon–Fri this week (NVDA, CVX on 6/4 via operator override). Room for 1 more under
the 3/week cap — but no qualifying setup to use it on.

### Risk Factors
- Sector rotation out of tech (hits NVDA) and a 10% oil drop (hits CVX thesis) — both
  positions face mild thesis pressure but are well above -8% and stop-protected. Re-evaluate
  at midday: if CVX's energy thesis is breaking on the oil move, consider a discretionary exit.
- New Fed chair's first FOMC begins tomorrow → potential weekend headline risk.

### Decision
**HOLD. Zero new trades.** Regime ON but no name clears the gate (volume + catalyst fail
across all candidates). Patience beats activity. No Discord alert (no trade placed). No
commit per the market-open routine (commit only when trades fire).


---

## 2026-06-08 (Mon) — Market-Open Routine (research run inline; pre-market entry was missing)

**Decision: HOLD — zero new trades.** Regime filter reads **OFF** (S&P below its 20-day
SMA) on two independent sources — the highest-priority rule. No new buys today. The two
existing positions (NVDA, CVX) are within tolerance, stop-protected, and left to the
standard sell-side rules / midday scan.

### Market Regime Status — OFF (no-buy day)
- **Gemini:** S&P 500 7,460.69 vs 20-day SMA 7,504.43 → **below → OFF.**
- **Alpaca (deterministic, via buy_gate):** SPY 742.03 vs SMA20 746.47 → **FAIL → OFF.**
Both agree — a clean, unambiguous regime-OFF read. Per strategy, the right answer on a
regime-off day is cash. Buy gate check #1 FAILS for any candidate today.

### Account Snapshot (live Alpaca, paper)
Equity: $99,885.83 | Cash: $95,128.18 | Buying power: $393,834 | Day trades: 0/3 | PDT: false
- Open positions: 2 — **NVDA** 11 sh @ $218.89 (now ~$208.33, **-4.83%**), **CVX** 13 sh
  @ $189.54 (now ~$189.78, **+0.13%**). Neither near the -8% cut.
- Open orders: 2 — NVDA trailing stop 12% GTC (stop ~$195.01, hwm $221.60); CVX trailing
  stop 12% GTC (stop ~$167.20, hwm $190.00). Both stops live and intact.
- Position sizing (recalc on live equity): 1.5% of $99,886 = $1,498, hard-capped at
  **$200 risk/trade** → max notional $200 / 8% = **$2,500/position** (binding cap).

### Market Context
- VIX ~19.90, **down ~7.5%** on the day (prior close 21.51) — fear easing but still
  above its ~18.5 long-run average; tape unsettled.
- Oil (WTI): **rebounding to ~$91–94, +1.6% to +4%** on Israel–Iran military escalation
  (Israel reportedly struck a petrochemical plant in SW Iran), reversing Friday's ~10%
  ceasefire-hope drop. Supportive for CVX's energy thesis.
- Broad **chip-stock selloff today** — Philadelphia Semiconductor Index shed >$1T in value
  on AI-spend reassessment + strong jobs data reviving rate-hike worries. NVDA -6.2% intraday.

### Sector Momentum
- Risk-off rotation **out of semiconductors / tech** (NVDA, AMD, MU, MRVL all down hard).
  Wrong moment to add tech. Energy firmer on the oil rebound.

### Earnings Watch (held names)
- **NVDA** next earnings **Aug 26, 2026** (confirmed, after Q1 FY27 beat on May 20). Clears
  the >10-trading-day gate. No earnings exit.
- **CVX** next earnings **late Jul–early Aug 2026** (est. Jul 23–Aug 7). Clears the gate.
  No earnings exit.

### Held-position review (sell-side rules — none triggered)
- **NVDA -4.83%** from entry: above the -8% cut; not +15/+20% (no stop tighten); entered
  6/4, ~2 trading days elapsed (far from 15-day time stop); earnings Aug 26 (clear).
  Headwind from tech rotation, but well above stop ($195.01). **Hold; reassess at midday.**
- **CVX +0.13%:** oil rebound supports thesis; no rule triggered. **Hold.**

### Trade Ideas — N/A
Regime is OFF → no buy candidates evaluated. Buy gate #1 fails for everything today.
Penny/low-quality movers ignored per standing policy.

### Risk Factors
- Semiconductor rotation pressures NVDA; geopolitical oil spike is two-sided for CVX
  (supports near-term price, but a sudden ceasefire could reverse it). Both stop-protected.
- VIX still elevated (~20) — choppy tape; another reason cash is the right default today.

### Decision
**HOLD. Zero new trades. Regime filter OFF — no new buys today.** No Discord alert (no
trade placed). No commit per the market-open routine (commit only when trades fire).

---

## 2026-06-17 (Wed) — Pre-Market Routine

**Decision: HOLD — zero new trades.** Regime filter has **flipped ON** (S&P back above its
20-day SMA, confirmed on two independent sources), but no candidate clears the 11-check buy
gate — every breakout name surfaced today FAILS the volume confirmation, and all are extended
at the highs (0–1.6% pullback, outside the 3–8% entry band) rather than offering a disciplined
pullback entry. Layered on top is **FOMC decision day** (2:00 PM ET), a major two-sided event.
The disciplined posture is to stay in cash and wait for a clean pullback setup on ≥1.5x volume.

### Market Regime Status — ON (flip from OFF)
- **Alpaca (deterministic, via buy_gate):** SPY 750.58 vs SMA20 746.43 → **PASS → ON.**
- **Gemini:** S&P 500 7,511.35 vs 20-day SMA 7,478.56 → **above → ON.**
Both agree. This is a regime **flip from OFF → ON** (last read OFF on 6/08: SPY 742.03 < 746.47).
Buy gate check #1 now PASSES; new entries are *permitted* — but only if a candidate clears all
11 checks. Discord alert sent (regime flip is a STEP 5 notification trigger).

### Account Snapshot (live Alpaca, paper)
Equity: $99,681.72 | Cash: $99,681.72 | Buying power: $398,726.88 | Day trades: 0/3 | PDT: false
- Open positions: **0** (100% cash since CVX's undocumented ~6/12 exit). Open orders: 0.
- Position sizing (recalc on live equity): 1.5% of $99,682 = $1,495, hard-capped at **$200
  risk/trade** → max notional $200 / 8% = **$2,500/position** (the $200 cap is binding).

### Market Context
- **VIX ~16.41** (+1.3% on the day) — low/calm, well below its long-run ~18.5 average.
- **FOMC TODAY** — rate decision 2:00 PM ET, presser 2:30 PM ET (first under new Chair Kevin
  Warsh). Consensus: hold at 3.50–3.75%; focus on the dot plot and Warsh's tone. Major event
  risk — a poor day to initiate a position ahead of the print.
- **Oil (WTI) ~$75–78**, roughly flat-to-down (~-0.6%). No fresh energy momentum catalyst.
- No CPI/PPI/jobs today (CPI was 6/10, PPI 6/11, jobs 6/05). Next CPI 7/14.

### Sector Momentum
- Gemini sector/mover queries returned HTTP 503 → fell back to native WebSearch (noted). The
  WebSearch sector data was low-quality/garbled (nonsensical % figures, wrong weekday) so it is
  treated as directional only: Industrials, Energy, Basic Materials and Tech cited as leaders.
- Surfaced "breakout" names (CAT, DE, JPM) were each run through the deterministic gate below.

### Earnings Watch (held names)
- None — portfolio is 100% cash. No earnings exposure.

### Trade Ideas — evaluated, all FAIL the gate (no qualifying setup)
Regime is ON, so candidates were screened. Deterministic buy_gate results (live Alpaca bars):
- **$CAT** (Industrials) — c9 breakout PASS (3-mo high 960.98 in last 5d), but **c10 volume
  FAIL** (last5 maxvol 163,397 vs 165,089 threshold) and pullback only 1.6% (extended).
  GATE: **FAIL — c10_volume.**
- **$DE** (Industrials) — **c9 breakout FAIL** (last5 high 592.59 < prior 673.87 — NOT a
  3-month high; the WebSearch "$335 / +11%" figure was garbage, caught by deterministic check)
  and **c10 volume FAIL.** GATE: **FAIL — c9_breakout, c10_volume.**
- **$JPM** (Financials) — c9 breakout PASS (3-mo high 331.72 in last 5d), but **c10 volume
  FAIL** (last5 maxvol 368,620 vs 397,399 threshold) and pullback 0.2% (right at the high).
  GATE: **FAIL — c10_volume.**
- Congressional/STOCK-Act query (idea-gen only): mostly *sales* (PTON, ECL, NVDA), no clean
  buy candidate; nothing pursued — would still need to clear the full gate independently.

### Risk Factors
- **FOMC at 2:00 PM ET** can whipsaw the tape both ways; entering beforehand risks an immediate
  adverse gap. Wait for the dust to settle.
- Breakout candidates are extended at the highs with sub-1.5x volume — chasing here invites a
  poor entry and a quick stop-out; the strategy explicitly demands a 3–8% pullback first.
- Regime only just flipped ON after a multi-week OFF stretch; early-uptrend whipsaw risk is
  elevated. No need to force the first trade.

### Decision
**HOLD. Zero new trades.** Regime flipped ON, but no candidate clears the 11-check gate (all
fail volume; none in the pullback band) and it's FOMC day. Stay 100% cash; re-screen for a
disciplined pullback-on-volume setup at the next pre-market / midday scan.

---

## 2026-06-22 (Mon) — Market-Open Routine (research run inline; pre-market entry was missing)

**Decision: BUY JPM ×6 @ $327.17.** Regime is ON, and JPM is the one candidate that clears
the full 11-check buy gate — a genuine 3-month-high breakout on >1.5x volume that has pulled
back ~3% (inside the 3–8% entry band) into a clean first-pullback entry, with earnings safely
~14 trading days out and a documented, still-intact catalyst. All other screened names failed
the deterministic gate. 12% trailing-stop GTC placed immediately.

### Market Regime Status — ON
- **Alpaca (deterministic, via buy_gate):** SPY 749.08 vs SMA20 747.38 → **PASS → ON.**
- Gemini was DOWN (HTTP 503 on every query) → fell back to native WebSearch for macro/idea
  context; the regime read itself is the deterministic Alpaca SPY-vs-SMA20 computation (not
  web-dependent), so the gate's #1 check is authoritative. Regime ON; new entries permitted.

### Account Snapshot (live Alpaca, paper) — pre-trade
Equity: $99,681.72 | Cash: $99,681.72 | 100% cash, 0 positions, 0 open orders | Day trades: 0/3 | PDT: false
- Position sizing (recalc on live equity): 1.5% of $99,682 = $1,495, hard-capped at **$200
  risk/trade** → max notional $200 / 8% = **$2,500/position** (the $200 cap is binding).
- Post-trade: cash $97,718.70 | equity ~$99,682 | long mkt value $1,963 | day trades 0/3.

### Market Context
- **VIX ~16.4–16.8** — low/calm, below its long-run ~18.5 average.
- **Oil (WTI) ~$77** (range ~74–78), easing on reported progress in US–Iran negotiations
  (Strait-of-Hormuz risk receding) — a risk-on tailwind for cyclicals/banks.
- **Key event this week: Thursday Core PCE** (Fed's preferred inflation gauge) + PMIs,
  durable goods, jobless claims. **Micron and FedEx report this week.** No major print today.

### Sector Momentum
- Leaders cited: Basic Materials, Energy, Communication Services (and Financials firm on the
  risk-on bank bid). WebSearch movers were dominated by penny/low-quality pumps (INHD, CAST,
  STAK, etc.) — ignored per standing policy. Screened liquid large-cap momentum names instead.

### Trade Ideas — screened deterministically (buy_gate, live Alpaca bars)
- **$JPM** (Financials) — **GATE: PASS.** c9 breakout PASS (3-mo high 338.05 on 6/18, last 5d
  vs prior 321.29), c10 volume PASS (last5 maxvol 546,529 vs 406,620 threshold = 1.5x avg
  271,080), pullback ~3.0% (in the 3–8% band). Earnings 7/14 (~14 trading days, >10 → PASS).
  Catalyst documented & intact (bank risk-on bid + stress-test/capital-return optimism;
  oil still easing). Sector-count 0, trades-this-week 0, PDT 0/3, cost ≤ cash. **→ BOUGHT.**
- **$CAT** (Industrials) — FAIL c10 volume (last5 maxvol 129,870 vs 157,800 threshold);
  breakout PASS. Skip.
- **$FCX** (Materials) — FAIL c10 volume (1,051,771 vs 1,326,227 threshold). Skip.
- **$XOM** (Energy) — FAIL c9 breakout (last5 high 142.22 < prior 176.40 — not a 3-mo high). Skip.
- **$NEM** (Materials) — FAIL c9 breakout (112.15 < prior 131.63). Skip.
- Congressional/STOCK-Act query: not run (Gemini down); idea-gen only, never a buy reason.

### Order Execution
- Market buy JPM 7 → partially filled **6 @ $327.17** in thin early-session liquidity;
  canceled the unfilled 1-share remainder to lock and immediately protect the position
  (6 sh ≈ $1,963 notional, slightly under the $2,500 cap — more conservative on risk).
- **12% trailing-stop GTC placed** (qty 6, initial stop ~$287.87, hwm $326.87, accepted —
  not PDT-blocked). order id d948673a-…
- Entry: $327.17 | Target $405.69 (×1.24) | Time stop ~7/14, but the **7/14 earnings exit
  binds first** → must close on/before 2026-07-13.

### Held-position review
- Pre-trade portfolio was 100% cash; no sell-side rules to evaluate. JPM is now the lone
  position, +~0% at entry, fully stop-protected. No sell-side rule triggered.

### Risk Factors
- **Core PCE Thursday** is a two-sided macro event; JPM is stop-protected (12% trailing) and
  the entry is on a pullback, not an extended chase. The late-June Fed stress-test readout is a
  near-term catalyst event — expected supportive (2026 cycle leaves large-bank capital reqs
  unchanged until 2027), but monitor. A sudden US-Iran breakdown would re-spike oil and could
  unwind the risk-on bank bid; thesis would be reassessed if the catalyst breaks.

### Decision
**BUY JPM ×6 @ $327.17, 12% trailing stop GTC ($287.87).** Regime ON; JPM is the only name to
clear all 11 gate checks with a real breakout-on-volume, a disciplined ~3% pullback entry,
documented intact catalyst, and earnings safely outside 10 trading days. Trades this week now
1/3. Committed and pushed per the market-open routine (a trade was placed).

---

## 2026-07-30 (Thu) — Pre-Market Routine

**Decision: HOLD (no new trades). Regime flipped ON→OFF; execute the deferred MS -8% cut at today's open.**
Regime is now OFF (SPY below its 20-day SMA), so no new buys today — the right answer is cash/hold.
The only action this session is the mandated Rule 6 cut on MS (queued market sell for the 9:30 ET open).
UNH is held under standard sell-side rules, fully protected by its live 12% trailing-stop GTC.

### Market Regime Status — OFF (flipped from ON)
- **Alpaca (deterministic):** SPY last close **729.57** (7/29) vs **20-day SMA 745.76** → **729.57 < 745.76 → REGIME OFF.**
  Gap is a wide **-2.2%** (not a marginal call). Recent SPY closes rolled over: 747.49 → 738.06 → 738.90 → 738.85 → 740.79 → 729.57.
- **Gemini corroboration:** S&P 500 7,316.15 vs 20-day SMA ~7,404.20 → below. Independent confirmation of OFF.
- ⚠️ **Regime FLIP ON→OFF** vs the last committed read (7/21: SPY 748.15 > SMA 744.94 = ON). Per Strategy Rule 1,
  no new long entries while the filter is OFF; do not close winning positions just for the filter — let stops do that.

### Account Snapshot (live Alpaca, paper) — pre-cut
Equity: $99,456.40 | Cash: $95,118.40 | Buying power: $392,620 | Positions: 2 (MS, UNH) | Day trades: 0/3 | PDT: false
- Trades this week: 0/3 (week of Mon 7/27).

### Market Context
- **VIX 20.66**, up +13.45% on the day (prior close 18.21), ~+29% YoY, and above its long-run ~18.58 average — elevated fear / risk-off.
- **Today (8:30 AM ET):** June **PCE** (Fed's preferred inflation gauge) + **advance Q2 GDP** + weekly jobless claims (exp ~200k vs 187k prior).
- **FOMC** rate decision was **yesterday (7/29)** — post-meeting repositioning is a dominant driver today.
- BoE decision + eurozone/Germany Q2 GDP and German CPI also on the tape (offshore risk).
- US CPI (Aug 12), PPI (Aug 13), and July jobs report (Aug 7) are NOT today.

### Sector Momentum
- Not screened for entries — regime is OFF, so no trade ideas are generated today (per routine STEP 4: ideas only when regime is ON).

### Held-Position Review
- **MS** (Financials, 11 sh @ $222.47) — current **$204.00**, **-8.30%** (unrealized_plpc -0.08303). **BREACHES the -8% hard cut (Rule 6).**
  Flagged at the 7/29 EOD (closed -8.69%) for cutting at today's open. **ACTIONED THIS SESSION:**
  (1) cancelled the MS 12% trailing-stop GTC (id 6109eca4) to free the shares (qty_available was 0, reserved by the stop);
  (2) placed a **market SELL 11 MS, TIF day** (id 4870384f-416f-49ac-ac05-2d1559d97c02, status pending_new) — queued to fill at the 9:30 ET open with live prices.
  Realized loss will be ~-$205 (~-8.3%) on ~$2,447 cost basis. No averaging down, no hoping — rule enforced.
- **UNH** (Healthcare, 5 sh @ $423.22) — current **$418.80**, **-1.04%**. Far above the -8% cut and below the +15% tighten threshold — **no sell-side rule triggered.**
  Q2 2026 earnings already reported ~7/15 (EPS $6.38 beat vs $4.94; raised FY guide); **next earnings ~mid-to-late October 2026** — well outside the 10-trading-day window, so no earnings exit. ~7-8 trading days held (inside the 15-day time stop). Live 12% trailing-stop GTC intact (id 1cd14949, stop $384.51, hwm $436.945). **HOLD.**

### Risk Factors
- **Double macro event today** (PCE + advance Q2 GDP at 8:30 ET) landing the morning after FOMC — two-sided gap risk into the open, exactly when the MS market-sell fills. Accept the fill; the -8% rule is non-negotiable and downside was otherwise unbounded post-stop-cancel only during the closed pre-market window.
- **Regime OFF + VIX 20.66 rising** = risk-off tape; correct posture is defensive/cash. Guard against the temptation to bottom-fish.
- UNH is the lone remaining position after the MS cut; concentration is low (1 name, ~$2.1k) and it is stop-protected.

### Decision
**HOLD — no new trades (regime OFF).** Cut MS at the open per Rule 6 (order queued). Hold UNH under standard sell-side rules with its 12% trailing stop. After the MS fill the book is UNH-only + cash. Trades this week 0/3. Committed and pushed per the pre-market routine.

---

## 2026-08-03 (Mon) — Pre-Market Routine

**Decision: HOLD (no new trades). Regime flipped OFF→ON (marginal). AAPL & MSFT clear the 11-check hard gate but FAIL entry-timing discipline — watchlist only. Hold UNH.**
Regime is back ON but barely (+0.15% gap), into a macro-heavy week (Jul NFP Fri 8/7, CPI Wed 8/12) and peak earnings season. Two names pass all 11 hard-gate checks (AAPL, MSFT), but neither offers a valid pullback entry today, so the disciplined answer is HOLD and watch. UNH held under standard sell-side rules, fully protected by its live 12% trailing-stop GTC.

### Market Regime Status — ON (flipped from OFF)
- **Alpaca (deterministic):** SPY last close **746.79** (7/31) vs **20-day SMA 745.66** → **746.79 > 745.66 → REGIME ON.** Gap is a thin **+0.15%** — a marginal, not decisive, read. Recent SPY closes rebounded off the 7/29 low: 738.85 → 740.79 → 729.57 → 741.63 → 746.79.
- **Gemini corroboration:** S&P 500 ~7,528 on 8/3, described as **above** its 20-day MA. Independent confirmation of ON.
- ⚠️ **Regime FLIP OFF→ON** vs the last committed read (7/30: SPY 729.57 < SMA 745.76 = OFF). New long entries are permitted again, but every candidate must still clear the full 11-check gate AND the entry-timing rules.

### Account Snapshot (live Alpaca, paper)
Equity: **$99,474.76** | Cash: **$97,395.81** | Buying power: $395,404 | Positions: **1 (UNH)** | Day trades: 0/3 | PDT: false
- Trades this week: **0/3** (new week, Mon 8/3). last_equity $99,467.81 (balance_asof 7/31) → true session move ≈ +$6.95 (+0.01%), essentially flat.

### Market Context
- **VIX 15.99** — low/benign, down ~6% on the week; term structure in contango (risk-on tone). Supports the ON regime but does not override the thin SPY gap.
- **WTI crude ~$79.40**, down ~6% on the day (US–Iran diplomacy + OPEC+ production increase). Disinflationary at the margin; pressures Energy.
- **Econ calendar:** Today ISM Manufacturing + Construction Spending (10:00 ET). This week is front-loaded with jobs data — **ADP Wed 8/5, ISM Services Wed 8/5, Jul Employment Report (NFP) Fri 8/7** (the week's key event). **No FOMC this week** (Jul 29 minutes land 8/19). CPI **Wed 8/12**, PPI **Thu 8/13** — both next week.
- **Peak earnings week:** AMD, MCD, CAT, PFE, MRK (Tue); DIS, UBER, LLY, CVS (Wed); plus PLTR/SNAP/VRTX today. Most large-cap leaders are in/near their earnings windows — the earnings gate screens most of them out.

### Sector Momentum
- **Leading:** Technology and Consumer Discretionary (Mag-7 / AI supercycle), Communication Services strong (~+5.5% on the week).
- **Lagging:** Utilities, Real Estate; Energy pressured by the oil drop.

### Held-Position Review
- **UNH** (Healthcare, 5 sh @ $423.22) — current **$415.79**, **-1.76%** (unrealized -$37.15). Far above the -8% cut and below the +15% tighten threshold → **no sell-side rule triggered.** Q2 2026 already reported ~7/15 (EPS $6.38 beat vs $4.94; raised FY guide); **next earnings ~late Oct 2026** — well outside the 10-trading-day window. Live 12% trailing-stop GTC intact (id 1cd14949, stop $384.51, hwm $436.945; qty_available 0 = reserved by the stop). ⏳ **Time-stop watch:** entered ~7/20, ~11 trading days held at a <+5% gain — the 15-trading-day time stop (Rule) comes due around **8/7**. Not triggered today; flag for the midday/EOD scans this week. **HOLD.**

### Trade Ideas (regime ON) — both clear the 11-check hard gate, both FAIL entry timing → WATCHLIST, not buys
Deterministic breakout/volume screen across momentum leaders (buy_gate.sh) — only two names show a genuine 3-month-high-in-last-5-days on ≥1.5x volume: **$AAPL** and **$MSFT** (NVDA, AVGO, NFLX, COST, ORCL, GE all fail breakout; AMZN/GOOGL/META pass volume but fail breakout; HWM passes breakout but fails volume).

- **$AAPL** (Technology) — 11-check gate: **PASS.** Breakout: 3-mo high 344.56 in last 5d (PASS); volume 4.90M vs 2.80M threshold (PASS, ~2.6x avg); regime/positions/sector/trades/cost/PDT/earnings/catalyst/is-stock all PASS. Earnings verified: last reported **7/30**, next ~late Oct/early Nov (outside 10d). Sizing: entry ~$308.73, 8 sh, cost ~$2,470, stop $284.03 (-8%), target $382.82 (+24%). ❌ **Entry timing FAIL:** pullback from breakout high is **10.4%**, which **exceeds the strategy's 10% "setup broken → skip" threshold** (Strategy §Entry timing). Setup is stretched too far off the high — **do not chase; watchlist.**
- **$MSFT** (Technology) — 11-check gate: **PASS.** Breakout: 3-mo high 466.83 in last 5d (PASS); volume 4.74M vs 2.14M threshold (PASS, ~3.3x avg); all other checks PASS. Earnings verified: last reported **7/29**, next ~late Oct (outside 10d). Sizing: entry ~$464.70, 5 sh, cost ~$2,324, stop $427.52 (-8%), target $576.23 (+24%). ❌ **Entry timing FAIL:** pullback is only **0.5%** — MSFT is sitting on its breakout high, so buying now = overpaying (Strategy: wait for the first 3–8% pullback). **Watchlist — set an alert for a 3–8% pullback to ~$438–$450 that holds the 8/21-day EMA.**

Net: no name offers a valid 3–8% pullback entry today. Two watchlist candidates (both Technology; note the 2-per-sector cap if both eventually trigger).

### STOCK Act scan (idea-generation only — never a buy reason)
Nothing actionable: recent House/Senate disclosures were munis/structured notes (McCormick), individual bank stocks (Latta FMAO), and lagged large-cap buys (Moskowitz META/MSFT/MNST filed 7/26 for 6/17 trades; Fields TSM). None presents a clean breakout-on-volume setup, and all lag by up to ~45 days. Dropped — no gate impact.

### Risk Factors
- **Marginal regime + huge jobs week.** SPY sits only +0.15% over its 20-day SMA the day after flipping ON; a soft **NFP on Fri 8/7** could flip it straight back to OFF. Chasing a marginal regime into a binary macro print is exactly the low-quality entry the rules exist to prevent.
- **Peak earnings + entry-timing traps.** The two gate-passers are un-buyable today for opposite reasons (MSFT no pullback, AAPL over-extended pullback). Forcing either would violate the entry discipline and risk buying the top or a broken setup.
- **UNH time-stop due ~8/7** at a <+5% gain — capital may need to be freed this week if it stays flat; factor into any new-entry decision.

### Decision
**HOLD — no new trades.** Regime flipped OFF→ON but only marginally, and neither gate-passing candidate (AAPL, MSFT) offers a valid pullback entry today — AAPL is over-extended (10.4% pullback > 10% break), MSFT has no pullback yet (0.5%). Both go on the watchlist for a proper 3–8% pullback. Hold UNH under standard sell-side rules with its 12% trailing stop; watch its ~8/7 time-stop. Trades this week 0/3. Committed and pushed per the pre-market routine.

## 2026-08-06 (Thu) — Pre-Market Routine

**Decision: HOLD (no new trades). Regime firmly ON (SPY +2.86% over 20d SMA). MSFT is the lone hard-gate passer but its pullback (2.4%) is too shallow for a valid entry — watchlist. Hold AMZN and UNH. ⚠️ New undocumented entry: AMZN (9 sh) appeared on the account since 8/03.**
Regime strengthened decisively from the marginal +0.15% on 8/03 to +2.86% today as SPY rallied 757.72 → 771.11 → 769.79. Only MSFT clears all 11 hard-gate checks, but at a 2.4% pullback it is sitting on its breakout high (buying now = overpaying), so no valid pullback entry exists today. NFP (Jul jobs report) lands tomorrow (Fri 8/07) — a binary macro event; chasing a name at its high the day before is exactly the low-quality entry the rules prevent. Both held positions are healthy, stop-protected, and trigger no sell-side rule.

### Market Regime Status — ON (firmly)
- **Alpaca (deterministic):** SPY last close **769.79** (8/05) vs **20-day SMA 748.37** → **769.79 > 748.37 → REGIME ON**, a decisive **+2.86%** gap (vs a thin +0.15% on 8/03). Recent closes: 729.57 (7/29) → 741.63 → 746.79 → 757.72 → 771.11 → 769.79. The regime has firmed up substantially.
- No flip vs the last committed read (8/03: ON). New long entries permitted, but every candidate must still clear the full 11-check gate AND the entry-timing rules.

### Account Snapshot (live Alpaca, paper)
Equity: **$99,447.20** | Cash: **$94,903.25** | Buying power: $392,336 | Positions: **2 (AMZN, UNH)** | Day trades: 0/3 | PDT: false
- last_equity $99,420.85 (balance_asof 8/05) → true session move ≈ **+$26.35 (+0.03%)**, essentially flat.
- Phase P&L **-$552.80 (-0.55%)** off the live $100k base.
- Trades this week: **1/3** (week of Mon 8/03) — the AMZN buy (~8/04) counts as trade #1; a new buy would be #2.

### Market Context
- **VIX ~15.9** (15.83 open / 15.93 last), roughly flat on the day, well below its ~18.6 long-run average — benign / risk-on tone. Supports the ON regime.
- **WTI crude ~$75** (mixed reads $74.7–$75.8), soft — disinflationary at the margin, pressures Energy.
- **Econ calendar today (8/06):** Initial jobless claims (exp 203k vs 197k prior), Q2 preliminary nonfarm productivity (+0.6%) & unit labor costs (+2.2%), wholesale inventories. Second-tier data.
- **⚠️ Tomorrow (Fri 8/07): July Employment Report (NFP)** — the week's key binary macro event. A soft print could pressure the tape; a hot one revives rate-cut-delay fears. Reason enough to avoid a marginal entry today.
- CPI Wed 8/12, PPI Thu 8/13 next week. No FOMC this week (Jul 29 minutes land 8/19).

### Sector Momentum
- **Leading:** Technology (XLK #1), Energy (surged to #2), Financials, with Industrials/Aerospace & Defense clusters hitting 52-week highs.
- **Lagging:** Utilities; Real Estate mixed. Energy strength is oil-price-driven and choppy.

### Held-Position Review
- **AMZN** (Consumer Discretionary, 9 sh @ $276.95) — current **$274.30**, **-0.96%** (unrealized -$23.85). Far above the -8% cut and below the +15% tighten threshold → **no sell-side rule triggered.** Live 12% trailing-stop GTC intact (id 26477093, stop $248.85, hwm $282.78; qty_available 0 = reserved by the stop). Earnings reported **7/30** (EPS $5.75 beat); **next earnings ~10/29/2026** — well outside the 10-trading-day window. Entered ~8/04, ~2 trading days held (inside the 15-day time stop). News: Bezos sold ~$350M and Berkshire fully exited AMZN — a mild sentiment overhang, not a thesis-breaker while price holds. **HOLD.**
  ⚠️ **Undocumented entry:** AMZN was not in the last committed book (8/03 was UNH-only) and has no committed research/trade-log buy entry — the same recurring pattern flagged for CVX (6/12), JPM (~7/01), and MS/UNH (7/10–7/20). It IS fully stop-protected. Operator should confirm the actual fill price, date, and catalyst. (Note: on 8/03 AMZN was screened as passing volume but FAILING breakout — so this entry did not clear the documented gate.)
- **UNH** (Healthcare, 5 sh @ $423.22) — current **$415.05**, **-1.93%** (unrealized -$40.85). Far above the -8% cut and below the +15% tighten threshold → **no sell-side rule triggered.** Live 12% trailing-stop GTC intact (id 1cd14949, stop $384.51, hwm $436.945). Next earnings ~late Oct 2026 — outside the 10-day window. ⏳ **Time-stop watch:** entered ~7/20, ~13 trading days held at a <+5% gain (currently -1.93%) — the **15-trading-day time stop comes due ~8/07 (tomorrow)**. Not triggered today; if UNH is still flat (< +5%) at the midday/EOD scan on 8/07, it must be CUT per the time-stop rule. **HOLD today, flag for 8/07.**

### Trade Ideas (regime ON) — deterministic buy_gate.sh screen across momentum leaders
Only **$MSFT** clears all 11 hard-gate checks; it FAILS the entry-timing discipline (pullback too shallow) → **watchlist, not a buy.** AAPL/NVDA/AVGO all fail the hard breakout check.

- **$MSFT** (Technology) — 11-check hard gate: **PASS.** Breakout: 3-mo high 499.34 in last 5d (PASS); volume 4.74M vs 2.24M threshold (~3.2x avg, PASS); regime/positions/sector(0 tech held)/trades(2)/cost/PDT/earnings(next ~late Oct)/catalyst/is-stock all PASS. Sizing: entry ~$487.46, 5 sh, cost ~$2,437, stop $448.46 (-8%), target $604.45 (+24%). ❌ **Entry timing FAIL:** pullback from the breakout high is only **2.4%** — below the 3–8% entry band. MSFT is sitting on its high; buying now = overpaying (same reason as 8/03, when it was 0.5%). **Watchlist — wait for a 3–8% pullback to ~$460–$472 that holds the 8/21-day EMA.**
- **$AAPL** (Technology) — hard gate **FAIL (c9 breakout):** last-5-day high 334.41 < prior 3-mo high 344.56 — the breakout is now stale (>5 trading days old) and AAPL has pulled back off it (shadow pullback 7%). It passed breakout on 8/03 but the window has lapsed. **Dropped for now.**
- **$NVDA** — hard gate FAIL (c9 breakout + c10 volume). **$AVGO** — hard gate FAIL (c9 breakout). Neither is near a fresh breakout-on-volume setup. Dropped.

### STOCK Act scan (idea-generation only — never a buy reason)
Nothing actionable: recent disclosures (Rick Scott, McCormick) are municipal water/sewer revenue bonds and GS structured notes — not common stocks, and lagged. Dropped — no gate impact.

### Risk Factors
- **NFP tomorrow (8/07).** A binary jobs print the day after a marginal-to-firm regime; forcing a marginal entry (MSFT at its high) into it is exactly the low-quality trade the rules prevent.
- **UNH time stop due ~8/07** at a <+5% gain — capital may be freed this week if it stays flat; the midday/EOD scan on 8/07 should enforce the time stop.
- **AMZN undocumented entry / Bezos+Berkshire selling** — a mild overhang; monitor that the entry was intentional and the 12% trailing stop remains live.

### Decision
**HOLD — no new trades.** Regime is firmly ON, but the only hard-gate passer (MSFT) has no valid pullback entry (2.4% < 3% floor), and NFP is tomorrow — the disciplined answer is to wait. MSFT stays on the watchlist for a 3–8% pullback. Hold AMZN and UNH under standard sell-side rules with their live 12% trailing stops; **enforce UNH's ~8/07 time stop** if it is still flat at the next scan. Confirm the undocumented AMZN entry. Trades this week 1/3. Committed and pushed per the pre-market routine.

## 2026-08-07 (Fri) — Pre-Market Routine

**Decision: TIME-STOP CUT UNH (5 sh) + HOLD (no new buys). UNH hit its 15-trading-day time stop today at a loss (-4.58%) → cancelled its 12% trailing-stop GTC and queued a market SELL 5 sh (day) to fill at the open. Regime firmly ON (SPY +2.59% over 20d SMA), but NFP (Jul jobs report) lands today and the lone hard-gate passer (MSFT) has no valid pullback (0.3%) → no new entries. Hold AMZN.**
The UNH time stop, flagged for enforcement on ~8/07 across the last several logs, came due today: UNH entered ~7/20 and today (8/07) is its 15th trading session held (7/20–8/07 inclusive: 5+5+5 = 15), at -4.58% (< +5% gain) — dead money at a small loss for ~3 weeks. Rule ("Close any position that is flat < +5% gain after 15 trading days") enforced: trailing-stop GTC (id 1cd14949) cancelled, market SELL 5 UNH (day) submitted (id e4795cfd, status new) to fill at the 9:30 ET open — same mechanism as the 7/30 MS cut. No new buys: NFP is today (binary macro), and MSFT (only 11-check passer) sits on its high (0.3% pullback < 3% floor).

### Market Regime Status — ON (firmly)
- **Alpaca (deterministic):** SPY last close **768.64** (8/06) vs **20-day SMA 749.23** → **768.64 > 749.23 → REGIME ON**, a solid **+2.59%** gap. Recent closes: 741.63 (7/30) → 746.79 → 757.72 → 771.11 → 769.79 → 768.64. Gemini corroborated (SPY 769.79 > 20d SMA 748.41).
- No flip vs the last committed read (8/06: ON). New long entries permitted, but every candidate must still clear the full 11-check gate AND the entry-timing rules.

### Account Snapshot (live Alpaca, paper)
Equity: **$99,383.85** | Cash: **$94,903.25** | Buying power: $392,159 | Positions: **2 (AMZN, UNH — UNH cut queued)** | Day trades: 0/3 | PDT: false
- last_equity $99,373.44 (balance_asof 8/06) → true session move ≈ **+$10.41 (+0.01%)**, essentially flat pre-bell.
- Phase P&L **-$616.15 (-0.62%)** off the live $100k base.
- Trades this week: **1/3** (week of Mon 8/03) — the AMZN buy (~8/04) is trade #1; the UNH sell does NOT count toward the 3-new-buys/week limit.

### Market Context
- **VIX ~15.85** (15.15 close 8/06, down ~11% on the week) — benign / risk-on, well below its ~18.6 long-run average. Supports the ON regime.
- **WTI crude ~$75** — soft, disinflationary at the margin, pressures Energy.
- **⚠️ Econ calendar today (8/07): July Employment Report (NFP)** — the week's key binary macro event (consensus ~+80k NFP, unemployment 4.2%, AHE +0.3% m/m). A soft print could pressure the tape; a hot one revives rate-cut-delay fears. Reason enough to avoid a marginal entry today.
- CPI Wed 8/12, PPI Thu 8/13 next week. No FOMC this week (Jul 29 minutes land 8/19).

### Sector Momentum
- **Leading:** Technology (XLK), Energy, Industrials (aerospace/defense clusters at 52-wk highs), Communication Services.
- **Lagging:** Utilities, Real Estate. Energy strength is oil-price-driven and choppy.

### Held-Position Review
- **UNH** (Healthcare, 5 sh @ $423.22) — current **~$403.85**, **-4.58%**. ⏳ **15-TRADING-DAY TIME STOP DUE TODAY** (entered ~7/20; 7/20–8/07 = 15 sessions) at a <+5% gain → **CUT per Strategy time-stop rule.** Action taken: cancelled 12% trailing-stop GTC (id 1cd14949) and queued market SELL 5 sh (day, id e4795cfd) to fill at the open; approx realized ≈ **-$96.85 (-4.58%)** on the ~$2,116 cost basis. No averaging down, no hoping — dead money cleared, ~$2,020 capital freed. Next earnings ~late Oct (outside window); no thesis-relevant news (some late-July Medicare drug-subsidy headlines, mild sector negative, not a catalyst). Was an undocumented entry from the 7/10–7/20 gap.
- **AMZN** (Consumer Discretionary, 9 sh @ $276.95) — current **$273.40**, **-1.28%** (unrealized -$31.95). Far above the -8% cut and below the +15% tighten threshold → **no sell-side rule triggered.** Live 12% trailing-stop GTC intact (id 26477093, stop $248.85, hwm $282.78; qty_available 0 = reserved by the stop). Earnings reported 7/30; next ~10/29/2026 (outside 10d). Entered ~8/04, ~4 trading days held (inside 15-day time stop). News benign (routine 13F stake changes). **HOLD.**

### Trade Ideas (regime ON) — deterministic buy_gate.sh screen
Only **$MSFT** clears all 11 hard-gate checks; it FAILS entry timing (pullback too shallow) → **watchlist, not a buy.**

- **$MSFT** (Technology) — 11-check hard gate: **PASS** (regime, positions 2, sector 0 tech held, trades 1, cost $2000 vs cash, PDT 0, earnings none-in-window, catalyst, breakout: 3-mo high 501.54 in last 5d, volume 2.34M vs 2.23M threshold ~1.6x, is-stock). Sizing: entry ~$500.04, 4 sh, cost ~$2,000, stop $460.03 (-8%), target $620.04 (+24%). ❌ **Entry timing FAIL:** pullback from breakout high is only **0.3%** — MSFT is sitting on its high; buying now = overpaying (same as 8/03, 8/06). **Watchlist — wait for a 3–8% pullback to ~$460–$485 that holds the 8/21-day EMA.**
- Pre-market movers screen: only micro-cap/low-float junk (NAMI, DSY, CPOP, AQB) and earnings-reaction names (TEAM +30%, TTD -27%) — no clean momentum-leader breakout-on-volume setup. Dropped.

### STOCK Act scan (idea-generation only — never a buy reason)
Nothing actionable this run — no clean breakout-on-volume common-stock setup surfaced; all disclosures lag by up to ~45 days. Dropped — no gate impact.

### Risk Factors
- **NFP today (8/07)** — binary jobs print; forcing a marginal entry (MSFT at its high) into it is exactly the low-quality trade the rules prevent.
- **Fill risk on the UNH exit** — market SELL queued pre-bell fills at the open at whatever the print is; NFP could move the open. Acceptable: the time stop mandates the exit and downside was already capped by the (now-cancelled) trailing stop before submission.
- **AMZN** — mild sentiment overhang (prior Bezos/Berkshire selling); monitor that its 12% trailing stop remains live.

### Decision
**TIME-STOP CUT UNH; otherwise HOLD — no new buys.** UNH's 15-trading-day time stop came due today at a -4.58% loss → cancelled its trailing stop and queued a market SELL 5 sh to fill at the open (frees ~$2,020). Regime is firmly ON, but the only hard-gate passer (MSFT) has no valid pullback (0.3% < 3% floor) and NFP is today, so no new entries — MSFT stays on the watchlist. Hold AMZN under standard sell-side rules with its live 12% trailing stop. Trades this week 1/3 (the UNH sell does not count). Verify the UNH fill and record it (TRADE-LOG) at the midday/EOD scan. Committed and pushed per the pre-market routine.
