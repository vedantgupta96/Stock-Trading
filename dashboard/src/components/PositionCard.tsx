import { fmt, pct, signed } from '../utils'
import { SectorBadge } from './SectorBadge'
import { RRBar } from './RRBar'
import { PositionSparkline } from './PositionSparkline'
import type { Position, SparklineData } from '../types'

export function PositionCard({ p, sparklines, onSelect }: {
  p: Position
  sparklines?: SparklineData
  onSelect: (p: Position) => void
}) {
  const plpc = parseFloat(p.unrealized_plpc ?? '0') * 100
  const pl   = parseFloat(p.unrealized_pl ?? '0')
  const cur  = parseFloat(p.current_price ?? '0')
  const pos  = plpc >= 0
  const series = sparklines?.[p.symbol] ?? []

  const danger = !p.has_stop || plpc <= -6
  const bull   = plpc >= 13

  const borderColor = danger ? 'color-mix(in srgb, var(--down) 32%, transparent)'
    : bull ? 'color-mix(in srgb, var(--up) 24%, transparent)' : 'var(--line)'
  const glowStyle = danger ? 'var(--glow-down)' : bull ? 'var(--glow-up)' : 'var(--shadow-card)'

  return (
    <div className="v-card" onClick={() => onSelect(p)}
      style={{ padding: '15px 16px', borderColor, boxShadow: glowStyle, cursor: 'pointer',
        transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base), border-color var(--dur-base)' }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = '')}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }}>{p.symbol}</span>
          <SectorBadge sector={p.sector} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="mono" style={{ fontSize: 17, fontWeight: 700, color: pos ? 'var(--up)' : 'var(--down)' }}>{pct(plpc)}</div>
          <div className="mono" style={{ fontSize: 12, color: pos ? 'var(--up-deep)' : 'var(--down-deep)' }}>{signed(pl)}</div>
        </div>
      </div>

      {(!p.has_stop || plpc <= -6 || plpc >= 13) && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 10, fontSize: 11, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          {!p.has_stop && <span style={{ color: 'var(--down)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            No Stop
          </span>}
          {plpc <= -6 && p.has_stop && <span style={{ color: 'var(--warn)' }}>⚠ Near −8% stop</span>}
          {plpc >= 18 && <span style={{ color: 'var(--up)' }}>💰 Tighten to 5%</span>}
          {plpc >= 13 && plpc < 18 && <span style={{ color: 'var(--up)' }}>↑ Tighten to 7%</span>}
        </div>
      )}

      <div style={{ margin: '10px 0', borderRadius: 8, overflow: 'hidden', background: 'rgba(0,0,0,0.25)' }}>
        <PositionSparkline series={series} entryPrice={parseFloat(p.avg_entry_price ?? '0')} symbol={p.symbol} />
      </div>

      <RRBar stopRaw={p.stop_level} targetRaw={p.target} current={cur} pct={plpc} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 10,
        borderTop: '1px solid var(--line)', fontSize: 11, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>
        <span>{p.qty} sh @ {fmt(p.avg_entry_price)}</span>
        {p.time_stop && <span style={{ color: 'var(--warn)' }}>⏰ {p.time_stop}</span>}
      </div>
    </div>
  )
}
