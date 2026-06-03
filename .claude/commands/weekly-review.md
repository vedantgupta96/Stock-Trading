---
description: Run the weekly review locally. Computes week stats, appends to WEEKLY-REVIEW.md, sends Discord recap. Does NOT commit.
---

# /weekly-review — Local Weekly Review

Runs the same workflow as the cloud weekly-review routine but uses local `.env` and does **not** auto-commit.

DATE=$(date +%Y-%m-%d)

## STEP 1 — Read full week's memory

```bash
cat memory/WEEKLY-REVIEW.md
cat memory/TRADING-STRATEGY.md
tail -200 memory/TRADE-LOG.md
tail -200 memory/RESEARCH-LOG.md
```

## STEP 2 — Pull Friday close account state

```bash
bash scripts/alpaca.sh account
bash scripts/alpaca.sh positions
```

## STEP 3 — Compute week metrics

Starting equity, ending equity, week return vs S&P, trades, win rate, best/worst trade, profit factor, regime filter days ON/OFF.

```bash
bash scripts/gemini.sh "S&P 500 weekly performance week ending $DATE"
```

## STEP 4 — Append full review to memory/WEEKLY-REVIEW.md

Use the standard weekly review format with all sections.

## STEP 5 — Update strategy if needed

Only if a rule clearly proved out or failed with 2+ weeks of data.

## STEP 6 — Send Discord recap

## NOTE

Does not auto-commit. To persist: `git add memory/WEEKLY-REVIEW.md && git commit -m "weekly review $DATE" && git push`
