# Pre-Market Routine

**Cron**: `0 6 * * 1-5` | **Timezone**: America/Chicago | **Runs**: Weekdays at 6:00 AM CT

---

DATE=$(date +%Y-%m-%d)

## IMPORTANT — ENVIRONMENT VARIABLES

Every API key is already exported as a process env var. There is NO `.env` file and you MUST NOT create, write, or source one.

Verify before any wrapper call:

```bash
for v in ALPACA_API_KEY ALPACA_SECRET_KEY GEMINI_API_KEY DISCORD_WEBHOOK_URL; do
  [[ -n "${!v:-}" ]] && echo "$v: set" || echo "$v: MISSING"
done
```

If any var is MISSING: send one Discord alert naming it, then exit. Do not proceed.

## IMPORTANT — PERSISTENCE

This is a fresh clone. All file changes vanish unless committed and pushed. You MUST commit and push at STEP 6.

---

## STEP 1 — Read memory for context

```bash
cat memory/TRADING-STRATEGY.md
tail -100 memory/TRADE-LOG.md
tail -60 memory/RESEARCH-LOG.md
```

## STEP 2 — Pull live account state

```bash
bash scripts/alpaca.sh account
bash scripts/alpaca.sh positions
bash scripts/alpaca.sh orders
```

## STEP 3 — Research market context via Gemini

Run `bash scripts/gemini.sh "<query>"` for each. If gemini exits with code 3, fall back to native WebSearch and note the fallback in the log.

Queries to run:
1. `"S&P 500 20-day moving average vs current price today $DATE — is it above or below?"`
2. `"VIX level and trend today $DATE"`
3. `"Top performing stock market sectors this week $DATE"`
4. `"Pre-market movers with high volume today $DATE"`
5. `"Earnings calendar this week — which stocks report earnings in the next 10 trading days"`
6. `"WTI crude oil price today $DATE"`
7. `"Economic calendar today $DATE — CPI PPI FOMC jobs data any major releases"`
8. For each currently-held position: `"Latest news on [SYMBOL] stock today $DATE"`

## STEP 4 — Write dated entry to memory/RESEARCH-LOG.md

Append a new section with:

- **Market regime status**: Is S&P 500 above its 20-day SMA? (If NO: note that buy gate fails for today)
- **Account snapshot**: equity, cash, buying power, day-trades used this week
- **Market context**: S&P futures, VIX, oil, today's economic releases
- **Sector momentum**: which sectors are leading, which are lagging
- **Earnings watch**: any held positions with earnings in next 10 days (flag for exit)
- **2–3 trade ideas** — only if market regime is ON. For each idea:
  - Symbol, catalyst, breakout date, pullback % from high
  - Breakout volume vs 20-day average (must be ≥ 1.5x)
  - Entry price, stop (entry × 0.92), target (entry × 1.24 minimum)
  - Position size calculation: $150 / 8% stop = $1,875 max notional → N shares
  - Next earnings date (must be > 10 trading days away)
  - All 11 buy-gate checks: PASS or FAIL with reason
- **Risk factors**: 2–3 bullets on what could go wrong today
- **Decision**: HOLD | TRADE [SYMBOL] — one-sentence reason. Default is HOLD.

## STEP 5 — Notifications

Silent unless something is genuinely urgent:
- A held position is already below -8% in pre-market
- A held position has earnings in the next 3 days
- Market regime filter just flipped from ON to OFF (or OFF to ON)

```bash
bash scripts/discord.sh "⚠️ [URGENT REASON] — check portfolio" --embed 16776960
```

## STEP 6 — COMMIT AND PUSH (mandatory)

```bash
git add memory/RESEARCH-LOG.md
git commit -m "pre-market research $DATE"
git push origin main
```

If push fails with non-fast-forward error:
```bash
git pull --rebase origin main
git push origin main
```

Never force-push.
