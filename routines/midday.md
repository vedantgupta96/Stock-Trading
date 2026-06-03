# Midday Routine

**Cron**: `0 12 * * 1-5` | **Timezone**: America/Chicago | **Runs**: Weekdays at 12:00 PM CT (1:00 PM ET)

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

If any var is MISSING: send one Discord alert naming it, then exit.

## IMPORTANT — PERSISTENCE

This is a fresh clone. All file changes vanish unless committed and pushed. Commit and push at STEP 8 **only if any action was taken** (position closed, stop tightened, or log updated).

---

## STEP 1 — Read memory

```bash
cat memory/TRADING-STRATEGY.md
tail -80 memory/TRADE-LOG.md
tail -60 memory/RESEARCH-LOG.md
```

## STEP 2 — Pull live positions and orders

```bash
bash scripts/alpaca.sh account
bash scripts/alpaca.sh positions
bash scripts/alpaca.sh orders
```

## STEP 3 — Check each position for stop rules

For each open position, evaluate in order:

**a. Hard stop at -8%:**
If unrealized P&L% ≤ -8%:
```bash
bash scripts/alpaca.sh close SYMBOL
# Cancel the trailing stop order for this position
bash scripts/alpaca.sh cancel ORDER_ID
```
Log: exit price, realized P&L, reason = "hard stop -8%"

**b. Time stop (15 trading days, < +5% gain):**
If the position has been open for ≥ 15 trading days AND unrealized gain < +5%:
```bash
bash scripts/alpaca.sh close SYMBOL
bash scripts/alpaca.sh cancel ORDER_ID
```
Log: exit price, realized P&L, reason = "time stop — 15 days, flat"

**c. Earnings approaching (< 10 trading days):**
```bash
bash scripts/gemini.sh "Next earnings date for [SYMBOL] stock"
```
If earnings are within 10 trading days: close the position.
Log: exit price, realized P&L, reason = "earnings approaching"

**d. Thesis check:**
For each remaining position, briefly check for intraday news:
```bash
bash scripts/gemini.sh "Breaking news on [SYMBOL] stock today $DATE — any catalyst change"
```
If a key catalyst has been invalidated or the sector is sharply rolling over: close the position even if not at -8%.
Log: exit price, realized P&L, reason = "thesis broken — [brief explanation]"

## STEP 4 — Tighten stops on winners

For remaining positions:

- Up **+20% or more**:
  ```bash
  bash scripts/alpaca.sh cancel OLD_TRAILING_STOP_ORDER_ID
  bash scripts/alpaca.sh trailing_stop SYMBOL QTY 5.0
  ```

- Up **+15% or more** (and not already at 7% or tighter):
  ```bash
  bash scripts/alpaca.sh cancel OLD_TRAILING_STOP_ORDER_ID
  bash scripts/alpaca.sh trailing_stop SYMBOL QTY 7.0
  ```

Never tighten a stop to within 3% of current price.

## STEP 5 — Sector failure check

Count closed losing trades per sector this month. If any sector has 2+ consecutive losses:
- Note it in the trade log
- Close all remaining open positions in that sector

## STEP 6 — Optional intraday research

Only if something is moving sharply (>3%) with no obvious cause in the positions list:
```bash
bash scripts/gemini.sh "Why is [SYMBOL] moving sharply today $DATE"
```

## STEP 7 — Notifications

Send a Discord message **only if any action was taken** (sell, stop tightened, thesis exit):

```bash
# For exits:
bash scripts/discord.sh "Closed [SYMBOL] @ $[PRICE] | P&L: [+/-$X] ([+/-X%]) | Reason: [reason]" --embed 15158332

# For stop tightens:
bash scripts/discord.sh "Tightened stop on [SYMBOL] to [X]% trailing | Position up [+X%]" --embed 3066993
```

No message if nothing changed.

## STEP 8 — COMMIT AND PUSH (only if action was taken)

```bash
git add memory/TRADE-LOG.md
git commit -m "midday scan $DATE"
git push origin main
```

If no action taken: skip commit entirely.

On push failure:
```bash
git pull --rebase origin main
git push origin main
```
