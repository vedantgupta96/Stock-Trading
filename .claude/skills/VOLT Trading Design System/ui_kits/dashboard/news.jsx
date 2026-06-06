/* VOLT — Latest market news widget */

function NewsWidget({ news }) {
  return (
    <div className="card card-pad rise">
      <div className="row between" style={{ marginBottom: 14 }}>
        <div className="row gap-2">
          <IconNews size={16} style={{ color: 'var(--fg-3)' }} />
          <span className="card-title">Latest Market News</span>
        </div>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>held + watchlist</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {news.map((n, i) => (
          <a key={i} href="#" onClick={e => e.preventDefault()} className="news-row"
            style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 8px', borderRadius: 'var(--r-sm)',
              borderBottom: i < news.length - 1 ? '1px solid var(--line)' : 'none', textDecoration: 'none', transition: 'background 140ms' }}>
            <span className="badge" style={{ flex: 'none', fontFamily: 'var(--font-mono)',
              background: 'var(--ink-700)', color: 'var(--fg-1)', border: '1px solid var(--line-strong)', minWidth: 56, justifyContent: 'center' }}>{n.symbol}</span>
            <span style={{ flex: 1, fontSize: 13.5, color: 'var(--fg-1)', lineHeight: 1.4 }}>{n.headline}</span>
            <span className="mono" style={{ flex: 'none', fontSize: 11, color: 'var(--fg-3)' }}>{n.source} · {n.time}</span>
            <IconArrowUpRight size={14} style={{ flex: 'none', color: 'var(--fg-4)' }} />
          </a>
        ))}
      </div>
      <style>{`.news-row:hover { background: rgba(255,255,255,0.025); } .news-row:hover svg { color: var(--volt); }`}</style>
    </div>
  );
}

Object.assign(window, { NewsWidget });
