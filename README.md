# Stock-Trading Bot

An autonomous, cloud-scheduled swing-trading agent built on Claude Code. It researches markets, places disciplined trades on Alpaca (paper to start), enforces hard risk rules before every order, and notifies you on Discord.

**Claude is the bot.** There is no separate Python trading process. Each scheduled run is a fresh Claude Code container that clones this repo, reads its memory, decides what to do, places orders, writes new memory, and commits everything back to `main`.

## How it works

Three properties drive the design:

- **Stateless runs** — each scheduled firing is independent, so failures self-heal on the next tick.
- **Git as memory** — all state lives in markdown files committed to `main`. Free versioning, diffs, rollback, and a human-readable audit trail.
- **Hard rules as gates** — strategy discipline is enforced programmatically before every order, not left to interpretation.

## The strategy

Momentum-breakout swing trading, **stocks only**. Buy stocks breaking out to multi-month highs on strong volume, enter on the first pullback, and only trade when the broad market is in an uptrend. Full rulebook lives in [`memory/TRADING-STRATEGY.md`](memory/TRADING-STRATEGY.md).

Highlights:

- **Market regime filter** — only go long when the S&P 500 is above its 20-day SMA
- **5 open positions max**, max 2 per sector, max 3 new trades/week
- **Risk-based sizing** — each position risks ~1.5% of equity at its stop
- **12% trailing stop** on every position (GTC order on Alpaca, never mental)
- **Cut losers at -8%**, tighten winners to 7% at +15% / 5% at +20%
- **Never hold through earnings**; **15-day time stop** clears dead money

## The five scheduled routines

Each runs as a Claude Code cloud routine on a cron (America/Chicago):

| Routine | Cron (CT) | What it does |
|---------|-----------|--------------|
| [pre-market](routines/pre-market.md) | `0 6 * * 1-5` | Research catalysts, write today's trade ideas |
| [market-open](routines/market-open.md) | `30 8 * * 1-5` | Run the buy-gate, execute trades, set trailing stops |
| [midday](routines/midday.md) | `0 12 * * 1-5` | Scan positions, cut losers, tighten winners |
| [daily-summary](routines/daily-summary.md) | `0 15 * * 1-5` | EOD snapshot + Discord recap (always sends) |
| [weekly-review](routines/weekly-review.md) | `0 16 * * 5` | Weekly stats, letter grade, strategy review |
| [stop-watchdog](routines/stop-watchdog.md) | every 30 min, market hours | Verifies every position has a full-size stop; re-places missing ones, closes anything unprotected past −8% |

## Repository layout

```text
.
├── CLAUDE.md              # Auto-loaded project context + hard rules
├── env.template           # Copy to .env for local runs (gitignored)
├── scripts/               # All external API calls flow through here
│   ├── alpaca.sh          #   Trading: account, positions, orders, buy, sell, trailing_stop, limit_sell, cancel, close
│   ├── stop_watchdog.sh   #   Safety: ensures every position keeps a full-size protective stop
│   ├── gemini.sh          #   Research: Gemini 3.1 Pro with Google Search grounding
│   └── discord.sh         #   Notifications: Discord webhook (graceful fallback)
├── memory/                # All bot state — committed markdown
│   ├── TRADING-STRATEGY.md   # The rulebook (read first)
│   ├── TRADE-LOG.md          # Every trade + daily EOD snapshots
│   ├── RESEARCH-LOG.md       # One dated entry per trading day
│   ├── WEEKLY-REVIEW.md      # Friday recaps with letter grade
│   └── PROJECT-CONTEXT.md    # Static account/platform context
├── routines/              # The five cloud routine prompts (paste verbatim)
├── dashboard/             # Local Flask web dashboard
└── .claude/commands/      # Local slash commands
```

## Local slash commands

Run inside Claude Code with credentials from your local `.env`:

| Command | Purpose |
|---------|---------|
| `/portfolio` | Read-only snapshot of account, positions, orders; flags missing stops |
| `/trade SYMBOL SHARES buy` | Manual trade helper — runs the full buy-gate, confirms, executes |
| `/pre-market` | Run the research workflow locally |
| `/midday` | Run the position scan locally |
| `/daily-summary` | Generate the EOD snapshot locally |
| `/weekly-review` | Run the weekly review locally |
| `/dashboard` | Launch the web dashboard at `http://localhost:5050` |

## Dashboard

A local Flask web app showing portfolio value, open positions, an equity sparkline, market context from the latest research log, and recent trades. It loads instantly from the memory files (snapshot) and has a **Refresh Live** button that pulls fresh data from Alpaca.

```bash
cd dashboard && ./run.sh
# then open http://localhost:5050
```

## Setup

1. **Accounts**: sign up for [Alpaca](https://alpaca.markets) (paper), [Google AI Studio](https://aistudio.google.com) (Gemini), and create a Discord webhook.
2. **Credentials**: `cp env.template .env` and fill in your keys.
3. **Local smoke test**: open the repo in Claude Code and run `/portfolio` — you should see your account and positions print cleanly.
4. **Dashboard**: run `/dashboard` and confirm it loads.
5. **Go live (cloud)**:
   - Install the Claude GitHub App on this repo (clone + push permission).
   - In Claude Code cloud, create a routine per [`routines/*.md`](routines/) — paste each prompt **verbatim**.
   - Add the env vars on each routine (**not** a committed `.env`).
   - Toggle on **"Allow unrestricted branch pushes"** (the #1 first-run gotcha).
   - Set the cron + timezone, then **Run now** to test before waiting for the schedule.

### Environment variables

| Variable | Used by | Notes |
|----------|---------|-------|
| `ALPACA_API_KEY` / `ALPACA_SECRET_KEY` | alpaca.sh | Paper keys to start |
| `ALPACA_ENDPOINT` | alpaca.sh | `https://paper-api.alpaca.markets` |
| `ALPACA_DATA_ENDPOINT` | alpaca.sh | `https://data.alpaca.markets` |
| `GEMINI_API_KEY` / `GEMINI_MODEL` | gemini.sh | `gemini-2.5-flash` (Pro/3.x need a paid Gemini tier) |
| `DISCORD_WEBHOOK_URL` | discord.sh | Falls back to a local log if unset |

> **Cloud rule:** never create a `.env` file in a cloud routine. The wrapper scripts read directly from the process environment. A committed `.env` leaks secrets.

## Notification philosophy

Quiet by design. Pre-market is silent unless something is urgent; market-open and midday notify only when an action was taken; daily-summary and weekly-review always send one concise message. The cost of a chatty bot is that you stop reading the messages and miss the one that mattered.

## Disclaimer

This is a personal, educational project running on **paper trading**. It is not financial advice. Trading involves risk of loss. Use real money at your own risk.
