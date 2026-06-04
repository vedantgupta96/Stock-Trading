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

## STEP 3 — Run the buy-gate

Run the deterministic gate (it computes regime, positions, sizing, PDT, breakout, volume, and is-stock from Alpaca; you supply the research inputs):

```bash
bash scripts/buy_gate.sh $SYMBOL \
  --sector-count <existing positions in this stock's sector> \
  --trades-this-week <buy trades since Monday, from TRADE-LOG.md> \
  --earnings-days <trading days to next earnings, or "none"> \
  --catalyst yes
```

Print its full output (all 11 checks + sizing). **If it does not print `GATE: PASS` (exit 0), abort — do not place the order.** Use the `Shares:` it recommends as the order quantity (if the user passed a different $SHARES, flag the discrepancy and prefer the gate's risk-based size).

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
- Sector: [the sector you analyzed for --sector-count, e.g. Technology]
- Time stop: [date]
```

Send Discord notification:
```bash
bash scripts/discord.sh "Bought $SYMBOL $SHARES shares @ $[FILL] | Stop: ~$[STOP] | Target: $[TARGET]" --embed 3066993
```
