---
description: Run pre-market research locally. Reads .env for credentials. Does NOT commit to git.
---

# /pre-market — Local Pre-Market Research

Runs the same workflow as the cloud pre-market routine, but uses the local `.env` file and does **not** commit or push to git.

DATE=$(date +%Y-%m-%d)

## STEP 1 — Read memory

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

## STEP 3 — Research market context

Run `bash scripts/gemini.sh "<query>"` for each:

1. `"S&P 500 20-day moving average vs current price today — above or below?"`
2. `"VIX level today"`
3. `"Top performing stock market sectors this week"`
4. `"Pre-market movers with high volume today $DATE"`
5. `"Earnings calendar — which stocks report in next 10 trading days"`
6. `"WTI crude oil price today"`
7. `"Economic calendar today — any major releases"`
8. News on each held ticker

## STEP 4 — Write dated entry to memory/RESEARCH-LOG.md

Same format as the cloud routine. Include regime status, account snapshot, market context, 2–3 trade ideas (if regime is ON), risk factors, and decision.

## NOTE

This command writes to `memory/RESEARCH-LOG.md` locally but does **not** commit or push. Run `git add memory/RESEARCH-LOG.md && git commit -m "pre-market research $DATE" && git push` manually if you want to preserve it.
