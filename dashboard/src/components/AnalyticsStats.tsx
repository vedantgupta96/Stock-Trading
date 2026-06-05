import type { AnalyticsData } from '../types'

interface StatProps { label: string; value: string; sub?: string; color?: string }

function Stat({ label, value, sub, color = 'text-slate-200' }: StatProps) {
  return (
    <div className="card-stat p-4 flex flex-col gap-1">
      <p className="section-label">{label}</p>
      <p className={`metric text-xl font-bold leading-none mt-1 ${color}`}>{value}</p>
      {sub && <p className="text-[0.65rem] text-slate-600 mt-auto pt-1">{sub}</p>}
    </div>
  )
}

export function AnalyticsStats({ data }: { data?: AnalyticsData }) {
  const s  = data?.stats
  const dd = data?.drawdown
  const r  = data?.r_multiples
  const st = data?.streaks

  const winRate = s?.win_rate != null ? `${(s.win_rate * 100).toFixed(0)}%` : '—'
  const mddVal  = dd?.max_drawdown ?? 0
  const pfVal   = s?.profit_factor
  const avgR    = r?.avg_r

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-5">
      <Stat
        label="Win Rate" value={winRate}
        color={s?.win_rate != null ? (s.win_rate >= 0.5 ? 'text-emerald-400' : 'text-rose-400') : 'text-slate-500'}
        sub={s?.total_trades ? `${s.wins}W · ${s.losses}L` : 'no trades'}
      />
      <Stat
        label="Max Drawdown" value={`${mddVal.toFixed(2)}%`}
        color={mddVal < -5 ? 'text-rose-400' : mddVal < 0 ? 'text-amber-400' : 'text-slate-400'}
        sub={`now ${(dd?.current_drawdown ?? 0).toFixed(2)}%`}
      />
      <Stat
        label="Profit Factor"
        value={pfVal == null ? '—' : isFinite(pfVal) ? pfVal.toFixed(2) : '∞'}
        color={pfVal != null && pfVal >= 1.5 ? 'text-emerald-400' : pfVal != null ? 'text-amber-400' : 'text-slate-500'}
        sub={s?.total_trades && s.net_pnl != null
          ? `net ${s.net_pnl >= 0 ? '+' : ''}$${Math.abs(s.net_pnl).toFixed(2)}`
          : ''}
      />
      <Stat
        label="Trades"
        value={String(s?.total_trades ?? 0)}
        color="text-slate-200"
        sub={s?.total_trades ? `${s.wins}W · ${s.losses}L` : 'none yet'}
      />
      <Stat
        label="Avg R"
        value={avgR == null ? '—' : `${avgR >= 0 ? '+' : ''}${avgR.toFixed(2)}R`}
        color={avgR == null ? 'text-slate-500' : avgR >= 0 ? 'text-emerald-400' : 'text-rose-400'}
        sub="per 8%-stop risk"
      />
      <Stat
        label="Streak"
        value={st?.current_type ? `${st.current_streak}${st.current_type}` : '—'}
        color={!st?.current_type ? 'text-slate-500' : st.current_type === 'W' ? 'text-emerald-400' : 'text-rose-400'}
        sub={st?.current_type ? (st.current_type === 'W' ? 'consecutive wins' : 'consecutive losses') : 'no trades yet'}
      />
      <Stat
        label="Best Streak"
        value={st?.best_win_streak ? `${st.best_win_streak}W` : '—'}
        color={st?.best_win_streak ? 'text-emerald-400' : 'text-slate-500'}
        sub="all-time wins"
      />
    </div>
  )
}
