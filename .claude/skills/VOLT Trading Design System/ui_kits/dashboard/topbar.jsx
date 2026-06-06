/* VOLT — TopBar + portfolio stat cards */

function TopBar({ isLive, onRefresh, fetching, lastUpdated, regime, autoRefresh, setAutoRefresh, onTrade }) {
  return (
    <header className="row between rise" style={{ flexWrap: 'wrap', gap: 14, marginBottom: 22 }}>
      <div className="row gap-3">
        <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--volt)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--glow-volt)' }}>
          <IconZap size={26} style={{ color: 'var(--fg-on-volt)' }} />
        </div>
        <div>
          <div className="row gap-2" style={{ alignItems: 'baseline' }}>
            <span style={{ font: 'var(--h1)', letterSpacing: '-0.02em' }}>VOLT</span>
            <span className="lbl" style={{ color: 'var(--fg-4)' }}>cockpit</span>
          </div>
          <div className="mono" style={{ fontSize: 11.5, color: 'var(--fg-3)', marginTop: 2 }}>
            {isLive ? 'Live' : 'Snapshot'} · {lastUpdated}
          </div>
        </div>
      </div>

      <div className="row gap-3" style={{ flexWrap: 'wrap' }}>
        <span className="badge" style={{
          background: regime === 'on' ? 'var(--up-100)' : 'var(--down-100)',
          color: regime === 'on' ? 'var(--up)' : 'var(--down)',
          border: `1px solid color-mix(in srgb, var(${regime === 'on' ? '--up' : '--down'}) 45%, transparent)`,
        }}>
          <span className="dot" style={{ background: 'currentColor', boxShadow: '0 0 9px currentColor' }} />
          Regime: {regime === 'on' ? 'On' : 'Off'}
        </span>

        <div className="row gap-2">
          {autoRefresh > 0 && <span className="dot dot-live" />}
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            <select className="vselect" value={autoRefresh} onChange={e => setAutoRefresh(+e.target.value)}
              style={{ paddingRight: 26 }}>
              <option value={0}>Auto · Off</option>
              <option value={30}>Auto · 30s</option>
              <option value={60}>Auto · 60s</option>
            </select>
            <IconChevronDown size={14} style={{ position: 'absolute', right: 8, color: 'var(--fg-3)', pointerEvents: 'none' }} />
          </div>
        </div>

        <button className="btn btn-ghost" onClick={onTrade}><IconPlus size={15} /> Trade</button>

        <button className="btn btn-primary" onClick={onRefresh} disabled={fetching}>
          <IconRefresh size={15} style={{ animation: fetching ? 'spin 0.9s linear infinite' : 'none' }} />
          {fetching ? 'Syncing…' : 'Refresh Live'}
        </button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </header>
  );
}

function StatCard({ label, icon, value, sub, subClass, accent, delay }) {
  return (
    <div className="card card-pad rise" style={{ animationDelay: delay + 'ms', position: 'relative', overflow: 'hidden' }}>
      {accent && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `var(${accent})`, opacity: 0.9, boxShadow: `0 0 12px var(${accent})` }} />}
      <div className="row between" style={{ marginBottom: 12 }}>
        <span className="lbl">{label}</span>
        <span style={{ color: 'var(--fg-4)' }}>{icon}</span>
      </div>
      <div className="mono" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1 }}>{value}</div>
      {sub && <div className={'mono ' + (subClass || 'muted')} style={{ fontSize: 12.5, fontWeight: 600, marginTop: 8 }}>{sub}</div>}
    </div>
  );
}

function StatCards({ data, isLive }) {
  const a = isLive ? { ...data.account, ...data.live } : data.account;
  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 16 }}>
      <StatCard label="Portfolio Value" icon={<IconWallet size={18} />} accent="--volt" delay={0}
        value={<AnimatedNumber value={a.equity} />}
        sub={<span><AnimatedNumber value={a.day_pnl} sign className={clsPL(a.day_pnl)} /> today</span>} />
      <StatCard label="Cash Available" icon={<IconShield size={18} />} delay={60}
        value={<AnimatedNumber value={a.cash} />}
        sub={`${data.positions.length} positions deployed`} />
      <StatCard label="Day P&L" icon={a.day_pnl >= 0 ? <IconTrendUp size={18} /> : <IconTrendDown size={18} />}
        accent={a.day_pnl >= 0 ? '--up' : '--down'} delay={120}
        value={<AnimatedNumber value={a.day_pnl_pct} sign format={v => v.toFixed(2) + '%'} className={clsPL(a.day_pnl)} />}
        sub={<AnimatedNumber value={a.day_pnl} sign className={clsPL(a.day_pnl)} />} />
      <StatCard label="Phase P&L" icon={<IconActivity size={18} />} accent="--up" delay={180}
        value={<span className="up">{data.account.phase_pnl}</span>}
        sub={<span className="up">{data.account.week_return} this week</span>} subClass="up" />
    </div>
  );
}

Object.assign(window, { TopBar, StatCards });
