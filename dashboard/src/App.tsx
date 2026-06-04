import { useState } from 'react'
import { useSnapshot } from './hooks/useSnapshot'
import { useAnalytics } from './hooks/useAnalytics'
import { useLive } from './hooks/useLive'
import { useNews } from './hooks/useNews'
import { useSparklines } from './hooks/useSparklines'
import { useToast } from './components/Toast'
import { Header } from './components/Header'
import { PortfolioCards } from './components/PortfolioCards'
import { EquityChart } from './components/EquityChart'
import { MarketContext } from './components/MarketContext'
import { AnalyticsStats } from './components/AnalyticsStats'
import { TradeTimeline } from './components/TradeTimeline'
import { SectorPnlChart } from './components/SectorPnlChart'
import { RMultipleChart } from './components/RMultipleChart'
import { NewsWidget } from './components/NewsWidget'
import { OpenPositions } from './components/OpenPositions'
import { TradeEntries } from './components/TradeEntries'

export default function App() {
  const [autoRefresh, setAutoRefresh] = useState(0)
  const [lastUpdated, setLastUpdated] = useState('Loading snapshot...')
  const [isLive, setIsLive] = useState(false)
  const [warnedSymbols] = useState(new Set<string>())

  const { showToast } = useToast()

  const { data: snapshot } = useSnapshot()
  const { data: analytics } = useAnalytics()
  const { data: news, isLoading: newsLoading } = useNews()

  const liveQuery = useLive(autoRefresh)
  const livePositions = liveQuery.data?.positions ?? []
  const sparklineSyms = isLive ? livePositions.map(p => p.symbol) : []
  const { data: sparklines } = useSparklines(sparklineSyms)

  const handleRefresh = async () => {
    const result = await liveQuery.refetch()
    if (result.error || result.data?.source !== 'live') {
      showToast('Live refresh failed', 'error')
      return
    }
    const data = result.data
    setLastUpdated(`Live · ${new Date().toLocaleTimeString()}`)
    setIsLive(true)

    // Warn once per session per position issue
    data.positions.forEach(p => {
      const pct = parseFloat(p.unrealized_plpc ?? '0') * 100
      if (!p.has_stop && !warnedSymbols.has(`${p.symbol}_nostop`)) {
        showToast(`⚠ ${p.symbol}: no protective stop found`, 'warn')
        warnedSymbols.add(`${p.symbol}_nostop`)
      }
      if (pct <= -6 && !warnedSymbols.has(`${p.symbol}_near`)) {
        showToast(`⚠ ${p.symbol}: ${pct.toFixed(1)}% — near -8% hard stop`, 'warn', 8000)
        warnedSymbols.add(`${p.symbol}_near`)
      }
    })

    showToast(`Updated · ${data.positions.length} position${data.positions.length !== 1 ? 's' : ''}`, 'success', 3000)
  }

  // Snapshot values for portfolio cards (pre-live)
  const equityHist = snapshot?.equity_history ?? []
  const lastSnap = equityHist[equityHist.length - 1]
  const prevSnap = equityHist[equityHist.length - 2]

  const equity = isLive ? (liveQuery.data?.equity ?? null) : (lastSnap?.equity ?? null)
  const cash   = isLive ? (liveQuery.data?.cash ?? null) : null
  const dayPnl = isLive
    ? (liveQuery.data?.day_pnl ?? null)
    : lastSnap && prevSnap ? lastSnap.equity - prevSnap.equity : null

  // Set lastUpdated on first snapshot load
  if (snapshot && lastUpdated === 'Loading snapshot...') {
    setLastUpdated(`Snapshot · ${new Date().toLocaleTimeString()}`)
  }

  const openTrades = snapshot?.open_trades ?? []
  const analyticsOpenTrades = analytics?.open_trades ?? openTrades

  return (
    <div className="min-h-screen bg-[#080b12] text-slate-200 p-6">
      <Header
        research={snapshot?.research}
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        isFetching={liveQuery.isFetching}
        autoRefresh={autoRefresh}
        onAutoRefreshChange={setAutoRefresh}
      />

      <PortfolioCards
        equity={equity}
        cash={cash}
        dayPnl={dayPnl}
        phasePnl={snapshot?.phase_pnl ?? ''}
      />

      {/* Equity chart + Market context */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <EquityChart
          equityHistory={equityHist}
          drawdown={analytics?.drawdown}
        />
        <MarketContext research={snapshot?.research} />
      </div>

      {/* Analytics */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-white">Performance Analytics</h2>
        <span className="text-xs text-slate-500">
          {analytics?.closed_count
            ? `${analytics.closed_count} closed trade${analytics.closed_count !== 1 ? 's' : ''}`
            : 'No closed trades yet — metrics populate as positions are realized.'}
        </span>
      </div>

      <AnalyticsStats data={analytics} />

      <TradeTimeline trades={analyticsOpenTrades} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SectorPnlChart sectorPnl={analytics?.sector_pnl} />
        <RMultipleChart rm={analytics?.r_multiples} />
      </div>

      <NewsWidget data={news} isLoading={newsLoading} />

      <OpenPositions
        snapshotTrades={openTrades}
        livePositions={isLive ? livePositions : undefined}
        sparklines={sparklines}
        isLive={isLive}
      />

      <TradeEntries trades={openTrades} />
    </div>
  )
}
