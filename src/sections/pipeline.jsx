// Pipeline — four-module overview
const Pipeline = () => {
  const [step, setStep] = React.useState(0);
  const modules = [
    {
      n: '01',
      title: 'Chemoinformatics',
      sub: 'Extract design rules from data',
      detail: 'Mine ChEMBL → 21 RDKit descriptors → Mann-Whitney + RF + Morgan-fingerprint Fisher tests → ranked discriminating features.',
      out: 'Acidic→MOR, basic-N→NOP, lipophilic→NOP rule set',
    },
    {
      n: '02',
      title: 'Pocket Comparison',
      sub: 'Find structural reasons',
      detail: 'BLOSUM62 align → superpose 5C1M & 8F7X (Cα RMSD 2.44 Å) → BW number 37 residues → classify conserved/divergent.',
      out: 'Three selectivity hotspots: BW5.49, 7.55, 7.59',
    },
    {
      n: '03',
      title: 'Fragment Filter',
      sub: 'Curate R-group library',
      detail: 'ZINC22 fragments → physicochemical filter → pharmacophore (basic-N required, acid-control) → PAINS exclusion → Butina cluster (Tc 0.35).',
      out: '50 NOP-biased + 50 MOR-biased fragments',
    },
    {
      n: '04',
      title: 'Docking & MD',
      sub: 'Build, dock, refine, rank',
      detail: 'Norfentanyl scaffold + R-groups → ETKDG/MMFF94 conformers → GNINA dock to both receptors → MM/GBSA → 100 ns MD → ΔΔG ranking.',
      out: 'Lead compound with predicted dual activity',
    },
  ];

  return (
    <section id="pipeline" data-screen-label="06 Pipeline" style={{ padding: '120px 0', borderBottom: '1px solid var(--line-soft)', background: 'var(--bg-1)' }}>
      <div className="container">
        <div className="section-num">§ 05 — End-to-end pipeline</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 880 }}>
          Four modules, one feedback loop.
        </h2>
        <p className="body-lg" style={{ marginTop: 24, maxWidth: 760, color: 'var(--fg-1)' }}>
          Statistical rules from ligand data and structural rules from crystal pockets converge on the
          fragment filter, which feeds a structure-based docking & MD pipeline.
        </p>

        <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }} className="pipeline-grid">
          {modules.map((m, i) => (
            <button key={m.n} onClick={() => setStep(i)}
              style={{
                textAlign: 'left',
                padding: 24,
                border: '1px solid var(--line-soft)',
                borderLeft: i === 0 ? '1px solid var(--line-soft)' : 'none',
                background: step === i ? 'var(--bg-2)' : 'transparent',
                borderTop: step === i ? '2px solid var(--accent)' : '1px solid var(--line-soft)',
                paddingTop: step === i ? 23 : 24,
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}>
              <div className="mono" style={{ fontSize: 11, color: step === i ? 'var(--accent)' : 'var(--fg-3)', letterSpacing: '0.12em' }}>
                MODULE {m.n}
              </div>
              <div className="serif" style={{ fontSize: 22, marginTop: 10, color: step === i ? 'var(--fg)' : 'var(--fg-1)' }}>
                {m.title}
              </div>
              <div className="mono" style={{ fontSize: 11, marginTop: 6, color: 'var(--fg-2)' }}>
                {m.sub}
              </div>
            </button>
          ))}
        </div>

        <div style={{
          padding: 32,
          border: '1px solid var(--line-soft)',
          borderTop: 'none',
          background: 'var(--bg)',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 32,
        }} className="pipeline-detail">
          <div>
            <div className="label" style={{ color: 'var(--accent)' }}>Method</div>
            <p className="body" style={{ marginTop: 12, fontSize: 15 }}>{modules[step].detail}</p>
          </div>
          <div style={{ borderLeft: '1px solid var(--line-soft)', paddingLeft: 24 }}>
            <div className="label">Output</div>
            <p style={{ marginTop: 12, fontSize: 14, fontFamily: 'var(--mono)', color: 'var(--accent)' }}>
              → {modules[step].out}
            </p>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .pipeline-grid { grid-template-columns: 1fr 1fr !important; }
            .pipeline-detail { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

window.Pipeline = Pipeline;
