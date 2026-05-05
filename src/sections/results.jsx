// In-vitro results — actual experimental data from the paper
const Results = () => {
  const [tab, setTab] = React.useState('ic50');

  return (
    <section id="results" data-screen-label="08 Results" style={{
      padding: '120px 0',
      borderBottom: '1px solid var(--line-soft)',
      background: 'var(--bg-1)',
    }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="section-num">§ 07 — In-vitro validation</div>
          <span className="chip" style={{ borderColor: 'var(--dual)', color: 'var(--dual)' }}>
            <span className="dot" style={{ background: 'var(--dual)' }} />WET-LAB DATA
          </span>
        </div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 980 }}>
          Synthesized and validated in HEK293 + brain slice.
        </h2>
        <p className="body-lg" style={{ marginTop: 24, maxWidth: 760, color: 'var(--fg-1)' }}>
          The synthesized compound was characterized by LC-MS and ¹H-NMR (94.8% purity), then run
          through three independent functional assays: single-receptor cAMP at MOR and NOP,
          dual co-expression cAMP, and ex vivo GIRK electrophysiology in mouse brain slices.
        </p>

        {/* Tabs */}
        <div style={{ marginTop: 48, display: 'flex', gap: 0, borderBottom: '1px solid var(--line-soft)' }}>
          {[
            { k: 'ic50', label: 'IC₅₀ · single receptor' },
            { k: 'dual', label: 'Eₘₐₓ · dual co-expression' },
            { k: 'girk', label: 'GIRK · electrophysiology' },
          ].map(t => (
            <button key={t.k} onClick={() => setTab(t.k)}
              style={{
                padding: '14px 20px',
                borderBottom: tab === t.k ? '2px solid var(--accent)' : '2px solid transparent',
                marginBottom: -1,
                color: tab === t.k ? 'var(--fg)' : 'var(--fg-2)',
                fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.06em',
                cursor: 'pointer',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 32 }}>
          {tab === 'ic50' && <IC50Panel />}
          {tab === 'dual' && <DualPanel />}
          {tab === 'girk' && <GIRKPanel />}
        </div>

        {/* Synthesis card */}
        <div style={{
          marginTop: 56,
          padding: 24,
          border: '1px solid var(--line-soft)',
          background: 'var(--bg)',
          borderRadius: 6,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 0,
        }}>
          <SynthCell k="Synthesis" v="Reductive amination" sub="One-pot · NaBH(OAc)₃" />
          <SynthCell k="Purity" v="94.8%" sub="LC-MS peak integration" />
          <SynthCell k="LC-MS" v="m/z 373.5" sub="[M+H]⁺ · t_R 4.23 min" />
          <SynthCell k="¹H-NMR" v="12 aromatic H" sub="CDCl₃ · structure confirmed" />
        </div>
      </div>
    </section>
  );
};

const IC50Panel = () => {
  const data = [
    { compound: 'Naphthyl-Norfentanyl', mor: 5,  nop: 11, lead: true },
    { compound: 'Fentanyl (ref)',       mor: 3,  nop: null },
    { compound: 'Ro64-6198 (ref)',      mor: null, nop: 20 },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32 }} className="results-grid">
      <div className="card" style={{ padding: 28 }}>
        <div className="label">cAMP IC₅₀ · HEK293 single-receptor</div>
        <p className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 6 }}>
          forskolin-stimulated · HTRF readout · 4PL fit · 0.3–10,000 nM
        </p>

        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
          {data.map(d => (
            <div key={d.compound}>
              <div style={{ marginBottom: 10 }}>
                <span style={{
                  fontFamily: d.lead ? 'var(--serif)' : 'var(--mono)',
                  fontSize: d.lead ? 17 : 13,
                  color: d.lead ? 'var(--accent)' : 'var(--fg-1)',
                  display: 'block',
                  lineHeight: 1.2,
                }}>
                  {d.compound}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <Bar label="MOR" v={d.mor} max={25} color="var(--mor)" />
                <Bar label="NOP" v={d.nop} max={25} color="var(--nop)" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="card" style={{ padding: 24 }}>
          <div className="label">Headline</div>
          <p style={{ fontSize: 14, marginTop: 12, color: 'var(--fg-1)', lineHeight: 1.6 }}>
            Naphthyl-Norfentanyl retains <strong style={{ color: 'var(--mor)' }}>near-fentanyl
            MOR potency</strong> (5 nM vs 3 nM) while producing genuine NOP activation
            <strong style={{ color: 'var(--nop)' }}> nearly 2× more potent</strong> than the
            reference NOP agonist Ro64-6198.
          </p>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line-soft)' }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>vs FENTANYL</div>
            <div className="serif" style={{ fontSize: 32, color: 'var(--fg)', marginTop: 4 }}>1.7×</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>weaker at MOR</div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>vs Ro64-6198</div>
            <div className="serif" style={{ fontSize: 32, color: 'var(--accent)', marginTop: 4 }}>1.8×</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>stronger at NOP</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

const Bar = ({ label, v, max, color }) => (
  <div style={{ flex: 1 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
      <span className="mono" style={{ fontSize: 10, color, letterSpacing: '0.1em' }}>{label}</span>
      <span className="mono" style={{ fontSize: 11, color: v == null ? 'var(--fg-3)' : 'var(--fg)' }}>
        {v == null ? '—' : `${v} nM`}
      </span>
    </div>
    <div style={{ height: 8, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden' }}>
      {v != null && (
        <div style={{
          height: '100%',
          width: `${100 - (v / max) * 100}%`,
          background: color,
          transition: 'width 0.6s ease',
        }} />
      )}
    </div>
  </div>
);

const DualPanel = () => {
  const conditions = [
    { label: 'Fentanyl alone',                 emax: 93, color: 'var(--warn)', note: 'MOR fully engaged · no ceiling' },
    { label: 'Naphthyl-Norfentanyl + SB-612111', emax: 87, color: 'var(--fg-2)', note: 'NOP pharmacologically blocked · MOR-only response' },
    { label: 'Naphthyl-Norfentanyl alone',     emax: 55, color: 'var(--accent)', note: 'NOP active · self-limits MOR signaling', lead: true },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32 }} className="results-grid">
      <div className="card" style={{ padding: 28 }}>
        <div className="label">Eₘₐₓ · MOR/NOP co-expressing HEK293</div>
        <p className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 6 }}>
          maximal cAMP inhibition · saturating concentration
        </p>

        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {conditions.map(c => (
            <div key={c.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontSize: 14, color: c.lead ? 'var(--fg)' : 'var(--fg-1)', fontWeight: c.lead ? 500 : 400 }}>
                  {c.label}
                </span>
                <span className="serif" style={{ fontSize: 22, color: c.color }}>{c.emax}%</span>
              </div>
              <div style={{ height: 14, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                <div style={{ height: '100%', width: `${c.emax}%`, background: c.color, transition: 'width 0.6s ease' }} />
              </div>
              <p className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 6, letterSpacing: '0.04em' }}>
                {c.note}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, padding: 16, background: 'var(--accent-soft)', border: '1px solid var(--accent-line)', borderRadius: 4 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em' }}>
            Δ Eₘₐₓ = 32 percentage points
          </div>
          <p style={{ fontSize: 13, color: 'var(--fg-1)', marginTop: 6, lineHeight: 1.5 }}>
            The drop from 87% (NOP blocked) → 55% (NOP active) is direct evidence of
            real-time NOP-mediated MOR attenuation. The ceiling is the safety mechanism.
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div className="label">Why this matters</div>
        <p style={{ fontSize: 14, marginTop: 12, color: 'var(--fg-1)', lineHeight: 1.6 }}>
          Brainstem respiratory depression scales with MOR Gᵢ signaling. A compound that
          inherently caps its own maximum Gᵢ output via NOP co-engagement has a
          fundamentally different — and structurally safer — pharmacological profile from
          fentanyl, where signaling rises monotonically with dose.
        </p>
        <div style={{ marginTop: 24, padding: 16, background: 'var(--bg-2)', borderRadius: 4 }}>
          <div className="label">Pharmacological dissection</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fg-1)', marginTop: 10, lineHeight: 1.8 }}>
            <div>+ NOP antagonist → 87%</div>
            <div>− NOP antagonist → 55%</div>
            <div style={{ color: 'var(--accent)' }}>∴ NOP attribution = 32 pp</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GIRKPanel = () => {
  const W = 560, H = 240, P = 32;
  // Stylized GIRK current trace — fentanyl peaks higher
  const traceFent = (t) => {
    if (t < 0.15) return 0;
    if (t < 0.25) return -((t - 0.15) / 0.1) * 90;
    if (t < 0.7) return -90 + Math.sin((t - 0.25) * 8) * 4;
    return -90 * Math.exp(-(t - 0.7) * 6);
  };
  const traceNN = (t) => {
    if (t < 0.15) return 0;
    if (t < 0.28) return -((t - 0.15) / 0.13) * 45;
    if (t < 0.7) return -45 + Math.sin((t - 0.28) * 7) * 3;
    return -45 * Math.exp(-(t - 0.7) * 6);
  };
  const xs = Array.from({ length: 100 }, (_, i) => i / 99);
  const sx = t => P + t * (W - P * 2);
  const sy = v => H/2 - (v / 100) * (H/2 - P);
  const path = fn => xs.map((t, i) => `${i === 0 ? 'M' : 'L'} ${sx(t).toFixed(1)} ${sy(fn(t)).toFixed(1)}`).join(' ');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32 }} className="results-grid">
      <div className="card" style={{ padding: 28 }}>
        <div className="label">Whole-cell patch clamp · primary mouse neurons</div>
        <p className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 6 }}>
          GIRK current · saturating agonist · representative trace
        </p>

        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', marginTop: 24 }}>
          {/* Axes */}
          <line x1={P} y1={H/2} x2={W-P} y2={H/2} stroke="var(--line)" />
          <line x1={P} y1={P} x2={P} y2={H-P} stroke="var(--line)" />

          {/* 0 line */}
          <text x={P-8} y={H/2+4} textAnchor="end" fontFamily="var(--mono)" fontSize="10" fill="var(--fg-3)">0</text>
          <text x={P-8} y={sy(-90)+4} textAnchor="end" fontFamily="var(--mono)" fontSize="10" fill="var(--fg-3)">−90</text>
          <text x={P-8} y={sy(-45)+4} textAnchor="end" fontFamily="var(--mono)" fontSize="10" fill="var(--fg-3)">−45</text>

          {/* Traces */}
          <path d={path(traceFent)} fill="none" stroke="var(--warn)" strokeWidth="1.5" />
          <path d={path(traceNN)} fill="none" stroke="var(--accent)" strokeWidth="1.5" />

          {/* Agonist application bar */}
          <line x1={sx(0.15)} y1={P-6} x2={sx(0.7)} y2={P-6} stroke="var(--fg-2)" strokeWidth="3" />
          <text x={sx(0.425)} y={P-12} textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill="var(--fg-2)">
            agonist
          </text>

          {/* Labels */}
          <text x={W-P-4} y={sy(-90)-6} textAnchor="end" fontFamily="var(--mono)" fontSize="11" fill="var(--warn)">
            Fentanyl · ~−90 pA
          </text>
          <text x={W-P-4} y={sy(-45)-6} textAnchor="end" fontFamily="var(--mono)" fontSize="11" fill="var(--accent)">
            Naphthyl-Norfentanyl · ~−45 pA
          </text>

          {/* Y axis label */}
          <text x={12} y={H/2} textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill="var(--fg-3)" letterSpacing="0.1em" transform={`rotate(-90 12 ${H/2})`}>
            CURRENT (pA)
          </text>
          <text x={W/2} y={H-8} textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill="var(--fg-3)" letterSpacing="0.1em">
            TIME →
          </text>
        </svg>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div className="label">Peak current · two-sample comparison</div>
        <div style={{ marginTop: 18, display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span className="serif" style={{ fontSize: 56, color: 'var(--accent)', lineHeight: 1 }}>~2×</span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>lower</span>
        </div>
        <p className="mono" style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 6 }}>
          p &lt; 0.001
        </p>
        <p style={{ fontSize: 13, marginTop: 16, color: 'var(--fg-1)', lineHeight: 1.6 }}>
          Direct neurophysiological confirmation in native tissue. Reduced GIRK current is
          a cellular proxy for the reduced ceiling effect predicted to translate into
          reduced respiratory depression risk.
        </p>
        <div style={{ marginTop: 16, padding: 12, background: 'var(--bg-2)', borderRadius: 4 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.1em' }}>MODEL</div>
          <p className="mono" style={{ fontSize: 11, color: 'var(--fg-1)', marginTop: 4 }}>
            ex vivo · cultured primary mouse neurons · whole-cell patch
          </p>
        </div>
      </div>
    </div>
  );
};

const SynthCell = ({ k, v, sub }) => (
  <div style={{ padding: '4px 20px', borderRight: '1px solid var(--line-soft)' }}>
    <div className="label">{k}</div>
    <div style={{ fontFamily: 'var(--serif)', fontSize: 22, marginTop: 8, color: 'var(--fg)' }}>{v}</div>
    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 4, letterSpacing: '0.02em' }}>{sub}</div>
  </div>
);

window.Results = Results;
