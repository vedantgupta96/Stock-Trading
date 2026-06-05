# Strategy Proposals (pending review)

Proposals are drafted here for discussion. Nothing here is live until it is
moved into `TRADING-STRATEGY.md` on a Friday review with a logged rationale,
per the strategy doc's change-control rule (a rule must "prove out for 2+ weeks
or fail badly" before it changes).

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
