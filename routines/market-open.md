# Market-Open Routine

**Cron**: `30 8 * * 1-5` | **Timezone**: America/Chicago | **Runs**: Weekdays at 8:30 AM CT (market open)

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

This is a fresh clone. All file changes vanish unless committed and pushed. MUST commit and push at STEP 7 if any trades were placed.

---

## STEP 1 — Read today's research log entry

```bash
tail -100 memory/RESEARCH-LOG.md
cat memory/TRADING-STRATEGY.md
```

If today's entry is missing (pre-market routine failed), run the pre-market research steps inline before proceeding. **Never trade without documented research.**

## STEP 2 — Check market regime

From today's research log: is S&P 500 above its 20-day SMA?

- If NO: log "Market regime filter OFF — no new buys today" and skip to STEP 7 (no commit needed if no trades).
- If YES: continue.

## STEP 3 — Re-validate planned trades with fresh quotes

For each trade idea from the research log:

```bash
bash scripts/alpaca.sh quote SYMBOL
```

Check:
- Bid/ask spread is reasonable (< 0.5% of price)
- Stock is not halted (non-zero bid and ask)
- Current price is within 2% of the planned entry from research (if it's gapped up > 5%, skip — you missed the entry)
- Pullback % from breakout high is still in the 3–8% range

## STEP 4 — Run the full buy-gate on each planned order

The 11-check gate is enforced by `scripts/buy_gate.sh` — **do not re-derive the checks by hand.** It computes regime (#1), positions (#2), cost/sizing (#5), PDT (#6), breakout (#9), volume (#10), and is-stock (#11) deterministically from Alpaca; you supply the research-derived inputs (#3 sector, #4 trades-this-week, #7 earnings, #8 catalyst) from today's research log and TRADE-LOG.

For each validated trade idea:

```bash
bash scripts/buy_gate.sh SYMBOL \
  --sector-count <existing positions in this stock's sector> \
  --trades-this-week <buy trades placed since Monday> \
  --earnings-days <trading days to next earnings, or "none"> \
  --catalyst yes
```

- **Proceed only if the script prints `GATE: PASS` (exit code 0).** Use the `Shares:` it computes as the order quantity.
- If it prints `GATE: FAIL — <checks>` (exit 2): skip this trade and log the specific failing check(s) and reason in the research log.
- The research inputs FAIL CLOSED — if you can't substantiate the catalyst, sector count, trades-this-week, or earnings date, the gate will (correctly) fail.

## STEP 5 — Place approved trades

For each trade that passed all gates:

**a. Market buy:**
```bash
bash scripts/alpaca.sh buy SYMBOL QTY
```
Wait for fill confirmation. Note the actual fill price.

**b. Immediately place 12% trailing stop (GTC):**
```bash
bash scripts/alpaca.sh trailing_stop SYMBOL QTY 12.0
```

If Alpaca rejects the trailing stop due to PDT rules:
- Fall back: place a fixed limit sell at entry × 0.92
- If that is also blocked: log "STOP QUEUED — place trailing stop tomorrow morning" in trade log

**c. Append trade entry to memory/TRADE-LOG.md:**

```
### [DATE] BUY [SYMBOL] — open
- Side: buy
- Shares: N
- Entry price: $X.XX (actual fill)
- Stop level: $X.XX (12% trailing)
- Target: $X.XX (3:1 R/R)
- Catalyst: [one sentence]
- Thesis: [2–3 sentences — breakout date, pullback %, volume, sector momentum]
- Sector: [the sector you analyzed for --sector-count, e.g. Technology]
- Earnings next: [date]
- Time stop: [date 15 trading days from now]
```

## STEP 6 — Notifications (ALWAYS send a detailed decision summary)

Send **one** Discord message every run — on both trade and no-trade days — explaining
**what was considered and why we did or did not buy.** Never go silent; "we looked and
chose not to act, here's why" is exactly what we want surfaced.

The message is a single multi-line summary (the embed description renders markdown and
newlines). Pick the embed color by outcome:
- **3066993 (green)** — at least one buy placed
- **3447003 (blue)** — HOLD, regime ON but nothing cleared the gate
- **15844367 (amber)** — HOLD because the regime filter is OFF (no-buy day)
- **15158332 (red)** — an error/abort (e.g., missing env var, data unavailable)

Build the body with these sections (omit a line only if truly N/A):

```
📊 Market-Open $DATE — DECISION: <BUY $SYM ×N | HOLD>

Regime: <ON/OFF> — S&P <level> vs 20d SMA <sma> (<above/below>); SPY gate read <spy> vs <sma>
Account: equity $<eq> | cash $<cash> | day-trades <n>/3 | open positions <n>/5
VIX <v> (<chg>) · WTI $<oil> (<chg>) · backdrop: <one phrase>

Considered:
• $<SYM> — <PASS/FAIL>: <the deciding check(s) + one-line reason>
• $<SYM> — <PASS/FAIL>: <...>
(if regime OFF: "Regime filter OFF → buy gate #1 fails for everything; no candidates evaluated.")

Held: $<SYM> <+/-x%> (stop $<s>), $<SYM> <+/-x%> (stop $<s>) — <any sell rule triggered? else "within tolerance">

Decision & reasoning: <2–3 sentences — the actual logic, e.g. why patience/cash, or why this name earned the buy>
```

Then send it:

```bash
bash scripts/discord.sh "$SUMMARY" --embed <color>
```

If a buy was placed, the summary's "Decision" section must name each trade with
shares, fill price, stop, and target. Keep the whole body under ~3500 characters.

## STEP 7 — COMMIT AND PUSH (only if trades were placed)

```bash
git add memory/TRADE-LOG.md memory/RESEARCH-LOG.md
git commit -m "market-open trades $DATE"
git push origin main
```

If no trades: skip commit.

On push failure:
```bash
git pull --rebase origin main
git push origin main
```
