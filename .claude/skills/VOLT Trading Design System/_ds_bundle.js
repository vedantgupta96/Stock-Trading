/* @ds-bundle: {"format":3,"namespace":"VOLTTradingDesignSystem_1e8bca","components":[],"sourceHashes":{"ui_kits/dashboard/analytics.jsx":"9e87f0a3dfa1","ui_kits/dashboard/app.jsx":"cf0629c58fb2","ui_kits/dashboard/charts.jsx":"fdfd78fc3b0f","ui_kits/dashboard/data.js":"5272dd70fe39","ui_kits/dashboard/drawer.jsx":"248794e9ce3e","ui_kits/dashboard/helpers.jsx":"8541dadb8abf","ui_kits/dashboard/icons.jsx":"6e9ce605121a","ui_kits/dashboard/news.jsx":"85765957af79","ui_kits/dashboard/positions.jsx":"46009754d9a7","ui_kits/dashboard/toast.jsx":"dfbc9b26ef39","ui_kits/dashboard/topbar.jsx":"26ea80ad0d77"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VOLTTradingDesignSystem_1e8bca = window.VOLTTradingDesignSystem_1e8bca || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/dashboard/analytics.jsx
try { (() => {
/* VOLT — Performance analytics: stat strip, sector P&L, R-multiple histogram */

