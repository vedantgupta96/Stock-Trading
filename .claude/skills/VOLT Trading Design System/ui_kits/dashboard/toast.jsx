/* VOLT — Toast notifications + Manual Trade modal */

function ToastStack({ toasts, dismiss }) {
  const conf = {
    success: { c: '--up', icon: <IconCheck size={16} /> },
    warn: { c: '--warn', icon: <IconAlert size={16} /> },
    error: { c: '--down', icon: <IconAlert size={16} /> },
    info: { c: '--volt', icon: <IconZap size={16} /> },
  };
  return (
    <div style={{ position: 'fixed', top: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 10, zIndex: 60, width: 320 }}>
      {toasts.map(t => {
        const k = conf[t.kind] || conf.info;
        return (
          <div key={t.id} onClick={() => dismiss(t.id)}
            style={{ display: 'flex', gap: 11, alignItems: 'flex-start', padding: '12px 14px', cursor: 'pointer',
              background: 'var(--ink-750)', border: `1px solid color-mix(in srgb, var(${k.c}) 45%, transparent)`,
              borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-pop)', animation: 'toastIn 360ms cubic-bezier(0.34,1.56,0.64,1) both' }}>
            <span style={{ color: `var(${k.c})`, flex: 'none', marginTop: 1 }}>{k.icon}</span>
            <span style={{ fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.4 }}>{t.msg}</span>
          </div>
        );
      })}
      <style>{`@keyframes toastIn { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

function TradeModal({ open, onClose, onSubmit }) {
  const [sym, setSym] = useState('');
  const [shares, setShares] = useState('');
  const [stage, setStage] = useState('form'); // form | gate
  if (!open) return null;
  const checks = [
    'Market regime ON — S&P above 20-day SMA',
    'Open slots available — 2 of 5 free',
    'Sector cap OK — max 2 per sector',
    'Risk sized — 1.5% equity at stop',
    'Not within 5 days of earnings',
  ];
  const runGate = () => { if (sym && shares) setStage('gate'); };
  const confirm = () => { onSubmit(sym.toUpperCase(), shares); setSym(''); setShares(''); setStage('form'); };
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(4,4,8,0.72)', backdropFilter: 'blur(4px)',
      zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} className="card" style={{ width: 420, padding: 24, animation: 'modalIn 320ms cubic-bezier(0.34,1.56,0.64,1)' }}>
        <div className="row between" style={{ marginBottom: 18 }}>
          <div className="row gap-2"><IconTarget size={18} style={{ color: 'var(--volt)' }} /><h2 style={{ font: 'var(--h3)' }}>Manual Trade</h2></div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: 7 }}><IconX size={15} /></button>
        </div>

        {stage === 'form' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <label className="col" style={{ gap: 7 }}>
              <span className="lbl">Symbol</span>
              <input value={sym} onChange={e => setSym(e.target.value.toUpperCase())} placeholder="NVDA" className="vinput" />
            </label>
            <label className="col" style={{ gap: 7 }}>
              <span className="lbl">Shares</span>
              <input value={shares} onChange={e => setShares(e.target.value.replace(/\D/g, ''))} placeholder="42" className="vinput" />
            </label>
            <button className="btn btn-primary" style={{ justifyContent: 'center', marginTop: 4 }} onClick={runGate} disabled={!sym || !shares}>
              <IconShield size={15} /> Run Buy-Gate
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <div className="mono" style={{ fontSize: 13, color: 'var(--fg-2)', marginBottom: 4 }}>
              Buy <b style={{ color: 'var(--fg-1)' }}>{shares} {sym}</b> · 11-check gate
            </div>
            {checks.map((c, i) => (
              <div key={c} className="row gap-2" style={{ fontSize: 12.5, color: 'var(--fg-2)', animation: `riseIn 320ms ${i * 90}ms both` }}>
                <IconCheck size={15} style={{ color: 'var(--up)', flex: 'none' }} /> {c}
              </div>
            ))}
            <div className="row gap-2" style={{ marginTop: 8 }}>
              <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setStage('form')}>Back</button>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={confirm}>Confirm Buy</button>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes modalIn { from { transform: translateY(18px) scale(0.97); } to { transform: none; } }
        .vinput { font-family: var(--font-mono); font-size: 15px; color: var(--fg-1); background: var(--ink-850);
          border: 1px solid var(--line-strong); border-radius: var(--r-sm); padding: 11px 13px; outline: none; transition: border-color 140ms; }
        .vinput:focus { border-color: var(--volt); box-shadow: 0 0 0 3px var(--volt-100); }
        .vinput::placeholder { color: var(--fg-4); }
      `}</style>
    </div>
  );
}

Object.assign(window, { ToastStack, TradeModal });
