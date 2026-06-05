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
import { OpenPositions, PositionsSummary } from './components/OpenPositions'
import { TradeEntries } from './components/TradeEntries'

type Tab = 'overview' | 'positions' | 'analytics'

export default function App() {
  const [tab, setTab]               = useState<Tab>('overview')
  const [autoRefresh, setAutoRefresh] = useState(0)
  const [isLive, setIsLive]           = useState(false)
  const [lastUpdated, setLastUpdated] = useState('Loading snapshot…')
  const [warnedSyms]                  = useState(new Set<string>())

  const { showToast } = useToast()

  const { data: snapshot }              = useSnapshot()
  const { data: analytics }             = useAnalytics()
  const { data: news, isLoading: newsL } = useNews()
  const liveQuery                        = useLive(autoRefresh)
  const livePositions                    = liveQuery.data?.positions ?? []
  const { data: sparklines }             = useSparklines(isLive ? livePositions.map(p => p.symbol) : [])

  const equityHist  = snapshot?.equity_history ?? []
  const openTrades  = snapshot?.open_trades ?? []
  const analyticsOT = analytics?.open_trades ?? openTrades

  const lastSnap = equityHist[equityHist.length - 1]
  const prevSnap = equityHist[equityHist.length - 2]

  const equity = isLive ? (liveQuery.data?.equity ?? null)   : (lastSnap?.equity ?? null)
  const cash   = isLive ? (liveQuery.data?.cash ?? null)     : null
  const dayPnl = isLive ? (liveQuery.data?.day_pnl ?? null)  : (lastSnap && prevSnap ? lastSnap.equity - prevSnap.equity : null)

  // update label once on first snapshot
  if (snapshot && lastUpdated === 'Loading snapshot…') {
    setLastUpdated(`${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`)
  }

  const handleRefresh = async () => {
    const result = await liveQuery.refetch()
    if (!result.data || result.data.source !== 'live') { showToast('Live refresh failed', 'error'); return }
    setIsLive(true)
    setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    const data = result.data
    data.positions.forEach(p => {
      const plpc = parseFloat(p.unrealized_plpc ?? '0') * 100
      if (!p.has_stop && !warnedSyms.has(p.symbol + '_nostop')) {
        showToast(`${p.symbol}: no protective stop found`, 'error', 7000)
        warnedSyms.add(p.symbol + '_nostop')
      }
      if (plpc <= -6 && !warnedSyms.has(p.symbol + '_near')) {
        showToast(`${p.symbol}: ${plpc.toFixed(1)}% — near −8% hard stop`, 'warn', 7000)
        warnedSyms.add(p.symbol + '_near')
      }
    })
    showToast(`Updated · ${data.positions.length} position${data.positions.length !== 1 ? 's' : ''} synced`, 'success', 3400)
  }

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 28px 80px', position: 'relative', zIndex: 1 }}>
      <Header
        research={snapshot?.research}
        lastUpdated={lastUpdated}
        isLive={isLive}
        tab={tab}
        onTabChange={setTab}
        onRefresh={handleRefresh}
        isFetching={liveQuery.isFetching}
        autoRefresh={autoRefresh}
        onAutoRefreshChange={setAutoRefresh}
        posCount={isLive ? livePositions.length : openTrades.length}
      />

      <PortfolioCards
        equity={equity}
        cash={cash}
        dayPnl={dayPnl}
        phasePnl={snapshot?.phase_pnl ?? 'N/A'}
        posCount={isLive ? livePositions.length : openTrades.length}
      />

      {/* OVERVIEW */}
      {tab === 'overview' && (
        <div className="tabpanel" key="overview">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
            <EquityChart equityHistory={equityHist} drawdown={analytics?.drawdown} />
            <MarketContext research={snapshot?.research} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <NewsWidget data={news} isLoading={newsL} />
          </div>
          <PositionsSummary
            positions={openTrades}
            onSelect={() => {}}
            onViewAll={() => setTab('positions')}
          />
        </div>
      )}

      {/* POSITIONS */}
      {tab === 'positions' && (
        <div className="tabpanel" key="positions">
          <TradeTimeline trades={analyticsOT} />
          <OpenPositions
            snapshotTrades={openTrades}
            livePositions={isLive ? livePositions : undefined}
            sparklines={sparklines}
            isLive={isLive}
          />
          <TradeEntries trades={openTrades} />
        </div>
      )}

      {/* ANALYTICS */}
      {tab === 'analytics' && (
        <div className="tabpanel" key="analytics">
          <AnalyticsStats data={analytics} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <SectorPnlChart sectorPnl={analytics?.sector_pnl} />
            <RMultipleChart rm={analytics?.r_multiples} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <EquityChart equityHistory={equityHist} drawdown={analytics?.drawdown} />
            <MarketContext research={snapshot?.research} />
          </div>
        </div>
      )}
    </div>
  )
}
