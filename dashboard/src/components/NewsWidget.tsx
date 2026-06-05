import { relativeTime } from '../utils'
import type { NewsData } from '../types'

export function NewsWidget({ data, isLoading }: { data?: NewsData; isLoading: boolean }) {
  const headlines = data?.headlines ?? []

  return (
    <div className="v-card v-card-pad rise">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--fg-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a4 4 0 0 1-4 4"/><path d="M18 14H10"/><path d="M15 18H10"/><path d="M10 6h8v4h-8z"/></svg>
          <span className="v-card-title">Latest Market News</span>
        </div>
        <span className="mono muted" style={{ fontSize: 11 }}>{(data?.symbols ?? []).slice(0, 6).join(' · ')}</span>
      </div>

      {isLoading && <p style={{ color: 'var(--fg-4)', fontSize: 13 }}>Loading headlines…</p>}

      {!isLoading && headlines.length === 0 && (
        <p style={{ color: 'var(--fg-4)', fontSize: 13 }}>No recent headlines.</p>
      )}

      <div>
        {headlines.map((h, i) => (
          <a key={i} href={h.url || '#'} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 8px',
              borderRadius: 'var(--r-sm)', textDecoration: 'none',
              borderBottom: i < headlines.length - 1 ? '1px solid var(--line)' : 'none',
              transition: 'background var(--dur-fast)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
            onMouseLeave={e => (e.currentTarget.style.background = '')}>
            <span className="v-badge" style={{ flexShrink: 0, fontFamily: 'var(--font-mono)',
              background: 'var(--ink-700)', color: 'var(--fg-1)', border: '1px solid var(--line-strong)',
              minWidth: 52, justifyContent: 'center', fontSize: 10 }}>
              {h.symbols?.[0] ?? '—'}
            </span>
            <span style={{ flex: 1, fontSize: 13.5, color: 'var(--fg-1)', lineHeight: 1.4 }}>{h.headline}</span>
            <span className="mono muted" style={{ flexShrink: 0, fontSize: 11 }}>
              {h.source} · {relativeTime(h.created_at)}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg-4)" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </a>
        ))}
      </div>
    </div>
  )
}
