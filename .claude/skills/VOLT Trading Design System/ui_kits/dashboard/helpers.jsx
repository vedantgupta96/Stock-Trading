/* VOLT shared helpers + micro-components */
const { useState, useEffect, useRef } = React;

const fmt = (n, d = 2) => {
  if (n == null || isNaN(n)) return '—';
  return '$' + Math.abs(n).toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });
};
const signed = (n, d = 2) => (n >= 0 ? '+' : '−') + fmt(n, d);
const pct = (n) => (n >= 0 ? '+' : '−') + Math.abs(n).toFixed(2) + '%';
const clsPL = (n) => (n >= 0 ? 'up' : 'down');
const sectorVar = (s) => ({
  Technology: '--cat-tech', Energy: '--cat-energy', Healthcare: '--cat-health',
  Financials: '--cat-fin', Consumer: '--cat-consumer', Industrials: '--cat-indust',
  Materials: '--cat-material', Communication: '--cat-comm',
}[s] || '--fg-3');

// ── Animated rolling number ────────────────────────────────────────────────
function AnimatedNumber({ value, format = fmt, sign = false, className = '', dur = 750 }) {
  const ref = useRef(null);
  const prev = useRef(value);
  const render = (v) => (sign ? (v >= 0 ? '+' : '−') : '') + format(Math.abs(v));
  useEffect(() => {
    const from = prev.current, to = value; prev.current = value;
    if (from === to) { if (ref.current) ref.current.textContent = render(to); return; }
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      const cur = from + (to - from) * e;
      if (ref.current) ref.current.textContent = render(cur);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span ref={ref} className={className}>{render(value)}</span>;
}

// ── Sparkline (animated draw) ──────────────────────────────────────────────
function Sparkline({ series, color, entry, w = 300, h = 44, animate = true }) {
  const ref = useRef(null);
  const min = Math.min(...series), max = Math.max(...series);
  const rng = max - min || 1;
  const pts = series.map((v, i) => [
    (i / (series.length - 1)) * w,
    h - 4 - ((v - min) / rng) * (h - 8),
  ]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = d + ` L ${w} ${h} L 0 ${h} Z`;
  const entryY = entry != null ? h - 4 - ((entry - min) / rng) * (h - 8) : null;
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
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: h }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      {entryY != null && (
        <line x1="0" y1={entryY} x2={w} y2={entryY} stroke="var(--fg-4)" strokeWidth="1" strokeDasharray="3 3" />
      )}
      <path ref={ref} data-draw d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Risk/Reward bar (stop ← current → target) ──────────────────────────────
function RRBar({ stop, target, current }) {
  const lo = Math.min(stop, current), hi = Math.max(target, current);
  const pos = ((current - stop) / (target - stop)) * 100;
  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ position: 'relative', height: 6, borderRadius: 99, overflow: 'hidden',
        background: 'linear-gradient(90deg, var(--down) 0%, var(--warn) 42%, var(--up) 100%)', opacity: 0.85 }}>
      </div>
      <div style={{ position: 'relative', height: 0 }}>
        <div style={{ position: 'absolute', top: -9, left: `calc(${Math.max(2, Math.min(98, pos))}% - 1.5px)`,
          width: 3, height: 12, background: 'var(--fg-1)', borderRadius: 2, boxShadow: '0 0 6px rgba(0,0,0,0.6)' }} />
      </div>
      <div className="row between mono" style={{ fontSize: 10, color: 'var(--fg-4)', marginTop: 7 }}>
        <span>stop {fmt(stop)}</span><span>target {fmt(target)}</span>
      </div>
    </div>
  );
}

// ── Sector badge ───────────────────────────────────────────────────────────
function SectorBadge({ sector }) {
  const v = sectorVar(sector);
  return (
    <span className="badge" style={{
      background: `color-mix(in srgb, var(${v}) 14%, transparent)`,
      color: `var(${v})`,
      border: `1px solid color-mix(in srgb, var(${v}) 42%, transparent)`,
    }}>{sector}</span>
  );
}

Object.assign(window, { fmt, signed, pct, clsPL, sectorVar, AnimatedNumber, Sparkline, RRBar, SectorBadge });
