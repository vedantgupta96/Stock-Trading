/* VOLT — Performance analytics: stat strip, sector P&L, R-multiple histogram */

function MiniStat({ label, value, sub, valueClass, delay }) {
  return (
    <div className="card card-pad rise" style={{ padding: '14px 16px', animationDelay: delay + 'ms' }}>
      <div className="lbl" style={{ marginBottom: 7 }}>{label}</div>
      <div className={'mono ' + (valueClass || '')} style={{ fontSize: 19, fontWeight: 700 }}>{value}</div>
      {sub && <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 5 }}>{sub}</div>}
    </div>
  );
}

function AnalyticsStats({ s }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 16 }}>
      <MiniStat label="Win Rate" value={(s.win_rate * 100).toFixed(0) + '%'} sub={`${s.wins}W / ${s.losses}L`} delay={0} />
      <MiniStat label="Max DD" value={s.max_drawdown.toFixed(1) + '%'} valueClass="down" sub={`now ${s.current_drawdown.toFixed(1)}%`} delay={40} />
      <MiniStat label="Profit Factor" value={s.profit_factor.toFixed(2)} sub={`net ${signed(s.net_pnl, 0)}`} delay={80} />
      <MiniStat label="Trades" value={s.total_trades} sub="closed" delay={120} />
      <MiniStat label="Avg R" value={(s.avg_r >= 0 ? '+' : '') + s.avg_r.toFixed(2) + 'R'} valueClass={s.avg_r >= 0 ? 'up' : 'down'} sub="per 1.5% risk" delay={160} />
      <MiniStat label="Streak" value={s.current_streak + s.current_type} valueClass={s.current_type === 'W' ? 'up' : 'down'} sub="current" delay={200} />
      <MiniStat label="Best Run" value={s.best_win_streak + 'W'} valueClass="up" sub="peak" delay={240} />
    </div>
  );
}

function SectorPnl({ rows }) {
  const max = Math.max(...rows.map(r => Math.abs(r.pnl)));
  return (
    <div className="card card-pad rise">
      <div className="row between" style={{ marginBottom: 16 }}>
        <span className="card-title">Sector P&L</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>realized</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
        {rows.map((r, i) => {
          const w = (Math.abs(r.pnl) / max) * 100;
          const pos = r.pnl >= 0;
          return (
            <div key={r.sector} className="row gap-3">
              <span style={{ width: 92, fontSize: 12, color: 'var(--fg-2)', flex: 'none' }}>{r.sector}</span>
              <div style={{ flex: 1, height: 22, background: 'var(--ink-850)', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                <div data-grow style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: w + '%',
                  background: pos ? `var(${r.color})` : 'var(--down)', borderRadius: 6,
                  boxShadow: `0 0 16px color-mix(in srgb, ${pos ? `var(${r.color})` : 'var(--down)'} 55%, transparent)`,
                  animation: `grow 800ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms both`, transformOrigin: 'left' }} />
              </div>
              <span className={'mono ' + clsPL(r.pnl)} style={{ width: 64, textAlign: 'right', fontSize: 12.5, fontWeight: 600, flex: 'none' }}>{signed(r.pnl, 0)}</span>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </div>
  );
}

function RMultiple({ buckets }) {
  const max = Math.max(...buckets.map(b => b.count));
  return (
    <div className="card card-pad rise">
      <div className="row between" style={{ marginBottom: 16 }}>
        <span className="card-title">R-Multiple Distribution</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>23 trades</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 132 }}>
        {buckets.map((b, i) => {
          const neg = b.label.includes('-') && b.label !== '0R';
          const zero = b.label === '0R';
          const col = zero ? 'var(--fg-3)' : neg ? 'var(--down)' : 'var(--up)';
          return (
            <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, height: '100%', justifyContent: 'flex-end' }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>{b.count}</span>
              <div data-grow style={{ width: '100%', height: (b.count / max) * 100 + '%', minHeight: 4, background: col, borderRadius: '5px 5px 2px 2px',
                boxShadow: `0 0 14px color-mix(in srgb, ${col} 50%, transparent)`,
                animation: `growUp 700ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms both`, transformOrigin: 'bottom' }} />
              <span className="mono" style={{ fontSize: 9.5, color: 'var(--fg-4)' }}>{b.label}</span>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes growUp { from { transform: scaleY(0); } to { transform: scaleY(1); } }`}</style>
    </div>
  );
}

Object.assign(window, { AnalyticsStats, SectorPnl, RMultiple });
