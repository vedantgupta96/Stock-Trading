# Project Context

*Static background. Rarely updated.*

## What this is

An autonomous swing-trading bot built on Claude Code cloud routines. Claude is the bot — every scheduled run is a fresh LLM invocation that reads memory, makes decisions, places orders, and writes new memory back to Git.

## Account

- **Broker**: Alpaca (paper trading)
- **Endpoint**: `https://paper-api.alpaca.markets`
- **Starting capital**: $10,000
- **Mode**: Paper (no real money at risk)
- **PDT status**: Subject to PDT rule (< $25k account)

## Strategy

- Swing trading, stocks only
- 5–6 positions max, 20% per position, 3 trades/week max
- 10% trailing stop on every position
- Cut losers at -7%, tighten winners at +15%/+20%
- Full rules in `memory/TRADING-STRATEGY.md`

## Stack

- **Brokerage API**: Alpaca REST v2 (via `scripts/alpaca.sh`)
- **Market research**: Gemini 3.1 Pro with Google Search grounding (via `scripts/gemini.sh`)
- **Notifications**: Discord webhook (via `scripts/discord.sh`)
- **Scheduling**: Claude Code cloud routines (5 daily/weekly jobs)
- **Memory**: Git-committed markdown files in `memory/`
- **Dashboard**: Flask web app in `dashboard/` (local only)

## Timezone

US Central (CT). All cron schedules are in America/Chicago.

## Five scheduled routines

| Routine | Cron (CT) | Purpose |
|---------|-----------|---------|
| pre-market | `0 6 * * 1-5` | Research and trade ideas |
| market-open | `30 8 * * 1-5` | Execute planned trades |
| midday | `0 12 * * 1-5` | Scan positions, cut losers |
| daily-summary | `0 15 * * 1-5` | EOD snapshot + Discord recap |
| weekly-review | `0 16 * * 5` | Weekly stats, grade, strategy update |

## Design principles

- **Stateless runs**: each routine is independent; failures self-heal on the next tick
- **Git as memory**: all state is markdown committed to main; free audit trail
- **Hard rules as gates**: strategy discipline is enforced before every order
- **Quiet notifications**: alert only when something actually happened
