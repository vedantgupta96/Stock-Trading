import type { RMultiplesData } from '../types'

export function RMultipleChart({ rm }: { rm?: RMultiplesData }) {
  const buckets = rm?.buckets ?? []
  const max = Math.max(...buckets.map(b => b.count), 1)
  const total = buckets.reduce((s, b) => s + b.count, 0)

  return (
    <div className="v-card v-card-pad rise">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span className="v-card-title">R-Multiple Distribution</span>
        <span className="mono muted" style={{ fontSize: 11 }}>
          {total > 0 ? `${total} trades` : 'no closed trades'}
        </span>
      </div>

      {total === 0 ? (
        <div style={{ height: 132, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--fg-4)', fontSize: 13, textAlign: 'center', lineHeight: 1.5 }}>
            No closed trades yet.<br />R-multiples appear once positions are realized.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 132 }}>
          {buckets.map((b, i) => {
            const neg = b.label.startsWith('<') || b.label.startsWith('-')
            const col = neg ? 'var(--down)' : 'var(--up)'
            const h = (b.count / max) * 100
            return (
              <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, height: '100%', justifyContent: 'flex-end' }}>
                {b.count > 0 && <span className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>{b.count}</span>}
                <div style={{
                  width: '100%', height: `${Math.max(h, b.count > 0 ? 4 : 0)}%`, minHeight: b.count > 0 ? 4 : 0,
                  background: col, borderRadius: '5px 5px 2px 2px',
                  boxShadow: `0 0 14px color-mix(in srgb, ${col} 50%, transparent)`,
                  animation: `growUp 700ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms both`,
                  transformOrigin: 'bottom',
                }} />
                <span className="mono" style={{ fontSize: 9.5, color: 'var(--fg-4)' }}>{b.label}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
