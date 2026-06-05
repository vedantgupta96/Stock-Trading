import { fmt, pct, signed } from '../utils'
import { SectorBadge } from './SectorBadge'
import type { OpenTrade, Position } from '../types'

// Both Position and OpenTrade share these fields, so we can access them directly
// on the union type without casts. Only live-specific fields need narrowing.
function buildLadderRows(p: Position | OpenTrade, isLivePos: boolean, cur: number | null, dir: string) {
  const entryStr = isLivePos
    ? (p as Position).avg_entry_price
    : (p as OpenTrade).entry_price?.replace(/[^0-9.]/g, '') ?? ''
  const entry = parseFloat(entryStr || '0')
  return [
    { label: 'Target',  value: p.target ?? '—',                              color: 'var(--up)' },
    { label: 'Current', value: cur != null ? fmt(cur) : '— (refresh)',        color: dir },
    { label: 'Entry',   value: entry ? fmt(entry) : '—',                     color: 'var(--fg-2)' },
    { label: 'Stop',    value: p.stop_level ?? '—',                          color: 'var(--down)' },
  ]
}

export function PositionDrawer({ p, onClose }: { p: Position | OpenTrade | null; onClose: () => void }) {
  if (!p) return null
  const isLivePos = 'unrealized_plpc' in p
  const plpc = isLivePos ? parseFloat((p as Position).unrealized_plpc ?? '0') * 100 : null
  const pl   = isLivePos ? parseFloat((p as Position).unrealized_pl ?? '0') : null
  const cur  = isLivePos ? parseFloat((p as Position).current_price ?? '0') : null
  const dir  = plpc != null ? (plpc >= 0 ? 'var(--up)' : 'var(--down)') : 'var(--fg-2)'
  const rows = buildLadderRows(p, isLivePos, cur, dir)

  return (
    <>
      <div className="v-scrim" onClick={onClose} />
      <aside className="v-drawer">
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line)', position: 'sticky', top: 0, zIndex: 2,
          background: 'linear-gradient(180deg, var(--ink-800), color-mix(in srgb, var(--ink-800) 92%, transparent))',
          backdropFilter: 'blur(8px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, letterSpacing: '-0.025em', lineHeight: 1 }}>{p.symbol}</span>
              <div>
                <SectorBadge sector={p.sector} />
                {'date' in p && <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 4 }}>Opened {(p as OpenTrade).date}</div>}
              </div>
            </div>
            <button className="v-btn v-btn-ghost" style={{ padding: 8 }} onClick={onClose}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {isLivePos && cur != null && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginTop: 16 }}>
              <div>
                <div className="lbl" style={{ marginBottom: 4 }}>Last</div>
                <div className="mono" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{fmt(cur)}</div>
              </div>
              <div style={{ paddingBottom: 2 }}>
                <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: dir }}>{pct(plpc!)}</div>
                <div className="mono" style={{ fontSize: 13, color: dir }}>{signed(pl!)}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {isLivePos && !(p as Position).has_stop && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px',
              background: 'var(--down-100)', border: '1px solid var(--down)', borderRadius: 'var(--r-sm)', boxShadow: 'var(--glow-down)' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--down)" strokeWidth="2.5" style={{ flexShrink: 0 }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span style={{ fontSize: 13, color: 'var(--down)', fontWeight: 600 }}>No protective stop — place a 12% trailing stop immediately.</span>
            </div>
          )}

          <div>
            <div className="v-card-title" style={{ marginBottom: 10 }}>Trade Ladder</div>
            {rows.map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: row.color, boxShadow: `0 0 8px ${row.color}`, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>{row.label}</span>
                </div>
                <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>

          {'catalyst' in p && (p as OpenTrade).catalyst && (
            <div>
              <div className="v-card-title" style={{ marginBottom: 8 }}>Catalyst</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>{(p as OpenTrade).catalyst}</p>
            </div>
          )}

          {p.time_stop && (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span className="v-badge" style={{ background: 'var(--warn-100)', color: 'var(--warn)', border: '1px solid color-mix(in srgb, var(--warn) 40%, transparent)' }}>
                ⏰ Time stop: {p.time_stop}
              </span>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
