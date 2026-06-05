import { useState } from 'react'
import { fmt } from '../utils'
import { SectorBadge } from './SectorBadge'
import { PositionSparkline } from './PositionSparkline'
import { PositionCard } from './PositionCard'
import { PositionDrawer } from './PositionDrawer'
import type { OpenTrade, Position, SparklineData } from '../types'

// ── Snapshot table ──────────────────────────────────────────────────────────
function SnapshotTable({ trades, onSelect }: { trades: OpenTrade[]; onSelect: (t: OpenTrade) => void }) {
  if (!trades.length)
    return <p style={{ color: 'var(--fg-4)', fontSize: 13, padding: '24px 0', textAlign: 'center' }}>No open positions in trade log.</p>
  return (
    <table className="vtable">
      <thead>
        <tr>
          {['Symbol','Sector','Shares','Entry','Stop → Target','Time Stop',''].map((h, i) => <th key={i}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {trades.map(t => (
          <tr key={t.symbol} onClick={() => onSelect(t)}>
            <td style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 14 }}>{t.symbol}</td>
            <td><SectorBadge sector={t.sector} /></td>
            <td className="mono">{t.shares ?? '—'}</td>
            <td className="mono">{t.entry_price ?? '—'}</td>
            <td className="mono" style={{ color: 'var(--fg-3)', fontSize: 12 }}>{t.stop_level ?? '—'} → {t.target ?? '—'}</td>
            <td className="mono warn" style={{ fontSize: 12 }}>{t.time_stop ?? '—'}</td>
            <td><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg-4)" strokeWidth="2"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ── Summary strip for overview tab ─────────────────────────────────────────
export function PositionsSummary({ positions, livePositions, sparklines, onViewAll }: {
  positions: OpenTrade[]
  livePositions?: Position[]
  sparklines?: SparklineData
  onViewAll: () => void
}) {
  return (
    <div className="v-card v-card-pad rise">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, alignItems: 'center' }}>
        <span className="v-card-title">Open Positions</span>
        <button onClick={onViewAll} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12,
          color: 'var(--fg-3)', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5, transition: 'color var(--dur-fast)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--volt)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-3)')}>
          View all <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
        </button>
      </div>
      {positions.length === 0 ? (
        <p style={{ color: 'var(--fg-4)', fontSize: 13 }}>No open positions.</p>
      ) : (
        <div>
          {positions.map((t, i) => {
            const livePos = livePositions?.find(p => p.symbol === t.symbol)
            const series = sparklines?.[t.symbol] ?? []
            const entryNum = parseFloat(t.entry_price?.replace(/[^0-9.]/g, '') ?? '0')
            const lastClose = series.length ? series[series.length - 1].close : null
            const plpc = livePos
              ? parseFloat(livePos.unrealized_plpc ?? '0') * 100
              : lastClose && entryNum ? ((lastClose - entryNum) / entryNum) * 100 : null
            const curPrice = livePos
              ? parseFloat(livePos.current_price ?? '0')
              : lastClose
            const up = plpc != null ? plpc >= 0 : true

            return (
              <div key={t.symbol} onClick={onViewAll} style={{
                display: 'grid', gridTemplateColumns: '80px 1fr auto auto 20px',
                alignItems: 'center', gap: 12, padding: '10px 8px', cursor: 'pointer',
                borderBottom: i < positions.length - 1 ? '1px solid var(--line)' : 'none',
                borderRadius: 'var(--r-sm)', transition: 'background var(--dur-fast)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(204,255,0,0.04)')}
              onMouseLeave={e => (e.currentTarget.style.background = '')}>
                <div>
                  <div style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 14 }}>{t.symbol}</div>
                  <div style={{ fontSize: 10, color: 'var(--fg-4)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{t.shares} sh</div>
                </div>
                <div style={{ height: 36, borderRadius: 4, overflow: 'hidden', background: 'rgba(0,0,0,0.2)' }}>
                  {series.length > 1
                    ? <PositionSparkline series={series} entryPrice={entryNum} h={36} animate={false} />
                    : <div style={{ height: 36, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                        <span style={{ fontSize: 10, color: 'var(--fg-4)' }}>loading…</span>
                      </div>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: 13, fontWeight: 700 }}>
                    {curPrice ? fmt(curPrice) : t.entry_price ?? '—'}
                  </div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', marginTop: 1 }}>
                    entry {t.entry_price ?? '—'}
                  </div>
                </div>
                <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: up ? 'var(--up)' : 'var(--down)', textAlign: 'right', minWidth: 56 }}>
                  {plpc != null ? `${up ? '+' : ''}${plpc.toFixed(2)}%` : '—'}
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg-4)" strokeWidth="2"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Main OpenPositions ──────────────────────────────────────────────────────
export function OpenPositions({ snapshotTrades, livePositions, sparklines, isLive }: {
  snapshotTrades: OpenTrade[]
  livePositions?: Position[]
  sparklines?: SparklineData
  isLive: boolean
}) {
  const [selected, setSelected] = useState<Position | OpenTrade | null>(null)
  const count = isLive ? (livePositions?.length ?? 0) : snapshotTrades.length

  return (
    <>
      <div className="v-card v-card-pad rise">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span className="v-card-title">Open Positions</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {isLive && <span className="v-badge" style={{ background: 'var(--volt-100)', color: 'var(--volt)', border: '1px solid color-mix(in srgb, var(--volt) 40%, transparent)', fontSize: 10 }}>
              <span className="v-dot v-dot-live" /> Live
            </span>}
            <span className="mono muted" style={{ fontSize: 11 }}>{count} of 5 slots · click to inspect</span>
          </div>
        </div>

        {isLive && livePositions ? (
          livePositions.length === 0
            ? <p style={{ color: 'var(--fg-4)', fontSize: 13, padding: '24px 0', textAlign: 'center' }}>No open positions.</p>
            : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                {livePositions.map(p => <PositionCard key={p.symbol} p={p} sparklines={sparklines} onSelect={setSelected} />)}
              </div>
        ) : (
          <SnapshotTable trades={snapshotTrades} onSelect={setSelected} />
        )}
      </div>

      <PositionDrawer p={selected} onClose={() => setSelected(null)} />
    </>
  )
}
