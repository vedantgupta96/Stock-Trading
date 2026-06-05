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

## 2026-06-05 — Pre-Market Routine

**Decision: HOLD.** Regime flipped OFF→ON (cross-confirmed), but no name offers a
clean 3–8% pullback entry and the breakout/volume gates can't be hard-verified. Manage
the two open positions; no new buys today.

### Market Regime Status — **ON** (flipped OFF→ON)
- Gemini: S&P 500 ~7,584 vs 20-day SMA ~7,477 → **above → ON**.
- WebSearch cross-check: S&P 500 close 7,609.78 (Jun 2); 20-day EMA ~7,398; 50-day MA
  ~7,100; 200-day MA ~6,842 — price well above all. Live Alpaca SPY bid $756.96
  (Jun 4 close) implies S&P ~7,570, above any SMA estimate.
- This **flips the filter from yesterday's OFF to ON**. Yesterday's OFF read used a
  20-day SMA of 7,591 that now looks like a stale/bad data point — three independent
  sources today agree price is comfortably above the 20-day MA. Buy gate check #1 PASSES.
  (Discord flip alert sent per routine STEP 5.)

### Account Snapshot
- Equity **$99,958.00** | Cash **$95,128.18** | Buying power $390,172.36
- Long market value $4,829.82 | Day P&L -$23.99 (-0.02%) vs last equity $99,981.99
- Day-trade count **0** | PDT **false** — full PDT room
- Trades this week: **2/3** (NVDA + CVX on 6/04) → 1 slot remaining

### Open Positions (both protected by live 12% trailing GTC stops)
| Symbol | Sh | Entry    | Current  | Unreal. P&L      | Trailing-stop trigger |
|--------|----|----------|----------|------------------|-----------------------|
| NVDA   | 11 | $218.89  | $215.90  | -$32.89 (-1.37%) | $195.008 (hwm $221.60)|
| CVX    | 13 | $189.54  | $188.84  | -$9.10  (-0.37%) | $166.90  (hwm $189.66)|
Neither near -8%; neither has earnings in the next 10 trading days. Time stop 2026-06-25.

### Market Context
- **VIX ~15.40**, down 4.1% on the day, below its 18.55 long-term avg → calm tape.
- **WTI crude ~$92–93/bbl**, soft/choppy (down from ~$96 earlier in the week).
- **Economic calendar**: Gemini Q7 hit HTTP 429 (no clean release list this run). Note
  **NVDA-specific event risk: Sen. Banking Committee hearing Jun 11** — Jensen Huang
  invited to testify on China/export controls (headline risk, not an earnings event).
- S&P futures broadly firm; market at/near highs led by AI/semis.

### Sector Momentum
- **Information Technology** continues to lead (AI/semis; IT earnings growth +54.3%,
  NVDA/MU-driven). Healthcare, Industrials, Basic Materials firm in early June.
- Laggards: Utilities, Energy (down in May, though Energy +26.7% YTD), Financials,
  Comm Services. (Note: this softens the CVX thesis vs the 6/04 entry, but CVX is green
  intraday and not near any sell trigger — hold and let the trailing stop work.)

### Earnings Watch
- **No open position** has earnings within the next 10 trading days: NVDA next ~late Aug
  2026 (reported late May), CVX next ~late July 2026 (reported late Apr). Both clear gate #7.
- Gemini earnings query (Q5) returned HTTP 503; WebSearch fallback returned only calendar
  aggregators, no clean per-name list. Any future buy must still hard-clear the >10-day
  earnings gate before an order.

### Position Sizing (recalculated on live equity)
- Equity $99,958 → 1.5% risk = $1,499, but strategy hard-caps risk at **$200/trade**.
- Binding cap: max notional = $200 / 8% stop = **$2,500 per position**.

### Trade Ideas (regime ON, so surfaced — but none is a buy today)
The legitimate strength is in names already at or near *all-time* highs (per breadth
data: AVGO, CRWD, DELL, IBM, HPE, FDX at ATHs; MTLS/LXFR/ARKO breakouts). The strategy
buys the **first 3–8% pullback after a breakout, not the breakout itself** — these names
have not pulled back, so they fail the entry-timing gate today. The only high-volume
pre-market movers (BGMS, STI, SMTK, HKIT, MRLN, MTVA, RMSG, CXAI, ZCMD, PMI) are
low-float penny/micro-caps — un-tradeable noise that fails the breakout-quality intent.

- **$AVGO** (Broadcom, Tech) — Catalyst: AI/semis leadership, trading at all-time highs.
  Gate status: #1 ON ✅ · #2 positions-after-fill 3 ✅ · #3 **sector FAIL-risk** (NVDA
  already in Tech; this would be 2/2 Tech — allowed but maxes the sector) · #4 trades 3/3 ✅
  · #5 cost ≤ cash ✅ · #6 PDT room ✅ · #7 earnings clear (next ~Sep) ✅ · #8 catalyst ✅
  · **#9/#10 breakout-within-5-days & 1.5x-volume UNVERIFIED** (no bars endpoint) ·
  #11 stock ✅ · **Entry timing FAIL — at the high, no 3–8% pullback.** → **NO BUY, watch.**
- **$DELL** (Dell, Tech) — Catalyst: +10.7% on NVIDIA chip halo, at all-time highs.
  Same blockers: would be 2nd Tech name, breakout/volume unverified, **no pullback yet.**
  → **NO BUY, watch for a 3–8% pullback that holds the breakout pivot.**

No idea clears the full gate (entry-timing + unverifiable volume/breakout), and I'm
already 2/3 trades this week with only 1 Tech slot left — so no per-name order today.

### Risk Factors
- **Data quality remains shaky** — regime SMA figures swung materially day-over-day.
  Today's ON read is cross-confirmed by 3 sources, but lean conservative on new entries.
- **NVDA Senate hearing Jun 11** could drive a headline-driven gap; the 12% trailing
  stop is the only protection (overnight gaps can bypass it).
- **Energy weak in May/early June** — CVX is the laggard-sector holding; watch the stop.
- Market at/near highs with low VIX → complacency; chasing extended breakouts is the
  classic late-cycle mistake. Wait for pullbacks.

### Decision
**HOLD.** The regime filter flipped back ON (cross-confirmed), which re-opens the buy
window, but no candidate offers a disciplined 3–8% pullback entry and the breakout/
volume gates can't be hard-verified with current tooling — and only 1 trade slot / 1 Tech
slot remains this week. Hold NVDA and CVX under standard sell-side rules; watch AVGO/DELL
(and other AI/semis leaders) for a clean pullback-and-hold setup on the next run.
