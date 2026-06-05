import type { Research } from '../types'

type Tab = 'overview' | 'positions' | 'analytics'

interface Props {
  research?: Research
  lastUpdated: string
  isLive: boolean
  tab: Tab
  onTabChange: (t: Tab) => void
  onRefresh: () => void
  isFetching: boolean
  autoRefresh: number
  onAutoRefreshChange: (s: number) => void
  posCount: number
}

export function Header({ research, lastUpdated, isLive, tab, onTabChange, onRefresh, isFetching, autoRefresh, onAutoRefreshChange, posCount }: Props) {
  const allText = [research?.regime_note, research?.decision, research?.raw]
    .filter(Boolean).join(' ').toLowerCase()
  const regimeOn  = /regime[:\s]+on\b|s&p.{0,30}above|regime filter on/.test(allText)
  const regimeOff = /regime[:\s]+off\b|s&p.{0,30}below|regime filter off/.test(allText)
  const regime = regimeOn ? 'on' : regimeOff ? 'off' : null
  const regimeColor = regime === 'on' ? 'var(--up)' : regime === 'off' ? 'var(--down)' : 'var(--fg-3)'

  return (
    <header style={{ marginBottom: 22 }}>
      {/* top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 20 }}>
        {/* logo + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--volt)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--glow-volt)', flexShrink: 0 }}>
            {/* lightning bolt mark from VOLT SVG */}
            <svg width="22" height="22" viewBox="0 0 120 120" style={{ display: 'block' }}>
              <path d="M67 22 36 66h21l-4 32 31-44H62z" fill="var(--fg-on-volt)" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.025em', lineHeight: 1 }}>VOLT</span>
              <span className="lbl" style={{ color: 'var(--fg-4)' }}>cockpit</span>
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 3 }}>
              {isLive ? 'Live' : 'Snapshot'} · {lastUpdated}
            </div>
          </div>
        </div>

        {/* controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* regime badge */}
          <span className="v-badge" style={{
            background: regime === 'on' ? 'var(--up-100)' : regime === 'off' ? 'var(--down-100)' : 'var(--ink-750)',
            color: regimeColor,
            border: `1px solid color-mix(in srgb, ${regimeColor} 45%, transparent)`,
          }}>
            <span className="v-dot" style={{ background: regimeColor, boxShadow: regime ? `0 0 9px ${regimeColor}` : 'none',
              animation: regime === 'on' ? 'vPulse 1.6s ease-out infinite' : 'none' }} />
            Regime: {regime === 'on' ? 'On' : regime === 'off' ? 'Off' : '?'}
          </span>

          {/* auto-refresh */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {autoRefresh > 0 && <span className="v-dot v-dot-live" />}
            <select className="v-select" value={autoRefresh} onChange={e => onAutoRefreshChange(+e.target.value)}>
              <option value={0}>Auto · Off</option>
              <option value={30}>Auto · 30s</option>
              <option value={60}>Auto · 60s</option>
            </select>
          </div>

          {/* refresh */}
          <button className="v-btn v-btn-primary" onClick={onRefresh} disabled={isFetching}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ animation: isFetching ? 'spin 0.9s linear infinite' : 'none' }}>
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            {isFetching ? 'Syncing…' : 'Refresh Live'}
          </button>
        </div>
      </div>

      {/* tab row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div className="v-tabs">
          <button className={tab === 'overview' ? 'on' : ''} onClick={() => onTabChange('overview')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
            Overview
          </button>
          <button className={tab === 'positions' ? 'on' : ''} onClick={() => onTabChange('positions')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            Positions <span className="tcount">{posCount}</span>
          </button>
          <button className={tab === 'analytics' ? 'on' : ''} onClick={() => onTabChange('analytics')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
            Analytics
          </button>
        </div>

        {isLive
          ? <span className="v-badge" style={{ background: 'var(--volt-100)', color: 'var(--volt)', border: '1px solid color-mix(in srgb, var(--volt) 40%, transparent)' }}>
              <span className="v-dot v-dot-live" /> Live data
            </span>
          : <span style={{ fontSize: 12, color: 'var(--fg-3)', fontFamily: 'var(--font-display)' }}>
              Snapshot · click Refresh Live for prices
            </span>}
      </div>
    </header>
  )
}
