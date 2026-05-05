// Biology — explain MOR/NOP dual-binding logic
const Biology = () => {
  const [hover, setHover] = React.useState(null);

  return (
    <section id="biology" data-screen-label="03 Biology" style={{ padding: '120px 0', borderBottom: '1px solid var(--line-soft)' }}>
      <div className="container">
        <div className="section-num">§ 02 — Receptor logic</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 880 }}>
          Why bind two receptors? The MOR/NOP rationale.
        </h2>
        <p className="body-lg" style={{ marginTop: 24, maxWidth: 760, color: 'var(--fg-1)' }}>
          Both MOR and NOP are class-A GPCRs in the opioid family, but they signal in
          opposing directions on the brainstem circuits that control breathing.
          A compound that activates both can preserve analgesia while imposing a NOP-mediated ceiling
          on respiratory depression.
        </p>

        {/* Receptor cards */}
        <div style={{
          marginTop: 56,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }} className="bio-grid">
          <ReceptorCard
            color="var(--mor)"
            tag="MOR"
            chemblId="CHEMBL233"
            pdb="5C1M"
            name="μ-opioid receptor"
            role="The analgesia engine — and the killer."
            agonists={['Morphine', 'Fentanyl', 'Oxycodone', 'DAMGO']}
            signaling="Gαi/o → ↓ cAMP → ↓ pain"
            risk="Respiratory depression scales with dose"
            n={669}
            onHover={setHover}
          />
          <ReceptorCard
            color="var(--nop)"
            tag="NOP"
            chemblId="CHEMBL2014"
            pdb="8F7X"
            name="nociceptin/orphanin FQ receptor"
            role="The modulator — caps the system."
            agonists={['N/OFQ', 'SCH-221510', 'AT-403', 'Cebranopadol']}
            signaling="Gαi/o → context-dependent"
            risk="Anti-reward, anxiolytic, ceiling effect"
            n={691}
            onHover={setHover}
          />
        </div>

        {/* Coupling diagram */}
        <div style={{ marginTop: 80 }}>
          <div className="label" style={{ marginBottom: 16 }}>Mechanism · why dual agonism breaks the curve</div>
          <div className="card" style={{ padding: 32 }}>
            <CouplingDiagram />
          </div>
        </div>

        <style>{`
          @media (max-width: 800px) {
            .bio-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

const ReceptorCard = ({ color, tag, chemblId, pdb, name, role, agonists, signaling, risk, n, onHover }) => (
  <div
    onMouseEnter={() => onHover && onHover(tag)}
    onMouseLeave={() => onHover && onHover(null)}
    style={{
      padding: 28,
      border: '1px solid var(--line-soft)',
      borderTop: `2px solid ${color}`,
      background: 'var(--bg-1)',
      borderRadius: 8,
      transition: 'transform 0.2s, border-color 0.2s',
      position: 'relative',
    }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em',
        color, padding: '4px 8px', border: `1px solid ${color}`, borderRadius: 4,
        display: 'inline-block',
      }}>
        {tag}
      </div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
        {chemblId} · PDB {pdb}
      </div>
    </div>

    <h3 className="serif" style={{ fontSize: 28, marginTop: 16, fontWeight: 400, letterSpacing: '-0.01em' }}>
      {name}
    </h3>
    <p style={{ color: 'var(--fg-2)', marginTop: 8, fontSize: 14 }}>{role}</p>

    <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Row k="Signaling" v={signaling} />
      <Row k="Behavioral effect" v={risk} />
      <Row k="ChEMBL ligands" v={`${n} curated`} mono />
    </div>

    <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line-soft)' }}>
      <div className="label">Reference agonists</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
        {agonists.map(a => (
          <span key={a} className="mono" style={{
            fontSize: 11, padding: '4px 8px',
            background: 'var(--bg-2)', borderRadius: 4,
            color: 'var(--fg-1)',
          }}>{a}</span>
        ))}
      </div>
    </div>
  </div>
);

const Row = ({ k, v, mono }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12, fontSize: 13 }}>
    <span className="label" style={{ alignSelf: 'center' }}>{k}</span>
    <span style={{ fontFamily: mono ? 'var(--mono)' : 'inherit', color: 'var(--fg-1)' }}>{v}</span>
  </div>
);

const CouplingDiagram = () => {
  const [scenario, setScenario] = React.useState('dual');
  // dose at x; respiratory & analgesia curves
  const xs = Array.from({ length: 60 }, (_, i) => i / 59);
  const sigmoid = (x, k = 8, x0 = 0.5) => 1 / (1 + Math.exp(-k * (x - x0)));
  const cap = (x, c = 0.45) => Math.min(c, sigmoid(x, 9, 0.4));

  const config = {
    fentanyl: {
      analgesia: x => sigmoid(x, 14, 0.25),
      respDep: x => sigmoid(x, 14, 0.32),
      caption: 'Fentanyl — analgesia and respiratory depression rise together. No ceiling.',
    },
    mor_partial: {
      analgesia: x => sigmoid(x, 9, 0.4) * 0.85,
      respDep: x => sigmoid(x, 9, 0.45) * 0.7,
      caption: 'MOR partial agonist — reduced peak, but coupling persists.',
    },
    dual: {
      analgesia: x => sigmoid(x, 9, 0.35) * 0.9,
      respDep: x => cap(x, 0.32),
      caption: 'MOR/NOP dual agonist — NOP signaling caps respiratory depression while analgesia continues to rise.',
    },
  };

  const cfg = config[scenario];
  const W = 600, H = 260, P = 36;
  const sx = x => P + x * (W - P * 2);
  const sy = y => H - P - y * (H - P * 2);
  const path = fn => xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${sx(x).toFixed(1)} ${sy(fn(x)).toFixed(1)}`).join(' ');

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[
          { k: 'fentanyl', label: 'Fentanyl' },
          { k: 'mor_partial', label: 'MOR partial' },
          { k: 'dual', label: 'MOR/NOP dual', highlight: true },
        ].map(opt => (
          <button key={opt.k} onClick={() => setScenario(opt.k)}
            style={{
              padding: '8px 14px',
              border: '1px solid',
              borderColor: scenario === opt.k ? (opt.highlight ? 'var(--accent)' : 'var(--fg-2)') : 'var(--line)',
              color: scenario === opt.k ? (opt.highlight ? 'var(--accent)' : 'var(--fg)') : 'var(--fg-2)',
              background: scenario === opt.k && opt.highlight ? 'var(--accent-soft)' : 'transparent',
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
              borderRadius: 4,
              transition: 'all 0.15s',
            }}>
            {opt.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32, alignItems: 'center' }}
           className="coupling-grid">
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          {/* Axes */}
          <line x1={P} y1={H-P} x2={W-P} y2={H-P} stroke="var(--line)" />
          <line x1={P} y1={P} x2={P} y2={H-P} stroke="var(--line)" />
          {/* Grid */}
          {[0.25, 0.5, 0.75].map(t => (
            <line key={t} x1={P} x2={W-P} y1={sy(t)} y2={sy(t)} stroke="var(--line-soft)" strokeDasharray="2 4" />
          ))}
          {/* Curves */}
          <path d={path(cfg.respDep)} fill="none" stroke="var(--warn)" strokeWidth="2" />
          <path d={path(cfg.analgesia)} fill="none" stroke="var(--accent)" strokeWidth="2" />

          {/* Labels */}
          <text x={W-P} y={sy(cfg.analgesia(1)) - 8} textAnchor="end" fontFamily="var(--mono)" fontSize="11" fill="var(--accent)">
            analgesia
          </text>
          <text x={W-P} y={sy(cfg.respDep(1)) + 16} textAnchor="end" fontFamily="var(--mono)" fontSize="11" fill="var(--warn)">
            respiratory depression
          </text>

          {/* Axis labels */}
          <text x={W/2} y={H-8} textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill="var(--fg-3)" letterSpacing="0.1em">
            DOSE →
          </text>
          <text x={12} y={H/2} textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill="var(--fg-3)" letterSpacing="0.1em" transform={`rotate(-90 12 ${H/2})`}>
            EFFECT →
          </text>

          {scenario === 'dual' && (
            <g>
              <line x1={P} x2={W-P} y1={sy(0.32)} y2={sy(0.32)} stroke="var(--warn)" strokeDasharray="3 3" opacity="0.5" />
              <text x={W-P-4} y={sy(0.32) - 4} textAnchor="end" fontFamily="var(--mono)" fontSize="10" fill="var(--warn)" opacity="0.8">
                NOP ceiling
              </text>
            </g>
          )}
        </svg>

        <div style={{ borderLeft: '1px solid var(--line-soft)', paddingLeft: 24 }}>
          <p className="body" style={{ fontSize: 14 }}>{cfg.caption}</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .coupling-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

window.Biology = Biology;
