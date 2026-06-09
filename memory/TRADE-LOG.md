# Trade Log

*Every trade entry and daily EOD snapshot lives here. Append only — never edit past entries.*

---

## Format: Trade Entry

```
### [DATE] BUY/SELL [SYMBOL] — [STATUS: open/closed]
- Side: buy | sell
- Shares: N
- Entry price: $X.XX
- Stop level: $X.XX (X% trailing)
- Target: $X.XX (X:1 R/R)
- Catalyst: [one sentence]
- Thesis: [2-3 sentences]
- Sector: [sector — e.g. Technology, Healthcare, Energy]
- Exit price: $X.XX (if closed)
- Realized P&L: $X.XX / X% (if closed)
- Exit reason: (if closed)
```

## Format: EOD Snapshot

```
## [DATE] — EOD Snapshot
Equity: $X,XXX.XX | Cash: $X,XXX.XX | Day P&L: +/-$X.XX (X%) | Phase P&L: +/-$X.XX (X%)
Trades this week: N/3

| Symbol | Shares | Entry | Current | Unreal. P&L | Stop |
|--------|--------|-------|---------|-------------|------|
| ...    | ...    | ...   | ...     | ...         | ...  |

Notes: [plain-english summary of the day]
```

---

## 2026-06-02 — Day 0 Baseline

Equity: $100,000.00 | Cash: $100,000.00 | Day P&L: $0.00 (0.00%) | Phase P&L: $0.00 (0.00%)
Trades this week: 0/3

| Symbol | Shares | Entry | Current | Unreal. P&L | Stop |
|--------|--------|-------|---------|-------------|------|
| —      | —      | —     | —       | —           | —    |

Notes: Day 0 baseline. Paper account funded at $10,000. No positions. Bot goes live on the next trading day.

---

### 2026-06-04 BUY NVDA — open
- Side: buy
- Shares: 11
- Entry price: $218.89 (actual fill)
- Stop level: $192.61 (12% trailing GTC, live)
- Target: $271.42 (3:1 R/R on 8% risk)
- Catalyst: Tech is the week's leading S&P sector (IT +3.75%); NVDA trading near 52-week highs.
- Thesis: Highest-conviction, most-liquid momentum leader (0.16% spread) chosen as the offensive engine of a diversified starter pair. NOTE: discretionary OPERATOR-OVERRIDE entry — placed with the market-regime filter OFF (S&P 7,553.68 below its 20-day SMA 7,591.22) and WITHOUT verifying the breakout-within-5-days / 3–8% pullback / 1.5x-volume gates (no bars data available). Not a strategy-qualified setup.
- Earnings next: ~2026-08-26 (est., unverified — clears the 10-trading-day gate)
- Time stop: 2026-06-25 (15 trading days)

### 2026-06-04 BUY CVX — open
- Side: buy
- Shares: 13
- Entry price: $189.54 (actual fill)
- Stop level: $166.81 (12% trailing GTC, live)
- Target: $235.03 (3:1 R/R on 8% risk)
- Catalyst: Energy is the week's #2 S&P sector (+3.17%); CVX trading near 52-week highs.
- Thesis: Lower-beta, tight-spread (0.05%) energy name added as ballast to diversify away from tech-correlated drawdown in the starter pair. NOTE: discretionary OPERATOR-OVERRIDE entry — placed with the market-regime filter OFF and WITHOUT verifying the breakout/pullback/volume gates. Not a strategy-qualified setup.
- Earnings next: ~2026-08-07 (est., unverified — clears the 10-trading-day gate)
- Time stop: 2026-06-25 (15 trading days)

---

## 2026-06-04 — EOD Snapshot
Equity: $99,976.39 | Cash: $95,128.19 | Day P&L: -$23.61 (-0.02%) | Phase P&L: -$23.61 (-0.02%)
Trades today: 2 | Trades this week: 2/3 | Regime: OFF

| Symbol | Shares | Entry    | Current  | Unreal. P&L      | Stop type        |
|--------|--------|----------|----------|------------------|------------------|
| NVDA   | 11     | $218.89  | $218.15  | -$8.14 (-0.34%)  | 12% trailing GTC |
| CVX    | 13     | $189.54  | $188.35  | -$15.47 (-0.63%) | 12% trailing GTC |

Notes: First live trading day on the $100k paper account. Operator-authorized one-time override opened a diversified starter pair (NVDA tech, CVX energy) despite the regime filter being OFF (S&P below its 20-day SMA). Both positions closed marginally red on the day but are well within normal noise and each is protected by a live 12% trailing-stop GTC order. Equity essentially flat at -0.02%. Regime remains OFF, so no new buys until S&P reclaims its 20-day SMA; manage the two open names via standard sell-side rules. Phase/day P&L computed off the live $100k base, not the illustrative $10k.

---

## 2026-06-09 — EOD Snapshot
Equity: $99,850.34 | Cash: $95,128.18 | Day P&L: -$126.05 (-0.13%) | Phase P&L: -$149.66 (-0.15%)
Trades today: 0 | Trades this week: 0/3 | Regime: OFF

| Symbol | Shares | Entry   | Current  | Unreal. P&L       | Stop type                  |
|--------|--------|---------|----------|-------------------|----------------------------|
| NVDA   | 11     | $218.89 | $208.57  | -$113.51 (-4.71%) | 12% trailing GTC ($195.01) |
| CVX    | 13     | $189.54 | $186.76  | -$36.14 (-1.47%)  | 12% trailing GTC ($168.11) |

Notes: Quiet hold day — no trades. Equity $99,850.34. Day P&L (-$126.05, -0.13%) is measured against the last committed EOD snapshot (2026-06-04, $99,976.39) because the 6/05 and 6/08 daily-summary snapshots were missed; the true single-session move vs Alpaca's prior close ($99,883.34) was only -$33.00 (-0.03%). Both positions remain above their -8% cut and fully stop-protected by live 12% trailing-stop GTC orders (NVDA stop $195.01 / hwm $221.60; CVX stop $168.11 / hwm $191.03); no sell-side rule triggered. NVDA still soft (-4.71%) from the semiconductor rotation; CVX (-1.47%) steadier on firmer oil. Regime last read OFF (6/08: S&P below 20-day SMA on both Gemini and Alpaca) and no fresh research ran today, so the standing posture is cash — no new buys until the S&P reclaims its 20-day SMA. Outlook: continue holding both names under standard sell-side rules and reassess regime at next pre-market.
