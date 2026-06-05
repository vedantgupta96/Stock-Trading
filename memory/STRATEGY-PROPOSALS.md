# Strategy Proposals (pending review)

Proposals are drafted here for discussion. Nothing here is live until it is
moved into `TRADING-STRATEGY.md` on a Friday review with a logged rationale,
per the strategy doc's change-control rule (a rule must "prove out for 2+ weeks
or fail badly" before it changes).

## Issue tracker (status — honest)
| # | Issue identified | Status |
|---|---|---|
| 1 | Entry timing never enforced in code (buy on a dip) | **DONE (shadow)** — `c12` advisory in `buy_gate.sh`, collecting data |
| 2 | Goal/deployment mismatch — can't beat S&P at ~12% invested | **PROPOSED** — "deployment overhaul" below; owner chose aggressive; needs backtest |
| 3 | Stop-logic gap: −8% hard cut sits ABOVE the 12% trailing stop → −8% must be enforced by hand (e.g. NVDA now) | **OPEN — not fixed.** Proposed fix drafted below; affects a live (paper) position, prioritize |
| 4 | Data reliability — flaky Gemini (503/429), conflicting day-to-day regime reads | **OPEN — not fixed.** Engineering hardening, not a strategy rule; can do without a Friday review |
| 5 | Relative-strength ranking — only buy the strongest leaders, not any qualifier | **OPEN — idea only**, not drafted |

---

## 2026-06-05 — Stop-logic reconciliation (Issue #3)
**Status:** PROPOSED. Today the initial −8% cut is a *manual* rule while the only live
order is a 12% trailing stop, whose trigger sits ~4% BELOW the −8% line. Between those two
prices nothing fires automatically — a real protection gap (NVDA sits in it right now).
**Proposed fix:** on every buy, place a real **−8% stop-loss order at entry**; once the
position is up enough that a 12% trailing stop would sit ABOVE the −8% line (i.e. in
profit), cancel the −8% stop and replace it with the 12% trailing stop. One automated
ladder, no manual gap. Low-risk, high-value; can be validated quickly in paper.

---

## 2026-06-05 — Reorient the strategy to BEAT the S&P 500 (deployment overhaul)

**Author:** trading agent · **Status:** PROPOSED, awaiting Friday review + backtest
**Owner directive:** the objective is to **beat the S&P 500 total return**, not just
preserve capital. The current rules are tuned for preservation and structurally cannot
beat a 100%-invested index — this proposal fixes that, honestly and with eyes open.

### The core problem (why we can't beat the index today)
- Flat **$200 risk cap** → ~$2,500 max per position.
- Max **5 positions** → **~12.5% of equity ever invested**; ~87% sits in cash.
- The S&P is 100% in stocks. You cannot out-return it holding 87% cash, even if every
  trade wins. We currently get the downside protection (regime filter → cash in crashes)
  but almost none of the upside. Worst of both worlds.

### The thesis (the sane way to beat the index)
Beat it by **NOT LOSING**, not by leverage: roughly **match** the index when the market
is healthy, and go to **cash during crashes** (the regime filter already does this).
Over a full cycle, sidestepping the −30%/−50% bear drawdowns is the edge — even if we
lag slightly in raging bull runs. To make this work we must fix the upside half:
**when regime is ON, be ~70–90% invested, not ~12%.**

### Proposed changes (all gated by the regime filter staying ON)
1. **Sizing — biggest lever.** Replace the flat $200 risk cap with **risk = 1.5% of live
   equity per trade** (so it scales with the account). On $100k → ~$1,500 risk → ~$18.75k
   notional/position at an 8% stop. Optional sanity ceiling: no single position > 25% of equity.
2. **Concurrency.** Raise max concurrent positions **5 → 8**. Keep sector cap but loosen
   **≤2 → ≤3 per sector** to allow fuller deployment without over-concentrating.
