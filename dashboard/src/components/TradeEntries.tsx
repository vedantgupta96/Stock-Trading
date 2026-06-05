import { SectorBadge } from './SectorBadge'
import type { OpenTrade } from '../types'

export function TradeEntries({ trades }: { trades: OpenTrade[] }) {
  return (
    <div className="v-card v-card-pad rise">
      <span className="v-card-title" style={{ display: 'block', marginBottom: 16 }}>Open Trade Entries (from log)</span>
      {trades.length === 0 ? (
        <p style={{ color: 'var(--fg-4)', fontSize: 13 }}>No open trade entries in log.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {trades.map(t => (
            <div key={t.symbol} style={{ padding: '13px 14px', background: 'var(--ink-850)',
              border: '1px solid var(--line)', borderRadius: 'var(--r-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>{t.symbol}</span>
                  <SectorBadge sector={t.sector} />
                </div>
                <span className="mono muted" style={{ fontSize: 11 }}>{t.date}</span>
              </div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>{t.shares ?? '—'} shares @ {t.entry_price ?? '—'}</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>Stop: {t.stop_level ?? '—'} · Target: {t.target ?? '—'}</div>
              {t.catalyst && <p style={{ fontSize: 12, color: 'var(--volt)', margin: '6px 0 0', lineHeight: 1.4 }}>{t.catalyst.slice(0, 100)}</p>}
              {t.time_stop && <p style={{ fontSize: 11, color: 'var(--warn)', margin: '5px 0 0', fontFamily: 'var(--font-mono)' }}>⏰ {t.time_stop}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
