import type { OpenTrade } from '../types'

export function TradeTimeline({ trades }: { trades: OpenTrade[] }) {
  const open = trades.filter(t => t.time_stop && t.date)
  if (!open.length) return null

  const today = Date.now()

  return (
    <div className="v-card v-card-pad rise" style={{ marginBottom: 16 }}>
      <span className="v-card-title" style={{ display: 'block', marginBottom: 14 }}>Open Trade Timeline</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {open.map(t => {
          const entry   = new Date(t.date).getTime()
          const stop    = new Date(t.time_stop!).getTime()
          const total   = Math.max(1, (stop - entry) / 86_400_000)
          const elapsed = Math.min(total, Math.max(0, (today - entry) / 86_400_000))
          const pct     = Math.round((elapsed / total) * 100)
          const daysLeft = Math.max(0, Math.ceil((stop - today) / 86_400_000))
          const color = pct > 80 ? 'var(--warn)' : 'var(--up)'

          return (
            <div key={t.symbol} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 52, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--fg-1)', flexShrink: 0 }}>{t.symbol}</span>
              <div style={{ flex: 1, height: 20, background: 'var(--ink-850)', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                <div style={{ height: '100%', width: `${pct}%`, borderRadius: 6,
                  background: `linear-gradient(90deg, ${color} 0%, color-mix(in srgb, ${color} 60%, transparent) 100%)`,
                  boxShadow: `0 0 12px color-mix(in srgb, ${color} 45%, transparent)`,
                  transition: 'width 0.8s var(--ease-out)' }} />
                <span className="mono" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 10, color: 'var(--fg-4)' }}>{daysLeft}d left</span>
              </div>
              <span className="mono muted" style={{ fontSize: 11, width: 32, textAlign: 'right', flexShrink: 0 }}>{pct}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
