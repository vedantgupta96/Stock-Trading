/* VOLT dashboard — mock data (shapes mirror the real Stock-Trading dashboard types) */
window.VOLT_DATA = (function () {
  // deterministic-ish sparkline generator
  const spark = (start, drift, n = 28, vol = 0.012) => {
    const out = [];
    let p = start;
    let seed = start * 7.3;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let i = 0; i < n; i++) {
      p = p * (1 + drift / n + (rnd() - 0.5) * vol);
      out.push(+p.toFixed(2));
    }
    return out;
  };

  const positions = [
    { symbol: 'NVDA', sector: 'Technology', shares: 42, entry: 118.40, current: 135.95, stop: 119.6, init_stop: 109.00, target: 158, time_stop: '8d', has_stop: true,  entry_date: 'May 12', thesis: 'Breakout to fresh all-time highs on record data-center bookings; first pullback to the 10-EMA held cleanly. Trailing stop has ratcheted above entry — profit is locked.', catalyst: 'Q1 datacenter guide raise', series: spark(118.4, 0.16) },
    { symbol: 'AVGO', sector: 'Technology', shares: 11, entry: 168.20, current: 181.40, stop: 159.7, init_stop: 155.00, target: 205, time_stop: '11d', has_stop: true, entry_date: 'May 18', thesis: 'AI-networking demand inflection; base breakout on 2x average volume, tucked entry under resistance-turned-support.', catalyst: 'Custom-silicon order flow', series: spark(168.2, 0.10) },
    { symbol: 'XOM',  sector: 'Energy',     shares: 95, entry: 112.10, current: 118.65, stop: 106.6, init_stop: 104.00, target: 128, time_stop: '6d', has_stop: true,  entry_date: 'May 09', thesis: 'Energy leadership as crude reclaims $84; momentum breakout with sector tailwind and disciplined 1.5% risk.', catalyst: 'OPEC supply discipline', series: spark(112.1, 0.07) },
    { symbol: 'LLY',  sector: 'Healthcare', shares: 8,  entry: 742.00, current: 705.30, stop: 700.0, init_stop: 700.00, target: 845, time_stop: '4d', has_stop: false, entry_date: 'May 21', thesis: 'Breakout attempt failed to follow through; price now testing the stop. Protection order MISSING — needs re-placing.', catalyst: 'Pipeline readout (pending)', series: spark(742, -0.05) },
    { symbol: 'JPM',  sector: 'Financials', shares: 36, entry: 214.50, current: 221.10, stop: 199.7, init_stop: 199.70, target: 245, time_stop: '13d', has_stop: true, entry_date: 'May 15', thesis: 'Financials firming into earnings; clean multi-month-high breakout, broad-market regime supportive.', catalyst: 'Earnings next week', series: spark(214.5, 0.05) },
  ];

  positions.forEach(p => {
    p.pl  = +((p.current - p.entry) * p.shares).toFixed(2);
    p.plpc = +(((p.current - p.entry) / p.entry) * 100).toFixed(2);
    p.cost = +(p.entry * p.shares).toFixed(2);
    p.mv   = +(p.current * p.shares).toFixed(2);
  });

  // equity history (45 EOD snapshots)
  const equity_history = (() => {
    const out = []; let e = 20000; let seed = 11;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const base = new Date('2026-04-02');
    for (let i = 0; i < 45; i++) {
      e = e * (1 + 0.0042 + (rnd() - 0.46) * 0.014);
      const d = new Date(base); d.setDate(base.getDate() + i);
      out.push({ date: d.toISOString().slice(5, 10), equity: +e.toFixed(2) });
    }
    return out;
  })();

  // drawdown series derived from equity
  const drawdown = (() => {
    let peak = -Infinity; const series = equity_history.map(s => {
      peak = Math.max(peak, s.equity);
      return { date: s.date, drawdown: +(((s.equity - peak) / peak) * 100).toFixed(2) };
    });
    const max = Math.min(...series.map(s => s.drawdown));
    return { series, max_drawdown: max, current_drawdown: series[series.length - 1].drawdown };
  })();

  const snapEquity = equity_history[equity_history.length - 1].equity;
  const prevEquity = equity_history[equity_history.length - 2].equity;

  return {
    account: {
      equity: snapEquity,
      cash: 6184.22,
      day_pnl: +(snapEquity - prevEquity).toFixed(2),
      day_pnl_pct: +(((snapEquity - prevEquity) / prevEquity) * 100).toFixed(2),
      phase_pnl: '+18.4%',
      week_return: '+3.1%',
    },
    // live values differ slightly to show the rollup animation on Refresh Live
    live: {
      equity: +(snapEquity + 286.55).toFixed(2),
      cash: 6184.22,
      day_pnl: +(snapEquity - prevEquity + 286.55).toFixed(2),
      day_pnl_pct: +((((snapEquity - prevEquity + 286.55)) / prevEquity) * 100).toFixed(2),
    },
    positions,
    equity_history,
    drawdown,
    research: {
      vix: '14.2',
      regime: 'on', // S&P above 20-day SMA
      regime_note: 'S&P 500 holding above its 20-day SMA. Breadth healthy, leadership in semis & energy. Cleared to take new longs on confirmed breakouts.',
      decision: 'Cleared for new entries · 2 of 5 slots open',
    },
    stats: {
      total_trades: 23, wins: 14, losses: 9, win_rate: 0.61,
      profit_factor: 2.34, net_pnl: 4318.07, gross_win: 7540, gross_loss: 3222,
      max_drawdown: drawdown.max_drawdown, current_drawdown: drawdown.current_drawdown,
      avg_r: 0.84, current_streak: 3, current_type: 'W', best_win_streak: 6,
    },
    sector_pnl: [
      { sector: 'Technology', pnl: 2140, count: 7, color: '--cat-tech' },
      { sector: 'Energy', pnl: 980, count: 4, color: '--cat-energy' },
      { sector: 'Financials', pnl: 640, count: 3, color: '--cat-fin' },
      { sector: 'Healthcare', pnl: -310, count: 3, color: '--cat-health' },
      { sector: 'Industrials', pnl: 520, count: 2, color: '--cat-indust' },
      { sector: 'Consumer', pnl: 348, count: 4, color: '--cat-consumer' },
    ],
    r_buckets: [
      { label: '<-2R', count: 1 }, { label: '-2R', count: 2 }, { label: '-1R', count: 4 },
      { label: '0R', count: 2 }, { label: '+1R', count: 6 }, { label: '+2R', count: 5 },
      { label: '+3R', count: 2 }, { label: '>+3R', count: 1 },
    ],
    news: [
      { symbol: 'NVDA', headline: 'Nvidia extends gains as data-center demand outlook lifts chip sector', source: 'Benzinga', time: '12m' },
      { symbol: 'XOM', headline: 'Exxon climbs as crude holds above $84 on tightening supply', source: 'Reuters', time: '41m' },
      { symbol: 'LLY', headline: 'Eli Lilly slips after analyst trims price target on pipeline timing', source: 'MarketWatch', time: '1h' },
      { symbol: 'JPM', headline: 'JPMorgan nears multi-month high ahead of earnings next week', source: 'Bloomberg', time: '2h' },
      { symbol: 'AVGO', headline: 'Broadcom breakout holds on strong AI networking bookings', source: 'Investing.com', time: '3h' },
    ],
  };
})();
