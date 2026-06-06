# VOLT Dashboard — UI Kit

A high-fidelity, interactive recreation of the **VOLT trading cockpit**: a personal
swing-trading dashboard for the Claude-driven Stock-Trading bot. Built as modular React
(inline JSX + Babel) so pieces can be lifted into real designs.

## Run
Open `index.html`. No build step — React, ReactDOM and Babel load from CDN; component
files load as `text/babel`.

## What it demonstrates (click-thru)
- **Tabbed navigation** — the top bar + the 4 portfolio KPIs stay persistent; tab between
  **Overview / Positions / Analytics** instead of one long scroll.
- **Snapshot ⇄ Live** — the dashboard boots from the committed memory snapshot. Hit
  **Refresh Live** → values roll up, the positions table morphs into live position cards
  with sparklines + risk/reward bars, and toasts fire (sync confirmation, "no protective
  stop" + "near −8% stop" warnings).
- **Clickable positions → detail drawer** — click any position (table row or live card) to
  slide in a detail drawer: large price chart, live R-multiple, the entry/stop/target ladder
  (with locked-profit trailing-stop state), cost/value/risk metrics, thesis + catalyst, and
  that symbol's news.
- **Manual Trade** — the **Trade** button opens a modal that runs the 11-check buy-gate
  with animated check cards, then confirms the order.
- **Portfolio history** — animated equity / drawdown area chart with **$ y-axis + date x-axis
  labels** and a hover scrubber.
- **Performance analytics** — win rate, max DD, profit factor, avg R-multiple, streaks,
  plus animated **Sector P&L** bars and an **R-multiple distribution** histogram.
- **Market context + news** — VIX, regime note, decision banner, and a news feed.

## Files
| File | Role |
|------|------|
| `index.html`   | Mounts everything; script load order matters |
| `data.js`      | Mock data — shapes mirror the real dashboard's TypeScript types |
| `icons.jsx`    | Lucide-style stroke icons as React components |
| `helpers.jsx`  | `fmt`/`signed`/`pct`, `AnimatedNumber`, `Sparkline`, `RRBar`, `SectorBadge` |
| `topbar.jsx`   | `TopBar`, `StatCards` |
| `charts.jsx`   | `EquityChart` (+ `AreaChart`), `MarketContext` |
| `analytics.jsx`| `AnalyticsStats`, `SectorPnl`, `RMultiple` |
| `news.jsx`     | `NewsWidget` |
| `positions.jsx`| `Positions` (snapshot table + live `PositionCard`), clickable rows/cards |
| `drawer.jsx`   | `PositionDrawer` — slide-in position detail panel |
| `toast.jsx`    | `ToastStack`, `TradeModal` |
| `app.jsx`      | Orchestrates state, refresh flow, toasts, modal |
| `kit.css`      | Layout + component styling on top of the design tokens |

Styling pulls tokens from `../../colors_and_type.css`.

## Note on entrance animations
Entrance/draw animations are gated under an `.app.anim` class with a JS **reveal
safety-net** (see `app.jsx`): if the document never paints (offscreen tab, reduced
motion), every gated element is forced to its final visible state after ~1.5s. The
resting state is always visible — animation is purely additive.

## Fidelity notes
This is a **reimagining**, not a clone, of the original Flask/Vite dashboard
(`dashboard/` in the source repo). The data model, widgets, and trading concepts
(regime filter, trailing stops, buy-gate, R-multiples, sector P&L) are faithful to the
product; the visual language (VOLT) is the new design system in this project.
