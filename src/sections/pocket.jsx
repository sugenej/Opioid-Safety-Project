// Pocket comparison — interactive residue-level structural comparison
const Pocket = () => {
  const [active, setActive] = React.useState('5.49');

  const hotspots = [
    {
      bw: '5.49', mor: 'R211', nop: 'E194',
      morProp: 'positive', nopProp: 'negative',
      consequence: 'Charge reversal of net +2. MOR attracts acidic groups (–COOH, phenolate); NOP repels them. The single biggest selectivity lever.',
      type: 'charge',
    },
    {
      bw: '7.55', mor: 'W318', nop: 'L301',
      morProp: 'aromatic', nopProp: 'aliphatic',
      consequence: 'MOR offers a tryptophan indole for π-stacking. NOP gives an unreactive leucine. Aromatic R-groups → MOR-selective.',
      type: 'pi',
    },
    {
      bw: '7.59', mor: 'I322', nop: 'T305',
      morProp: 'hydrophobic', nopProp: 'polar',
      consequence: 'MOR rewards greasy tails; NOP can H-bond. Tunes lipophilicity preference.',
      type: 'hbond',
    },
    {
      bw: '3.32', mor: 'D147', nop: 'D130',
      morProp: 'acidic', nopProp: 'acidic',
      consequence: '100% conserved. The protonated amine anchor — non-negotiable for affinity at either receptor.',
      type: 'conserved',
    },
  ];

  const data = hotspots.find(h => h.bw === active);

  return (
    <section id="pocket" data-screen-label="04 Pocket" style={{ padding: '120px 0', borderBottom: '1px solid var(--line-soft)', background: 'var(--bg-1)' }}>
      <div className="container">
        <div className="section-num">§ 03 — Structural pocket comparison</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 880 }}>
          The "message-address" hypothesis, made literal.
        </h2>
        <p className="body-lg" style={{ marginTop: 24, maxWidth: 760, color: 'var(--fg-1)' }}>
          Aligning active-state MOR (5C1M) against active-state NOP (8F7X) over 37 pocket residues
          gives a Cα RMSD of 2.44 Å. The TM3 "message" region is 100% conserved; the TM7/ECL2 "address"
          region is 54% divergent. Selectivity lives in three residues.
        </p>

        <div style={{
          marginTop: 56,
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 32,
          alignItems: 'start',
        }} className="pocket-grid">
          {/* SVG receptor schematic */}
          <div className="card" style={{ padding: 24, background: 'var(--bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div className="label">Pocket schematic · click hotspots</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>BW numbering</div>
            </div>
            <PocketSchematic active={active} setActive={setActive} hotspots={hotspots} />
          </div>

          {/* Hotspot detail */}
          <div>
            <div className="card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span className="chip" style={{ borderColor: 'var(--accent-line)', color: 'var(--accent)' }}>
                  BW {data.bw}
                </span>
                <span className="label">
                  {data.type === 'conserved' ? 'CONSERVED' : 'DIVERGENT'}
                </span>
              </div>
              <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, marginTop: 8 }}>
                {data.type === 'conserved' ? 'The shared anchor' :
                 data.type === 'charge' ? 'The charge reversal' :
                 data.type === 'pi' ? 'The π-stacking switch' :
                 'The polarity tune'}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, marginTop: 24, border: '1px solid var(--line-soft)', borderRadius: 6, overflow: 'hidden' }}>
                <ResiduePane tag="MOR" residue={data.mor} prop={data.morProp} color="var(--mor)" />
                <ResiduePane tag="NOP" residue={data.nop} prop={data.nopProp} color="var(--nop)" />
              </div>

              <p className="body" style={{ marginTop: 20, fontSize: 14 }}>
                {data.consequence}
              </p>
            </div>

            {/* Subpocket stats */}
            <div className="card" style={{ marginTop: 16, padding: 20 }}>
              <div className="label" style={{ marginBottom: 12 }}>Subpocket conservation</div>
              <SubpocketBars />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .pocket-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

