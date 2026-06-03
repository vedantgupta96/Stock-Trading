# Daily Summary Routine

**Cron**: `0 15 * * 1-5` | **Timezone**: America/Chicago | **Runs**: Weekdays at 3:00 PM CT (4:00 PM ET, market close)

---

DATE=$(date +%Y-%m-%d)

## IMPORTANT — ENVIRONMENT VARIABLES

Every API key is already exported as a process env var. There is NO `.env` file and you MUST NOT create, write, or source one.

Verify before any wrapper call:

```bash
for v in ALPACA_API_KEY ALPACA_SECRET_KEY DISCORD_WEBHOOK_URL; do
  [[ -n "${!v:-}" ]] && echo "$v: set" || echo "$v: MISSING"
done
```

If any var is MISSING: send one Discord alert naming it, then exit.

## IMPORTANT — PERSISTENCE

This is a fresh clone. All file changes vanish unless committed and pushed. The STEP 6 commit is **mandatory** — tomorrow's day P&L calculation depends on today's equity being committed.

---

## STEP 1 — Find yesterday's closing equity

```bash
tail -100 memory/TRADE-LOG.md
```

Locate the most recent EOD snapshot entry. Extract the equity figure. This is your baseline for today's day P&L.

Also read:
```bash
tail -20 memory/RESEARCH-LOG.md
```

## STEP 2 — Pull today's final account state

```bash
bash scripts/alpaca.sh account
bash scripts/alpaca.sh positions
bash scripts/alpaca.sh orders
```

## STEP 3 — Compute today's metrics

Calculate:
- **Day P&L**: today's equity − yesterday's closing equity ($ and %)
- **Phase P&L**: today's equity − $10,000 starting capital ($ and %)
- **Trades today**: count of trade entries dated today in TRADE-LOG.md
- **Trades this week**: count of trade entries since Monday in TRADE-LOG.md (for the 3/week limit)
- **Market regime status**: note from today's research log (above/below 20-day SMA)

## STEP 4 — Append EOD snapshot to memory/TRADE-LOG.md

```
## [DATE] — EOD Snapshot
Equity: $X,XXX.XX | Cash: $X,XXX.XX | Day P&L: [+/-]$X.XX ([+/-]X%) | Phase P&L: [+/-]$X.XX ([+/-]X%)
Trades today: N | Trades this week: N/3 | Regime: [ON/OFF]

| Symbol | Shares | Entry | Current | Unreal. P&L | Stop type |
|--------|--------|-------|---------|-------------|-----------|
| ...    | ...    | ...   | ...     | ...         | ...       |

Notes: [2–3 sentence plain-english summary: what happened today, anything notable, outlook for tomorrow]
```

## STEP 5 — Send Discord summary (always, even on no-trade days)

```bash
bash scripts/discord.sh "$(cat <<'MSG'
📊 Daily Summary — [DATE]
Portfolio: $[EQUITY] | Day: [+/-X%] | Phase: [+/-X%]
Positions: N open | Trades this week: N/3
Regime: [🟢 ON / 🔴 OFF]
[If trades today: → Bought/Sold SYMBOL @ $X]
[If no trades: → No trades today]
MSG
)" --embed [3066993 if day positive, 15158332 if day negative]
```

Keep under 15 lines. One message only.

## STEP 6 — COMMIT AND PUSH (mandatory — always)

```bash
git add memory/TRADE-LOG.md
git commit -m "EOD snapshot $DATE"
git push origin main
```

This commit is required. Tomorrow's routine needs this equity figure.

On push failure:
```bash
git pull --rebase origin main
git push origin main
```

Never force-push.
