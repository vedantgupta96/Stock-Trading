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