const PocketSchematic = ({ active, setActive, hotspots }) => {
  // Schematic membrane with 7 TM helices, hotspots positioned
  const positions = {
    '3.32': { x: 200, y: 180, tm: 'TM3' },
    '5.49': { x: 280, y: 130, tm: 'TM5' },
    '7.55': { x: 320, y: 230, tm: 'TM7' },
    '7.59': { x: 350, y: 270, tm: 'TM7' },
  };

  return (
    <svg viewBox="0 0 480 380" style={{ width: '100%', height: 'auto' }}>
      {/* Membrane */}
      <rect x="0" y="80" width="480" height="240" fill="var(--bg-2)" opacity="0.3" />
      <line x1="0" y1="80" x2="480" y2="80" stroke="var(--line)" strokeDasharray="4 4" />
      <line x1="0" y1="320" x2="480" y2="320" stroke="var(--line)" strokeDasharray="4 4" />
      <text x="8" y="74" fontFamily="var(--mono)" fontSize="10" fill="var(--fg-3)" letterSpacing="0.1em">EXTRACELLULAR</text>
      <text x="8" y="338" fontFamily="var(--mono)" fontSize="10" fill="var(--fg-3)" letterSpacing="0.1em">INTRACELLULAR</text>

      {/* TM helices (cylinders) */}
      {[
        { x: 130, label: 'TM1' },
        { x: 170, label: 'TM2' },
        { x: 210, label: 'TM3', highlight: true },
        { x: 250, label: 'TM4' },
        { x: 290, label: 'TM5' },
        { x: 330, label: 'TM6' },
        { x: 370, label: 'TM7' },
      ].map(tm => (
        <g key={tm.label}>
          <rect x={tm.x - 14} y="100" width="28" height="200"
                fill={tm.highlight ? 'oklch(0.78 0.13 140 / 0.15)' : 'var(--bg-3)'}
                stroke={tm.highlight ? 'var(--dual)' : 'var(--line)'}
                rx="14" />
          <text x={tm.x} y="350" textAnchor="middle" fontFamily="var(--mono)" fontSize="10"
                fill={tm.highlight ? 'var(--dual)' : 'var(--fg-3)'}>
            {tm.label}
          </text>
        </g>
      ))}

      {/* ECL2 loop (NOP electrostatic cluster) */}
      <path d="M 290 100 Q 310 60, 350 70 Q 380 75, 370 100" fill="none" stroke="var(--line)" strokeWidth="1.5" />
      <text x="345" y="58" fontFamily="var(--mono)" fontSize="9" fill="var(--fg-3)" textAnchor="middle">
        ECL2 (E194/E197/E199 in NOP)
      </text>

      {/* Hotspots */}
      {hotspots.map(h => {
        const pos = positions[h.bw];
        if (!pos) return null;
        const isActive = h.bw === active;
        const color = h.type === 'conserved' ? 'var(--dual)' :
                      h.type === 'charge' ? 'var(--warn)' :
                      h.type === 'pi' ? 'var(--accent)' :
                      'var(--fg-2)';
        return (
          <g key={h.bw} onClick={() => setActive(h.bw)} style={{ cursor: 'pointer' }}>
            {isActive && (
              <circle cx={pos.x} cy={pos.y} r="22" fill={color} opacity="0.15">
                <animate attributeName="r" values="18;26;18" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={pos.x} cy={pos.y} r="10"
                    fill={isActive ? color : 'var(--bg-3)'}
                    stroke={color} strokeWidth="2" />
            <text x={pos.x} y={pos.y - 18} textAnchor="middle" fontFamily="var(--mono)" fontSize="10"
                  fill={isActive ? color : 'var(--fg-2)'} fontWeight="500">
              BW {h.bw}
            </text>
            <text x={pos.x + 18} y={pos.y + 4} fontFamily="var(--mono)" fontSize="10" fill="var(--fg-2)">
              {h.mor}/{h.nop}
            </text>
          </g>
        );
      })}

      {/* Ligand placeholder */}
      <g opacity="0.6">
        <text x="240" y="200" fontFamily="var(--mono)" fontSize="9" fill="var(--fg-3)" textAnchor="middle">
          ◊ ligand pocket
        </text>
      </g>
    </svg>
  );
};

const ResiduePane = ({ tag, residue, prop, color }) => (
  <div style={{ padding: 20, borderRight: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
    <div className="mono" style={{ fontSize: 11, color, letterSpacing: '0.12em' }}>{tag}</div>
    <div style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--fg)', marginTop: 6, fontWeight: 500 }}>
      {residue}
    </div>
    <div className="mono" style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 4 }}>{prop}</div>
  </div>
);

const SubpocketBars = () => {
  const data = [
    { name: 'TM3 (message)', conserved: 100, divergent: 0 },
    { name: 'TM5', conserved: 60, divergent: 40 },
    { name: 'TM6', conserved: 75, divergent: 25 },
    { name: 'TM7 / ECL2 (address)', conserved: 46, divergent: 54 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {data.map(d => (
        <div key={d.name}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-1)' }}>{d.name}</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
              {d.conserved}% / {d.divergent}%
            </span>
          </div>
          <div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', background: 'var(--bg-3)' }}>
            <div style={{ width: `${d.conserved}%`, background: 'var(--dual)' }} />
            <div style={{ width: `${d.divergent}%`, background: 'var(--warn)' }} />
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 14, marginTop: 4, fontSize: 10, color: 'var(--fg-3)' }}>
        <span><span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--dual)', marginRight: 4 }} />conserved</span>
        <span><span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--warn)', marginRight: 4 }} />divergent</span>
      </div>
    </div>
  );
};

window.Pocket = Pocket;
