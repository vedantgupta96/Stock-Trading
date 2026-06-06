/* VOLT — Open positions: snapshot table ⇄ live cards */

function flagsFor(p) {
  const out = [];
  if (!p.has_stop) out.push({ t: 'No Stop', kind: 'danger' });
  if (p.plpc <= -6) out.push({ t: 'Near −8% stop', kind: 'warn' });
  if (p.plpc >= 18) out.push({ t: 'Tighten to 5%', kind: 'up' });
  else if (p.plpc >= 13) out.push({ t: 'Tighten to 7%', kind: 'up' });
  return out;
}

function PositionCard({ p, onSelect }) {
  const pos = p.plpc >= 0;
  const f = flagsFor(p);
  const danger = !p.has_stop || p.plpc <= -6;
  const ring = danger ? 'var(--glow-down)' : pos && p.plpc >= 13 ? 'var(--glow-up)' : 'none';
  const border = danger ? 'color-mix(in srgb, var(--down) 32%, transparent)'
    : pos ? 'color-mix(in srgb, var(--up) 24%, transparent)' : 'var(--line)';
  return (
    <div className="card pos-card" onClick={() => onSelect && onSelect(p)} style={{ padding: '15px 16px', borderColor: border, boxShadow: ring !== 'none' ? ring : 'var(--shadow-card)', cursor: 'pointer' }}>
      <div className="row between">
        <div className="row gap-2">
          <span style={{ font: 'var(--h3)', fontWeight: 700 }}>{p.symbol}</span>
          <SectorBadge sector={p.sector} />
        </div>
        <div className="row gap-2" style={{ textAlign: 'right' }}>
          <div>
            <div className={'mono ' + clsPL(p.plpc)} style={{ fontSize: 17, fontWeight: 700 }}>{pct(p.plpc)}</div>
            <div className={'mono ' + clsPL(p.pl)} style={{ fontSize: 12 }}>{signed(p.pl)}</div>
          </div>
          <IconArrowUpRight size={15} style={{ color: 'var(--fg-4)' }} className="pos-arrow" />
        </div>
      </div>

      {f.length > 0 && (
        <div className="row gap-2" style={{ flexWrap: 'wrap', marginTop: 10 }}>
          {f.map(x => (
            <span key={x.t} className="row gap-2" style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-display)',
              color: `var(--${x.kind === 'danger' ? 'down' : x.kind})` }}>
              {x.kind === 'danger' && <IconAlert size={13} />}{x.t}
            </span>
          ))}
        </div>
      )}

      <div style={{ margin: '12px 0 10px' }}>
        <Sparkline series={p.series} entry={p.entry} color={pos ? 'var(--up)' : 'var(--down)'} />
      </div>

      <RRBar stop={p.stop} target={p.target} current={p.current} />

      <div className="row between" style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--line)' }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{p.shares} sh @ {fmt(p.entry)}</span>
        <span className="mono row gap-2" style={{ fontSize: 11, color: 'var(--warn)' }}><IconClock size={12} /> {p.time_stop}</span>
      </div>
    </div>
  );
}

