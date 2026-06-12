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

## 2026-06-12 (Fri) — Pre-Market Research

**Decision: HOLD — zero new trades.** Market-regime filter reads **OFF** (S&P 500 below
its 20-day SMA) on the deterministic Alpaca read — the highest-priority rule — so buy-gate
check #1 fails for every candidate today. The lone open position (CVX) is within tolerance,
stop-protected, and left to the standard sell-side rules / midday scan. Gemini was down
(HTTP 503 on every query) → research ran on native WebSearch fallback (noted per routine).

### Market Regime Status — OFF (no-buy day)
- **Alpaca (deterministic, via buy_gate):** SPY close **737.67** vs 20-day SMA **745.36**
  → **below → FAIL → regime OFF.** (83 bars; clean, unambiguous read.)
- **WebSearch corroboration:** S&P 500 cash index closed **7,394.30** on 6/11, sitting
  below its 20-day SMA (~7,480 area). Both sources agree: regime OFF.
- No regime flip vs the last read (6/08 OFF) → no urgent notification. The right answer on a
  regime-off day is cash. **No new buys until the S&P reclaims its 20-day SMA.**

### Account Snapshot (live Alpaca, paper)
Equity: **$99,730.23** | Cash: **$97,331.73** | Buying power: $396,042.72 | Day trades: 0/3 | PDT: false
- Open positions: 1 — **CVX** 13 sh @ $189.54 (now ~$184.50, **-2.66%**). Not near the -8% cut.
- Open orders: 1 — CVX 12% trailing-stop GTC, stop **$169.56** (hwm $192.685). Live and intact.
- NVDA was cut 6/11 on the -8% discipline rule (realized -$204.22 / -8.48%); that breach is cleared.
- Trades this week: **0/3 new** (room for 3, but no qualifying setup — regime OFF).
- Position sizing (recalc on live equity): 1.5% of $99,730 = $1,496, hard-capped at
  **$200 risk/trade** → max notional $200 / 8% = **$2,500/position** (binding cap). Moot today.

### Market Context
- **VIX ~21.4, up ~34% on the week** (intraday range 20.06–22.66; opened 20.10) — fear
  rising, well above its ~18.5 long-run average. Unsettled, risk-off tape — reinforces cash.
- **Oil (WTI): dropped below ~$86/bbl Friday, a ~2-month low**, after President Trump said a
  U.S.–Iran peace agreement could be reached as early as this weekend. Big reversal of the
  recent geopolitical premium (~$91 → ~$86). **Headwind for CVX's energy thesis** — flag for
  midday re-evaluation: if energy is rolling over on a confirmed de-escalation, consider a
  discretionary exit even above -8%.
- **Econ calendar:** Univ. of Michigan preliminary June Consumer Sentiment due today (prior
  May print 44.8 — a record low, hurt by gasoline prices). May PPI landed 6/11; May CPI
  earlier this week. Sentiment + de-escalation headlines = potential weekend gap risk.

### Sector Momentum
- Latest reads: **Technology** the recent monthly leader; **Energy** a laggard / now under
  fresh pressure from the oil drop. Leadership remains narrow (AI + energy), and energy's
  geopolitical bid is unwinding today. Wrong tape to be adding risk into.

### Earnings Watch (held names)
- **CVX** next earnings **July 31, 2026** (confirmed; Q1 already reported, production +24% on
  Hess, $6B returned). ~34 trading days out → clears the >10-trading-day gate. No earnings exit.

### Held-position review (sell-side rules — none triggered)
- **CVX -2.66%** from entry ($184.50 vs $189.54): above the -8% cut; not +15/+20% (no stop
  tighten); entered 6/4, ~6 trading days elapsed (time stop 6/25, not yet); earnings 7/31
  (clear). Thesis under pressure from the oil pullback but stop-protected at $169.56.
  **Hold; reassess at midday** — cut discretionarily if the energy thesis confirms broken.

### Trade Ideas — N/A
Regime is OFF → buy-gate #1 fails for everything; no buy candidates evaluated. Congressional
/ STOCK-Act disclosure scan (query #9) is idea-generation only and is moot under regime-OFF —
any surfaced name would still have to clear all 11 gate checks, starting with regime. Deferred.

### Risk Factors
- **Oil reversal (de-escalation headlines)** directly pressures CVX's energy thesis; a
  confirmed U.S.–Iran deal this weekend could gap energy names down Monday.
- **VIX rising ~34% on the week (~21+)** and a record-low consumer-sentiment backdrop →
  choppy, headline-driven tape; cash is the right default.
- **Weekend headline/gap risk** from the Iran-deal narrative and Friday's sentiment print.

### Decision
**HOLD. Zero new trades. Regime filter OFF — no new buys today.** Manage CVX under standard
sell-side rules; watch the oil/energy thesis at midday. No Discord alert (nothing urgent: CVX
above -8%, no earnings within 3 days, no regime flip). Gemini down → WebSearch fallback used.
