import { colorClass, fmt } from '../utils'
import type { AnalyticsData } from '../types'

interface StatCardProps {
  label: string
  value: string
  sub?: string
  valueClass?: string
}

function StatCard({ label, value, sub, valueClass }: StatCardProps) {
  return (
    <div className="card-glass p-4">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${valueClass ?? 'text-white'}`}>{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  )
}

export function AnalyticsStats({ data }: { data?: AnalyticsData }) {
  const s = data?.stats
  const dd = data?.drawdown
  const r = data?.r_multiples
  const st = data?.streaks

  const winRate = s?.win_rate != null ? `${(s.win_rate * 100).toFixed(0)}%` : '—'
  const maxDD = `${(dd?.max_drawdown ?? 0).toFixed(2)}%`
  const pf = s?.profit_factor == null ? '—' : isFinite(s.profit_factor) ? s.profit_factor.toFixed(2) : '∞'
  const avgR = r?.avg_r == null ? '—' : `${r.avg_r >= 0 ? '+' : ''}${r.avg_r.toFixed(2)}R`
  const streak = st?.current_type
    ? `${st.current_streak}${st.current_type}`
    : '—'
  const bestStreak = st?.best_win_streak ? `${st.best_win_streak}W` : '—'

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-4">
      <StatCard
        label="Win Rate" value={winRate}
        sub={s?.total_trades ? `${s.wins}W / ${s.losses}L` : 'no closed trades'}
      />
      <StatCard
        label="Max Drawdown" value={maxDD}
        valueClass={(dd?.max_drawdown ?? 0) < 0 ? 'text-red-400' : 'text-slate-400'}
        sub={`now ${(dd?.current_drawdown ?? 0).toFixed(2)}%`}
      />
      <StatCard
        label="Profit Factor" value={pf}
        sub={s?.total_trades && s.net_pnl != null
          ? `net ${s.net_pnl >= 0 ? '+' : ''}${fmt(s.net_pnl)}` : ''}
      />
      <StatCard
        label="Total Trades" value={String(s?.total_trades ?? 0)}
        sub={s?.total_trades ? `${s.wins}W / ${s.losses}L` : 'none yet'}
      />
      <StatCard
        label="Avg R-Multiple" value={avgR}
        valueClass={r?.avg_r == null ? 'text-slate-400' : colorClass(r.avg_r)}
        sub="per 8%-stop risk"
      />
      <StatCard
        label="Current Streak" value={streak}
        valueClass={!st?.current_type ? 'text-slate-400' : st.current_type === 'W' ? 'text-emerald-400' : 'text-red-400'}
        sub={st?.current_type ? (st.current_type === 'W' ? 'win streak' : 'loss streak') : 'no trades yet'}
      />
      <StatCard
        label="Best Win Streak" value={bestStreak}
        valueClass={st?.best_win_streak ? 'text-emerald-400' : 'text-slate-400'}
        sub="historical peak"
      />
    </div>
  )
}
