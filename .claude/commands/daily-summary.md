---
description: Generate EOD snapshot and Discord summary locally. Does NOT commit to git — run git commands manually after.
---

# /daily-summary — Local Daily Summary

Runs the same workflow as the cloud daily-summary routine but uses local `.env` and does **not** automatically commit.

DATE=$(date +%Y-%m-%d)

## STEP 1 — Find yesterday's equity baseline

```bash
tail -100 memory/TRADE-LOG.md
```

## STEP 2 — Pull today's final account state

```bash
bash scripts/alpaca.sh account
bash scripts/alpaca.sh positions
bash scripts/alpaca.sh orders
```

## STEP 3 — Compute and display metrics

- Day P&L ($ and %)
- Phase P&L from $10,000 baseline
- Trades today and this week
- Market regime status

## STEP 4 — Append EOD snapshot to memory/TRADE-LOG.md

Use the standard EOD snapshot format.

## STEP 5 — Send Discord summary

```bash
bash scripts/discord.sh "<daily summary message>" --embed <color>
```

## NOTE

Does not auto-commit. To persist: `git add memory/TRADE-LOG.md && git commit -m "EOD snapshot $DATE" && git push`
