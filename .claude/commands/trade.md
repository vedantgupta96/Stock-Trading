---
description: Manual trade helper. Usage: /trade SYMBOL SHARES buy. Runs the full buy-gate, shows the order plan, asks y/n before placing.
---

# /trade — Manual Trade Helper

**Usage**: `/trade SYMBOL SHARES buy`

Only buy orders are supported. To sell, use /portfolio to find the position then close it manually via Alpaca dashboard or the midday/portfolio commands.

## STEP 1 — Read today's research log

```bash
tail -80 memory/RESEARCH-LOG.md
cat memory/TRADING-STRATEGY.md
```

Verify there is a documented catalyst for $SYMBOL in today's research entry. If not: abort and explain why.

## STEP 2 — Pull live state

```bash
bash scripts/alpaca.sh account
bash scripts/alpaca.sh positions
bash scripts/alpaca.sh orders
bash scripts/alpaca.sh quote $SYMBOL
```

## STEP 3 — Run all 11 buy-gate checks

For each check, print PASS or FAIL with the data:

1. Market regime: S&P above 20-day SMA? (check research log from today)
2. Open positions after fill ≤ 5
3. Same-sector positions after fill ≤ 2
4. Trades this week ≤ 3 (count entries in TRADE-LOG.md since Monday)
5. Position cost ≤ available cash
6. PDT day-trade count < 3
7. No earnings within 10 trading days (check via Gemini if needed)
8. Catalyst documented in today's research log
9. Breakout within last 5 trading days
10. Breakout volume ≥ 1.5x 20-day average
11. Instrument is a stock

If ANY gate fails: print the failure clearly and abort. Do not place the order.

## STEP 4 — Show order plan

Print a summary before asking for confirmation:

```
=== ORDER PLAN ===
Symbol:       $SYMBOL
Shares:       $SHARES
Side:         buy (market, day)
Est. cost:    $X,XXX (N shares × ~$X current ask)
Stop order:   trailing_stop GTC 12% → ~$X.XX stop price
Target:       ~$X.XX (+24%, 3:1 R/R on 8% risk)
Risk:         ~$X (~1.5% of equity)
Time stop:    [date 15 trading days from today]

Gate checks:  11/11 PASS
```

## STEP 5 — Ask for confirmation

Ask: "Place this order? (y/n)"

If n: abort with "Order cancelled."
If y: continue.

## STEP 6 — Place the order

```bash
bash scripts/alpaca.sh buy $SYMBOL $SHARES
```

Wait for and print the fill confirmation (order ID, fill price, fill time).

Then immediately place the trailing stop:

```bash
bash scripts/alpaca.sh trailing_stop $SYMBOL $SHARES 12.0
```

If trailing stop is rejected (PDT rule): place a fixed limit sell at fill_price × 0.92, and note "trailing stop queued for tomorrow" in the trade log.

## STEP 7 — Log and notify

Append to `memory/TRADE-LOG.md`:

```
### [DATE] BUY [SYMBOL] — open
- Side: buy
- Shares: $SHARES
- Entry price: $[actual fill]
- Stop level: 12% trailing (→ ~$[fill × 0.88])
- Target: $[fill × 1.24] (3:1 R/R)
- Catalyst: [from research log]
- Thesis: [brief summary]
- Time stop: [date]
```

Send Discord notification:
```bash
bash scripts/discord.sh "Bought $SYMBOL $SHARES shares @ $[FILL] | Stop: ~$[STOP] | Target: $[TARGET]" --embed 3066993
```
