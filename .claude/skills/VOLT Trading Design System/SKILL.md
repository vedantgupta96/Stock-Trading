---
name: volt-design
description: Use this skill to generate well-branded interfaces and assets for VOLT, a bold personal stock-trading dashboard design system (dark ink canvas, electric chartreuse accent, mint/magenta P&L, glowing animated data viz). Either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, brand assets, and a full trading-dashboard UI kit for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

Key files:
- `colors_and_type.css` — all design tokens (colors, type, spacing, radii, shadow/glow, motion). Start here.
- `README.md` — full brand guide: content fundamentals, visual foundations, iconography, index.
- `assets/` — VOLT logomark + wordmark SVGs.
- `preview/` — design-system reference cards (one concept each: colors, type, spacing, components, brand).
- `ui_kits/dashboard/` — interactive React recreation of the VOLT trading cockpit. **Read its
  `README.md` first**, then the component files. To reuse the design, copy these verbatim:
  - `kit.css` — layout + component styling on top of the tokens
  - `icons.jsx` — Lucide-style stroke icons as React components
  - `helpers.jsx` — `fmt`/`signed`/`pct`, `AnimatedNumber`, `Sparkline`, `RRBar`, `SectorBadge`
  - `topbar.jsx` — `TopBar`, `StatCards`
  - `charts.jsx` — `EquityChart` (+ axis-labelled `AreaChart`), `MarketContext`
  - `analytics.jsx` — `AnalyticsStats`, `SectorPnl`, `RMultiple`
  - `news.jsx` — `NewsWidget`
  - `positions.jsx` — `Positions` (table ⇄ live cards), `PositionsSummary` (compact strip)
  - `drawer.jsx` — `PositionDrawer` (slide-in position detail)
  - `toast.jsx` — `ToastStack`, `TradeModal`
  - `app.jsx` — orchestrates tabs, snapshot⇄live, drawer, toasts; `data.js` — mock data shapes
  - `index.html` — shows the script load order (data → icons → helpers → sections → app)

> Ignore the auto-generated `_ds_*` files and `.thumbnail` — they are tooling artifacts, not
> part of the design system.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and
create static HTML files for the user to view. Link `colors_and_type.css` for tokens, and lift
components from `ui_kits/dashboard/` (icons, stat cards, charts, position cards, toasts, modal).
If working on production code, copy assets and read the rules here to become an expert in
designing with this brand.

House rules to honor VOLT:
- Volt chartreuse `#CCFF00` is for brand/interactive/live only — never for P&L. Gains = mint
  `#3DF5A0`, losses = magenta `#FF3D71`, caution = amber `#FFB020`.
- All numbers in JetBrains Mono with explicit signs; all UI/headings in Space Grotesk; ALL-CAPS
  wide-tracked micro-labels.
- Glow marks anything live/interactive/alarming. Animate generously (number rollups, line
  draw-on, bar grow-in, staggered card entrances) but gate entrance animations so content is
  never stuck hidden.
- Icons: Lucide, 2px stroke, round. No decorative emoji.

If the user invokes this skill without any other guidance, ask them what they want to build or
design, ask a few questions, and act as an expert designer who outputs HTML artifacts _or_
production code, depending on the need.
