import { signed } from '../utils'
import type { AnalyticsData } from '../types'

interface MiniStatProps {
  label: string; value: string; sub?: string; valueClass?: string; delay?: number
}

function MiniStat({ label, value, sub, valueClass = '', delay = 0 }: MiniStatProps) {
  return (
    <div className="v-card v-card-pad rise" style={{ padding: '14px 16px', animationDelay: `${delay}ms` }}>
      <div className="lbl" style={{ marginBottom: 7 }}>{label}</div>
      <div className={`mono ${valueClass}`} style={{ fontSize: 19, fontWeight: 700, lineHeight: 1 }}>{value}</div>
      {sub && <div className="mono muted" style={{ fontSize: 11, marginTop: 5 }}>{sub}</div>}
    </div>
  )
}

export function AnalyticsStats({ data }: { data?: AnalyticsData }) {
  const s  = data?.stats
  const dd = data?.drawdown
  const r  = data?.r_multiples
  const st = data?.streaks

  const winRate = s?.win_rate != null ? `${(s.win_rate * 100).toFixed(0)}%` : '—'
  const mdd = dd?.max_drawdown ?? 0
  const pf = s?.profit_factor
  const avgR = r?.avg_r

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12, marginBottom: 16 }}>
      <MiniStat label="Win Rate" value={winRate}
        sub={s?.total_trades ? `${s.wins}W / ${s.losses}L` : 'no trades'} delay={0} />
      <MiniStat label="Max DD" value={`${mdd.toFixed(1)}%`} valueClass="down"
        sub={`now ${(dd?.current_drawdown ?? 0).toFixed(1)}%`} delay={40} />
      <MiniStat label="Profit Factor"
        value={pf == null ? '—' : isFinite(pf) ? pf.toFixed(2) : '∞'}
        sub={s?.total_trades && s.net_pnl != null ? `net ${signed(s.net_pnl, 0)}` : ''} delay={80} />
      <MiniStat label="Trades" value={String(s?.total_trades ?? 0)} sub="closed" delay={120} />
      <MiniStat label="Avg R"
        value={avgR == null ? '—' : `${avgR >= 0 ? '+' : ''}${avgR.toFixed(2)}R`}
        valueClass={avgR == null ? '' : avgR >= 0 ? 'up' : 'down'}
        sub="per 1.5% risk" delay={160} />
      <MiniStat label="Streak"
        value={st?.current_type ? `${st.current_streak}${st.current_type}` : '—'}
        valueClass={!st?.current_type ? '' : st.current_type === 'W' ? 'up' : 'down'}
        sub="current" delay={200} />
      <MiniStat label="Best Run"
        value={st?.best_win_streak ? `${st.best_win_streak}W` : '—'} valueClass="up"
        sub="peak" delay={240} />
    </div>
  )
}
