// Hero section — establishes the project as a serious research artifact
const Hero = () => {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  return (
    <section data-screen-label="01 Hero" style={{
      position: 'relative',
      paddingTop: 140,
      paddingBottom: 120,
      borderBottom: '1px solid var(--line-soft)',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 80% 20%, oklch(0.78 0.12 200 / 0.06), transparent 50%), radial-gradient(circle at 20% 80%, oklch(0.78 0.13 30 / 0.04), transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, oklch(0.32 0.012 250) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.4,
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <div className="chip"><span className="dot pulse" />Active Research · 2025–2026</div>
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.1em' }}>
            CHEMBL233 · CHEMBL2014 · PDB 5C1M / 8F7X
          </span>
        </div>

        <h1 className="h-display" style={{ maxWidth: 980 }}>
          Engineering selectivity between <em style={{ color: 'var(--mor)', fontStyle: 'normal' }}>μ-opioid</em> and{' '}
          <em style={{ color: 'var(--nop)', fontStyle: 'normal' }}>nociceptin</em> receptors —{' '}
          <span style={{ color: 'var(--fg-2)' }}>a computational route to safer analgesics.</span>
        </h1>

        <p className="body-lg" style={{ maxWidth: 720, marginTop: 32, color: 'var(--fg-1)' }}>
          Fentanyl kills because it binds μ-opioid receptors with overwhelming efficacy and no off-switch.
          This project mines 1,549 known opioid ligands, dissects two crystal pockets residue-by-residue,
          and uses a random forest to design a piperidine-based dual MOR/NOP agonist intended to break the
          analgesia-from-respiratory-depression coupling.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 40 }}>
          <a href="#lead" className="chip" style={{ borderColor: 'var(--accent-line)', color: 'var(--accent)', padding: '10px 16px', fontSize: 12 }}>
            → View lead compound
          </a>
          <a href="#materials" className="chip" style={{ padding: '10px 16px', fontSize: 12 }}>
            → Paper, poster, supplementary
          </a>
          <a href="#pipeline" className="chip" style={{ padding: '10px 16px', fontSize: 12 }}>
            → Method overview
          </a>
        </div>

        {/* Stat strip */}
        <div style={{
          marginTop: 80,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 0,
          borderTop: '1px solid var(--line-soft)',
          borderBottom: '1px solid var(--line-soft)',
        }}>
          <Stat n="1,549" label="ChEMBL ligands curated" />
          <Stat n="37" label="aligned pocket residues" />
          <Stat n="93%" label="RF classifier accuracy" />
          <Stat n="100" label="curated R-groups" />
          <Stat n="1" label="lead compound" highlight />
        </div>
      </div>
    </section>
  );
};

const Stat = ({ n, label, highlight }) => (
  <div style={{
    padding: '24px 20px',
    borderRight: '1px solid var(--line-soft)',
    background: highlight ? 'var(--accent-soft)' : 'transparent',
  }}>
    <div className="marquee-stat" style={{ fontSize: 36, color: highlight ? 'var(--accent)' : 'var(--fg)', lineHeight: 1 }}>
      {n}
    </div>
    <div className="label" style={{ marginTop: 10 }}>{label}</div>
  </div>
);

window.Hero = Hero;
