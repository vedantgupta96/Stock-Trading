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

---

## 2026-06-10 — EOD Snapshot
Equity: $99,799.31 | Cash: $95,128.18 | Day P&L: -$51.03 (-0.05%) | Phase P&L: -$200.69 (-0.20%)
Trades today: 0 | Trades this week: 0/3 | Regime: OFF (last read 6/08; no fresh research today)

| Symbol | Shares | Entry   | Current  | Unreal. P&L       | Stop type                  |
|--------|--------|---------|----------|-------------------|----------------------------|
| NVDA   | 11     | $218.89 | $200.25  | -$205.03 (-8.52%) | 12% trailing GTC ($195.01) |
| CVX    | 13     | $189.54 | $189.85  | +$4.03 (+0.16%)   | 12% trailing GTC ($169.56) |

Notes: No trades. Equity $99,799.31, down -$51.03 (-0.05%) vs the last committed EOD (6/09, $99,850.34); essentially flat (Alpaca last_equity $99,846.15 → true session move ≈ -$46.84, -0.05%). ⚠️ ACTION REQUIRED: NVDA closed at -8.52% from entry ($200.25 vs $218.89), breaching the hard -8% cut rule for the first time. This daily-summary routine is EOD reporting only and places no orders; NVDA remains stop-protected by its live 12% trailing GTC at $195.01 (hwm $221.60), but the -8% discipline rule says cut it — flagged for action at the next pre-market/midday scan: cut NVDA at the open unless regime/thesis materially changed. CVX recovered to +0.16% on firmer oil (hwm $192.69, stop $169.56), no rule triggered. Regime last read OFF (6/08); standing posture remains cash, no new buys. Outlook: execute the NVDA -8% cut next session; continue holding CVX under standard sell-side rules; reassess regime at next pre-market.

---

### 2026-06-11 SELL NVDA — closed (-8% discipline cut)
- Side: sell (sell_to_close, 11 sh)
- Entry price: $218.89 (2026-06-04)
- Exit price: ~$200.32 (cash-derived: proceeds $2,203.57 / 11 sh; entry-day intraday near 6/10 close $200.25)
- Realized P&L: -$204.22 / -8.48%
- Exit reason: Hard -8% cut rule. NVDA closed 6/10 at -8.52% from entry (first breach); the standing 6/10 flag said cut next session, executed this session. Its 12% trailing GTC ($195.01, hwm $221.60) is no longer open, confirming the exit.
- Sector: Technology
- Note: This is a sell, not a new trade — does not count against the 3 new-trades/week limit.

---

## 2026-06-11 — EOD Snapshot
Equity: $99,747.15 | Cash: $97,331.75 | Day P&L: -$52.16 (-0.05%) | Phase P&L: -$252.85 (-0.25%)
Trades today: 1 (NVDA exit) | Trades this week: 0/3 new | Regime: OFF (last read 6/08; no fresh research today)

| Symbol | Shares | Entry   | Current  | Unreal. P&L      | Stop type                  |
|--------|--------|---------|----------|------------------|----------------------------|
| CVX    | 13     | $189.54 | $185.80  | -$48.62 (-1.97%) | 12% trailing GTC ($169.56) |

Notes: The NVDA -8% discipline cut flagged on 6/10 was executed today — 11 sh sold at ~$200.32 for a realized -$204.22 (-8.48%), and its trailing-stop GTC is gone, confirming the exit; the rule breach is now cleared. Equity $99,747.15, down -$52.16 (-0.05%) vs the last committed EOD (6/10, $99,799.31); true single-session move vs Alpaca last_equity ($99,800.20) ≈ -$53.05 (-0.05%) — essentially flat, since NVDA's exit (~$200.32 vs its 6/10 close $200.25) was a wash and the realized loss was already carried as unrealized. CVX is now the lone position at -1.97% (current $185.80, stop $169.56, hwm $192.69) — above the -8% cut, no sell-side rule triggered, fully stop-protected. Regime last read OFF (6/08, S&P below its 20-day SMA); no fresh research ran today (EOD-only routine), so the standing posture remains cash — no new buys until the S&P reclaims its 20-day SMA. Day-trade count 0/3, PDT false. Outlook: hold CVX under standard sell-side rules and reassess regime at the next pre-market.

---

## 2026-06-12 — EOD Snapshot
Equity: $99,765.59 | Cash: $97,331.73 | Day P&L: +$18.44 (+0.02%) | Phase P&L: -$234.41 (-0.23%)
Trades today: 0 | Trades this week: 0/3 | Regime: OFF (last read 6/08; no fresh research today)

| Symbol | Shares | Entry   | Current  | Unreal. P&L      | Stop type                  |
|--------|--------|---------|----------|------------------|----------------------------|
| CVX    | 13     | $189.54 | $187.22  | -$30.16 (-1.22%) | 12% trailing GTC ($169.56) |

Notes: Quiet hold day — no trades. Equity $99,765.59, up +$18.44 (+0.02%) vs the last committed EOD (6/11, $99,747.15); true single-session move vs Alpaca last_equity ($99,747.39) ≈ +$18.20 (+0.02%) — essentially flat and marginally green. CVX is the lone position, recovering intraday (+0.75% on the day) to -1.22% from entry (current $187.22, stop $169.56, hwm $192.685) — above the -8% cut and not at +15/+20%, so no sell-side rule triggered; fully protected by its live 12% trailing-stop GTC. Entered 6/4, ~6 trading days elapsed — well short of the 15-day time stop; CVX earnings est. late Jul–early Aug, clears the 10-day gate. Day-trade count 0/3, PDT false. Regime last read OFF (6/08, S&P below its 20-day SMA); no fresh research ran today (EOD-only routine), so the standing posture remains cash — no new buys until the S&P reclaims its 20-day SMA. Outlook: hold CVX under standard sell-side rules and reassess regime at the next pre-market.
