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

