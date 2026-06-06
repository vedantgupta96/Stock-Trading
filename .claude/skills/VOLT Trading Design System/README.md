# VOLT — Trading Design System

**VOLT** is a personal stock-trading cockpit design system. It dresses an autonomous,
Claude-driven swing-trading bot in a bold, high-energy visual language: a near-black ink
canvas, an electric chartreuse signature accent, mint-green gains and hot-magenta losses,
a vivid categorical palette for sectors, glowing data, and number-rollup animations.

> **Origin & creative brief.** This system was built from the open-source
> **[vedantgupta96/Stock-Trading](https://github.com/vedantgupta96/Stock-Trading)** repo —
> an autonomous swing-trading agent ("Claude is the bot") with a local Flask/Vite dashboard
> (`dashboard/`). The data model, widgets, and trading concepts are faithful to that product;
> the *visual* direction (VOLT) is an original, deliberately loud reimagining requested by the
> user ("go crazy… animations, crazy colors, beautiful unique UIs"). The reader is encouraged
> to explore that repository to build higher-fidelity, data-accurate designs.

---

## The product, in one breath

A stateless, cloud-scheduled agent researches the market each morning, runs a hard-gated
momentum-breakout strategy (stocks only), places disciplined trades on Alpaca with always-on
12% trailing stops, and reports to you. **VOLT is the windshield** — the dashboard that surfaces
portfolio value, the equity curve, open positions with their protective stops, performance
analytics (win rate, profit factor, R-multiples, sector P&L), market-regime status, and news.

Key domain vocabulary the UI speaks:
- **Regime filter** — only go long when the S&P 500 is above its 20-day SMA (badge: Regime On/Off)
- **Trailing stop / "No Stop"** — every position must carry a full-size protective stop; missing
  stops are a loud red alarm
- **R-multiple** — profit/loss measured in units of the trade's initial risk
- **Buy-gate** — an 11-check deterministic gate every order must clear (recreated in the Trade modal)
- **Sector caps, time-stops, 5-slot max** — discipline surfaced as badges and meters

---

## CONTENT FUNDAMENTALS

How VOLT writes. The product's own voice is **terse, disciplined, and a little deadpan** —
the tone of a trading desk that has seen everything. VOLT keeps that and adds energy.

- **Voice:** second-person and imperative for actions ("Refresh Live", "Run Buy-Gate",
  "Confirm Buy"). Status is stated flatly, no hedging ("Cleared for new entries · 2 of 5 slots
  open"; "S&P 500 holding above its 20-day SMA").
- **Casing:** Title or sentence case for buttons and headings; **ALL-CAPS micro-labels** with
  wide letter-spacing for field labels and section eyebrows ("PORTFOLIO VALUE", "SECTOR P&L",
  "REGIME: ON"). Numbers always in tabular mono.
- **Numbers are the loudest words.** Money, %, and R-multiples are set in JetBrains Mono and
  carry explicit signs (`+$612.40`, `−1.27%`, `+0.84R`). Gains/losses are colored, never neutral.
- **Warnings are blunt and specific.** "NVDA: no protective stop found" / "LLY: −6.0% — near
  −8% hard stop". They name the symbol and the number. Never vague.
- **Notification philosophy (inherited):** quiet by design. Confirmations are one line; warnings
  only fire on a real condition. Don't be chatty — a noisy dashboard gets ignored.
- **No emoji as decoration.** The source repo uses a couple of inline glyphs (⏰ time-stop,
  ⚠ warning); VOLT replaces these with line icons. Unicode triangles ▲▼ are allowed *inside the
  ticker tape* as part of the data typography, not as UI chrome.
- **Vibe:** cockpit, not casino. Confident, fast, numerate. "Buy strength. Sell weakness, fast."

---

## VISUAL FOUNDATIONS

The whole system is defined in **`colors_and_type.css`** (foundational + semantic tokens).

**Color & vibe.** A near-black ink canvas (`--ink-900 #07070C`) with a faint violet/blue cast,
layered with two barely-there radial washes (chartreuse top-right, cyan top-left) so the
background reads as a lit room, not flat black. Surfaces step up in lightness
(`ink-900 → ink-600`). The signature is **volt chartreuse `#CCFF00`** — used *only* for brand,
interactive, and live elements (logo, primary buttons, focus rings, the equity line, the live
pulse), never for P&L. P&L has its own dedicated hues: **mint `#3DF5A0` up**, **magenta `#FF3D71`
down**, **amber `#FFB020` caution**. Sectors get a vivid 8-hue categorical palette. Imagery, when
present, should skew cool and electric — there is no warm/grain/sepia treatment here.

**Type.** Two families only. **Space Grotesk** (400–700) for everything structural — headings,
UI, the wordmark — slightly negative tracking on large sizes. **JetBrains Mono** (400–700,
`tnum`) is the *data voice*: every price, percentage, share count, timestamp, and ticker. The
contrast between geometric-grotesk chrome and monospaced data is the core typographic move.

**Spacing & layout.** 4px base scale. A centered `max-width: 1240px` app column with 16px gaps in
a CSS grid. Cards never touch — generous 16–24px gutters. Micro-labels sit 10–12px above their
value. The grid is calm so the color and glow can be loud.

**Corner radii.** Soft but not pill-y for containers: cards `--r-lg 18px`, stat tiles 18px,
buttons/inputs `--r-sm 9px`, badges fully `--r-pill`. The bolt mark sits in a 13–26px rounded
square.

**Cards.** A subtle top-to-bottom gradient (`ink-800 → ink-850`), a 1px hairline border
(`rgba(255,255,255,0.07)`), `--shadow-card` (soft drop + inset top highlight). Many cards carry a
2px **accent rail** along the top edge that glows in the relevant hue (volt for portfolio value,
mint/magenta for day P&L direction). State-aware cards (a position near its stop, a winner ready
to tighten) swap their border tint and gain an outer **glow** (`--glow-up` / `--glow-down`).

**Borders & dividers.** Almost everything is an alpha-white hairline so it layers on any surface:
`--line 7%`, `--line-strong 12%`. Strong/colored borders are reserved for emphasis (volt focus,
danger states).

**Shadow / glow system.** Two elevation shadows (`--shadow-card`, `--shadow-pop`) plus three
**glow** tokens (`--glow-volt`, `--glow-up`, `--glow-down`) — a 1px colored ring + a soft colored
blur. Glow is the system's signature; it marks anything live, interactive, or alarming. Glows were
intentionally tuned **loud**.

**Transparency & blur.** Used sparingly and on purpose: the modal scrim is
`rgba(4,4,8,0.72)` + `backdrop-filter: blur(4px)`; the ticker tape fades at both edges with a
horizontal mask. No frosted-glass everywhere — blur signals "a layer is above you."

**Animation.** This is a kinetic system, but disciplined.
- **Easing:** `--ease-out cubic-bezier(0.22,1,0.36,1)` for settles; `--ease-spring (0.34,1.56,0.64,1)`
  for toasts/modals (tiny overshoot). Durations 140/240/520ms.
- **Number rollups** on every monetary stat (cubic ease-out over ~750ms) — values count up when
  data changes.
- **Line draw-on** for the equity chart and sparklines (animated `stroke-dashoffset`).
- **Grow-in** for sector bars (scaleX) and the R-multiple histogram (scaleY), staggered.
- **Entrance:** cards rise + fade (`riseIn`), staggered by ~60ms. **Gated** under `.app.anim`
  with a JS reveal safety-net so content is never stuck hidden if the page doesn't paint.
- **Live pulse** on the "Live" dot; a marquee **ticker tape**; spinner on the refresh button.
- Respects `prefers-reduced-motion`.

**Hover / press states.**
- Primary (volt) button: hover → brighter chartreuse + 1px lift; press → dim chartreuse + scale 0.98.
- Ghost button / rows: hover lightens the surface (~2.5% white) and warms the border; news rows
  also tint their trailing arrow volt on hover.
- Table rows: hover background ~1.8% white. Inputs: focus → volt border + 3px volt tint ring.

**Fixed elements.** Toasts pin top-right and stack; the modal centers over a blurred scrim. The
app itself scrolls normally.

---

## ICONOGRAPHY

- **System:** **Lucide** (open-source, ISC), 24px grid, 2px stroke, round caps/joins,
  `currentColor`. VOLT ships them as small React components in
  `ui_kits/dashboard/icons.jsx` (paths adapted from Lucide) rather than as a runtime dependency —
  so they inherit color and animate cleanly. If you need icons not in that file, pull them from
  **[lucide.dev](https://lucide.dev)** and match the same stroke/round style.
  - *Substitution flag:* the source repo had **no icon set of its own** (it used inline emoji
    glyphs ⏰/⚠). Lucide is VOLT's chosen substitute and is the canonical icon system going forward.
- **Icons in use:** `zap` (brand bolt), `refresh-cw`, `trending-up/down`, `activity`, `wallet`,
  `shield` (stop protection), `target` (buy-gate), `alarm/clock` (time-stop), `alert-triangle`
  (no-stop / near-stop), `newspaper`, `check`, `arrow-up-right`, `chevron-down`, `plus`, `layers`.
- **Brand mark:** a single geometric **lightning bolt** in a rounded square — see
  `assets/volt-mark.svg` (mark) and `assets/volt-wordmark.svg` (lockup). The bolt is the only
  illustrative glyph in the system.
- **Emoji:** not used as UI. **Unicode:** ▲ / ▼ are permitted *inside the ticker tape* as data
  typography only.
- **PNG icons:** none. Everything is vector (inline SVG / icon components).

---

## Index — what's in this system

| Path | What it is |
|------|------------|
| `colors_and_type.css` | **Start here.** All design tokens — ink/surface, brand, P&L, sector palette, radii, spacing, shadow/glow, motion, type families + scale, semantic helpers. |
| `README.md` | This file. |
| `SKILL.md` | Agent-Skill manifest (for use in Claude Code). |
| `assets/volt-mark.svg` | Bolt logomark. |
| `assets/volt-wordmark.svg` | VOLT logo lockup (mark + wordmark). |
| `preview/*.html` | The Design-System-tab cards (colors, type, spacing, components, brand). |
| `ui_kits/dashboard/` | **The VOLT trading cockpit UI kit** — interactive React recreation. See its `README.md`. |

### UI kits
- **`ui_kits/dashboard/`** — the full trading dashboard: top bar, portfolio stat cards, equity /
  drawdown chart, market context, performance analytics, sector P&L, R-multiple histogram, news,
  open positions (snapshot table ⇄ live cards), toasts, and a manual-trade buy-gate modal.

### Source
- GitHub: **https://github.com/vedantgupta96/Stock-Trading** — the autonomous trading bot and its
  original `dashboard/` (Flask + Vite/React/Tremor). Explore it for the exact data shapes
  (`dashboard/src/types/index.ts`) and trading rules (`memory/TRADING-STRATEGY.md`) when building
  data-accurate designs.

---

## Fonts

Space Grotesk and JetBrains Mono load from **Google Fonts** via `@import` in
`colors_and_type.css`. The source product shipped no brand fonts, so these are VOLT's chosen
typefaces — flagged here in case you want them self-hosted (drop the woff2 files into a `fonts/`
folder and swap the `@import` for `@font-face`). Both are open-source (OFL).
