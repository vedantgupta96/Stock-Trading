# Weekly Review Routine

**Cron**: `0 16 * * 5` | **Timezone**: America/Chicago | **Runs**: Fridays at 4:00 PM CT

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

This is a fresh clone. All file changes vanish unless committed and pushed. MUST commit and push at STEP 7.

---

## STEP 1 — Read the full week's memory

```bash
cat memory/WEEKLY-REVIEW.md
cat memory/TRADING-STRATEGY.md
# Read all of this week's trade log and research log entries
tail -200 memory/TRADE-LOG.md
tail -200 memory/RESEARCH-LOG.md
```

## STEP 2 — Pull Friday close account state

```bash
bash scripts/alpaca.sh account
bash scripts/alpaca.sh positions
```

## STEP 3 — Compute the week's metrics

Calculate:
- **Starting equity**: Monday's opening equity from the first EOD snapshot this week in TRADE-LOG.md
- **Ending equity**: today's equity from Alpaca account call
- **Week return**: ending − starting ($ and %)
- **S&P 500 week return** (for comparison):
  ```bash
  bash scripts/gemini.sh "S&P 500 week performance week ending $DATE — percentage change"
  ```
- **Trades taken**: count all trade entries this week
- **Win / Loss / Open**: classify each trade
- **Win rate**: (wins / closed trades) × 100
- **Best trade**: highest realized P&L% this week
- **Worst trade**: lowest realized P&L% this week
- **Profit factor**: sum of winning P&Ls / |sum of losing P&Ls| (if no losers: write "N/A")
- **Regime filter days**: how many trading days was the regime filter ON vs OFF this week

## STEP 4 — Append full review to memory/WEEKLY-REVIEW.md

Match the existing template format exactly. Include:

```
## Week of [MON DATE] – [FRI DATE]

### Stats
| Metric | Value |
...

### Closed Trades This Week
| Symbol | Entry | Exit | P&L | Reason |
...

### Open Positions at Week End
| Symbol | Entry | Current | Unreal. P&L | Stop |
...

### What Worked
- [3–5 bullets]

### What Didn't Work
- [3–5 bullets]

### Key Lessons
- [2–3 bullets — be specific, not generic]

### Adjustments for Next Week
- [Any rule tweaks, sector avoidances, or focus areas]

### Grade: [A/B/C/D/F]
```

## STEP 5 — Update trading strategy if needed

A rule should be updated only if it has **clearly proved out for 2+ consecutive weeks** or **clearly failed badly** (with specific data to back it up).

If updating: edit `memory/TRADING-STRATEGY.md` directly, note the change and the data behind it in the weekly review's "Adjustments" section, and add it to the git commit below.

If not updating: leave `memory/TRADING-STRATEGY.md` unchanged.

## STEP 6 — Send Discord weekly recap (always)

```bash
bash scripts/discord.sh "$(cat <<'MSG'
📈 Week ending [DATE]
Portfolio: $[EQUITY] | Week: [+/-X%] | Phase: [+/-X%]
vs S&P 500: [+/-X%]
Trades: N (W:[N] L:[N] O:[N]) | Win rate: X%
Best: [SYM] +X% | Worst: [SYM] -X%
Regime filter: [N days ON / N days OFF]
Grade: [A/B/C/D/F]
MSG
)" --embed [3066993 if positive week, 15158332 if negative]
```

One message, under 15 lines.

## STEP 7 — COMMIT AND PUSH (mandatory)

```bash
# Always include WEEKLY-REVIEW.md
# Include TRADING-STRATEGY.md only if it was changed
git add memory/WEEKLY-REVIEW.md
# git add memory/TRADING-STRATEGY.md  # uncomment if strategy was updated
git commit -m "weekly review $DATE"
git push origin main
```

On push failure:
```bash
git pull --rebase origin main
git push origin main
```

Never force-push.
