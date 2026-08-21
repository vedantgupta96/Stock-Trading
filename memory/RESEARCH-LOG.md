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

## 2026-08-10 (Mon) — Pre-Market Routine

**Decision: HOLD — no new buys. Regime firmly ON (SPY +3.07% over its 20d SMA), but no candidate offers both a fresh breakout-on-volume AND a valid 3–8% pullback: the only two hard-gate passers (MSFT, PLTR) are sitting on their highs (pullback 0.2–1% < 3% floor → entry-timing FAIL), and the one name with a real pullback (GOOGL, 7.8%) has a stale breakout. Hold AMZN. UNH time-stop exit from 8/07 confirmed filled — book is now AMZN-only + cash.**
New trading week (Mon 8/10). Book cleaned up: UNH's 15-day time-stop market SELL (queued 8/07) filled — UNH is out of positions and cash rose to $96,914.50 (~$2,011 UNH proceeds vs the $94,903 pre-sale cash on 8/07). Sole remaining position is AMZN, fully stop-protected. Strong, broad tape at record highs keeps the leaders extended right on their highs — the same no-valid-pullback picture as 8/03/8/06/8/07, so the disciplined answer stays HOLD.

### Market Regime Status — ON (firmly)
- **Alpaca (deterministic, via buy_gate):** SPY last close **773.16** vs **20-day SMA 750.14** → **773.16 > 750.14 → REGIME ON**, a solid **+3.07%** gap (82 bars). No flip vs the last committed read (8/07: ON). New long entries permitted, but every candidate must still clear the full 11-check gate AND the entry-timing rule.
- Gemini refused the future-dated regime/VIX queries (as on prior runs) → relied on the deterministic Alpaca read, which is the authoritative source per the buy-gate design.

### Account Snapshot (live Alpaca, paper)
Equity: **$99,391.66** | Cash: **$96,914.50** | Buying power: $394,594 | Positions: **1 (AMZN)** | Day trades: 0/3 | PDT: false
- last_equity $99,384.82 (balance_asof 8/07) → true session move ≈ **+$6.84 (+0.01%)**, essentially flat pre-bell.
- Phase P&L **-$608.34 (-0.61%)** off the live $100k base.
- Trades this week: **0/3** (new week of Mon 8/10). Sells (the 8/07 UNH cut) don't count toward the 3-new-buys/week limit.

### Market Context
- **VIX ~14.9** (14.90 close 8/07; 1-month range 14.77–20.88, avg ~17.06) — benign / risk-on, well below its ~18.6 long-run average. Supports the ON regime.
- **WTI crude ~$78** (reads $77.8–$79.3, up ~1–2% on the day) — firmer than last week's ~$75; a mild tailwind for Energy rather than the prior soft/disinflationary read.
- **Econ calendar today (8/10):** no major US macro releases (bill auctions, routine Fed H.15/H.10 only). **CPI Wed 8/12** and **PPI Thu 8/13** are this week's binary events; **Retail Sales + prelim UMich sentiment Fri 8/14**. NFP already landed last week (8/07). Jul FOMC minutes 8/19; next FOMC decision 9/16.
- ⚠️ CPI (Wed) is the week's key print — a hot number could pressure the tape; a reason not to chase a marginal entry early in the week.

### Sector Momentum
- **Leading:** Information Technology (XLK, +8.4% recent), Materials (+7.6%), Health Care (+5.0%), Financials, Industrials (+2.8%) — broad rally, Dow at all-time highs; AI names (PLTR +29.5%, SHOP +17%) led last week.
- **Lagging:** Utilities, Real Estate. Energy firmer on the crude bounce but choppy.

### Held-Position Review
- **AMZN** (Consumer Discretionary, 9 sh @ $276.95) — current **$275.24**, **-0.62%** (unrealized -$15.39; cost basis $2,492.55, mkt value $2,477.16). Far above the -8% cut and below the +15% tighten threshold → **no sell-side rule triggered.** Live 12% trailing-stop GTC intact (id 26477093, stop $248.85, hwm $282.78; qty_available 0 = reserved by the stop). Earnings reported 7/30 (EPS $5.75 beat, AWS +37%); **next earnings ~10/29/2026** — outside the 10-day window. Entered ~8/04 → ~5 trading days held (inside the 15-day time stop). News benign: strong AWS/AI backlog ($496B), $220B capex guide (a mild FCF overhang), routine insider selling (~$367M/3mo). **HOLD.**
  ⚠️ **Undocumented entry (still open item):** AMZN has no committed research/trade-log buy entry — the recurring pattern flagged for CVX (6/12), JPM (~7/01), MS/UNH (7/10–7/20). It IS fully stop-protected. Operator should confirm the actual fill price/date/catalyst.

### Trade Ideas (regime ON) — deterministic buy_gate.sh screen across momentum leaders
Screened MSFT, NVDA, AVGO, AAPL, PLTR, GOOGL, META, NFLX. **Only MSFT and PLTR clear all 11 hard-gate checks; BOTH fail entry timing (sitting on their highs).** No name offers a fresh breakout-on-volume AND a valid 3–8% pullback → **watchlist, no buys.**

- **$MSFT** (Technology) — 11-check hard gate **PASS** (regime; positions 1; 0 tech held; trades 0; cost $2,499 vs $96.9k cash; PDT 0; earnings none-in-window; catalyst; breakout: 3-mo high 505.10 in last 5d; volume 2.34M vs 2.22M threshold ~1.6x; is-stock). Sizing: entry ~$499.88, 5 sh, cost ~$2,499, stop $459.89 (-8%), target $619.85 (+24%). ❌ **Entry timing FAIL:** pullback from breakout high is only **~1%** — MSFT is on its high; buying now = overpaying (same as 8/03/8/06/8/07). **Watchlist — wait for a 3–8% pullback to ~$465–$490 that holds the 8/21-day EMA.**
- **$PLTR** (Technology) — 11-check hard gate **PASS** (breakout: high 172.41 in last 5d; volume PASS). But this is a **post-earnings +29.5% gap** and the pullback is only **0.2%** — PLTR is pinned to its high after a huge earnings move. ❌ **Entry timing FAIL** (0.2% < 3% floor) and chasing a 30% earnings gap is exactly the low-quality entry the rules prevent. **Watchlist only.**
- **$GOOGL** — hard gate **FAIL (c9 breakout stale):** it has a real **7.8%** pullback off its recent high, but no fresh 3-mo/52-wk high in the last 5 trading days → the setup isn't a valid breakout-on-volume entry. **Dropped.**
- **$NVDA / $AVGO / $AAPL / $META / $NFLX** — all **FAIL c9 breakout** (stale; NVDA/META/NFLX also fail c10 volume), pullbacks 0.4–1.5%. None near a fresh breakout-on-volume setup. **Dropped.**

