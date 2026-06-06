/* VOLT — Position detail drawer (slides in when a position is clicked) */

function LadderRow({ label, value, sub, color, strong, fill }) {
  return (
    <div className="row between" style={{ padding: '11px 0', borderBottom: '1px solid var(--line)' }}>
      <div className="row gap-2">
        <span style={{ width: 8, height: 8, borderRadius: 2, background: color || 'var(--fg-4)', flex: 'none',
          boxShadow: fill ? `0 0 10px ${color}` : 'none' }} />
        <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>{label}</span>
      </div>
      <div style={{ textAlign: 'right' }}>
        <span className="mono" style={{ fontSize: 14, fontWeight: strong ? 700 : 600, color: color || 'var(--fg-1)' }}>{value}</span>
        {sub && <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginLeft: 8 }}>{sub}</span>}
      </div>
    </div>
  );
}

function PositionDrawer({ p, news, onClose }) {
  if (!p) return null;
  const pos = p.plpc >= 0;
  const dir = pos ? 'var(--up)' : 'var(--down)';
  const riskPS = p.entry - (p.init_stop != null ? p.init_stop : p.stop);  // INITIAL risk per share
  const rNow = riskPS > 0 ? (p.current - p.entry) / riskPS : 0;   // realized R so far
  const rTarget = riskPS > 0 ? (p.target - p.entry) / riskPS : 0; // R at target
  const toStop = ((p.current - p.stop) / p.current) * 100;
  const toTarget = ((p.target - p.current) / p.current) * 100;
  const locked = p.has_stop && p.stop >= p.entry; // trailing stop locked in profit
  const symNews = news.filter(n => n.symbol === p.symbol);

  return (
    <React.Fragment>
      <div className="scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-label={p.symbol + ' details'}>
        {/* header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line)', position: 'sticky', top: 0,
          background: 'linear-gradient(180deg, var(--ink-800), color-mix(in srgb, var(--ink-800) 92%, transparent))',
          backdropFilter: 'blur(6px)', zIndex: 2 }}>
          <div className="row between">
            <div className="row gap-3">
              <span style={{ font: 'var(--h1)', fontWeight: 700, letterSpacing: '-0.02em' }}>{p.symbol}</span>
              <div className="col" style={{ gap: 4 }}>
                <SectorBadge sector={p.sector} />
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>Opened {p.entry_date}</span>
              </div>
            </div>
            <button onClick={onClose} className="btn btn-ghost" style={{ padding: 8 }}><IconX size={16} /></button>
          </div>
          <div className="row gap-4" style={{ marginTop: 16, alignItems: 'flex-end' }}>
            <div>
              <span className="lbl">Last</span>
              <div className="mono" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1, marginTop: 4 }}>{fmt(p.current)}</div>
            </div>
            <div style={{ paddingBottom: 3 }}>
              <div className={'mono'} style={{ fontSize: 18, fontWeight: 700, color: dir }}>{pct(p.plpc)}</div>
              <div className={'mono'} style={{ fontSize: 13, color: dir }}>{signed(p.pl)}</div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <span className="lbl">R-Multiple</span>
              <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: rNow >= 0 ? 'var(--up)' : 'var(--down)', marginTop: 4 }}>
                {(rNow >= 0 ? '+' : '') + rNow.toFixed(2) + 'R'}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {/* no-stop alarm */}
          {!p.has_stop && (
            <div className="row gap-2" style={{ padding: '12px 14px', background: 'var(--down-100)',
              border: '1px solid var(--down)', borderRadius: 'var(--r-sm)', boxShadow: 'var(--glow-down)' }}>
              <IconAlert size={17} style={{ color: 'var(--down)', flex: 'none' }} />
              <span style={{ fontSize: 13, color: 'var(--down)', fontWeight: 600 }}>No protective stop on file — re-place a 12% trailing stop immediately.</span>
            </div>
          )}

          {/* big chart */}
          <div>
            <div className="row between" style={{ marginBottom: 10 }}>
              <span className="card-title">Price · since entry</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>entry {fmt(p.entry)} · dashed</span>
            </div>
            <div style={{ height: 130 }}>
              <Sparkline series={p.series} entry={p.entry} color={dir} h={130} />
            </div>
          </div>

          {/* trade ladder */}
          <div>
            <span className="card-title">Trade Ladder</span>
            <div style={{ marginTop: 8 }}>
              <LadderRow label="Target" value={fmt(p.target)} sub={`+${toTarget.toFixed(1)}%`} color="var(--up)" fill />
              <LadderRow label="Current" value={fmt(p.current)} color={dir} strong fill />
              <LadderRow label="Entry" value={fmt(p.entry)} sub={`${p.shares} sh`} color="var(--fg-2)" />
              <LadderRow label="Stop" value={p.has_stop ? fmt(p.stop) : '—'} sub={p.has_stop ? (locked ? `locked +${(((p.stop - p.entry) / p.entry) * 100).toFixed(1)}%` : `−${toStop.toFixed(1)}%`) : 'missing'} color={p.has_stop ? (locked ? 'var(--up)' : 'var(--down)') : 'var(--fg-4)'} fill={p.has_stop} />
            </div>
          </div>

          {/* metric grid */}
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              ['Cost Basis', fmt(p.cost, 0), null],
              ['Market Value', fmt(p.mv, 0), null],
              ['Risk / Share', fmt(riskPS), 'var(--down)'],
              ['R at Target', (rTarget >= 0 ? '+' : '−') + Math.abs(rTarget).toFixed(1) + 'R', 'var(--up)'],
              ['Time Stop', p.time_stop, 'var(--warn)'],
              ['Protection', p.has_stop ? 'Active' : 'None', p.has_stop ? 'var(--up)' : 'var(--down)'],
            ].map(([l, v, c]) => (
              <div key={l} className="card" style={{ padding: '12px 13px' }}>
                <div className="lbl" style={{ marginBottom: 6 }}>{l}</div>
                <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: c || 'var(--fg-1)' }}>{v}</div>
              </div>
            ))}
          </div>

          {/* thesis */}
          <div>
            <span className="card-title">Thesis</span>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-2)', margin: '8px 0 0' }}>{p.thesis}</p>
            <div className="row gap-2" style={{ marginTop: 12 }}>
              <span className="badge" style={{ background: 'var(--volt-100)', color: 'var(--volt)', border: '1px solid color-mix(in srgb, var(--volt) 40%, transparent)' }}>
                <IconTarget size={12} /> {p.catalyst}
              </span>
            </div>
          </div>

          {/* symbol news */}
          {symNews.length > 0 && (
            <div>
              <span className="card-title">Related News</span>
              <div style={{ marginTop: 8 }}>
                {symNews.map((n, i) => (
                  <div key={i} className="row gap-3" style={{ padding: '11px 0', borderBottom: i < symNews.length - 1 ? '1px solid var(--line)' : 'none' }}>
                    <span style={{ flex: 1, fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.4 }}>{n.headline}</span>
                    <span className="mono" style={{ flex: 'none', fontSize: 11, color: 'var(--fg-3)' }}>{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* actions */}
          <div className="row gap-2" style={{ marginTop: 4 }}>
            {!p.has_stop
              ? <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}><IconShield size={15} /> Place Stop</button>
              : <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}><IconShield size={15} /> Tighten Stop</button>}
            <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', color: 'var(--down)', borderColor: 'color-mix(in srgb, var(--down) 40%, transparent)' }}>
              <IconX size={15} /> Close Position
            </button>
          </div>
        </div>
      </aside>
    </React.Fragment>
  );
}

Object.assign(window, { PositionDrawer });
