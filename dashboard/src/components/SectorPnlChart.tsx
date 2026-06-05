import { signed, sectorVar } from '../utils'
import type { SectorPnl } from '../types'

export function SectorPnlChart({ sectorPnl }: { sectorPnl?: SectorPnl }) {
  const rows = Object.entries(sectorPnl ?? {}).map(([sector, d]) => ({ sector, ...d }))
  const max = Math.max(...rows.map(r => Math.abs(r.pnl)), 1)

  return (
    <div className="v-card v-card-pad rise">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span className="v-card-title">Sector P&L</span>
        <span className="mono muted" style={{ fontSize: 11 }}>realized</span>
      </div>

      {rows.length === 0 ? (
        <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--fg-4)', fontSize: 13, textAlign: 'center', lineHeight: 1.5 }}>
            No closed trades yet.<br />Sector P&L populates as positions are realized.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          {rows.map((r, i) => {
            const w = (Math.abs(r.pnl) / max) * 100
            const pos = r.pnl >= 0
            const cv = sectorVar(r.sector)
            const color = pos ? `var(${cv})` : 'var(--down)'
            return (
              <div key={r.sector} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 92, fontSize: 12, color: 'var(--fg-2)', flexShrink: 0 }}>{r.sector}</span>
                <div style={{ flex: 1, height: 22, background: 'var(--ink-850)', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0, width: `${w}%`,
                    background: color, borderRadius: 6,
                    boxShadow: `0 0 16px color-mix(in srgb, ${color} 55%, transparent)`,
                    animation: `growX 800ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms both`,
                    transformOrigin: 'left',
                  }} />
                </div>
                <span className={`mono ${pos ? 'up' : 'down'}`} style={{ width: 64, textAlign: 'right', fontSize: 12.5, fontWeight: 600, flexShrink: 0 }}>
                  {signed(r.pnl, 0)}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
