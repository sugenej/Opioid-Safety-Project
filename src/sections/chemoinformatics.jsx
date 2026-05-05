// Chemoinformatics — descriptor comparison + RF model
const Chemoinformatics = () => {
  const [feature, setFeature] = React.useState('AcidicGroups');

  const features = {
    AcidicGroups:   { d: 1.04, mor: 1.4, nop: 0.05, dir: 'MOR', unit: 'count', desc: '# of –COOH, phenol, sulfonamide groups' },
    HBD:            { d: 0.73, mor: 2.1, nop: 0.9,  dir: 'MOR', unit: 'count', desc: 'H-bond donors' },
    TPSA:           { d: 0.60, mor: 78,  nop: 48,   dir: 'MOR', unit: 'Å²',    desc: 'topological polar surface area' },
    LogP:           { d: 0.54, mor: 2.7, nop: 4.1,  dir: 'NOP', unit: '',      desc: 'octanol-water partition' },
    BasicNitrogens: { d: 1.80, mor: 1.0, nop: 1.9,  dir: 'NOP', unit: 'count', desc: 'protonatable N (anchors D3.32)' },
    AromaticRings:  { d: 0.42, mor: 2.9, nop: 2.1,  dir: 'MOR', unit: 'count', desc: 'aromatic ring count' },
  };

  const fdata = features[feature];

  return (
    <section id="chemoinformatics" data-screen-label="05 Chemoinformatics" style={{ padding: '120px 0', borderBottom: '1px solid var(--line-soft)' }}>
      <div className="container">
        <div className="section-num">§ 04 — Chemoinformatics & ML</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 880 }}>
          1,549 ligands, 21 descriptors, one classifier.
        </h2>
        <p className="body-lg" style={{ marginTop: 24, maxWidth: 760, color: 'var(--fg-1)' }}>
          ChEMBL data was filtered to high-confidence binding assays, converted to pKi, and split into
          MOR-selective (n=669), NOP-selective (n=691), and dual (n=77). RDKit computed 21 physicochemical
          descriptors per compound; a random forest then ranked which features actually decide selectivity.
        </p>

        {/* Pipeline funnel */}
        <div style={{ marginTop: 56 }}>
          <div className="label" style={{ marginBottom: 16 }}>Filter funnel</div>
          <FunnelStrip />
        </div>

        {/* Two-pane: descriptor selector + classifier */}
        <div style={{
          marginTop: 64,
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: 32,
        }} className="chemo-grid">
          {/* Descriptor distributions */}
          <div className="card" style={{ padding: 28 }}>
            <div className="label">Descriptor discrimination · Mann-Whitney U, Bonferroni-corrected</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
              {Object.keys(features).map(k => (
                <button key={k} onClick={() => setFeature(k)}
                  style={{
                    padding: '6px 10px',
                    border: '1px solid',
                    borderColor: feature === k ? 'var(--accent)' : 'var(--line)',
                    color: feature === k ? 'var(--accent)' : 'var(--fg-2)',
                    background: feature === k ? 'var(--accent-soft)' : 'transparent',
                    fontFamily: 'var(--mono)', fontSize: 11,
                    borderRadius: 4,
                  }}>
                  {k}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <DistributionCompare fdata={fdata} />
            </div>

            <div style={{ marginTop: 20, padding: 16, background: 'var(--bg-2)', borderRadius: 6, fontSize: 13 }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.08em' }}>
                COHEN'S d = {fdata.d.toFixed(2)} · {fdata.dir}-leaning
              </span>
              <p style={{ marginTop: 6, color: 'var(--fg-1)' }}>{fdata.desc}</p>
            </div>
          </div>

          {/* RF panel */}
          <div className="card" style={{ padding: 28 }}>
            <div className="label">Random Forest classifier</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 12 }}>
              <span className="serif" style={{ fontSize: 56, color: 'var(--accent)', lineHeight: 1 }}>93%</span>
              <span className="mono" style={{ fontSize: 12, color: 'var(--fg-2)' }}>± 9%</span>
            </div>
            <p className="body" style={{ fontSize: 13, marginTop: 8 }}>
              5-fold CV accuracy on the dual-vs-selective task.
            </p>

            <div className="label" style={{ marginTop: 28 }}>Top feature importances</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
              {[
                { k: 'BertzCT',       v: 0.18 },
                { k: 'AromaticRings', v: 0.15 },
                { k: 'TPSA',          v: 0.13 },
                { k: 'BasicNitrogens',v: 0.11 },
                { k: 'AcidicGroups',  v: 0.10 },
                { k: 'LogP',          v: 0.09 },
              ].map(f => (
                <div key={f.k}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--fg-1)' }}>{f.k}</span>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{f.v.toFixed(2)}</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--bg-3)', marginTop: 4, borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${f.v * 400}%`, height: '100%', background: 'var(--accent)' }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, padding: 12, background: 'var(--warn-soft)', border: '1px solid oklch(0.75 0.12 70 / 0.25)', borderRadius: 4 }}>
              <span className="mono" style={{ fontSize: 10, color: 'var(--warn)', letterSpacing: '0.08em' }}>
                CAVEAT
              </span>
              <p style={{ fontSize: 12, color: 'var(--fg-1)', marginTop: 4, lineHeight: 1.5 }}>
                Dual-agonist set is small (n=77 → 43 after deduplication); accuracy likely overstates
                generalization. Treated as hypothesis generator, not prediction tool.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .chemo-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

const FunnelStrip = () => {
  const stages = [
    { n: '~38k',   label: 'ChEMBL raw assays' },
    { n: '12,440', label: 'Binding assays, conf ≥ 8' },
    { n: '4,210',  label: 'Ki/IC50, 0.01–100k nM' },
    { n: '1,549',  label: 'Unique non-peptide ligands' },
    { n: '1,437',  label: 'Selective (MOR ∪ NOP)' },
    { n: '77',     label: 'Dual agonists' },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, flexWrap: 'wrap' }}>
      {stages.map((s, i) => (
        <React.Fragment key={s.n}>
          <div style={{
            flex: 1, minWidth: 140,
            padding: 18,
            border: '1px solid var(--line-soft)',
            borderRight: 'none',
            background: i === stages.length - 1 ? 'var(--accent-soft)' : 'var(--bg-1)',
            position: 'relative',
          }}>
            <div className="serif" style={{
              fontSize: 26,
              color: i === stages.length - 1 ? 'var(--accent)' : 'var(--fg)',
            }}>
              {s.n}
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-2)', marginTop: 6, letterSpacing: '0.04em' }}>
              {s.label}
            </div>
          </div>
        </React.Fragment>
      ))}
      <div style={{ borderRight: '1px solid var(--line-soft)' }} />
    </div>
  );
};

const DistributionCompare = ({ fdata }) => {
  // Generate a smooth distribution using normals around the means
  const W = 520, H = 200, P = 30;
  const range = [
    Math.min(fdata.mor, fdata.nop) * 0.4,
    Math.max(fdata.mor, fdata.nop) * 1.8 + 1,
  ];
  const xs = Array.from({ length: 80 }, (_, i) => range[0] + (i / 79) * (range[1] - range[0]));
  const sigma = (range[1] - range[0]) / 6;
  const normal = (x, mu, s) => Math.exp(-((x - mu) ** 2) / (2 * s * s));

  const morVals = xs.map(x => normal(x, fdata.mor, sigma));
  const nopVals = xs.map(x => normal(x, fdata.nop, sigma));
  const ymax = Math.max(...morVals, ...nopVals);

  const sx = x => P + ((x - range[0]) / (range[1] - range[0])) * (W - P * 2);
  const sy = y => H - P - (y / ymax) * (H - P * 2);

  const path = arr => `M ${sx(xs[0])} ${H-P} ` +
    arr.map((v, i) => `L ${sx(xs[i]).toFixed(1)} ${sy(v).toFixed(1)}`).join(' ') +
    ` L ${sx(xs[xs.length-1])} ${H-P} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
      <line x1={P} y1={H-P} x2={W-P} y2={H-P} stroke="var(--line)" />
      {/* MOR */}
      <path d={path(morVals)} fill="var(--mor)" opacity="0.18" />
      <path d={path(morVals).replace(/Z$/, '')} fill="none" stroke="var(--mor)" strokeWidth="1.5" />
      {/* NOP */}
      <path d={path(nopVals)} fill="var(--nop)" opacity="0.18" />
      <path d={path(nopVals).replace(/Z$/, '')} fill="none" stroke="var(--nop)" strokeWidth="1.5" />

      {/* Mean lines */}
      <line x1={sx(fdata.mor)} y1={P} x2={sx(fdata.mor)} y2={H-P} stroke="var(--mor)" strokeDasharray="3 3" opacity="0.6" />
      <line x1={sx(fdata.nop)} y1={P} x2={sx(fdata.nop)} y2={H-P} stroke="var(--nop)" strokeDasharray="3 3" opacity="0.6" />

      <text x={sx(fdata.mor)} y={P-6} textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill="var(--mor)">
        MOR · μ={fdata.mor}{fdata.unit && ` ${fdata.unit}`}
      </text>
      <text x={sx(fdata.nop)} y={H-P+18} textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill="var(--nop)">
        NOP · μ={fdata.nop}{fdata.unit && ` ${fdata.unit}`}
      </text>
    </svg>
  );
};

window.Chemoinformatics = Chemoinformatics;