function MiniStat({
  label,
  value,
  sub,
  valueClass,
  delay
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card card-pad rise",
    style: {
      padding: '14px 16px',
      animationDelay: delay + 'ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl",
    style: {
      marginBottom: 7
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    className: 'mono ' + (valueClass || ''),
    style: {
      fontSize: 19,
      fontWeight: 700
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-3)',
      marginTop: 5
    }
  }, sub));
}
function AnalyticsStats({
  s
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "grid",
    style: {
      gridTemplateColumns: 'repeat(7, 1fr)',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(MiniStat, {
    label: "Win Rate",
    value: (s.win_rate * 100).toFixed(0) + '%',
    sub: `${s.wins}W / ${s.losses}L`,
    delay: 0
  }), /*#__PURE__*/React.createElement(MiniStat, {
    label: "Max DD",
    value: s.max_drawdown.toFixed(1) + '%',
    valueClass: "down",
    sub: `now ${s.current_drawdown.toFixed(1)}%`,
    delay: 40
  }), /*#__PURE__*/React.createElement(MiniStat, {
    label: "Profit Factor",
    value: s.profit_factor.toFixed(2),
    sub: `net ${signed(s.net_pnl, 0)}`,
    delay: 80
  }), /*#__PURE__*/React.createElement(MiniStat, {
    label: "Trades",
    value: s.total_trades,
    sub: "closed",
    delay: 120
  }), /*#__PURE__*/React.createElement(MiniStat, {
    label: "Avg R",
    value: (s.avg_r >= 0 ? '+' : '') + s.avg_r.toFixed(2) + 'R',
    valueClass: s.avg_r >= 0 ? 'up' : 'down',
    sub: "per 1.5% risk",
    delay: 160
  }), /*#__PURE__*/React.createElement(MiniStat, {
    label: "Streak",
    value: s.current_streak + s.current_type,
    valueClass: s.current_type === 'W' ? 'up' : 'down',
    sub: "current",
    delay: 200
  }), /*#__PURE__*/React.createElement(MiniStat, {
    label: "Best Run",
    value: s.best_win_streak + 'W',
    valueClass: "up",
    sub: "peak",
    delay: 240
  }));
}
function SectorPnl({
  rows
}) {
  const max = Math.max(...rows.map(r => Math.abs(r.pnl)));
  return /*#__PURE__*/React.createElement("div", {
    className: "card card-pad rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row between",
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "Sector P&L"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, "realized")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13
    }
  }, rows.map((r, i) => {
    const w = Math.abs(r.pnl) / max * 100;
    const pos = r.pnl >= 0;
    return /*#__PURE__*/React.createElement("div", {
      key: r.sector,
      className: "row gap-3"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 92,
        fontSize: 12,
        color: 'var(--fg-2)',
        flex: 'none'
      }
    }, r.sector), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 22,
        background: 'var(--ink-850)',
        borderRadius: 6,
        overflow: 'hidden',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      "data-grow": true,
      style: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: w + '%',
        background: pos ? `var(${r.color})` : 'var(--down)',
        borderRadius: 6,
        boxShadow: `0 0 16px color-mix(in srgb, ${pos ? `var(${r.color})` : 'var(--down)'} 55%, transparent)`,
        animation: `grow 800ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms both`,
        transformOrigin: 'left'
      }
    })), /*#__PURE__*/React.createElement("span", {
      className: 'mono ' + clsPL(r.pnl),
      style: {
        width: 64,
        textAlign: 'right',
        fontSize: 12.5,
        fontWeight: 600,
        flex: 'none'
      }
    }, signed(r.pnl, 0)));
  })), /*#__PURE__*/React.createElement("style", null, `@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }`));
}
function RMultiple({
  buckets
}) {
  const max = Math.max(...buckets.map(b => b.count));
  return /*#__PURE__*/React.createElement("div", {
    className: "card card-pad rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row between",
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "R-Multiple Distribution"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, "23 trades")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 8,
      height: 132
    }
  }, buckets.map((b, i) => {
    const neg = b.label.includes('-') && b.label !== '0R';
    const zero = b.label === '0R';
    const col = zero ? 'var(--fg-3)' : neg ? 'var(--down)' : 'var(--up)';
    return /*#__PURE__*/React.createElement("div", {
      key: b.label,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 7,
        height: '100%',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 11,
        color: 'var(--fg-2)'
      }
    }, b.count), /*#__PURE__*/React.createElement("div", {
      "data-grow": true,
      style: {
        width: '100%',
        height: b.count / max * 100 + '%',
        minHeight: 4,
        background: col,
        borderRadius: '5px 5px 2px 2px',
        boxShadow: `0 0 14px color-mix(in srgb, ${col} 50%, transparent)`,
        animation: `growUp 700ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms both`,
        transformOrigin: 'bottom'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 9.5,
        color: 'var(--fg-4)'
      }
    }, b.label));
  })), /*#__PURE__*/React.createElement("style", null, `@keyframes growUp { from { transform: scaleY(0); } to { transform: scaleY(1); } }`));
}
Object.assign(window, {
  AnalyticsStats,
  SectorPnl,
  RMultiple
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/analytics.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/app.jsx
try { (() => {
/* VOLT — main app: wires snapshot ⇄ live, refresh flow, toasts, trade modal */
const {
  useState,
  useCallback,
  useRef,
  useEffect
} = React;
function App() {
  const D = window.VOLT_DATA;
  const [isLive, setIsLive] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }));
  const [autoRefresh, setAutoRefresh] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState(false);
  const [tab, setTab] = useState('overview');
  const [selected, setSelected] = useState(null);
  const tid = useRef(0);
  const toast = useCallback((msg, kind = 'info', ttl = 4200) => {
    const id = ++tid.current;
    setToasts(t => [...t, {
      id,
      msg,
      kind
    }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), ttl);
  }, []);
  const dismiss = id => setToasts(t => t.filter(x => x.id !== id));
  const refresh = useCallback(() => {
    setFetching(true);
    setTimeout(() => {
      setFetching(false);
      setIsLive(true);
      setLastUpdated(new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
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
      document.querySelectorAll('[data-draw]').forEach(p => {
        p.style.transition = 'none';
        p.style.strokeDashoffset = '0';
      });
      document.querySelectorAll('[data-grow]').forEach(b => {
        b.style.animation = 'none';
        b.style.transform = 'none';
      });
    }, 1500);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "app anim"
  }, /*#__PURE__*/React.createElement(TopBar, {
    isLive: isLive,
    onRefresh: refresh,
    fetching: fetching,
    lastUpdated: lastUpdated,
    regime: D.research.regime,
    autoRefresh: autoRefresh,
    setAutoRefresh: setAutoRefresh,
    onTrade: () => setModal(true)
  }), /*#__PURE__*/React.createElement(StatCards, {
    data: D,
    isLive: isLive
  }), /*#__PURE__*/React.createElement("div", {
    className: "row between",
    style: {
      margin: '8px 2px 18px',
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: tab === 'overview' ? 'on' : '',
    onClick: () => setTab('overview')
  }, /*#__PURE__*/React.createElement(IconActivity, {
    size: 15
  }), " Overview"), /*#__PURE__*/React.createElement("button", {
    className: tab === 'positions' ? 'on' : '',
    onClick: () => setTab('positions')
  }, /*#__PURE__*/React.createElement(IconLayers, {
    size: 15
  }), " Positions ", /*#__PURE__*/React.createElement("span", {
    className: "tcount"
  }, D.positions.length)), /*#__PURE__*/React.createElement("button", {
    className: tab === 'analytics' ? 'on' : '',
    onClick: () => setTab('analytics')
  }, /*#__PURE__*/React.createElement(IconTrendUp, {
    size: 15
  }), " Analytics")), isLive ? /*#__PURE__*/React.createElement("span", {
    className: "badge",
    style: {
      background: 'var(--volt-100)',
      color: 'var(--volt)',
      border: '1px solid color-mix(in srgb, var(--volt) 40%, transparent)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot dot-live"
  }), " Live data") : /*#__PURE__*/React.createElement("span", {
    className: "row gap-2",
    style: {
      color: 'var(--fg-3)',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(IconLayers, {
    size: 14
  }), " Snapshot \xB7 Refresh Live for fresh quotes")), tab === 'overview' && /*#__PURE__*/React.createElement("div", {
    className: "tabpanel",
    key: "overview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid",
    style: {
      gridTemplateColumns: '2fr 1fr',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(EquityChart, {
    data: D
  }), /*#__PURE__*/React.createElement(MarketContext, {
    research: D.research
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(NewsWidget, {
    news: D.news
  })), /*#__PURE__*/React.createElement(PositionsSummary, {
    positions: D.positions,
    onSelect: setSelected,
    onViewAll: () => setTab('positions')
  })), tab === 'positions' && /*#__PURE__*/React.createElement("div", {
    className: "tabpanel",
    key: "positions"
  }, /*#__PURE__*/React.createElement(Positions, {
    positions: D.positions,
    isLive: isLive,
    onSelect: setSelected
  }), /*#__PURE__*/React.createElement(NewsWidget, {
    news: D.news
  })), tab === 'analytics' && /*#__PURE__*/React.createElement("div", {
    className: "tabpanel",
    key: "analytics"
  }, /*#__PURE__*/React.createElement(AnalyticsStats, {
    s: D.stats
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid",
    style: {
      gridTemplateColumns: '1fr 1fr',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(SectorPnl, {
    rows: D.sector_pnl
  }), /*#__PURE__*/React.createElement(RMultiple, {
    buckets: D.r_buckets
  })), /*#__PURE__*/React.createElement(EquityChart, {
    data: D
  })), /*#__PURE__*/React.createElement(ToastStack, {
    toasts: toasts,
    dismiss: dismiss
  }), /*#__PURE__*/React.createElement(TradeModal, {
    open: modal,
    onClose: () => setModal(false),
    onSubmit: submitTrade
  }), /*#__PURE__*/React.createElement(PositionDrawer, {
    p: selected,
    news: D.news,
    onClose: () => setSelected(null)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/charts.jsx
try { (() => {
/* VOLT — Equity / Drawdown area chart + Market context */

function AreaChart({
  series,
  valueKey,
  color,
  fmtVal,
  fmtAxis,
  negative
}) {
  const ref = useRef(null);
  const W = 640,
    H = 188,
    padB = 26,
    padT = 12,
    padL = 52,
    padR = 6;
  const plotW = W - padL - padR;
  const vals = series.map(s => s[valueKey]);
  const min = Math.min(...vals, negative ? 0 : Math.min(...vals));
  const max = Math.max(...vals, negative ? 0 : Math.max(...vals));
  const rng = max - min || 1;
  const x = i => padL + i / (series.length - 1) * plotW;
  const y = v => padT + (1 - (v - min) / rng) * (H - padT - padB);
  const line = series.map((s, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(s[valueKey]).toFixed(1)).join(' ');
  const area = line + ` L ${x(series.length - 1)} ${H - padB} L ${padL} ${H - padB} Z`;
  const [hover, setHover] = useState(null);

  // axis ticks
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(g => min + (1 - g) * rng);
  const xIdx = [0, Math.round((series.length - 1) * 0.33), Math.round((series.length - 1) * 0.66), series.length - 1];
  useEffect(() => {
    if (!ref.current) return;
    const len = ref.current.getTotalLength();
    ref.current.style.strokeDasharray = len;
    ref.current.style.strokeDashoffset = len;
    ref.current.getBoundingClientRect();
    ref.current.style.transition = 'stroke-dashoffset 1100ms cubic-bezier(0.22,1,0.36,1)';
    ref.current.style.strokeDashoffset = '0';
  }, [valueKey]);
  const move = e => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width * W;
    const frac = (px - padL) / plotW;
    const i = Math.max(0, Math.min(series.length - 1, Math.round(frac * (series.length - 1))));
    setHover(i);
  };
  const axFont = {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fill: 'var(--fg-4)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    style: {
      width: '100%',
      height: 'auto',
      display: 'block'
    },
    onMouseMove: move,
    onMouseLeave: () => setHover(null)
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: 'ac' + valueKey,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: "0.34"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  }))), yTicks.map((v, k) => {
    const gy = padT + k / (yTicks.length - 1) * (H - padT - padB);
    return /*#__PURE__*/React.createElement("g", {
      key: k
    }, /*#__PURE__*/React.createElement("line", {
      x1: padL,
      x2: W - padR,
      y1: gy,
      y2: gy,
      stroke: "var(--line)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: padL - 8,
      y: gy + 3,
      textAnchor: "end",
      style: axFont
    }, (fmtAxis || fmtVal)(v)));
  }), xIdx.map((i, k) => /*#__PURE__*/React.createElement("text", {
    key: k,
    x: x(i),
    y: H - 8,
    textAnchor: k === 0 ? 'start' : k === xIdx.length - 1 ? 'end' : 'middle',
    style: axFont
  }, series[i].date)), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: `url(#ac${valueKey})`
  }), /*#__PURE__*/React.createElement("path", {
    ref: ref,
    "data-draw": true,
    d: line,
    fill: "none",
    stroke: color,
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), hover != null && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
    x1: x(hover),
    x2: x(hover),
    y1: padT,
    y2: H - padB,
    stroke: "var(--line-strong)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: x(hover),
    cy: y(series[hover][valueKey]),
    r: "4.5",
    fill: color,
    stroke: "var(--ink-900)",
    strokeWidth: "2"
  }))), hover != null && /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      position: 'absolute',
      top: 6,
      left: `${(padL + hover / (series.length - 1) * plotW) / W * 100}%`,
      transform: 'translateX(-50%)',
      background: 'var(--ink-700)',
      border: '1px solid var(--line-strong)',
      borderRadius: 8,
      padding: '4px 9px',
      fontSize: 11,
      color: 'var(--fg-1)',
      pointerEvents: 'none',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-3)'
    }
  }, series[hover].date, " "), /*#__PURE__*/React.createElement("span", {
    style: {
      color
    }
  }, fmtVal(series[hover][valueKey]))));
}
function EquityChart({
  data
}) {
  const [tab, setTab] = useState('equity');
  return /*#__PURE__*/React.createElement("div", {
    className: "card card-pad rise",
    style: {
      gridColumn: 'span 2',
      animationDelay: '80ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row between",
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "Portfolio History"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-3)'
    }
  }, "45 EOD snapshots")), /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, /*#__PURE__*/React.createElement("button", {
    className: tab === 'equity' ? 'on' : '',
    onClick: () => setTab('equity')
  }, "Equity"), /*#__PURE__*/React.createElement("button", {
    className: tab === 'drawdown' ? 'on' : '',
    onClick: () => setTab('drawdown')
  }, "Drawdown"))), tab === 'equity' ? /*#__PURE__*/React.createElement(AreaChart, {
    series: data.equity_history,
    valueKey: "equity",
    color: "var(--volt)",
    fmtVal: v => fmt(v),
    fmtAxis: v => '$' + (v / 1000).toFixed(1) + 'k'
  }) : /*#__PURE__*/React.createElement(AreaChart, {
    series: data.drawdown.series,
    valueKey: "drawdown",
    color: "var(--down)",
    negative: true,
    fmtVal: v => v.toFixed(2) + '%',
    fmtAxis: v => v.toFixed(0) + '%'
  }));
}
function MarketContext({
  research
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card card-pad rise",
    style: {
      animationDelay: '140ms',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title",
    style: {
      marginBottom: 14
    }
  }, "Market Context"), /*#__PURE__*/React.createElement("div", {
    className: "row gap-3",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lbl",
    style: {
      marginBottom: 4
    }
  }, "VIX"), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 22,
      fontWeight: 700
    }
  }, research.vix)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 36,
      background: 'var(--line)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lbl",
    style: {
      marginBottom: 4
    }
  }, "S&P vs 20-SMA"), /*#__PURE__*/React.createElement("div", {
    className: "row gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: 'var(--up)',
      boxShadow: '0 0 8px var(--up)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono up",
    style: {
      fontSize: 15,
      fontWeight: 700
    }
  }, "Above")))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      lineHeight: 1.55,
      color: 'var(--fg-2)',
      margin: 0
    }
  }, research.regime_note), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row gap-2",
    style: {
      padding: '10px 12px',
      background: 'var(--up-100)',
      border: '1px solid color-mix(in srgb, var(--up) 30%, transparent)',
      borderRadius: 'var(--r-sm)'
    }
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 15,
    style: {
      color: 'var(--up)',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      color: 'var(--up)'
    }
  }, research.decision))));
}
Object.assign(window, {
  EquityChart,
  MarketContext
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/charts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/data.js
try { (() => {
/* VOLT dashboard — mock data (shapes mirror the real Stock-Trading dashboard types) */
window.VOLT_DATA = function () {
  // deterministic-ish sparkline generator
  const spark = (start, drift, n = 28, vol = 0.012) => {
    const out = [];
    let p = start;
    let seed = start * 7.3;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < n; i++) {
      p = p * (1 + drift / n + (rnd() - 0.5) * vol);
      out.push(+p.toFixed(2));
    }
    return out;
  };
  const positions = [{
    symbol: 'NVDA',
    sector: 'Technology',
    shares: 42,
    entry: 118.40,
    current: 135.95,
    stop: 119.6,
    init_stop: 109.00,
    target: 158,
    time_stop: '8d',
    has_stop: true,
    entry_date: 'May 12',
    thesis: 'Breakout to fresh all-time highs on record data-center bookings; first pullback to the 10-EMA held cleanly. Trailing stop has ratcheted above entry — profit is locked.',
    catalyst: 'Q1 datacenter guide raise',
    series: spark(118.4, 0.16)
  }, {
    symbol: 'AVGO',
    sector: 'Technology',
    shares: 11,
    entry: 168.20,
    current: 181.40,
    stop: 159.7,
    init_stop: 155.00,
    target: 205,
    time_stop: '11d',
    has_stop: true,
    entry_date: 'May 18',
    thesis: 'AI-networking demand inflection; base breakout on 2x average volume, tucked entry under resistance-turned-support.',
    catalyst: 'Custom-silicon order flow',
    series: spark(168.2, 0.10)
  }, {
    symbol: 'XOM',
    sector: 'Energy',
    shares: 95,
    entry: 112.10,
    current: 118.65,
    stop: 106.6,
    init_stop: 104.00,
    target: 128,
    time_stop: '6d',
    has_stop: true,
    entry_date: 'May 09',
    thesis: 'Energy leadership as crude reclaims $84; momentum breakout with sector tailwind and disciplined 1.5% risk.',
    catalyst: 'OPEC supply discipline',
    series: spark(112.1, 0.07)
  }, {
    symbol: 'LLY',
    sector: 'Healthcare',
    shares: 8,
    entry: 742.00,
    current: 705.30,
    stop: 700.0,
    init_stop: 700.00,
    target: 845,
    time_stop: '4d',
    has_stop: false,
    entry_date: 'May 21',
    thesis: 'Breakout attempt failed to follow through; price now testing the stop. Protection order MISSING — needs re-placing.',
    catalyst: 'Pipeline readout (pending)',
    series: spark(742, -0.05)
  }, {
    symbol: 'JPM',
    sector: 'Financials',
    shares: 36,
    entry: 214.50,
    current: 221.10,
    stop: 199.7,
    init_stop: 199.70,
    target: 245,
    time_stop: '13d',
    has_stop: true,
    entry_date: 'May 15',
    thesis: 'Financials firming into earnings; clean multi-month-high breakout, broad-market regime supportive.',
    catalyst: 'Earnings next week',
    series: spark(214.5, 0.05)
  }];
  positions.forEach(p => {
    p.pl = +((p.current - p.entry) * p.shares).toFixed(2);
    p.plpc = +((p.current - p.entry) / p.entry * 100).toFixed(2);
    p.cost = +(p.entry * p.shares).toFixed(2);
    p.mv = +(p.current * p.shares).toFixed(2);
  });

  // equity history (45 EOD snapshots)
  const equity_history = (() => {
    const out = [];
    let e = 20000;
    let seed = 11;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const base = new Date('2026-04-02');
    for (let i = 0; i < 45; i++) {
      e = e * (1 + 0.0042 + (rnd() - 0.46) * 0.014);
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      out.push({
        date: d.toISOString().slice(5, 10),
        equity: +e.toFixed(2)
      });
    }
    return out;
  })();

  // drawdown series derived from equity
  const drawdown = (() => {
    let peak = -Infinity;
    const series = equity_history.map(s => {
      peak = Math.max(peak, s.equity);
      return {
        date: s.date,
        drawdown: +((s.equity - peak) / peak * 100).toFixed(2)
      };
    });
    const max = Math.min(...series.map(s => s.drawdown));
    return {
      series,
      max_drawdown: max,
      current_drawdown: series[series.length - 1].drawdown
    };
  })();
  const snapEquity = equity_history[equity_history.length - 1].equity;
  const prevEquity = equity_history[equity_history.length - 2].equity;
  return {
    account: {
      equity: snapEquity,
      cash: 6184.22,
      day_pnl: +(snapEquity - prevEquity).toFixed(2),
      day_pnl_pct: +((snapEquity - prevEquity) / prevEquity * 100).toFixed(2),
      phase_pnl: '+18.4%',
      week_return: '+3.1%'
    },
    // live values differ slightly to show the rollup animation on Refresh Live
    live: {
      equity: +(snapEquity + 286.55).toFixed(2),
      cash: 6184.22,
      day_pnl: +(snapEquity - prevEquity + 286.55).toFixed(2),
      day_pnl_pct: +((snapEquity - prevEquity + 286.55) / prevEquity * 100).toFixed(2)
    },
    positions,
    equity_history,
    drawdown,
    research: {
      vix: '14.2',
      regime: 'on',
      // S&P above 20-day SMA
      regime_note: 'S&P 500 holding above its 20-day SMA. Breadth healthy, leadership in semis & energy. Cleared to take new longs on confirmed breakouts.',
      decision: 'Cleared for new entries · 2 of 5 slots open'
    },
    stats: {
      total_trades: 23,
      wins: 14,
      losses: 9,
      win_rate: 0.61,
      profit_factor: 2.34,
      net_pnl: 4318.07,
      gross_win: 7540,
      gross_loss: 3222,
      max_drawdown: drawdown.max_drawdown,
      current_drawdown: drawdown.current_drawdown,
      avg_r: 0.84,
      current_streak: 3,
      current_type: 'W',
      best_win_streak: 6
    },
    sector_pnl: [{
      sector: 'Technology',
      pnl: 2140,
      count: 7,
      color: '--cat-tech'
    }, {
      sector: 'Energy',
      pnl: 980,
      count: 4,
      color: '--cat-energy'
    }, {
      sector: 'Financials',
      pnl: 640,
      count: 3,
      color: '--cat-fin'
    }, {
      sector: 'Healthcare',
      pnl: -310,
      count: 3,
      color: '--cat-health'
    }, {
      sector: 'Industrials',
      pnl: 520,
      count: 2,
      color: '--cat-indust'
    }, {
      sector: 'Consumer',
      pnl: 348,
      count: 4,
      color: '--cat-consumer'
    }],
    r_buckets: [{
      label: '<-2R',
      count: 1
    }, {
      label: '-2R',
      count: 2
    }, {
      label: '-1R',
      count: 4
    }, {
      label: '0R',
      count: 2
    }, {
      label: '+1R',
      count: 6
    }, {
      label: '+2R',
      count: 5
    }, {
      label: '+3R',
      count: 2
    }, {
      label: '>+3R',
      count: 1
    }],
    news: [{
      symbol: 'NVDA',
      headline: 'Nvidia extends gains as data-center demand outlook lifts chip sector',
      source: 'Benzinga',
      time: '12m'
    }, {
      symbol: 'XOM',
      headline: 'Exxon climbs as crude holds above $84 on tightening supply',
      source: 'Reuters',
      time: '41m'
    }, {
      symbol: 'LLY',
      headline: 'Eli Lilly slips after analyst trims price target on pipeline timing',
      source: 'MarketWatch',
      time: '1h'
    }, {
      symbol: 'JPM',
      headline: 'JPMorgan nears multi-month high ahead of earnings next week',
      source: 'Bloomberg',
      time: '2h'
    }, {
      symbol: 'AVGO',
      headline: 'Broadcom breakout holds on strong AI networking bookings',
      source: 'Investing.com',
      time: '3h'
    }]
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/data.js", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/drawer.jsx
try { (() => {
/* VOLT — Position detail drawer (slides in when a position is clicked) */

function LadderRow({
  label,
  value,
  sub,
  color,
  strong,
  fill
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row between",
    style: {
      padding: '11px 0',
      borderBottom: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: color || 'var(--fg-4)',
      flex: 'none',
      boxShadow: fill ? `0 0 10px ${color}` : 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--fg-2)'
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 14,
      fontWeight: strong ? 700 : 600,
      color: color || 'var(--fg-1)'
    }
  }, value), sub && /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-3)',
      marginLeft: 8
    }
  }, sub)));
}
function PositionDrawer({
  p,
  news,
  onClose
}) {
  if (!p) return null;
  const pos = p.plpc >= 0;
  const dir = pos ? 'var(--up)' : 'var(--down)';
  const riskPS = p.entry - (p.init_stop != null ? p.init_stop : p.stop); // INITIAL risk per share
  const rNow = riskPS > 0 ? (p.current - p.entry) / riskPS : 0; // realized R so far
  const rTarget = riskPS > 0 ? (p.target - p.entry) / riskPS : 0; // R at target
  const toStop = (p.current - p.stop) / p.current * 100;
  const toTarget = (p.target - p.current) / p.current * 100;
  const locked = p.has_stop && p.stop >= p.entry; // trailing stop locked in profit
  const symNews = news.filter(n => n.symbol === p.symbol);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "scrim",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("aside", {
    className: "drawer",
    role: "dialog",
    "aria-label": p.symbol + ' details'
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px',
      borderBottom: '1px solid var(--line)',
      position: 'sticky',
      top: 0,
      background: 'linear-gradient(180deg, var(--ink-800), color-mix(in srgb, var(--ink-800) 92%, transparent))',
      backdropFilter: 'blur(6px)',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--h1)',
      fontWeight: 700,
      letterSpacing: '-0.02em'
    }
  }, p.symbol), /*#__PURE__*/React.createElement("div", {
    className: "col",
    style: {
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(SectorBadge, {
    sector: p.sector
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, "Opened ", p.entry_date))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "btn btn-ghost",
    style: {
      padding: 8
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "row gap-4",
    style: {
      marginTop: 16,
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Last"), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 30,
      fontWeight: 700,
      lineHeight: 1,
      marginTop: 4
    }
  }, fmt(p.current))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'mono',
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: dir
    }
  }, pct(p.plpc)), /*#__PURE__*/React.createElement("div", {
    className: 'mono',
    style: {
      fontSize: 13,
      color: dir
    }
  }, signed(p.pl))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "R-Multiple"), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: rNow >= 0 ? 'var(--up)' : 'var(--down)',
      marginTop: 4
    }
  }, (rNow >= 0 ? '+' : '') + rNow.toFixed(2) + 'R')))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, !p.has_stop && /*#__PURE__*/React.createElement("div", {
    className: "row gap-2",
    style: {
      padding: '12px 14px',
      background: 'var(--down-100)',
      border: '1px solid var(--down)',
      borderRadius: 'var(--r-sm)',
      boxShadow: 'var(--glow-down)'
    }
  }, /*#__PURE__*/React.createElement(IconAlert, {
    size: 17,
    style: {
      color: 'var(--down)',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--down)',
      fontWeight: 600
    }
  }, "No protective stop on file \u2014 re-place a 12% trailing stop immediately.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "row between",
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "Price \xB7 since entry"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, "entry ", fmt(p.entry), " \xB7 dashed")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 130
    }
  }, /*#__PURE__*/React.createElement(Sparkline, {
    series: p.series,
    entry: p.entry,
    color: dir,
    h: 130
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "Trade Ladder"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(LadderRow, {
    label: "Target",
    value: fmt(p.target),
    sub: `+${toTarget.toFixed(1)}%`,
    color: "var(--up)",
    fill: true
  }), /*#__PURE__*/React.createElement(LadderRow, {
    label: "Current",
    value: fmt(p.current),
    color: dir,
    strong: true,
    fill: true
  }), /*#__PURE__*/React.createElement(LadderRow, {
    label: "Entry",
    value: fmt(p.entry),
    sub: `${p.shares} sh`,
    color: "var(--fg-2)"
  }), /*#__PURE__*/React.createElement(LadderRow, {
    label: "Stop",
    value: p.has_stop ? fmt(p.stop) : '—',
    sub: p.has_stop ? locked ? `locked +${((p.stop - p.entry) / p.entry * 100).toFixed(1)}%` : `−${toStop.toFixed(1)}%` : 'missing',
    color: p.has_stop ? locked ? 'var(--up)' : 'var(--down)' : 'var(--fg-4)',
    fill: p.has_stop
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid",
    style: {
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 10
    }
  }, [['Cost Basis', fmt(p.cost, 0), null], ['Market Value', fmt(p.mv, 0), null], ['Risk / Share', fmt(riskPS), 'var(--down)'], ['R at Target', (rTarget >= 0 ? '+' : '−') + Math.abs(rTarget).toFixed(1) + 'R', 'var(--up)'], ['Time Stop', p.time_stop, 'var(--warn)'], ['Protection', p.has_stop ? 'Active' : 'None', p.has_stop ? 'var(--up)' : 'var(--down)']].map(([l, v, c]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    className: "card",
    style: {
      padding: '12px 13px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl",
    style: {
      marginBottom: 6
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: c || 'var(--fg-1)'
    }
  }, v)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "Thesis"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      lineHeight: 1.6,
      color: 'var(--fg-2)',
      margin: '8px 0 0'
    }
  }, p.thesis), /*#__PURE__*/React.createElement("div", {
    className: "row gap-2",
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge",
    style: {
      background: 'var(--volt-100)',
      color: 'var(--volt)',
      border: '1px solid color-mix(in srgb, var(--volt) 40%, transparent)'
    }
  }, /*#__PURE__*/React.createElement(IconTarget, {
    size: 12
  }), " ", p.catalyst))), symNews.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "Related News"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, symNews.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "row gap-3",
    style: {
      padding: '11px 0',
      borderBottom: i < symNews.length - 1 ? '1px solid var(--line)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13,
      color: 'var(--fg-1)',
      lineHeight: 1.4
    }
  }, n.headline), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      flex: 'none',
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, n.time))))), /*#__PURE__*/React.createElement("div", {
    className: "row gap-2",
    style: {
      marginTop: 4
    }
  }, !p.has_stop ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 1,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(IconShield, {
    size: 15
  }), " Place Stop") : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      flex: 1,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(IconShield, {
    size: 15
  }), " Tighten Stop"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      flex: 1,
      justifyContent: 'center',
      color: 'var(--down)',
      borderColor: 'color-mix(in srgb, var(--down) 40%, transparent)'
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }), " Close Position")))));
}
Object.assign(window, {
  PositionDrawer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/drawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/helpers.jsx
try { (() => {
/* VOLT shared helpers + micro-components */
const {
  useState,
  useEffect,
  useRef
} = React;
const fmt = (n, d = 2) => {
  if (n == null || isNaN(n)) return '—';
  return '$' + Math.abs(n).toLocaleString(undefined, {
    minimumFractionDigits: d,
    maximumFractionDigits: d
  });
};
const signed = (n, d = 2) => (n >= 0 ? '+' : '−') + fmt(n, d);
const pct = n => (n >= 0 ? '+' : '−') + Math.abs(n).toFixed(2) + '%';
const clsPL = n => n >= 0 ? 'up' : 'down';
const sectorVar = s => ({
  Technology: '--cat-tech',
  Energy: '--cat-energy',
  Healthcare: '--cat-health',
  Financials: '--cat-fin',
  Consumer: '--cat-consumer',
  Industrials: '--cat-indust',
  Materials: '--cat-material',
  Communication: '--cat-comm'
})[s] || '--fg-3';

// ── Animated rolling number ────────────────────────────────────────────────
function AnimatedNumber({
  value,
  format = fmt,
  sign = false,
  className = '',
  dur = 750
}) {
  const ref = useRef(null);
  const prev = useRef(value);
  const render = v => (sign ? v >= 0 ? '+' : '−' : '') + format(Math.abs(v));
  useEffect(() => {
    const from = prev.current,
      to = value;
    prev.current = value;
    if (from === to) {
      if (ref.current) ref.current.textContent = render(to);
      return;
    }
    const start = performance.now();
    const step = now => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      const cur = from + (to - from) * e;
      if (ref.current) ref.current.textContent = render(cur);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: className
  }, render(value));
}

// ── Sparkline (animated draw) ──────────────────────────────────────────────
function Sparkline({
  series,
  color,
  entry,
  w = 300,
  h = 44,
  animate = true
}) {
  const ref = useRef(null);
  const min = Math.min(...series),
    max = Math.max(...series);
  const rng = max - min || 1;
  const pts = series.map((v, i) => [i / (series.length - 1) * w, h - 4 - (v - min) / rng * (h - 8)]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = d + ` L ${w} ${h} L 0 ${h} Z`;
  const entryY = entry != null ? h - 4 - (entry - min) / rng * (h - 8) : null;
  const gid = 'sg' + Math.round((series[0] + series.length) * 100);
  useEffect(() => {
    if (!animate || !ref.current) return;
    const len = ref.current.getTotalLength();
    ref.current.style.strokeDasharray = len;
    ref.current.style.strokeDashoffset = len;
    ref.current.getBoundingClientRect();
    ref.current.style.transition = 'stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)';
    ref.current.style.strokeDashoffset = '0';
  }, []);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${h}`,
    preserveAspectRatio: "none",
    style: {
      width: '100%',
      height: h
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: "0.28"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: `url(#${gid})`
  }), entryY != null && /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: entryY,
    x2: w,
    y2: entryY,
    stroke: "var(--fg-4)",
    strokeWidth: "1",
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement("path", {
    ref: ref,
    "data-draw": true,
    d: d,
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

// ── Risk/Reward bar (stop ← current → target) ──────────────────────────────
function RRBar({
  stop,
  target,
  current
}) {
  const lo = Math.min(stop, current),
    hi = Math.max(target, current);
  const pos = (current - stop) / (target - stop) * 100;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 6,
      borderRadius: 99,
      overflow: 'hidden',
      background: 'linear-gradient(90deg, var(--down) 0%, var(--warn) 42%, var(--up) 100%)',
      opacity: 0.85
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -9,
      left: `calc(${Math.max(2, Math.min(98, pos))}% - 1.5px)`,
      width: 3,
      height: 12,
      background: 'var(--fg-1)',
      borderRadius: 2,
      boxShadow: '0 0 6px rgba(0,0,0,0.6)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "row between mono",
    style: {
      fontSize: 10,
      color: 'var(--fg-4)',
      marginTop: 7
    }
  }, /*#__PURE__*/React.createElement("span", null, "stop ", fmt(stop)), /*#__PURE__*/React.createElement("span", null, "target ", fmt(target))));
}

// ── Sector badge ───────────────────────────────────────────────────────────
function SectorBadge({
  sector
}) {
  const v = sectorVar(sector);
  return /*#__PURE__*/React.createElement("span", {
    className: "badge",
    style: {
      background: `color-mix(in srgb, var(${v}) 14%, transparent)`,
      color: `var(${v})`,
      border: `1px solid color-mix(in srgb, var(${v}) 42%, transparent)`
    }
  }, sector);
}
Object.assign(window, {
  fmt,
  signed,
  pct,
  clsPL,
  sectorVar,
  AnimatedNumber,
  Sparkline,
  RRBar,
  SectorBadge
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/helpers.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/icons.jsx
try { (() => {
/* VOLT icons — Lucide-style stroke icons (24px grid, stroke 2, round caps/joins).
   Paths adapted from the Lucide open-source set (ISC). currentColor inherits. */
const Icon = ({
  children,
  size = 20,
  sw = 2,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: sw,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: style,
  "aria-hidden": "true"
}, children);
const IconZap = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polygon", {
  points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2",
  fill: "currentColor",
  stroke: "none"
}));
const IconRefresh = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M3 12a9 9 0 0 1 15-6.7L21 8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M21 3v5h-5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M21 12a9 9 0 0 1-15 6.7L3 16"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 21v-5h5"
}));
const IconTrendUp = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
  points: "22 7 13.5 15.5 8.5 10.5 2 17"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "16 7 22 7 22 13"
}));
const IconTrendDown = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
  points: "22 17 13.5 8.5 8.5 13.5 2 7"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "16 17 22 17 22 11"
}));
const IconActivity = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M22 12h-4l-3 9L9 3l-3 9H2"
}));
const IconWallet = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "17",
  cy: "13",
  r: "1",
  fill: "currentColor",
  stroke: "none"
}));
const IconClock = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "13",
  r: "8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 9v4l2 2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 3 2 6"
}), /*#__PURE__*/React.createElement("path", {
  d: "m22 6-3-3"
}));
const IconAlert = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 9v4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 17h.01"
}));
const IconShield = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m9 12 2 2 4-4"
}));
const IconTarget = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "9"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "5"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "1",
  fill: "currentColor",
  stroke: "none"
}));
const IconNews = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M18 14h-8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15 18h-5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M10 6h8v4h-8z"
}));
const IconX = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M18 6 6 18"
}), /*#__PURE__*/React.createElement("path", {
  d: "m6 6 12 12"
}));
const IconCheck = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M20 6 9 17l-5-5"
}));
const IconArrowUpRight = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M7 17 17 7"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7 7h10v10"
}));
const IconChevronDown = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "m6 9 6 6 6-6"
}));
const IconPlus = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 5v14"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14"
}));
const IconLayers = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "m12 2 9 5-9 5-9-5 9-5z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m3 12 9 5 9-5"
}), /*#__PURE__*/React.createElement("path", {
  d: "m3 17 9 5 9-5"
}));
Object.assign(window, {
  IconZap,
  IconRefresh,
  IconTrendUp,
  IconTrendDown,
  IconActivity,
  IconWallet,
  IconClock,
  IconAlert,
  IconShield,
  IconTarget,
  IconNews,
  IconX,
  IconCheck,
  IconArrowUpRight,
  IconChevronDown,
  IconPlus,
  IconLayers
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/news.jsx
try { (() => {
/* VOLT — Latest market news widget */

function NewsWidget({
  news
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card card-pad rise"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row between",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row gap-2"
  }, /*#__PURE__*/React.createElement(IconNews, {
    size: 16,
    style: {
      color: 'var(--fg-3)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "Latest Market News")), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, "held + watchlist")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, news.map((n, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    className: "news-row",
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      padding: '12px 8px',
      borderRadius: 'var(--r-sm)',
      borderBottom: i < news.length - 1 ? '1px solid var(--line)' : 'none',
      textDecoration: 'none',
      transition: 'background 140ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge",
    style: {
      flex: 'none',
      fontFamily: 'var(--font-mono)',
      background: 'var(--ink-700)',
      color: 'var(--fg-1)',
      border: '1px solid var(--line-strong)',
      minWidth: 56,
      justifyContent: 'center'
    }
  }, n.symbol), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13.5,
      color: 'var(--fg-1)',
      lineHeight: 1.4
    }
  }, n.headline), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      flex: 'none',
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, n.source, " \xB7 ", n.time), /*#__PURE__*/React.createElement(IconArrowUpRight, {
    size: 14,
    style: {
      flex: 'none',
      color: 'var(--fg-4)'
    }
  })))), /*#__PURE__*/React.createElement("style", null, `.news-row:hover { background: rgba(255,255,255,0.025); } .news-row:hover svg { color: var(--volt); }`));
}
Object.assign(window, {
  NewsWidget
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/news.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/positions.jsx
try { (() => {
/* VOLT — Open positions: snapshot table ⇄ live cards */

function flagsFor(p) {
  const out = [];
  if (!p.has_stop) out.push({
    t: 'No Stop',
    kind: 'danger'
  });
  if (p.plpc <= -6) out.push({
    t: 'Near −8% stop',
    kind: 'warn'
  });
  if (p.plpc >= 18) out.push({
    t: 'Tighten to 5%',
    kind: 'up'
  });else if (p.plpc >= 13) out.push({
    t: 'Tighten to 7%',
    kind: 'up'
  });
  return out;
}
function PositionCard({
  p,
  onSelect
}) {
  const pos = p.plpc >= 0;
  const f = flagsFor(p);
  const danger = !p.has_stop || p.plpc <= -6;
  const ring = danger ? 'var(--glow-down)' : pos && p.plpc >= 13 ? 'var(--glow-up)' : 'none';
  const border = danger ? 'color-mix(in srgb, var(--down) 32%, transparent)' : pos ? 'color-mix(in srgb, var(--up) 24%, transparent)' : 'var(--line)';
  return /*#__PURE__*/React.createElement("div", {
    className: "card pos-card",
    onClick: () => onSelect && onSelect(p),
    style: {
      padding: '15px 16px',
      borderColor: border,
      boxShadow: ring !== 'none' ? ring : 'var(--shadow-card)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--h3)',
      fontWeight: 700
    }
  }, p.symbol), /*#__PURE__*/React.createElement(SectorBadge, {
    sector: p.sector
  })), /*#__PURE__*/React.createElement("div", {
    className: "row gap-2",
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: 'mono ' + clsPL(p.plpc),
    style: {
      fontSize: 17,
      fontWeight: 700
    }
  }, pct(p.plpc)), /*#__PURE__*/React.createElement("div", {
    className: 'mono ' + clsPL(p.pl),
    style: {
      fontSize: 12
    }
  }, signed(p.pl))), /*#__PURE__*/React.createElement(IconArrowUpRight, {
    size: 15,
    style: {
      color: 'var(--fg-4)'
    },
    className: "pos-arrow"
  }))), f.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "row gap-2",
    style: {
      flexWrap: 'wrap',
      marginTop: 10
    }
  }, f.map(x => /*#__PURE__*/React.createElement("span", {
    key: x.t,
    className: "row gap-2",
    style: {
      fontSize: 11,
      fontWeight: 700,
      fontFamily: 'var(--font-display)',
      color: `var(--${x.kind === 'danger' ? 'down' : x.kind})`
    }
  }, x.kind === 'danger' && /*#__PURE__*/React.createElement(IconAlert, {
    size: 13
  }), x.t))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '12px 0 10px'
    }
  }, /*#__PURE__*/React.createElement(Sparkline, {
    series: p.series,
    entry: p.entry,
    color: pos ? 'var(--up)' : 'var(--down)'
  })), /*#__PURE__*/React.createElement(RRBar, {
    stop: p.stop,
    target: p.target,
    current: p.current
  }), /*#__PURE__*/React.createElement("div", {
    className: "row between",
    style: {
      marginTop: 12,
      paddingTop: 10,
      borderTop: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, p.shares, " sh @ ", fmt(p.entry)), /*#__PURE__*/React.createElement("span", {
    className: "mono row gap-2",
    style: {
      fontSize: 11,
      color: 'var(--warn)'
    }
  }, /*#__PURE__*/React.createElement(IconClock, {
    size: 12
  }), " ", p.time_stop)));
}
function SnapshotTable({
  positions,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("table", {
    className: "vtable"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Symbol', 'Sector', 'Shares', 'Entry', 'Stop → Target', 'Time Stop', 'Protection', ''].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, positions.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.symbol,
    className: "clickable",
    onClick: () => onSelect && onSelect(p)
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 700,
      fontFamily: 'var(--font-display)',
      fontSize: 14
    }
  }, p.symbol), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(SectorBadge, {
    sector: p.sector
  })), /*#__PURE__*/React.createElement("td", {
    className: "mono"
  }, p.shares), /*#__PURE__*/React.createElement("td", {
    className: "mono"
  }, fmt(p.entry)), /*#__PURE__*/React.createElement("td", {
    className: "mono",
    style: {
      color: 'var(--fg-3)',
      fontSize: 12
    }
  }, fmt(p.stop), " \u2192 ", fmt(p.target)), /*#__PURE__*/React.createElement("td", {
    className: "mono warn",
    style: {
      fontSize: 12
    }
  }, p.time_stop), /*#__PURE__*/React.createElement("td", null, p.has_stop ? /*#__PURE__*/React.createElement("span", {
    className: "row gap-2 up",
    style: {
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(IconShield, {
    size: 14
  }), " Stop set") : /*#__PURE__*/React.createElement("span", {
    className: "row gap-2 down",
    style: {
      fontSize: 12,
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement(IconAlert, {
    size: 14
  }), " No stop")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(IconArrowUpRight, {
    size: 14,
    style: {
      color: 'var(--fg-4)'
    }
  }))))));
}
function Positions({
  positions,
  isLive,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card card-pad rise",
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row between",
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "Open Positions"), /*#__PURE__*/React.createElement("div", {
    className: "row gap-2"
  }, isLive && /*#__PURE__*/React.createElement("span", {
    className: "badge",
    style: {
      background: 'var(--volt-100)',
      color: 'var(--volt)',
      border: '1px solid color-mix(in srgb, var(--volt) 40%, transparent)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot dot-live"
  }), " Live"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, positions.length, " of 5 slots \xB7 click to inspect"))), isLive ? /*#__PURE__*/React.createElement("div", {
    className: "grid",
    style: {
      gridTemplateColumns: 'repeat(2, 1fr)'
    }
  }, positions.map(p => /*#__PURE__*/React.createElement(PositionCard, {
    key: p.symbol,
    p: p,
    onSelect: onSelect
  }))) : /*#__PURE__*/React.createElement(SnapshotTable, {
    positions: positions,
    onSelect: onSelect
  }), /*#__PURE__*/React.createElement("style", null, `.pos-card { transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base), border-color var(--dur-base); }
        .pos-card:hover { transform: translateY(-2px); }
        .pos-card:hover .pos-arrow { color: var(--volt); }`));
}

