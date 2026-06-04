# Stop-Loss Watchdog Routine

**Cron**: `5,35 13-20 * * 1-5` (UTC) | **≈** every 30 min during market hours, 8:35–15:35 CT

---

DATE=$(date +%Y-%m-%d)
NOW=$(date -u +%H:%MZ)

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

This is a fresh clone. Commit and push at STEP 4 **only if the watchdog took an action** (a stop placed or a position closed). Stay silent and commit nothing when everything is already protected — that is the common case.

## What this routine does

Enforces the "no mental stops" rule: every open position must have a protective stop order covering its full size. The logic is deterministic and lives in `scripts/stop_watchdog.sh` — your job is to run it, then notify and log **only if it acted**. Do not re-derive the stop rules yourself; trust the script.

---

## STEP 1 — Run the watchdog (it fixes as it goes)

```bash
bash scripts/stop_watchdog.sh --fix
```

The script:
- finds any long position whose open protective sell orders don't cover its full quantity
- if that position is already ≤ −8% from entry → **closes it** (hard-stop rule)
- otherwise → **places a trailing stop** at the strategy tier (≥+20% → 5%, ≥+15% → 7%, else 12%), falling back to a limit sell at entry × 0.92 if the trailing stop is rejected (PDT)

Capture its stdout. It prints one `ACTION ...` line per position it touched and a final `WATCHDOG: ...` summary line.

## STEP 2 — Decide if anything happened

- If the summary says `0 actions` (and there are no `ACTION ... result=closed|trailing_*|limit_fallback_*` lines): **nothing to do.** Do not notify, do not commit. Exit.
- Otherwise continue.

Note any line ending in `result=queued` or `result=close_failed` — those are failures to surface loudly.

## STEP 3 — Discord alert (only if an action was taken)

One message. Use red (`15158332`) if any position was **closed** or any action failed; otherwise yellow (`16776960`).

```bash
bash scripts/discord.sh "🛡️ Stop Watchdog $DATE $NOW
[one line per ACTION: e.g. 'Placed 12% trailing stop on MSFT (5 sh)' / 'CLOSED TSLA at -9% — was unprotected past hard stop' / '⚠️ STOP QUEUED for AMD — placement failed, fix manually']" --embed COLOR
```

Translate each `ACTION` line into a plain-English sentence. Keep it under 12 lines.

## STEP 4 — COMMIT AND PUSH (only if an action was taken)

Append a short entry to `memory/TRADE-LOG.md`:

```
## [DATE NOW] — Stop Watchdog
- [SYMBOL]: [placed Nx% trailing stop | closed at [pnl]% (unprotected past -8%) | STOP QUEUED — manual fix needed]
- ...
```

Then:

```bash
git add memory/TRADE-LOG.md
git commit -m "stop watchdog $DATE $NOW"
git push origin main
```

On push failure:
```bash
git pull --rebase origin main
git push origin main
```

Never force-push. If no action was taken, skip this step entirely.
