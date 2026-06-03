---
description: Run midday position scan locally. Checks stops, tightens winners, cuts losers. Does NOT commit to git.
---

# /midday — Local Midday Scan

Runs the same workflow as the cloud midday routine but uses local `.env` and does **not** commit or push.

DATE=$(date +%Y-%m-%d)

## STEP 1 — Read memory

```bash
cat memory/TRADING-STRATEGY.md
tail -80 memory/TRADE-LOG.md
```

## STEP 2 — Pull positions and orders

```bash
bash scripts/alpaca.sh account
bash scripts/alpaca.sh positions
bash scripts/alpaca.sh orders
```

## STEP 3 — Evaluate each position

- **-8% or worse**: close immediately, cancel stop
- **15-day time stop triggered with < +5% gain**: close, cancel stop
- **Earnings within 10 days**: check via Gemini, close if confirmed
- **Thesis broken**: review news, close if catalyst gone
- **Up +20%**: tighten trailing stop to 5%
- **Up +15%**: tighten trailing stop to 7%

## STEP 4 — Log any actions

Append to `memory/TRADE-LOG.md` for any closes. Send Discord notification for any action taken.

## NOTE

Does not commit or push. Run git commands manually to persist changes.