3. **Trade cadence.** Lift/raise the **3 trades/week** cap (→ ~6) so the book can actually
   be built when setups appear. Activity still gated by the buy gate, not forced.
4. **Target deployment.** When regime ON, aim for **70–90% invested**; when OFF, cash
   (unchanged). This is the whole point.
5. **KEEP all protective rules:** regime filter, −8% hard cut, 12% trailing stop (and the
   +15%/+20% tightening), earnings avoidance, breakout+volume gate. These are what make the
   "win by not losing" thesis work.

### Optional, bigger philosophical change (flagged, not yet recommended)
**Core-satellite.** Hold an S&P proxy as a 50–70% "core" (guarantees we track the index)
and run the momentum strategy on the rest as the alpha "satellite." This makes
"don't badly lag the index" almost automatic. BUT it requires lifting CLAUDE.md hard
rule #1 ("stocks only, no ETFs"). Park this until the simpler deployment fix is validated.

### The honest risk disclosure
- ~80% invested vs ~12% means a bad week hurts **~6–7× more**. Expect double-digit
  drawdowns at times. The regime filter aims to pull us to cash before the *catastrophic*
  drops, but it will NOT dodge every selloff (e.g., today's chip rout would sting more).
- In a sustained low-volatility bull market, a 100% index may still beat us without
  leverage — our outperformance is expected to come **over a full cycle**, concentrated
  around regime-OFF periods (crashes we sit out).
- Most active strategies fail to beat the index. This is a genuine attempt, not a promise.

### DECISION (owner, 2026-06-05): AGGRESSIVE
Owner chose **aggressive** — rationale: conservative/moderate money already lives in
their Roth IRA, HSA, and 401(k); this (paper) account is the designated aggressive sleeve.
- Parameters: risk **~2% of equity per trade**, deployment up to ~100% when regime ON,
  modest leverage permitted.
- **Honest guardrails I'm recommending even at "aggressive" (until the backtest proves more):**
  - Cap leverage at **~1.3×** initially (not the full 4× the paper account allows). Momentum
    strategies suffer "momentum crashes" — sharp reversals — and leverage + overnight gaps can
    blow through trailing stops. Prove it on history before pushing leverage higher.
  - No single position > **20% of equity**, even aggressive. One bad gap shouldn't be fatal.
  - Keep the −8% cut and trailing stops non-negotiable. Aggressive sizing + no stops = ruin.
- These guardrails are themselves revisitable at a Friday review once the backtest is in.

### (superseded) DECISION-NEEDED menu, for reference
- *Conservative* (~10–15% DD): risk ~1% equity/trade, ~60% max deployment.
- *Moderate* (~15–25% DD): risk ~1.5%/trade, ~80% deployment.
- *Aggressive* (~25–35%+ DD): risk ~2%/trade, modest leverage. ← CHOSEN

### Validation plan (MANDATORY before anything goes live)
1. **Backtest 2018–2026** (must include the 2020 crash, 2022 bear, 2025–26 action):
   compare this ruleset vs **SPY buy-and-hold** on BOTH total return AND max drawdown.
   Adopt only if it beats SPY on the agreed risk-adjusted metric (e.g., higher return at
   ≤ comparable drawdown, or materially smaller drawdown at comparable return).
2. **Paper-shadow 2+ weeks** alongside current rules before flipping live.
3. Promote to `TRADING-STRATEGY.md` only at a Friday review, with the backtest numbers
   cited. The account is days old — we optimize on YEARS of history, not 2 days of noise.

---

## 2026-06-05 — Regime-respecting "quality dip" buying

**Author:** trading agent · **Status:** PROPOSED, awaiting Friday review
**Motivation:** Capture more upside from buying weakness *without* abandoning the
regime filter (our highest-alpha rule) or the "don't catch a falling knife" logic.
This is NOT a blanket "index is red → buy" rule. It formalizes and slightly widens
the dip we already buy: a pullback in a strong stock, in a strong market.

### What I am explicitly NOT proposing (hard rules — untouched)
- Regime filter (SPY > 20-day SMA) stays a hard gate. No buying below the line.
- $200 max risk per trade stays. No sizing up into dips (that would breach it).
- 1.5× breakout-volume filter stays. Most of 2026-06-05's rejects failed on volume —
  that filter is doing real work; loosening it would just add low-conviction trades.
- −8% cut, 12% trailing stop, ≤5 positions / ≤2 per sector, 3 trades/week — all stay.

### The change: add an entry-timing gate (new check c12 "pullback")

Today the gate checks that a breakout *exists* (c9: a 3-month high in the last 5
trading days) but never checks that we are entering on a *pullback* from it. The
3–8% pullback rule lives only in the strategy doc and in my discretionary judgment.
This proposal turns it into a deterministic, logged check — and widens the band.

- **Compute:** `pullback_pct = (last5_high − entry) / last5_high × 100`
  (the gate already computes `last5_high`; `entry` already defaults to last close.)
- **New check c12_pullback:** PASS when `PULLBACK_MIN ≤ pullback_pct ≤ PULLBACK_MAX`.
- **Proposed bounds:** `PULLBACK_MIN = 3%`, `PULLBACK_MAX = 12%`
  (widened from the current doc's 3–8% / skip-above-10%). Configurable via flags
  `--pullback-min` / `--pullback-max` with those defaults.

Effect of each bound:
- **Min 3%** stops us chasing a breakout the instant it prints (pullback ≈ 0% → FAIL).
  This is the part of the rulebook the gate currently does NOT enforce — a real gap.
- **Max 12%** is the actual loosening: it lets quality names that pulled back 8–12%
  (currently skipped) into the buy zone. This is the "buy the dip" upside the user wants,
  but only on names that already cleared c1, c9, c10 and the rest.

### Concrete patch to `scripts/buy_gate.sh`
Add two flags (`--pullback-min`, `--pullback-max`, defaults 3 / 12), then in the jq pass:

```
| (if $last5_high>0 then (($last5_high-$entry)/$last5_high*100) else -1 end) as $pullback
...
  pullback_pct: (($pullback*10|round)/10),
...
  c12_pullback: ($last5_high>0 and $pullback >= ($pmin|tonumber) and $pullback <= ($pmax|tonumber)),
```

And one render line + add it to the FAIL summary (already auto-includes any false check).

### Optional, separate: index-dip *context flag* (logged only, no behavior change)
When SPX is still ON but has pulled back ≥2% from its 5-day high, stamp the research
log entry with `index_dip: yes`. This is purely informational — it does NOT change
sizing or gating (the $200 risk cap forbids sizing up). Purpose: after a few weeks we
can check whether names bought on index-dip days actually outperformed, and only THEN
decide whether a real behavioral rule is justified. Cheap to add, no risk.

### Validation plan (before it goes live)
1. **Shadow mode, 2 weeks.** Run c12 in the gate but print it as advisory only
   (don't let it flip the verdict). Each market-open, log: did c12 change the decision,
   and what would the trade have been? Log the index_dip flag too.
2. **Friday review #1 (2026-06-12):** tally how many *quality* setups (passed c1/c9/c10
   + had a catalyst) we skipped purely on the old 8% ceiling. If it's ~0, the change is
   solving a non-problem — drop it. If several, continue.
3. **Friday review #2 (2026-06-19):** if shadow data shows the 8–12% band would have
   added positive-expectancy trades (and the index_dip flag shows an edge), promote c12
   to a hard gate in TRADING-STRATEGY.md with the data cited. Otherwise revert.

### Net assessment
The high-value, low-risk piece is **closing the entry-timing gap** (c12) — it makes the
gate enforce a rule we already believe in, and the only judgment call is the 8%→12%
ceiling. Everything else (regime, volume, risk cap) stays exactly as is. I would not ship
this on the strength of one quiet day; the plan is to shadow it and let two Fridays of
data decide.