// Compact at-a-glance strip for the Overview tab (links into Positions)
function PositionsSummary({
  positions,
  onSelect,
  onViewAll
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card card-pad rise",
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row between",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "Open Positions"), /*#__PURE__*/React.createElement("button", {
    className: "link-all",
    onClick: onViewAll
  }, "View all ", /*#__PURE__*/React.createElement(IconArrowUpRight, {
    size: 13
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, positions.map((p, i) => {
    const pos = p.plpc >= 0;
    const danger = !p.has_stop || p.plpc <= -6;
    return /*#__PURE__*/React.createElement("div", {
      key: p.symbol,
      className: "pos-strip",
      onClick: () => onSelect && onSelect(p),
      style: {
        display: 'grid',
        gridTemplateColumns: '92px 1fr 96px 74px 20px',
        alignItems: 'center',
        gap: 14,
        padding: '11px 8px',
        borderBottom: i < positions.length - 1 ? '1px solid var(--line)' : 'none',
        cursor: 'pointer',
        borderRadius: 'var(--r-sm)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "row gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontFamily: 'var(--font-display)',
        fontSize: 14
      }
    }, p.symbol), danger && /*#__PURE__*/React.createElement(IconAlert, {
      size: 13,
      style: {
        color: 'var(--down)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 26
      }
    }, /*#__PURE__*/React.createElement(Sparkline, {
      series: p.series,
      color: pos ? 'var(--up)' : 'var(--down)',
      h: 26,
      animate: false
    })), /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 13,
        color: 'var(--fg-2)',
        textAlign: 'right'
      }
    }, fmt(p.current)), /*#__PURE__*/React.createElement("span", {
      className: 'mono ' + clsPL(p.plpc),
      style: {
        fontSize: 13.5,
        fontWeight: 700,
        textAlign: 'right'
      }
    }, pct(p.plpc)), /*#__PURE__*/React.createElement(IconArrowUpRight, {
      size: 14,
      style: {
        color: 'var(--fg-4)'
      },
      className: "strip-arrow"
    }));
  })), /*#__PURE__*/React.createElement("style", null, `
        .pos-strip { transition: background var(--dur-fast) var(--ease-out); }
        .pos-strip:hover { background: rgba(204,255,0,0.04); }
        .pos-strip:hover .strip-arrow { color: var(--volt); }
        .link-all { font-family: var(--font-display); font-weight: 600; font-size: 12px; color: var(--fg-3);
          background: none; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;
          transition: color var(--dur-fast); }
        .link-all:hover { color: var(--volt); }
      `));
}
Object.assign(window, {
  Positions,
  PositionsSummary
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/positions.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/toast.jsx
try { (() => {
/* VOLT — Toast notifications + Manual Trade modal */

function ToastStack({
  toasts,
  dismiss
}) {
  const conf = {
    success: {
      c: '--up',
      icon: /*#__PURE__*/React.createElement(IconCheck, {
        size: 16
      })
    },
    warn: {
      c: '--warn',
      icon: /*#__PURE__*/React.createElement(IconAlert, {
        size: 16
      })
    },
    error: {
      c: '--down',
      icon: /*#__PURE__*/React.createElement(IconAlert, {
        size: 16
      })
    },
    info: {
      c: '--volt',
      icon: /*#__PURE__*/React.createElement(IconZap, {
        size: 16
      })
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 20,
      right: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      zIndex: 60,
      width: 320
    }
  }, toasts.map(t => {
    const k = conf[t.kind] || conf.info;
    return /*#__PURE__*/React.createElement("div", {
      key: t.id,
      onClick: () => dismiss(t.id),
      style: {
        display: 'flex',
        gap: 11,
        alignItems: 'flex-start',
        padding: '12px 14px',
        cursor: 'pointer',
        background: 'var(--ink-750)',
        border: `1px solid color-mix(in srgb, var(${k.c}) 45%, transparent)`,
        borderRadius: 'var(--r-md)',
        boxShadow: 'var(--shadow-pop)',
        animation: 'toastIn 360ms cubic-bezier(0.34,1.56,0.64,1) both'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: `var(${k.c})`,
        flex: 'none',
        marginTop: 1
      }
    }, k.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--fg-1)',
        lineHeight: 1.4
      }
    }, t.msg));
  }), /*#__PURE__*/React.createElement("style", null, `@keyframes toastIn { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: none; } }`));
}
function TradeModal({
  open,
  onClose,
  onSubmit
}) {
  const [sym, setSym] = useState('');
  const [shares, setShares] = useState('');
  const [stage, setStage] = useState('form'); // form | gate
  if (!open) return null;
  const checks = ['Market regime ON — S&P above 20-day SMA', 'Open slots available — 2 of 5 free', 'Sector cap OK — max 2 per sector', 'Risk sized — 1.5% equity at stop', 'Not within 5 days of earnings'];
  const runGate = () => {
    if (sym && shares) setStage('gate');
  };
  const confirm = () => {
    onSubmit(sym.toUpperCase(), shares);
    setSym('');
    setShares('');
    setStage('form');
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(4,4,8,0.72)',
      backdropFilter: 'blur(4px)',
      zIndex: 70,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    className: "card",
    style: {
      width: 420,
      padding: 24,
      animation: 'modalIn 320ms cubic-bezier(0.34,1.56,0.64,1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row between",
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row gap-2"
  }, /*#__PURE__*/React.createElement(IconTarget, {
    size: 18,
    style: {
      color: 'var(--volt)'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--h3)'
    }
  }, "Manual Trade")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "btn btn-ghost",
    style: {
      padding: 7
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 15
  }))), stage === 'form' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "col",
    style: {
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Symbol"), /*#__PURE__*/React.createElement("input", {
    value: sym,
    onChange: e => setSym(e.target.value.toUpperCase()),
    placeholder: "NVDA",
    className: "vinput"
  })), /*#__PURE__*/React.createElement("label", {
    className: "col",
    style: {
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Shares"), /*#__PURE__*/React.createElement("input", {
    value: shares,
    onChange: e => setShares(e.target.value.replace(/\D/g, '')),
    placeholder: "42",
    className: "vinput"
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      justifyContent: 'center',
      marginTop: 4
    },
    onClick: runGate,
    disabled: !sym || !shares
  }, /*#__PURE__*/React.createElement(IconShield, {
    size: 15
  }), " Run Buy-Gate")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 13,
      color: 'var(--fg-2)',
      marginBottom: 4
    }
  }, "Buy ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-1)'
    }
  }, shares, " ", sym), " \xB7 11-check gate"), checks.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c,
    className: "row gap-2",
    style: {
      fontSize: 12.5,
      color: 'var(--fg-2)',
      animation: `riseIn 320ms ${i * 90}ms both`
    }
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 15,
    style: {
      color: 'var(--up)',
      flex: 'none'
    }
  }), " ", c)), /*#__PURE__*/React.createElement("div", {
    className: "row gap-2",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      flex: 1,
      justifyContent: 'center'
    },
    onClick: () => setStage('form')
  }, "Back"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 1,
      justifyContent: 'center'
    },
    onClick: confirm
  }, "Confirm Buy")))), /*#__PURE__*/React.createElement("style", null, `
        @keyframes modalIn { from { transform: translateY(18px) scale(0.97); } to { transform: none; } }
        .vinput { font-family: var(--font-mono); font-size: 15px; color: var(--fg-1); background: var(--ink-850);
          border: 1px solid var(--line-strong); border-radius: var(--r-sm); padding: 11px 13px; outline: none; transition: border-color 140ms; }
        .vinput:focus { border-color: var(--volt); box-shadow: 0 0 0 3px var(--volt-100); }
        .vinput::placeholder { color: var(--fg-4); }
      `));
}
Object.assign(window, {
  ToastStack,
  TradeModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/toast.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/topbar.jsx
try { (() => {
/* VOLT — TopBar + portfolio stat cards */

function TopBar({
  isLive,
  onRefresh,
  fetching,
  lastUpdated,
  regime,
  autoRefresh,
  setAutoRefresh,
  onTrade
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "row between rise",
    style: {
      flexWrap: 'wrap',
      gap: 14,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--r-md)',
      background: 'var(--volt)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--glow-volt)'
    }
  }, /*#__PURE__*/React.createElement(IconZap, {
    size: 26,
    style: {
      color: 'var(--fg-on-volt)'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "row gap-2",
    style: {
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--h1)',
      letterSpacing: '-0.02em'
    }
  }, "VOLT"), /*#__PURE__*/React.createElement("span", {
    className: "lbl",
    style: {
      color: 'var(--fg-4)'
    }
  }, "cockpit")), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11.5,
      color: 'var(--fg-3)',
      marginTop: 2
    }
  }, isLive ? 'Live' : 'Snapshot', " \xB7 ", lastUpdated))), /*#__PURE__*/React.createElement("div", {
    className: "row gap-3",
    style: {
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge",
    style: {
      background: regime === 'on' ? 'var(--up-100)' : 'var(--down-100)',
      color: regime === 'on' ? 'var(--up)' : 'var(--down)',
      border: `1px solid color-mix(in srgb, var(${regime === 'on' ? '--up' : '--down'}) 45%, transparent)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: 'currentColor',
      boxShadow: '0 0 9px currentColor'
    }
  }), "Regime: ", regime === 'on' ? 'On' : 'Off'), /*#__PURE__*/React.createElement("div", {
    className: "row gap-2"
  }, autoRefresh > 0 && /*#__PURE__*/React.createElement("span", {
    className: "dot dot-live"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("select", {
    className: "vselect",
    value: autoRefresh,
    onChange: e => setAutoRefresh(+e.target.value),
    style: {
      paddingRight: 26
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: 0
  }, "Auto \xB7 Off"), /*#__PURE__*/React.createElement("option", {
    value: 30
  }, "Auto \xB7 30s"), /*#__PURE__*/React.createElement("option", {
    value: 60
  }, "Auto \xB7 60s")), /*#__PURE__*/React.createElement(IconChevronDown, {
    size: 14,
    style: {
      position: 'absolute',
      right: 8,
      color: 'var(--fg-3)',
      pointerEvents: 'none'
    }
  }))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onTrade
  }, /*#__PURE__*/React.createElement(IconPlus, {
    size: 15
  }), " Trade"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onRefresh,
    disabled: fetching
  }, /*#__PURE__*/React.createElement(IconRefresh, {
    size: 15,
    style: {
      animation: fetching ? 'spin 0.9s linear infinite' : 'none'
    }
  }), fetching ? 'Syncing…' : 'Refresh Live')), /*#__PURE__*/React.createElement("style", null, `@keyframes spin { to { transform: rotate(360deg); } }`));
}
function StatCard({
  label,
  icon,
  value,
  sub,
  subClass,
  accent,
  delay
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card card-pad rise",
    style: {
      animationDelay: delay + 'ms',
      position: 'relative',
      overflow: 'hidden'
    }
  }, accent && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      background: `var(${accent})`,
      opacity: 0.9,
      boxShadow: `0 0 12px var(${accent})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "row between",
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-4)'
    }
  }, icon)), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    className: 'mono ' + (subClass || 'muted'),
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      marginTop: 8
    }
  }, sub));
}
function StatCards({
  data,
  isLive
}) {
  const a = isLive ? {
    ...data.account,
    ...data.live
  } : data.account;
  return /*#__PURE__*/React.createElement("div", {
    className: "grid",
    style: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Portfolio Value",
    icon: /*#__PURE__*/React.createElement(IconWallet, {
      size: 18
    }),
    accent: "--volt",
    delay: 0,
    value: /*#__PURE__*/React.createElement(AnimatedNumber, {
      value: a.equity
    }),
    sub: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(AnimatedNumber, {
      value: a.day_pnl,
      sign: true,
      className: clsPL(a.day_pnl)
    }), " today")
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Cash Available",
    icon: /*#__PURE__*/React.createElement(IconShield, {
      size: 18
    }),
    delay: 60,
    value: /*#__PURE__*/React.createElement(AnimatedNumber, {
      value: a.cash
    }),
    sub: `${data.positions.length} positions deployed`
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Day P&L",
    icon: a.day_pnl >= 0 ? /*#__PURE__*/React.createElement(IconTrendUp, {
      size: 18
    }) : /*#__PURE__*/React.createElement(IconTrendDown, {
      size: 18
    }),
    accent: a.day_pnl >= 0 ? '--up' : '--down',
    delay: 120,
    value: /*#__PURE__*/React.createElement(AnimatedNumber, {
      value: a.day_pnl_pct,
      sign: true,
      format: v => v.toFixed(2) + '%',
      className: clsPL(a.day_pnl)
    }),
    sub: /*#__PURE__*/React.createElement(AnimatedNumber, {
      value: a.day_pnl,
      sign: true,
      className: clsPL(a.day_pnl)
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Phase P&L",
    icon: /*#__PURE__*/React.createElement(IconActivity, {
      size: 18
    }),
    accent: "--up",
    delay: 180,
    value: /*#__PURE__*/React.createElement("span", {
      className: "up"
    }, data.account.phase_pnl),
    sub: /*#__PURE__*/React.createElement("span", {
      className: "up"
    }, data.account.week_return, " this week"),
    subClass: "up"
  }));
}
Object.assign(window, {
  TopBar,
  StatCards
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/topbar.jsx", error: String((e && e.message) || e) }); }

})();
