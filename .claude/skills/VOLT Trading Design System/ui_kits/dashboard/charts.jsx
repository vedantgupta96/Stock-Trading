/* VOLT — Equity / Drawdown area chart + Market context */

function AreaChart({ series, valueKey, color, fmtVal, fmtAxis, negative }) {
  const ref = useRef(null);
  const W = 640, H = 188, padB = 26, padT = 12, padL = 52, padR = 6;
  const plotW = W - padL - padR;
  const vals = series.map(s => s[valueKey]);
  const min = Math.min(...vals, negative ? 0 : Math.min(...vals));
  const max = Math.max(...vals, negative ? 0 : Math.max(...vals));
  const rng = max - min || 1;
  const x = i => padL + (i / (series.length - 1)) * plotW;
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

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const frac = (px - padL) / plotW;
    const i = Math.max(0, Math.min(series.length - 1, Math.round(frac * (series.length - 1))));
    setHover(i);
  };

  const axFont = { fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--fg-4)' };

  return (
    <div style={{ position: 'relative' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}
        onMouseMove={move} onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id={'ac' + valueKey} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.34" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* y gridlines + labels */}
        {yTicks.map((v, k) => {
          const gy = padT + (k / (yTicks.length - 1)) * (H - padT - padB);
          return (
            <g key={k}>
              <line x1={padL} x2={W - padR} y1={gy} y2={gy} stroke="var(--line)" strokeWidth="1" />
              <text x={padL - 8} y={gy + 3} textAnchor="end" style={axFont}>{(fmtAxis || fmtVal)(v)}</text>
            </g>
          );
        })}
        {/* x date labels */}
        {xIdx.map((i, k) => (
          <text key={k} x={x(i)} y={H - 8} textAnchor={k === 0 ? 'start' : k === xIdx.length - 1 ? 'end' : 'middle'} style={axFont}>{series[i].date}</text>
        ))}
        <path d={area} fill={`url(#ac${valueKey})`} />
        <path ref={ref} data-draw d={line} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {hover != null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={padT} y2={H - padB} stroke="var(--line-strong)" strokeWidth="1" />
            <circle cx={x(hover)} cy={y(series[hover][valueKey])} r="4.5" fill={color} stroke="var(--ink-900)" strokeWidth="2" />
          </g>
        )}
      </svg>
      {hover != null && (
        <div className="mono" style={{ position: 'absolute', top: 6,
          left: `${((padL + (hover / (series.length - 1)) * plotW) / W) * 100}%`,
          transform: 'translateX(-50%)', background: 'var(--ink-700)', border: '1px solid var(--line-strong)',
          borderRadius: 8, padding: '4px 9px', fontSize: 11, color: 'var(--fg-1)', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
          <span style={{ color: 'var(--fg-3)' }}>{series[hover].date} </span>
          <span style={{ color }}>{fmtVal(series[hover][valueKey])}</span>
        </div>
      )}
    </div>
  );
}

function EquityChart({ data }) {
  const [tab, setTab] = useState('equity');
  return (
    <div className="card card-pad rise" style={{ gridColumn: 'span 2', animationDelay: '80ms' }}>
      <div className="row between" style={{ marginBottom: 16 }}>
        <div className="row gap-3">
          <span className="card-title">Portfolio History</span>
          <span className="mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>
            45 EOD snapshots
          </span>
        </div>
        <div className="seg">
          <button className={tab === 'equity' ? 'on' : ''} onClick={() => setTab('equity')}>Equity</button>
          <button className={tab === 'drawdown' ? 'on' : ''} onClick={() => setTab('drawdown')}>Drawdown</button>
        </div>
      </div>
      {tab === 'equity'
        ? <AreaChart series={data.equity_history} valueKey="equity" color="var(--volt)" fmtVal={v => fmt(v)} fmtAxis={v => '$' + (v / 1000).toFixed(1) + 'k'} />
        : <AreaChart series={data.drawdown.series} valueKey="drawdown" color="var(--down)" negative fmtVal={v => v.toFixed(2) + '%'} fmtAxis={v => v.toFixed(0) + '%'} />}
    </div>
  );
}

function MarketContext({ research }) {
  return (
    <div className="card card-pad rise" style={{ animationDelay: '140ms', display: 'flex', flexDirection: 'column' }}>
      <span className="card-title" style={{ marginBottom: 14 }}>Market Context</span>
      <div className="row gap-3" style={{ marginBottom: 14 }}>
        <div>
          <div className="lbl" style={{ marginBottom: 4 }}>VIX</div>
          <div className="mono" style={{ fontSize: 22, fontWeight: 700 }}>{research.vix}</div>
        </div>
        <div style={{ width: 1, height: 36, background: 'var(--line)' }} />
        <div>
          <div className="lbl" style={{ marginBottom: 4 }}>S&P vs 20-SMA</div>
          <div className="row gap-2">
            <span className="dot" style={{ background: 'var(--up)', boxShadow: '0 0 8px var(--up)' }} />
            <span className="mono up" style={{ fontSize: 15, fontWeight: 700 }}>Above</span>
          </div>
        </div>
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--fg-2)', margin: 0 }}>{research.regime_note}</p>
      <div style={{ marginTop: 'auto', paddingTop: 14 }}>
        <div className="row gap-2" style={{ padding: '10px 12px', background: 'var(--up-100)',
          border: '1px solid color-mix(in srgb, var(--up) 30%, transparent)', borderRadius: 'var(--r-sm)' }}>
          <IconCheck size={15} style={{ color: 'var(--up)', flex: 'none' }} />
          <span className="mono" style={{ fontSize: 12, color: 'var(--up)' }}>{research.decision}</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { EquityChart, MarketContext });