function SnapshotTable({ positions, onSelect }) {
  return (
    <table className="vtable">
      <thead>
        <tr>{['Symbol', 'Sector', 'Shares', 'Entry', 'Stop → Target', 'Time Stop', 'Protection', ''].map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {positions.map(p => (
          <tr key={p.symbol} className="clickable" onClick={() => onSelect && onSelect(p)}>
            <td style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 14 }}>{p.symbol}</td>
            <td><SectorBadge sector={p.sector} /></td>
            <td className="mono">{p.shares}</td>
            <td className="mono">{fmt(p.entry)}</td>
            <td className="mono" style={{ color: 'var(--fg-3)', fontSize: 12 }}>{fmt(p.stop)} → {fmt(p.target)}</td>
            <td className="mono warn" style={{ fontSize: 12 }}>{p.time_stop}</td>
            <td>
              {p.has_stop
                ? <span className="row gap-2 up" style={{ fontSize: 12 }}><IconShield size={14} /> Stop set</span>
                : <span className="row gap-2 down" style={{ fontSize: 12, fontWeight: 700 }}><IconAlert size={14} /> No stop</span>}
            </td>
            <td><IconArrowUpRight size={14} style={{ color: 'var(--fg-4)' }} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Positions({ positions, isLive, onSelect }) {
  return (
    <div className="card card-pad rise" style={{ marginBottom: 16 }}>
      <div className="row between" style={{ marginBottom: 16 }}>
        <span className="card-title">Open Positions</span>
        <div className="row gap-2">
          {isLive && <span className="badge" style={{ background: 'var(--volt-100)', color: 'var(--volt)', border: '1px solid color-mix(in srgb, var(--volt) 40%, transparent)' }}><span className="dot dot-live" /> Live</span>}
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{positions.length} of 5 slots · click to inspect</span>
        </div>
      </div>
      {isLive
        ? <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>{positions.map(p => <PositionCard key={p.symbol} p={p} onSelect={onSelect} />)}</div>
        : <SnapshotTable positions={positions} onSelect={onSelect} />}
      <style>{`.pos-card { transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base), border-color var(--dur-base); }
        .pos-card:hover { transform: translateY(-2px); }
        .pos-card:hover .pos-arrow { color: var(--volt); }`}</style>
    </div>
  );
}

// Compact at-a-glance strip for the Overview tab (links into Positions)
function PositionsSummary({ positions, onSelect, onViewAll }) {
  return (
    <div className="card card-pad rise" style={{ marginBottom: 16 }}>
      <div className="row between" style={{ marginBottom: 14 }}>
        <span className="card-title">Open Positions</span>
        <button className="link-all" onClick={onViewAll}>View all <IconArrowUpRight size={13} /></button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {positions.map((p, i) => {
          const pos = p.plpc >= 0;
          const danger = !p.has_stop || p.plpc <= -6;
          return (
            <div key={p.symbol} className="pos-strip" onClick={() => onSelect && onSelect(p)}
              style={{ display: 'grid', gridTemplateColumns: '92px 1fr 96px 74px 20px', alignItems: 'center', gap: 14,
                padding: '11px 8px', borderBottom: i < positions.length - 1 ? '1px solid var(--line)' : 'none', cursor: 'pointer', borderRadius: 'var(--r-sm)' }}>
              <div className="row gap-2">
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 14 }}>{p.symbol}</span>
                {danger && <IconAlert size={13} style={{ color: 'var(--down)' }} />}
              </div>
              <div style={{ height: 26 }}>
                <Sparkline series={p.series} color={pos ? 'var(--up)' : 'var(--down)'} h={26} animate={false} />
              </div>
              <span className="mono" style={{ fontSize: 13, color: 'var(--fg-2)', textAlign: 'right' }}>{fmt(p.current)}</span>
              <span className={'mono ' + clsPL(p.plpc)} style={{ fontSize: 13.5, fontWeight: 700, textAlign: 'right' }}>{pct(p.plpc)}</span>
              <IconArrowUpRight size={14} style={{ color: 'var(--fg-4)' }} className="strip-arrow" />
            </div>
          );
        })}
      </div>
      <style>{`
        .pos-strip { transition: background var(--dur-fast) var(--ease-out); }
        .pos-strip:hover { background: rgba(204,255,0,0.04); }
        .pos-strip:hover .strip-arrow { color: var(--volt); }
        .link-all { font-family: var(--font-display); font-weight: 600; font-size: 12px; color: var(--fg-3);
          background: none; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;
          transition: color var(--dur-fast); }
        .link-all:hover { color: var(--volt); }
      `}</style>
    </div>
  );
}

Object.assign(window, { Positions, PositionsSummary });