### STOCK Act scan (idea-generation only — never a buy reason)
Recent disclosures: Rep. David Taylor bought **AVGO** (7/24) and **GOOGL** (7/17) and KR; Sen. Tuberville bought Realty Income **O** (7/23, a REIT — we don't trade ETFs/REITs); Sen. Whitehouse *sold* LOW. **Nothing actionable:** AVGO and GOOGL both FAIL our hard gate (stale breakouts) independently, and all disclosures lag by up to ~45 days. Dropped — no gate impact.

### Risk Factors
- **CPI Wed 8/12 (then PPI Thu, Retail Sales Fri).** A hot CPI could pressure a record-high tape; forcing a marginal entry (a leader on its high) ahead of it is the low-quality trade the rules prevent.
- **Leaders extended at highs.** The whole momentum complex is sitting on its highs with no pullback — the persistent condition that has kept us in HOLD; risk is chasing and overpaying, not missing out.
- **AMZN undocumented entry / $220B capex overhang / insider selling** — mild sentiment overhang; monitor that its 12% trailing stop stays live and that the entry was intentional.

### Decision
**HOLD — no new trades.** Regime is firmly ON (SPY +3.07% over its 20d SMA, VIX ~14.9), but no candidate clears both the hard gate and the entry-timing rule: MSFT and PLTR pass the 11 checks yet sit on their highs (pullback < 3%), and GOOGL's only real pullback comes off a stale breakout. MSFT stays on the watchlist for a 3–8% pullback into CPI week. Hold AMZN under standard sell-side rules with its live 12% trailing stop; UNH's 8/07 time-stop exit is confirmed filled (book AMZN-only + cash). Trades this week 0/3. No urgent notification warranted (AMZN -0.62%, no near earnings, regime unchanged). Committed and pushed per the pre-market routine.

## 2026-08-12 (Wed) — Pre-Market Routine

**Decision: HOLD — no new buys. Regime firmly ON (SPY 770.52 > 20d SMA 752.26, +2.43%), but no candidate clears both the 11-check hard gate AND the 3–8% pullback entry-timing rule. Only PLTR passes all 11 hard-gate checks, and it fails entry timing (2.6% pullback < 3% floor; a post-earnings ~+30% gap pinned to its high). Every other leader fails c9 breakout and/or c10 volume. CPI (July) drops today at 8:30 ET — a binary macro event ahead of this run. Hold AMZN.**

CPI-day. This 6:00 AM CT pre-market ran ahead of the 7:30 AM CT (8:30 ET) July CPI release. Book is AMZN-only + cash. The persistent condition holds: strong, broad, record-high tape keeps the leaders extended right on their highs with no valid pullback — the same no-entry picture as 8/03/8/06/8/07/8/10.

### Market Regime Status — ON (firmly)
- **Alpaca (deterministic, via buy_gate):** SPY last close **770.52** vs **20-day SMA 752.26** → **770.52 > 752.26 → REGIME ON**, a solid **+2.43%** gap (83 bars). No flip vs the last committed read (8/10: ON). New long entries permitted, but every candidate must still clear the full 11-check gate AND the entry-timing rule.
- Gemini refused the future-dated SPY/SMA regime query (as on prior runs) → relied on the deterministic Alpaca read, which is the authoritative source per the buy-gate design.

### Account Snapshot (live Alpaca, paper)
Equity: **$99,373.84** | Cash: **$96,914.50** | Buying power: $394,544 | Positions: **1 (AMZN)** | Day trades: 0/3 | PDT: false
- last_equity $99,364.93 (balance_asof 8/11) → true session move ≈ **+$8.91 (+0.01%)**, essentially flat pre-bell — exactly AMZN's unrealized_intraday_pl (+$8.91, +0.36%).
- Phase P&L **-$626.16 (-0.63%)** off the live $100k base.
- Trades this week: **0/3** (week of Mon 8/10). Sells don't count toward the 3-new-buys/week limit.

### Market Context
- **VIX ~15.28** (8/11; 15.46 on 8/10; range 14.77–20.88 over the past month) — benign / risk-on, near 2026 lows and well below its ~18.6 long-run average. Supports the ON regime. (VIX historically bottoms in Jul and tends to rise in Aug — worth watching.)
- **July CPI today (8/12, 8:30 ET):** consensus **headline +0.1% m/m / +3.4% y/y** (June was -0.4% m/m / +3.5% y/y) and **core +0.2% m/m / +2.5% y/y** (June +2.6% y/y). This is the week's key binary print — a hot number could pressure the record-high tape. Released after this pre-market run.
- **PPI Thu 8/13; Retail Sales + prelim UMich sentiment Fri 8/14.** NFP already landed 8/07. Jul FOMC minutes 8/19; next FOMC decision 9/16.

### Sector Momentum
- **Leading (week to 8/07):** Technology (XLK ~+7.3%), Basic Materials (~+6.3%). Broad rally; S&P +3.6%, Nasdaq +5.2% on the week.
- **Lagging:** Energy (~-3.4%), Utilities (~-1.3%).

### Held-Position Review
- **AMZN** (Consumer Discretionary, 9 sh @ $276.95) — current **$273.26**, **-1.33%** (unrealized -$33.21; cost basis $2,492.55, mkt value $2,459.34). Far above the -8% cut and below the +15% tighten threshold → **no sell-side rule triggered.** Live 12% trailing-stop GTC intact (id 26477093, stop $248.85, hwm $282.78; qty_available 0 = reserved by the stop). Q2 reported 7/30 (EPS $5.75 beat, AWS +37%, backlog ~$500B; briefly topped $3T mkt cap this week); **next earnings ~10/29/2026** — outside the 10-day window. Entered ~8/04 → ~7 trading days held (inside the 15-day time stop, due ~8/25). News benign: planned Bezos 10b5-1 sale (~$350M), $220B 2026 capex overhang (mild FCF concern), Zoox robotaxi launch — nothing thesis-breaking. **HOLD.**
  ⚠️ **Undocumented entry (still open item):** AMZN has no committed research/trade-log buy entry — the recurring pattern flagged for CVX (6/12), JPM (~7/01), MS/UNH (7/10–7/20). It IS fully stop-protected. Operator should confirm the actual fill price/date/catalyst.

### Trade Ideas (regime ON) — deterministic buy_gate.sh screen across momentum leaders
Screened MSFT, NVDA, AVGO, PLTR, GOOGL, META, NFLX, AAPL. **Only PLTR clears all 11 hard-gate checks — and it fails the entry-timing rule.** No name offers a fresh breakout-on-volume AND a valid 3–8% pullback → **watchlist, no buys.**

- **$PLTR** (Technology) — 11-check hard gate **PASS** (regime; positions 1; 0 tech held; trades 0; cost $2,449 vs $96.9k cash; PDT 0; earnings none-in-window; catalyst; breakout: 3-mo high 179.59 in last 5d; volume last5 max 3.19M ≥ 2.07M threshold ~2.3x; is-stock). Sizing: entry ~$174.94, 14 sh, cost ~$2,449, stop $160.94 (-8%), target $216.93 (+24%). ❌ **Entry timing FAIL:** pullback from breakout high is only **2.6%** (< 3% floor) — PLTR is pinned to its high after a ~+30% post-earnings gap; buying now = overpaying and chasing an earnings gap, exactly the low-quality entry the rules prevent. **Watchlist — wait for a 3–8% pullback that holds the 8/21-day EMA (and note earnings-gap risk).**
- **$MSFT** (Technology) — hard gate **FAIL (c10 volume:** last5 max 1.12M < 2.15M threshold); pullback 1.9% too shallow anyway. Dropped/watchlist.
- **$NVDA** (3.3% pullback), **$AVGO** (3.8%), **$AAPL** (3.6%) — real pullbacks, but all **FAIL c9 breakout (stale)** and **c10 volume**. No fresh breakout-on-volume. Dropped.
- **$GOOGL** — **FAIL c9 breakout (stale):** 10.6% pullback (near the broken-setup threshold) off a high with no fresh 3-mo/52-wk high in the last 5 sessions. Dropped.
- **$META / $NFLX** — **FAIL c9 + c10;** shallow pullbacks, no fresh breakout. Dropped.

### STOCK Act scan (idea-generation only — never a buy reason)
No new actionable common-stock disclosure surfaced this run that also clears our hard gate; all disclosures lag by up to ~45 days. Dropped — no gate impact.

### Risk Factors
- **July CPI today (8/12, 8:30 ET), then PPI Thu / Retail Sales Fri.** A hot CPI could pressure the record-high tape; forcing a marginal entry (a leader on its high) ahead of it is the low-quality trade the rules prevent.
- **Leaders extended at highs.** The entire momentum complex sits on its highs with no valid pullback — the persistent condition that has kept us in HOLD; the risk is chasing/overpaying, not missing out.
- **AMZN undocumented entry / $220B capex overhang / Bezos selling** — mild sentiment overhang; monitor that its 12% trailing stop stays live and that the entry was intentional.

### Decision
**HOLD — no new trades.** Regime is firmly ON (SPY +2.43% over its 20d SMA, VIX ~15.3), but no candidate clears both the hard gate and the entry-timing rule: only PLTR passes the 11 checks and it sits on its high (2.6% pullback < 3% floor, on a ~+30% post-earnings gap), while the leaders with real pullbacks (NVDA/AVGO/AAPL/GOOGL) all fail on stale breakouts / thin volume. PLTR stays on the watchlist for a valid pullback. Hold AMZN under standard sell-side rules with its live 12% trailing stop (next earnings ~10/29, ~7 of 15 time-stop days used). Trades this week 0/3. July CPI lands today at 8:30 ET — a binary event ahead of this run. No urgent notification warranted (AMZN -1.33%, no near earnings, regime unchanged ON). Committed and pushed per the pre-market routine.

## 2026-08-13 (Thu) — Pre-Market Routine

**Decision: HOLD in this pre-market run / PRIME `$PLTR` for MIDDAY execution post-PPI.** Regime firmly ON (SPY 772.54 > 20d SMA 753.15, +2.57%). For the first time in weeks a name clears BOTH the 11-check hard gate AND the 3–8% entry-timing band: **PLTR passes all 11 checks with a valid 4.7% pullback on below-average volume**, holding its ~$168–172 support shelf. This is the best setup in weeks — but PPI + jobless claims drop at 8:30 ET (~90 min after this 6 AM CT run) and entry-timing wants live intraday confirmation, so I am NOT buying into a binary macro print on a thin pre-market quote. PLTR is queued for the midday scan with a mechanical trigger (below). Hold AMZN.

### Market Regime Status — ON (firmly)
- **Alpaca (deterministic, via buy_gate):** SPY last close **772.54** vs **20-day SMA 753.15** → **772.54 > 753.15 → REGIME ON**, a solid **+2.57%** gap (83 bars). No flip vs the last committed read (8/12: ON). New long entries permitted, but each candidate must still clear the full 11-check gate AND the entry-timing rule.
- **Gemini corroborated:** "the S&P 500 index level is above its 20-day simple moving average" (S&P ~7756 vs 20d SMA ~7748). Both sources agree → regime ON.

### Account Snapshot (live Alpaca, paper)
Equity: **$99,325.60** | Cash: **$96,914.50** | Buying power: $394,409 | Positions: **1 (AMZN)** | Day trades: 0/3 | PDT: false
- last_equity $99,320.02 (balance_asof 8/12) → true session move ≈ **+$5.58 (+0.01%)**, essentially flat pre-bell — exactly AMZN's unrealized_intraday_pl (+$5.58, +0.23%).
- Phase P&L **-$674.40 (-0.67%)** off the live $100k base.
- Trades this week: **0/3** (week of Mon 8/10). Sells don't count toward the 3-new-buys/week limit.

### Market Context
- **VIX ~14.6–15.3** (8/12 ~14.55–15.28, down ~4.8% d/d; intraday low 14.74) — benign / risk-on, near 2026 lows and well below its ~18.6 long-run average. Supports the ON regime.
- **PPI (July) today 8/13, 8:30 ET** — consensus **+0.2% m/m headline / +4.9% y/y** (prior -0.3% m/m / +5.5% y/y), **core +0.3% m/m / +4.2% y/y**. **Initial Jobless Claims** same slot (cons. ~202k vs 199k prior). Both released ~90 min AFTER this pre-market run → the week's binary wholesale-inflation print is still ahead. **Retail Sales + prelim UMich** Fri 8/14. July CPI (8/12) landed in line. Jul FOMC minutes 8/19; next FOMC 9/16.
- **WTI crude ~$82/bbl, down ~1–2%** on weaker 2026 demand forecasts (OPEC/IEA cut) + a large US inventory build → Energy sector soft.

### Sector Momentum
- **Leading (to 8/13):** Technology (XLK +1.1% Wed), Real Estate (XLRE +1.1%), Utilities (XLU +0.5%). Tech remains the momentum leader — supportive backdrop for a tech long (PLTR).
- **Lagging:** Materials (XLB -1.2% Wed), Energy (soft on the oil slide).

### Held-Position Review
- **AMZN** (Consumer Discretionary, 9 sh @ $276.95) — current **$267.90**, **-3.27%** (unrealized -$81.45; cost basis $2,492.55, mkt value $2,411.10). Far above the -8% cut and below the +15% tighten threshold → **no sell-side rule triggered.** Live 12% trailing-stop GTC intact (id 26477093, stop **$248.85**, hwm $282.78; qty_available 0 = reserved by the stop). Q2 reported 7/30 (EPS $5.75 beat, AWS +37%, backlog ~$496B, $3T mkt cap); **next earnings ~10/29/2026** — outside the 10-day window. Entered ~8/04 → ~8 trading days held (inside the 15-day time stop, due ~8/25). News benign: strong AWS/AI backlog, $220B 2026 capex overhang (mild FCF concern), routine insider selling / Bezos 10b5-1 — nothing thesis-breaking. **HOLD.**
  ⚠️ **Undocumented entry (still open item):** AMZN has no committed research/trade-log buy entry — the recurring pattern flagged for CVX (6/12), JPM (~7/01), MS/UNH (7/10–7/20). It IS fully stop-protected. Operator should confirm the actual fill price/date/catalyst.

### Trade Ideas (regime ON) — deterministic buy_gate.sh screen across momentum leaders
Screened MSFT, NVDA, AVGO, PLTR, GOOGL, META, NFLX, AAPL, plus AI movers CRWV/NBIS/CAVA. **Only PLTR clears all 11 hard-gate checks — and this time it ALSO clears entry timing (4.7% pullback, in the 3–8% band).**

- **$PLTR** (Technology) — **11-check hard gate PASS** *and* **entry-timing PASS.** Gate detail: regime ON; positions 1→2 (≤5); tech held 0→1 (≤2); trades 0→1 (≤3); cost $2,395 vs $96.9k cash; PDT 0; earnings none-in-window (reported early Aug, next ~90d out); catalyst (blowout Q2 → +30% gap 8/04); **c9 breakout PASS** (3-mo/all-time high 179.59 on 8/10, within last 5d; prior_high 166.02); **c10 volume PASS** (breakout-day 5.59M on 8/04 and 3.19M on 8/07 vs ~1.40M 20d avg → 2.3–4x; last5 max 3.19M ≥ 2.11M threshold); is-stock. **Pullback structure (healthy):** high 179.59 (8/10) → 174.94 (8/11) → **171.09 (8/12)** = **-4.7%** on *declining, below-average* volume (1.41M then 1.22M < 1.40M avg = sellers drying up), holding the 8/07 breakout shelf (~$172) and above the 8-day EMA. **Sizing (risk cap $200):** entry ~$171.09, notional $2,500 → **14 shares, cost ~$2,395**, risk at 8% = **$191.62** (< $200 cap). Hard stop (-8%) **$157.40**; initial 12% trailing trigger ~$150.56; target (+24%) **$212.15**.
  → **PRIMED, not bought.** Two reasons to wait for the midday scan rather than fire in this 6 AM pre-market run: (1) **PPI + jobless claims at 8:30 ET** — a binary wholesale-inflation print ~90 min out; a high-beta post-earnings-gap name is the last thing to buy into an event you can simply wait out with zero edge lost. (2) **Entry-timing confirmation** — "enter IF it holds support on light pullback volume" is a live-intraday judgment, not a thin pre-market quote. **Midday trigger:** buy 14 sh PLTR IF (a) PPI/claims are benign (no risk-off gap), (b) PLTR holds ≥ ~$168 (the breakout shelf / 8-EMA) on below-average volume, and (c) it still clears buy_gate at the midday scan. On the fill, immediately place the 12% trailing-stop GTC (fallback: fixed 8% stop $157.40 + queue trailing next AM if a same-day trailing stop is PDT-rejected).
- **$MSFT** (Technology) — hard gate **FAIL (c10 volume:** last5 max 1.12M < 2.09M threshold). c9 breakout passes (513.72 high) and pullback 4.1% is valid, but volume kills it. Watchlist.
- **$NVDA** (0.4% pullback), **$AVGO** (3.9%), **$AAPL** (4.4%), **$GOOGL** (5.6%), **$META** (5.4%), **$NFLX** (3.5%) — all **FAIL c9 breakout (stale)** and **c10 volume;** no fresh 3-mo/52-wk high in the last 5 sessions. Dropped.
- **$CRWV / $NBIS / $CAVA** — pass c10 volume but **FAIL c9 breakout (stale);** CRWV/CAVA are well off their highs, NBIS is pinned to its high (0.1% pullback). Dropped. (Pre-market movers were dominated by junk small-caps — OFAL/RMCF/CHOW/BOXL — none tradeable.)

### STOCK Act scan (idea-generation only — never a buy reason)
Only disclosure surfaced: Sen. Gary Peters bought **Realty Income (O)** — a REIT, which we don't trade (stocks only) — filed 8/11 for a 7/23 transaction. **Nothing actionable;** disclosures lag by up to ~45 days. Dropped — no gate impact.

### Risk Factors
- **PPI + jobless claims 8:30 ET today, Retail Sales Fri.** A hot PPI could pressure the record-high tape; buying a parabolic name into the print is exactly the avoidable event risk the strategy warns against — hence PLTR is primed for *after* the print, not before.
- **PLTR is a post-earnings +30% parabola.** Even with a valid 4.7% pullback, daily ranges are large; the pullback could extend toward a gap-fill ($150s) if PPI disappoints. The $157.40 hard stop / $150.56 trailing trigger sit just below the 8/06 low ($152.75) — structurally sound, but this is a high-beta entry. Size is at the $200 risk cap, no more.
- **AMZN** at -3.27% with the $220B capex overhang — not thesis-breaking, but monitor that its 12% trailing stop stays live and that the (undocumented) entry was intentional.

### Decision
**HOLD in this pre-market run; PRIME `$PLTR` (14 sh, ~$2,395, stop $157.40 / 12% trail, target $212.15) for MIDDAY execution conditional on a benign PPI and PLTR holding ≥ ~$168 support.** Regime firmly ON (SPY +2.57% over its 20d SMA, VIX ~14.6–15.3, Tech leading). PLTR is the first name in weeks to clear both the 11-check hard gate and the 3–8% entry-timing band (4.7% pullback on drying-up volume) — a genuine, gate-passing setup, not a forced marginal entry. It is deliberately queued for after the 8:30 ET PPI/jobless-claims prints rather than bought into a binary event on a thin pre-market quote; the midday scan executes it mechanically if the setup holds. Hold AMZN under standard sell-side rules with its live 12% trailing stop (next earnings ~10/29, ~8 of 15 time-stop days used). Trades this week 0/3 (this would be 1/3). No urgent notification warranted (AMZN -3.27% >> -8% cut, no near earnings, regime unchanged ON — silent per STEP 5). Committed and pushed per the pre-market routine.

## 2026-08-14 (Fri) — Pre-Market Routine

**Decision: HOLD — no new trades.** Regime firmly ON (SPY 777.84 > 20d SMA 754.50, +3.09%), but no candidate clears both the 11-check hard gate AND the 3–8% entry-timing band. The closest gate-clearer (MRK: fresh breakout on ~1.8x volume) sits right on its high with no pullback; the names with real pullbacks (NVDA/GOOGL) fail on stale breakouts and thin volume. Hold AMZN + PLTR under standard sell-side rules — both healthy, theses intact, stop-protected, no earnings in window. Retail Sales (July) drops at 8:30 ET — a binary event ahead of this run; patience beats a forced marginal entry into it.

### Market Regime Status — ON (firmly)
- **Alpaca (deterministic):** SPY last close **777.84** (8/13, latest IEX daily bar) vs **20-day SMA 754.50** → **777.84 > 754.50 → REGIME ON**, a solid **+3.09%** gap. No flip vs the last committed read (8/13: ON). New long entries permitted, but each candidate must still clear the full 11-check gate AND the entry-timing rule.
- **Gemini corroborated:** S&P 500 hit a fresh intraday record 8/13 (~7,816) on a tech/comm-services-led rally — its strongest week since April; index sits well above its 20-day SMA. Both sources agree → regime ON.

### Account Snapshot (live Alpaca, paper)
Equity: **$99,360.87** | Cash: **$94,482.64** | Buying power: $391,589.60 | Positions: **2 (AMZN, PLTR)** | Day trades: 0/3 | PDT: false
- last_equity $99,374.95 (balance_asof 8/13) → true session move ≈ **-$14.08 (-0.01%)**, essentially flat pre-bell.
- Phase P&L **-$639.13 (-0.64%)** off the live $100k base.
- Trades this week: **1/3** (week of Mon 8/10 — PLTR bought 8/13). Room for 2 more, but patience beats activity.

### Market Context
- **VIX ~14.56** (down ~0.5% d/d from a 14.63 close) — benign / risk-on, ~21% below its ~18.6 long-run average. Supports the ON regime.
- **Retail Sales (July) today 8/14, 8:30 ET** — the week's remaining binary macro print (advance monthly retail trade; incl. control group), plus **prelim UMich consumer sentiment / inflation expectations** and June business inventories. All release ~2 hrs after this pre-market run. **July CPI (8/12)** landed in-line (+0.1% m/m headline, **+3.4% y/y**; core +0.2% m/m, +2.5% y/y). **July PPI (8/13)** benign (final demand unchanged m/m; +4.7% y/y). **Jul FOMC minutes 8/19**; next FOMC 9/16.
- **WTI crude ~$82/bbl**, up ~1–2% on the day on Mideast supply risk, but the medium-term outlook is soft (OPEC + IEA cut 2026 demand forecasts; a 17.4M-bbl US inventory build). Energy strong month-to-date on price, mixed near-term.

### Sector Momentum
- **Leading (week to 8/13):** Technology (+~1% Wed, week's leader; IT +1.68% w/w to 8/12) and Communication Services (+~1% Wed) drove the record — supportive backdrop but the tech complex is extended at highs. Energy leads MTD (+~12% Aug on oil). Real Estate / Utilities / Industrials modestly positive.
- **Lagging:** nothing sharply negative this week — a broad, risk-on tape into Retail Sales.

### Held-Position Review
- **AMZN** (Consumer Discretionary, 9 sh @ $276.95) — current **$264.95**, **-4.33%** (unrealized -$108.00; cost basis $2,492.55, mkt value $2,384.55). Far above the -8% cut and below the +15% tighten threshold → **no sell-side rule triggered.** Live 12% trailing-stop GTC intact (id 26477093, stop **$248.85**, hwm $282.78; qty_available 0 = reserved by the stop). Q2 reported 7/30 (EPS $5.75 beat, AWS +37% to $42.2B, backlog ~$496B; topped $3T mkt cap 8/03); **next earnings ~10/29/2026** — outside the 10-day window. Entered ~8/04 → **~9 trading days held** (inside the 15-day time stop, **due ~8/25** — watch the clock, AMZN is at a <+5% gain). News benign: $220B 2026 capex overhang (mild FCF concern), FTC monopoly trial set for Oct, routine insider/Bezos 10b5-1 selling — nothing thesis-breaking. **HOLD.**
  ⚠️ **Undocumented entry (still open item):** AMZN has no committed research/trade-log buy entry — the recurring pattern flagged for CVX (6/12), JPM (~7/01), MS/UNH (7/10–7/20). It IS fully stop-protected. Operator should confirm the actual fill price/date/catalyst.
- **PLTR** (Technology, 14 sh @ $173.70) — current **$178.12**, **+2.54%** (unrealized +$61.83; cost basis $2,431.85, mkt value $2,493.68). Below the +15% tighten threshold → **no stop change yet.** Live 12% trailing-stop GTC intact (id c89fba0d, stop **$158.32**, hwm $179.91; qty_available 0 = reserved). Bought 8/13 on a blowout Q2 (rev +92.8% y/y, US-commercial +149%) → healthy 4.7% pullback entry; **next earnings ~90d out** — outside the window. Entered 8/13 → 2 trading days held, far from the time stop. **HOLD** — let it work; watch for the +15% level to tighten to 7%.

### Trade Ideas (regime ON) — deterministic breakout/pullback/volume screen
Screened MRK, DELL, NVDA, GOOGL (surfaced via new-52wk-high lists + the STOCK Act scan) against the c9 breakout-≤5d / c10 volume-≥1.5x / entry-timing 3–8%-pullback rules. **No name clears the hard gate AND entry timing simultaneously — the persistent condition of the last several weeks.** *(Note: the IEX free-tier feed understates consolidated volume, so volume ratios below are conservative; breakout-recency and pullback-timing — the robust checks — rule these out regardless.)*

- **$MRK** (Health Care) — **closest gate-clearer.** Fresh 3-mo high $135.66 on 8/13 (≤5d **PASS**) on **~1.77x** 20-day volume (**c10 PASS**); Health Care held 0 → no crowding. ❌ **Entry-timing FAIL:** pullback from the high is only **0.1%** — MRK is pinned to its breakout high with no pullback. Buying now = chasing/overpaying, exactly what the entry rule prevents. **Watchlist — wait for a 3–8% pullback that holds support.**
- **$DELL** (Technology) — 3.7% off its intraday 8/13 high (in-band) but that "high" is same-session, not a multi-day first pullback, and breakout-day volume is only **~1.0x** → **c10 FAIL.** Dropped/watchlist.
- **$NVDA** (Technology) — valid **4.7% pullback**, but the 3-mo high was **8 weeks ago (5/14)** → **c9 breakout FAIL (stale)**, and volume ~0.98x → **c10 FAIL.** No fresh breakout-on-volume. Dropped.
- **$GOOGL** (Comm. Services) — **15.2% pullback** off a stale 5/18 high → **broken setup (>10%)**, plus stale breakout / thin volume. Dropped.
- Adding another tech name is still allowed (PLTR is 1 of a 2-per-sector cap), but none qualifies today.

### STOCK Act scan (idea-generation only — never a buy reason)
Rep. Michael Rulli (R-OH) disclosed purchases of **GOOGL, NVDA, META** (filed 8/7; part of a 32-trade batch, many past the 45-day deadline — trades dated as far back as 2024). Idea-generation only: disclosures lag by up to ~45 days, omit size/exits, and each name must independently clear our gate — GOOGL and NVDA both **FAIL** on stale breakouts/thin volume (above), and META is likewise extended off a non-fresh high. **Nothing actionable. Dropped — no gate impact.**

### Risk Factors
- **Retail Sales + prelim UMich today, 8:30/10:00 ET.** A soft consumer print could pressure the record-high, tech-led tape; forcing a marginal entry (a leader on its high) ahead of it is the low-quality trade the rules prevent — hence HOLD.
- **Leaders extended at highs.** The momentum complex (MRK/DELL and the mega-cap techs) sits on or just off its highs with no valid 3–8% pullback — the persistent condition keeping us in HOLD. The risk here is chasing/overpaying, not missing out.
- **AMZN time-stop clock + capex/FTC overhang.** AMZN is ~9 of 15 time-stop days at a <+5% gain (due ~8/25); if it doesn't gain traction it becomes a time-stop candidate next week. $220B capex and the Oct FTC trial are mild sentiment overhangs — monitor its live trailing stop and confirm the (undocumented) entry.

### Decision
**HOLD — no new trades.** Regime firmly ON (SPY +3.09% over its 20d SMA, VIX ~14.6, Tech leading), but no candidate clears both the 11-check hard gate and the entry-timing rule: MRK is the only name with a fresh breakout-on-volume and it sits on its high (0.1% pullback), while the names with real pullbacks (NVDA/GOOGL) fail on stale breakouts / thin volume. MRK goes on the watchlist for a valid pullback. Hold **AMZN** (-4.33%, stop $248.85, next earnings ~10/29, ~9 of 15 time-stop days used — watch ~8/25) and **PLTR** (+2.54%, stop $158.32, 2 days held) under standard sell-side rules with their live 12% trailing stops. Trades this week 1/3. Retail Sales lands at 8:30 ET — a binary event ahead of this run; nothing to force here. No urgent notification warranted (AMZN -4.33% >> -8% cut, no earnings within 3 days, regime unchanged ON — silent per STEP 5). Committed and pushed per the pre-market routine.

## 2026-08-17 (Mon) — Pre-Market Routine

**Decision: HOLD — no new trades.** Regime firmly ON (SPY 776.30 > 20d SMA 756.15, **+2.67%**), VIX ~14.3–14.6 (risk-on), but the persistent condition holds: no candidate clears both the 11-check hard gate AND the 3–8% entry-timing band. MRK is again the only name clearing the full hard gate (fresh 52-wk high on 1.84x volume) yet sits pinned to its high (0.1% pullback → entry-timing FAIL); the financial/energy breakout leaders (JPM, PNC, PSX) fail c10 volume and lack any pullback; and this week's leading sector (Consumer Discretionary — homebuilders/retailers) is earnings-blocked (HD Tue, TGT/LOW/TJX Wed, WMT/DE/ROST Thu). Hold AMZN + PLTR under standard sell-side rules — both healthy, theses intact, stop-protected, no earnings in window. Quiet macro week (FOMC minutes Wed 8/19, jobless claims Thu 8/20; Jackson Hole 8/27–29 next week); patience beats a forced marginal entry.

### Market Regime Status — ON (firmly)
- **Alpaca (deterministic, `buy_gate.sh`):** SPY last close **776.30** vs **20-day SMA 756.15** → **776.30 > 756.15 → REGIME ON**, a solid **+2.67%** gap (82 bars). No flip vs the last committed read (8/14: ON). New long entries permitted, but each candidate must still clear the full 11-check gate AND the entry-timing rule.
- **Gemini corroborated:** S&P 500 ~**7,806** on 8/17, above the prior week's record close (7,799) and above its most-recent 20-day SMA (~7,778); index setting fresh record highs. Both sources agree → regime ON.

### Account Snapshot (live Alpaca, paper)
Equity: **$99,303.32** | Cash: **$94,482.64** | Buying power: $391,428.46 | Positions: **2 (AMZN, PLTR)** | Day trades: 0/3 | PDT: false
- last_equity $99,283.05 (balance_asof 8/14) → true session move ≈ **+$20.27 (+0.02%)**, essentially flat pre-bell.
- Phase P&L **-$696.68 (-0.70%)** off the live $100k base.
- **Trades this week: 0/3 (new week from Mon 8/17).** Room for 3, but patience beats activity.

### Market Context
- **VIX ~14.3–14.6** — benign / risk-on, well below its ~18–19 long-run average; downtrend of progressively lower peaks since April, contained (<20). Supports the ON regime.
- **Macro calendar (quiet week):** No CPI/PPI this week (July CPI landed 8/12 in-line, +3.4% y/y; July PPI 8/13 benign; next prints 9/10–9/11). **FOMC minutes (Jul 28–29 meeting) Wed 8/19, 2:00 PM ET.** **Jobless claims Thu 8/20, 8:30 ET.** Empire State Mfg + NAHB today; Housing Starts/Permits + Industrial Production Tue; Philly Fed + Leading Indicators Thu; flash PMIs Fri. **Jackson Hole Symposium 8/27–29 (next week)** — the week's forward macro focus; next FOMC 9/16. July jobs report (released 8/07) was soft (-23k, weaker revisions) — a live dovish undercurrent into the minutes.
- **WTI crude ~$82.5/bbl**, roughly flat d/d (+0.2%); ample supply keeps a lid on sharp moves. Energy strong MTD on price.

### Sector Momentum
- **Leading (week):** **Consumer Discretionary +5.8%** (homebuilders/retailers), **Materials +4.8%**, Industrials +2.5%, Energy +2.1%, Financials strong — a pro-cyclical, broadening rotation setting record highs. **Energy leads MTD (+~12%)**, Financials +6.2% MTD.
- **Rotation note:** Information Technology was under pressure MTD (~-8% at mid-month) but recovered into the record highs; the leadership has broadened *out* of mega-cap tech into cyclicals this week.
- **Lagging:** Utilities the lone weekly decliner (-1.6%).
- **Fresh 52-wk-high leaders (idea pool):** MRK (leading 17 large-caps), a cluster of Financials (JPM, BAC, SCHW, PNC, USB, RY, BMO, BNY, BNS, CM), Phillips 66 (PSX); SanDisk (SNDK) memory/AI up on volume.

### Held-Position Review
- **AMZN** (Consumer Discretionary, 9 sh @ $276.95) — current **$265.82**, **-4.02%** (unrealized -$100.17; cost basis $2,492.55, mkt value $2,392.38; intraday +$28.53 today). Far above the -8% cut and below the +15% tighten threshold → **no sell-side rule triggered.** Live 12% trailing-stop GTC intact (id **26477093**, stop **$248.85**, hwm $282.78; qty_available 0 = reserved by the stop). Q2 reported 7/29–30 (rev +19.6% to $200.6B, AWS accelerating, backlog into 2028); **next earnings ~10/22–11/02/2026** — outside the 10-day window. Entered ~8/04 → **~11 trading days held** (inside the 15-day time stop, **due ~8/21** — watch the clock this week; AMZN is at a <+5% gain and drifting). News benign: $200B 2026 AI capex overhang (mild FCF concern), softer July retail, Bezos ~$4B prearranged 10b5-1 sale, NJ antitrust suit — no downgrades, nothing thesis-breaking; consensus "Moderate Buy," avg PT ~$322. **HOLD.**
  ⚠️ **Undocumented entry (still open item):** AMZN has no committed research/trade-log buy entry — the recurring pattern flagged for CVX (6/12), JPM (~7/01), MS/UNH (7/10–7/20). It IS fully stop-protected. Operator should confirm the actual fill price/date/catalyst.
- **PLTR** (Technology, 14 sh @ $173.70) — current **$173.45**, **-0.15%** (unrealized -$3.55; cost basis $2,431.85, mkt value $2,428.30). Below the +15% tighten threshold → **no stop change yet.** Live 12% trailing-stop GTC intact (id **c89fba0d**, stop **$158.54**, hwm $180.16; qty_available 0 = reserved). Bought 8/13 on a blowout Q2 (rev +93% y/y, US-commercial +149%, FY guide raised) → healthy 4.7% pullback entry; **next earnings ~90d out** — outside the window. Entered 8/13 → ~3 trading days held, far from the time stop. News: valuation-based caution only (Jefferies Underperform, ARK trimmed ~$7.9M, Burry puts, a Seeking Alpha "strong sell" 8/15) — sentiment noise, not a thesis break; the stock holds ~entry. **HOLD** — let it work; watch for the +15% level to tighten the stop to 7%.

### Trade Ideas (regime ON) — deterministic `buy_gate.sh` breakout/volume screen
Screened the week's fresh-52-wk-high leaders (MRK, JPM, PNC, PSX) plus the AI/memory mover SNDK. *(Note: the IEX free-tier feed understates consolidated volume, so c10 ratios are conservative; breakout-recency and pullback-timing — the robust checks — rule these out regardless.)* **No name clears the hard gate AND entry timing simultaneously — the persistent condition of recent weeks.**

- **$MRK** (Health Care) — **closest gate-clearer; hard gate PASS.** Fresh 3-mo/52-wk high **$135.95** within last 5d (c9 PASS) on **~1.84x** 20-day volume (c10 PASS, maxvol 533,884 > 435,318 threshold); Health Care held 0 → no crowding. ❌ **Entry-timing FAIL:** pullback from the high is only **0.1%** — MRK is pinned to its breakout high (same condition as 8/14). Buying now = chasing/overpaying, exactly what the entry rule prevents. Next earnings ~late Oct (Q2 reported late July, outside window). **Watchlist — wait for a 3–8% pullback that holds support.**
- **$PSX** (Energy) — c9 breakout **PASS** (fresh high 236.05 vs prior 215.96, a real move) but **c10 volume FAIL** (maxvol 173,482 < 207,960 threshold) and only a **1%** pullback → entry-timing FAIL. Watchlist.
- **$JPM** (Financials) — c9 breakout PASS (366.30) but **c10 volume FAIL** (198,160 < 316,349) and **1%** pullback. Watchlist.
- **$PNC** (Financials) — c9 breakout PASS (257.62) but **c10 volume FAIL** (89,973 < 99,663) and **0.3%** pullback. Watchlist.
- **$SNDK** (Technology) — **FAIL c9 breakout** (last5 high 1,666 vs prior 2,353 — stale/likely data anomaly in the IEX bars) **and c10 volume;** 1.5% pullback. Dropped.
- Leading-sector caveat: Consumer Discretionary (homebuilders/retailers) led the week but is **earnings-blocked** — HD (Tue), TGT/LOW/TJX (Wed), WMT/DE/ROST (Thu) all report inside the 10-day window. No clean, gate-passing entry there this week.

### STOCK Act scan (idea-generation only — never a buy reason)
Same **Rep. Michael Rulli (R-OH)** batch as last week (32 trades filed 8/7 incl. GOOGL/NVDA/META, many past the 45-day deadline) — stale, already assessed, no new gate impact. Other filings: **Sen. Sheldon Whitehouse** *sold* Lowe's (LOW) (filed 8/3, trade 7/20 — a sale, not a buy); **Sen. Rick Scott** and **Rep. Don Beyer** filings early Aug (unspecified). **Nothing actionable;** disclosures lag by up to ~45 days, omit size/exits, and each name must independently clear the full gate. Dropped — no gate impact.

### Risk Factors
- **AMZN time-stop clock.** AMZN is ~11 of 15 time-stop days at a <+5% gain (**due ~8/21** this week); if it doesn't gain traction it becomes a time-stop close candidate at the midday/EOD scans — watch the clock. The $200B capex overhang and NJ antitrust suit are mild sentiment overhangs, not thesis breaks.
- **Leaders extended / cyclicals pinned to highs.** MRK and the financial/energy breakout leaders sit on or just off their highs with no valid 3–8% pullback — the persistent condition keeping us in HOLD. The risk here is chasing/overpaying, not missing out. Force nothing.
- **FOMC minutes (Wed) + Jackson Hole setup (next week).** A hawkish minutes read or Powell's Jackson Hole tone could pressure the record-high, rate-sensitive rotation into cyclicals; the soft July jobs print keeps rate-cut expectations live but two-sided. Nothing to pre-position for.

### Decision
**HOLD — no new trades.** Regime firmly ON (SPY +2.67% over its 20d SMA, VIX ~14.3–14.6, cyclical leadership broadening), but no candidate clears both the 11-check hard gate and the entry-timing rule: MRK is again the only name with a fresh breakout-on-volume and it sits on its high (0.1% pullback), while the financial/energy leaders (JPM/PNC/PSX) fail c10 volume with no pullback, and the leading Consumer-Discretionary complex is earnings-blocked this week. Watchlist: MRK/PSX/JPM for a valid 3–8% pullback. Hold **AMZN** (-4.02%, stop $248.85, next earnings ~10/22+, **~11 of 15 time-stop days used — due ~8/21**) and **PLTR** (-0.15%, stop $158.54, ~3 days held) under standard sell-side rules with their live 12% trailing stops. Trades this week 0/3. No urgent notification warranted (AMZN -4.02% >> -8% cut, no earnings within 3 days for either holding, regime unchanged ON — silent per STEP 5). Committed and pushed per the pre-market routine.

## 2026-08-21 (Fri) — Market-Open Routine (pre-market research run INLINE — see ⚠️ below)

**Decision: HOLD — no new trades.** Regime is only **marginally ON** on the deterministic SPY read (SPY 762.62 close 8/20 vs 20-day SMA 760.94 → **+0.22%**, razor-thin), and SPY has trended clearly DOWN this week (777.84 on 8/13 → 762.62 on 8/20). No candidate clears both the 11-check hard gate AND the 3–8% entry-timing rule — the persistent multi-week condition: MRK and PSX pass all 11 hard checks but are pinned to their highs (**1.8% pullback**, shadow c12 entry-timing FAIL = chasing risk); JPM fails the hard gate (stale breakout + thin volume). With a tech/industrials selloff this week and **Jackson Hole event risk imminent** (Powell keynote), buying a breakout name pinned to its high into a binary event with SPY sitting right on its 20-day SMA is exactly the low-conviction trade the strategy is built to avoid. Hold AMZN + PLTR under standard sell-side rules with their live 12% trailing stops. **⏳ AMZN time-stop / -8% both IMMINENT — flagged for the midday scan (see Held-Position Review).**

⚠️ **Operational flag:** No pre-market/research entry has been committed since **2026-08-17** (four sessions: 8/18, 8/19, 8/20, and this morning's pre-market all missing — only EOD snapshots ran 8/19–8/20). This routine therefore ran the pre-market research steps INLINE per market-open STEP 1. The pre-market cron appears to be failing silently — operator should investigate.

### Market Regime Status — MARGINALLY ON (deterministic) / conflicting sources
- **Alpaca (deterministic, SPY IEX daily bars, completed through 8/20):** SPY last close **762.62** vs **20-day SMA 760.94** → **762.62 > 760.94 → REGIME ON, but only +0.22%** (essentially sitting ON the line). Including today's partial intraday bar: SPY ~765.0 vs SMA ~762.25 (+0.37%). The buy_gate c1 read (SPY 765.02 vs SMA20 762.25) = PASS. **Clear weekly downtrend:** 8/13 777.84 → 8/14 776.30 → 8/17 772.62 → 8/18 767.37 → 8/19 769.09 → 8/20 762.62.
- **Gemini (S&P 500 index):** reads the cash index **BELOW** its 20-day SMA (7,641 vs ~7,697 → regime OFF). The two sources DISAGREE on the sign — the regime is genuinely borderline. Per the routine, the deterministic SPY gate read governs (marginally ON), but the razor-thin margin + downtrend + event risk means the bar for any new buy is very high, and none clears it anyway.

### Account Snapshot (live Alpaca, paper)
Equity: **$99,239.04** | Cash: **$94,482.64** | Buying power: $391,248.47 | Positions: **2 (AMZN, PLTR)** | Day trades: **0/3** | PDT: false
- last_equity $99,259.07 (balance_asof 8/20) → true session move ≈ **-$20.03 (-0.02%)**, ~flat at the open.
- Phase P&L **-$760.96 (-0.76%)** off the live $100k base.
- **Trades this week: 0/3** (week from Mon 8/17). Room for 3, but patience beats activity.

### Market Context
- **VIX ~15.82** (down ~1.2% d/d) — still benign/contained (<20) but has ticked UP from the ~14.3–14.6 range of the prior two weeks, consistent with pre-Jackson-Hole jitters.
- **WTI crude ~$86/bbl** (-0.9% d/d) — firm; Energy is a weekly sector leader on price.
- **Sector momentum (week):** **Leaders — Health Care (+2.95%), Energy (+2.75%).** **Laggards — Industrials (-3.68%), Information Technology (-3.18%).** A defensive/energy rotation OUT of tech/industrials — the leadership that drove the record highs is under pressure this week.
- **Macro:** **Jackson Hole Symposium — Powell keynote is the week's binary event** (elevated intraday chop expected). Next FOMC 9/16; next CPI/PPI 9/10–9/11.

### Held-Position Review
- **AMZN** (Consumer Discretionary, 9 sh @ $276.95) — current **$257.55**, **-7.01%** (unrealized -$174.65; cost basis $2,492.55, mkt value $2,317.91). Live 12% trailing-stop GTC intact (id **26477093**, stop **$248.85**, hwm $282.78, qty_available 0 = reserved). Next earnings ~10/22–11/02/2026 (outside the 10-day window; confirmed via Gemini). **⏳ BOTH sell triggers now IMMINENT but NOT yet crossed:** (1) **-8% cut** level is **$254.79** — current $257.55 is just **1.08% above** it (not triggered); (2) **15-day time stop** — entered 8/04 → **day 14 of 15** today; the 15th trading day is **Mon 8/24** (not yet due). It is a losing, dead-money position drifting deeper (was -6.09% at 8/20 EOD, now -7.01%). **No hard sell rule is triggered at this open, so HOLD stands per the rules — but this is knife's-edge:** the midday scan (or Monday's open) must resolve close-vs-keep; if AMZN prints ≤ $254.79 or fails to recover by its 15th day, close it. Flagged to operator.
  ⚠️ **Still-open item:** AMZN remains an undocumented original entry (recurring pattern flagged for CVX/JPM/MS/UNH) — fully stop-protected, but operator should confirm its original fill/date/catalyst.
- **PLTR** (Technology, 14 sh @ $173.70) — current **$173.82**, **+0.06%** (unrealized +$1.56; cost basis $2,431.85, mkt value $2,433.41). Live 12% trailing-stop GTC intact (id **c89fba0d**, stop **$158.54**, hwm $180.16, qty_available 0 = reserved). Next earnings ~90d out (Q2 reported 8/03; confirmed via Gemini). Entered 8/13 → ~7 trading days held (far from the time stop); flat to entry, far from the -8% cut and below the +15% tighten threshold → **no sell-side rule triggered. HOLD.**

### Trade Ideas (regime marginally ON) — deterministic buy_gate.sh screen
Gemini declined live screening today; screened this week's sector leaders (Health Care/Energy) and the standing watchlist via the deterministic gate. *(IEX free-tier feed understates consolidated volume, so c10 ratios are conservative; breakout-recency and entry-timing — the robust checks — govern.)*
- **$MRK** (Health Care) — **11-check hard gate PASS** (c9 fresh 3-mo high 153.405 vs prior 135.95, within 5d; c10 volume 1,348,714 vs 553,831 threshold = strong). ❌ **Entry-timing FAIL (shadow c12): pullback only 1.8%** vs the 3–8% band — pinned to its high. Buying now = chasing/overpaying. **Watchlist — same condition as 8/14 & 8/17.**
- **$PSX** (Energy) — **11-check hard gate PASS** (c9 fresh high 246.86 vs prior 236.05; c10 volume 269,225 vs 208,511 threshold). ❌ **Entry-timing FAIL: pullback only 1.8%** — pinned to its high. **Watchlist.**
- **$JPM** (Financials) — **hard gate FAIL** (c9 breakout stale: last5 high 365.565 < prior 366.30; c10 volume 200,442 < 278,239 threshold). Dropped.
- **Note on MRK/PSX:** even setting entry-timing aside, buying a name pinned to its high into Powell's Jackson Hole keynote, with SPY marginally ON (+0.22%) and in a weekly downtrend, is exactly the event-risk trade the strategy avoids. No forced entry.

### STOCK Act scan (idea-generation only — never a buy reason)
No new actionable disclosures surfaced this run (Gemini declined live data). Prior batches (Rep. Rulli GOOGL/NVDA/META; Sen. Peters REIT O) remain stale and non-actionable — disclosures lag up to ~45 days and each name must independently clear the full gate. No gate impact.

### Risk Factors
- **Jackson Hole / Powell keynote** — the week's binary event; a hawkish tone could pressure the record-high, rate-sensitive tape further. Nothing to pre-position for.
- **Regime on a knife's edge** (+0.22% deterministic; Gemini reads the index OFF) amid a tech/industrials selloff — a break below the 20-day SMA flips the filter OFF and forbids all new buys. Watch the next read closely.
- **AMZN dual sell-trigger imminence** (see Held) — the leading capital-preservation item; must be resolved at the midday scan / Monday open.

### Decision
**HOLD — no new trades.** Regime only marginally ON (+0.22% deterministic; Gemini reads the S&P 500 index OFF) in a clear weekly downtrend, with Health Care/Energy leading and tech/industrials selling off. MRK and PSX clear the 11-check hard gate but FAIL entry timing (1.8% pullback, pinned to highs); JPM fails the hard gate — no name clears both the gate and entry timing, the persistent condition. Buying into Powell's Jackson Hole keynote with SPY on its 20-day SMA would be a low-conviction, high-event-risk entry the strategy exists to prevent. Hold **AMZN** (-7.01%, stop $248.85 — **both -8% cut [$254.79, 1.08% away] and 15-day time stop [day 14/15, due Mon 8/24] IMMINENT; flagged for midday resolution**) and **PLTR** (+0.06%, stop $158.54, ~7 days held) under standard sell-side rules with their live 12% trailing stops. Trades this week 0/3. ⚠️ Pre-market cron has failed silently since 8/17 — research run inline this session; operator to investigate. Notified operator (Discord + push) on the AMZN imminence and the pre-market outage; committed and pushed the research log (no trades → no trade-log entry per STEP 7).
