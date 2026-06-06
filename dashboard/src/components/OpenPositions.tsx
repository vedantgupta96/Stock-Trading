import { useState } from 'react'
import { fmt } from '../utils'
import { SectorBadge } from './SectorBadge'
import { PositionSparkline } from './PositionSparkline'
import { PositionCard } from './PositionCard'
import { PositionDrawer } from './PositionDrawer'
import type { OpenTrade, Position, SparklineData } from '../types'

// ── Helpers ──────────────────────────────────────────────────────────────────
function daysRemaining(raw?: string | null): string {
  if (!raw) return '—'
  const m = raw.match(/(\d{4}-\d{2}-\d{2})/)
  if (!m) return '—'
  const diff = Math.ceil((new Date(m[1]).getTime() - Date.now()) / 86_400_000)
  if (diff <= 0) return 'due'
  return `${diff}d`
}

function parseStopDollar(raw?: string | null): string {
  if (!raw) return '—'
  const m = raw.match(/\$[\d,]+\.?\d*/)
  return m ? m[0] : raw.split('(')[0].trim()
}

const WarnTriangle = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--warn)" strokeWidth="2.5" style={{ flexShrink: 0 }}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

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
            <td className="mono" style={{ color: 'var(--fg-3)', fontSize: 12 }}>{parseStopDollar(t.stop_level)} → {parseStopDollar(t.target)}</td>
            <td className="mono warn" style={{ fontSize: 12 }}>{daysRemaining(t.time_stop)}</td>
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
  const liveMap = new Map((livePositions ?? []).map(p => [p.symbol, p]))

  return (
    <div className="v-card v-card-pad rise">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="v-card-title">Open Positions</span>
          <span className="mono muted" style={{ fontSize: 11 }}>held + watchlist</span>
        </div>
        <button onClick={onViewAll} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12,
          color: 'var(--fg-3)', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5, transition: 'color var(--dur-fast)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--volt)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-3)')}>
          View all <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
        </button>
      </div>
      {positions.length === 0 ? (
        <p style={{ color: 'var(--fg-4)', fontSize: 13, padding: '16px 0' }}>No open positions.</p>
      ) : (
        <div>
          {positions.map((t, i) => {
            const live = liveMap.get(t.symbol)
            const plpc = live ? parseFloat(live.unrealized_plpc ?? '0') * 100 : null
            const cur = live ? parseFloat(live.current_price ?? '0') : null
            const entry = parseFloat((t.entry_price ?? '0').replace(/[^0-9.]/g, '') || '0')
            const series = sparklines?.[t.symbol] ?? []

            const approxPlpc = plpc == null && series.length > 0 && entry > 0
              ? ((series[series.length - 1].close - entry) / entry) * 100
              : null
            const displayPct = plpc ?? approxPlpc
            const displayPrice = cur ?? (series.length > 0 ? series[series.length - 1].close : null)

            const noStop = live ? !live.has_stop : false
            const nearStop = plpc != null && plpc <= -6
            const warn = noStop || nearStop

            return (
              <div key={t.symbol} onClick={onViewAll} style={{
                display: 'grid', gridTemplateColumns: '90px auto 1fr auto auto 18px',
                alignItems: 'center', gap: 10, padding: '8px 0', cursor: 'pointer',
                borderBottom: i < positions.length - 1 ? '1px solid var(--line)' : 'none',
                borderRadius: 'var(--r-sm)', transition: 'background var(--dur-fast)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(204,255,0,0.03)')}
              onMouseLeave={e => (e.currentTarget.style.background = '')}>

                {/* symbol + warn + shares/entry sub */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 14 }}>{t.symbol}</span>
                    {warn && <WarnTriangle />}
                  </div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', marginTop: 2 }}>
                    {[t.shares, t.entry_price].filter(Boolean).join(' · ')}
                  </div>
                </div>

                {/* sector badge */}
                <SectorBadge sector={t.sector} />

                {/* sparkline */}
                <div style={{ height: 44, minWidth: 0, borderRadius: 4, overflow: 'hidden' }}>
                  {series.length > 1
                    ? <PositionSparkline series={series} entryPrice={entry} h={44} animate={false} />
                    : <div style={{ height: 44, display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
                      </div>}
                </div>

                {/* price */}
                <span className="mono" style={{ fontSize: 13, color: 'var(--fg-2)', textAlign: 'right', minWidth: 72 }}>
                  {displayPrice != null ? fmt(displayPrice) : '—'}
                </span>

                {/* pnl% */}
                <span className="mono" style={{
                  fontSize: 13, fontWeight: 700, textAlign: 'right', minWidth: 64,
                  color: displayPct == null ? 'var(--fg-4)' : displayPct >= 0 ? 'var(--up)' : 'var(--down)',
                }}>
                  {displayPct == null ? '—' : (displayPct >= 0 ? '+' : '') + displayPct.toFixed(2) + '%'}
                </span>

                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg-4)" strokeWidth="2">
                  <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                </svg>
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

      <PositionDrawer p={selected} onClose={() => setSelected(null)} sparklines={sparklines} />
    </>
  )
}
