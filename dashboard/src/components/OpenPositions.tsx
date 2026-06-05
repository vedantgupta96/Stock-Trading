import { useState } from 'react'
import { fmt, pct, signed } from '../utils'
import { SectorBadge } from './SectorBadge'
import { RRBar } from './RRBar'
import { PositionSparkline } from './PositionSparkline'
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

// ── Position card (live) ────────────────────────────────────────────────────
function PositionCard({ p, sparklines, onSelect }: { p: Position; sparklines?: SparklineData; onSelect: (p: Position) => void }) {
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

      {/* header */}
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

      {/* flags */}
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

      {/* sparkline */}
      <div style={{ margin: '10px 0', borderRadius: 8, overflow: 'hidden', background: 'rgba(0,0,0,0.25)' }}>
        <PositionSparkline series={series} entryPrice={parseFloat(p.avg_entry_price ?? '0')} />
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

// ── Detail drawer (slide in on position click) ──────────────────────────────
function PositionDrawer({ p, onClose }: { p: Position | OpenTrade | null; onClose: () => void }) {
  if (!p) return null
  const isLive = 'unrealized_plpc' in p
  const plpc = isLive ? parseFloat((p as Position).unrealized_plpc ?? '0') * 100 : null
  const pl   = isLive ? parseFloat((p as Position).unrealized_pl ?? '0') : null
  const cur  = isLive ? parseFloat((p as Position).current_price ?? '0') : null
  const entry = parseFloat(('avg_entry_price' in p ? (p as Position).avg_entry_price : (p as OpenTrade).entry_price ?? '0').replace(/[^0-9.]/g, '') || '0')
  const dir = plpc != null ? (plpc >= 0 ? 'var(--up)' : 'var(--down)') : 'var(--fg-2)'

  return (
    <>
      <div className="v-scrim" onClick={onClose} />
      <aside className="v-drawer">
        {/* sticky header */}
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

          {isLive && cur != null && (
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
          {/* no-stop alarm */}
          {isLive && !(p as Position).has_stop && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px',
              background: 'var(--down-100)', border: '1px solid var(--down)', borderRadius: 'var(--r-sm)', boxShadow: 'var(--glow-down)' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--down)" strokeWidth="2.5" style={{ flexShrink: 0 }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span style={{ fontSize: 13, color: 'var(--down)', fontWeight: 600 }}>No protective stop — place a 12% trailing stop immediately.</span>
            </div>
          )}

          {/* trade ladder */}
          <div>
            <div className="v-card-title" style={{ marginBottom: 10 }}>Trade Ladder</div>
            {[
              { label: 'Target', value: ('target' in p ? (p as OpenTrade).target : null) ?? (p as Position).target, color: 'var(--up)' },
              { label: 'Current', value: cur != null ? fmt(cur) : '— (refresh)', color: dir },
              { label: 'Entry', value: entry ? fmt(entry) : ('entry_price' in p ? (p as OpenTrade).entry_price : null) ?? '—', color: 'var(--fg-2)' },
              { label: 'Stop', value: ('stop_level' in p ? (p as OpenTrade).stop_level : null) ?? (p as Position).stop_level ?? '—', color: 'var(--down)' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: row.color, boxShadow: `0 0 8px ${row.color}`, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>{row.label}</span>
                </div>
                <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* catalyst */}
          {('catalyst' in p) && (p as OpenTrade).catalyst && (
            <div>
              <div className="v-card-title" style={{ marginBottom: 8 }}>Catalyst</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>{(p as OpenTrade).catalyst}</p>
            </div>
          )}

          {/* time stop */}
          {('time_stop' in p) && (p as OpenTrade).time_stop && (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span className="v-badge" style={{ background: 'var(--warn-100)', color: 'var(--warn)', border: '1px solid color-mix(in srgb, var(--warn) 40%, transparent)' }}>
                ⏰ Time stop: {(p as OpenTrade).time_stop}
              </span>
            </div>
          )}
        </div>
      </aside>
    </>
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
