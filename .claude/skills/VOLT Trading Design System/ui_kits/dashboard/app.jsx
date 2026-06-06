/* VOLT — main app: wires snapshot ⇄ live, refresh flow, toasts, trade modal */
const { useState, useCallback, useRef, useEffect } = React;

function App() {
  const D = window.VOLT_DATA;
  const [isLive, setIsLive] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  const [autoRefresh, setAutoRefresh] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState(false);
  const [tab, setTab] = useState('overview');
  const [selected, setSelected] = useState(null);
  const tid = useRef(0);

  const toast = useCallback((msg, kind = 'info', ttl = 4200) => {
    const id = ++tid.current;
    setToasts(t => [...t, { id, msg, kind }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), ttl);
  }, []);
  const dismiss = id => setToasts(t => t.filter(x => x.id !== id));

  const refresh = useCallback(() => {
    setFetching(true);
    setTimeout(() => {
      setFetching(false);
      setIsLive(true);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      const noStop = D.positions.filter(p => !p.has_stop);
      const near = D.positions.filter(p => p.plpc <= -6 && p.has_stop);
      toast(`Updated · ${D.positions.length} positions synced from Alpaca`, 'success', 3400);
      noStop.forEach(p => toast(`${p.symbol}: no protective stop found`, 'error', 7000));
      near.forEach(p => toast(`${p.symbol}: ${p.plpc.toFixed(1)}% — near −8% hard stop`, 'warn', 7000));
    }, 1100);
  }, [toast]);

  const submitTrade = (sym, shares) => {
    setModal(false);
    toast(`Buy order placed · ${shares} ${sym} with 12% trailing stop`, 'success', 4500);
  };

  // Reveal safety-net: guarantees content is visible even if the document
  // timeline never paints (offscreen tab / reduced-motion). Forces every
  // gated animation to its final state after it would have completed.
  useEffect(() => {
    const t = setTimeout(() => {
      const app = document.querySelector('.app');
      if (app) app.classList.remove('anim');
      document.querySelectorAll('[data-draw]').forEach(p => { p.style.transition = 'none'; p.style.strokeDashoffset = '0'; });
      document.querySelectorAll('[data-grow]').forEach(b => { b.style.animation = 'none'; b.style.transform = 'none'; });
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="app anim">
      <TopBar isLive={isLive} onRefresh={refresh} fetching={fetching} lastUpdated={lastUpdated}
        regime={D.research.regime} autoRefresh={autoRefresh} setAutoRefresh={setAutoRefresh} onTrade={() => setModal(true)} />

      <StatCards data={D} isLive={isLive} />

      {/* tab navigation */}
      <div className="row between" style={{ margin: '8px 2px 18px', flexWrap: 'wrap', gap: 12 }}>
        <div className="tabs">
          <button className={tab === 'overview' ? 'on' : ''} onClick={() => setTab('overview')}><IconActivity size={15} /> Overview</button>
          <button className={tab === 'positions' ? 'on' : ''} onClick={() => setTab('positions')}><IconLayers size={15} /> Positions <span className="tcount">{D.positions.length}</span></button>
          <button className={tab === 'analytics' ? 'on' : ''} onClick={() => setTab('analytics')}><IconTrendUp size={15} /> Analytics</button>
        </div>
        {isLive
          ? <span className="badge" style={{ background: 'var(--volt-100)', color: 'var(--volt)', border: '1px solid color-mix(in srgb, var(--volt) 40%, transparent)' }}><span className="dot dot-live" /> Live data</span>
          : <span className="row gap-2" style={{ color: 'var(--fg-3)', fontSize: 12 }}><IconLayers size={14} /> Snapshot · Refresh Live for fresh quotes</span>}
      </div>

      {/* OVERVIEW */}
      {tab === 'overview' && (
        <div className="tabpanel" key="overview">
          <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', marginBottom: 16 }}>
            <EquityChart data={D} />
            <MarketContext research={D.research} />
          </div>
          <div style={{ marginBottom: 16 }}><NewsWidget news={D.news} /></div>
          <PositionsSummary positions={D.positions} onSelect={setSelected} onViewAll={() => setTab('positions')} />
        </div>
      )}

      {/* POSITIONS */}
      {tab === 'positions' && (
        <div className="tabpanel" key="positions">
          <Positions positions={D.positions} isLive={isLive} onSelect={setSelected} />
          <NewsWidget news={D.news} />
        </div>
      )}

      {/* ANALYTICS */}
      {tab === 'analytics' && (
        <div className="tabpanel" key="analytics">
          <AnalyticsStats s={D.stats} />
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: 16 }}>
            <SectorPnl rows={D.sector_pnl} />
            <RMultiple buckets={D.r_buckets} />
          </div>
          <EquityChart data={D} />
        </div>
      )}

      <ToastStack toasts={toasts} dismiss={dismiss} />
      <TradeModal open={modal} onClose={() => setModal(false)} onSubmit={submitTrade} />
      <PositionDrawer p={selected} news={D.news} onClose={() => setSelected(null)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
