---
description: Show a clean snapshot of current account, positions, and open orders. Flags missing stops and positions approaching key thresholds.
---

# /portfolio — Read-only Portfolio Snapshot

Read `.env` if present, then pull live state from Alpaca. No orders placed, no files written.

## Pull account state

```bash
bash scripts/alpaca.sh account
bash scripts/alpaca.sh positions
bash scripts/alpaca.sh orders
```

## Display a clean summary

Print in this format:

```
=== PORTFOLIO SNAPSHOT ===
Equity:        $X,XXX.XX
Cash:          $X,XXX.XX
Buying power:  $X,XXX.XX
Day trades:    N/3 used

=== OPEN POSITIONS (N) ===
SYMBOL   Shares   Entry     Current   Unreal P&L   Stop type   Flag
------   ------   -----     -------   ----------   ---------   ----
...

=== OPEN ORDERS (N) ===
...
```

## Flag warnings (print in bold or with ⚠️)

- Any position with NO matching trailing stop or limit stop order → "⚠️ MISSING STOP"
- Any position with unrealized loss ≤ -6% → "⚠️ APPROACHING -8% STOP"
- Any position up +13% or more with a 12% trailing stop (not yet tightened) → "⚠️ CONSIDER TIGHTENING TO 7%"
- Any position up +18% or more → "⚠️ CONSIDER TIGHTENING TO 5%"
- Day trade count ≥ 2 → "⚠️ PDT WARNING — only N day trades remaining"
- Market regime: quickly check if S&P is above 20-day SMA and note status

No commentary beyond flags. This command is read-only.
