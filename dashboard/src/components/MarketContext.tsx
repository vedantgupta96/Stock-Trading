import type { Research } from '../types'

export function MarketContext({ research }: { research?: Research }) {
  const allText = (research?.regime_note ?? '') + ' ' + (research?.decision ?? '')
  const regimeOn = /above|regime.{0,10}on/i.test(allText)

  return (
    <div className="v-card v-card-pad rise" style={{ animationDelay: '140ms', display: 'flex', flexDirection: 'column' }}>
      <span className="v-card-title" style={{ marginBottom: 14 }}>Market Context</span>

      {research ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
            {research.vix && (
              <div>
                <div className="lbl" style={{ marginBottom: 4 }}>VIX</div>
                <div className="mono" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1 }}>{research.vix}</div>
              </div>
            )}
            {research.vix && <div style={{ width: 1, height: 36, background: 'var(--line)' }} />}
            <div>
              <div className="lbl" style={{ marginBottom: 4 }}>S&P vs 20-SMA</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="v-dot" style={{ background: regimeOn ? 'var(--up)' : 'var(--down)',
                  boxShadow: `0 0 8px ${regimeOn ? 'var(--up)' : 'var(--down)'}` }} />
                <span className="mono" style={{ fontSize: 15, fontWeight: 700, color: regimeOn ? 'var(--up)' : 'var(--down)' }}>
                  {regimeOn ? 'Above' : 'Below'}
                </span>
              </div>
            </div>
          </div>

          {research.regime_note && (
            <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--fg-2)', margin: 0 }}>
              {research.regime_note.slice(0, 160)}
            </p>
          )}

          {research.decision && (
            <div style={{ marginTop: 'auto', paddingTop: 14 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 12px',
                background: regimeOn ? 'var(--up-100)' : 'var(--down-100)',
                border: `1px solid color-mix(in srgb, ${regimeOn ? 'var(--up)' : 'var(--down)'} 30%, transparent)`,
                borderRadius: 'var(--r-sm)' }}>
                <span className="mono" style={{ fontSize: 12, color: regimeOn ? 'var(--up)' : 'var(--down)', lineHeight: 1.4 }}>
                  {research.decision}
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        <p style={{ color: 'var(--fg-4)', fontSize: 13 }}>Loading research log…</p>
      )}
    </div>
  )
}
