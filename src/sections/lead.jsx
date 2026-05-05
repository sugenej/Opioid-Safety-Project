// Lead compound — the centerpiece. Hand-rolled 2D structure with hoverable functional groups.
const Lead = () => {
  const [highlight, setHighlight] = React.useState(null);

  const groups = [
    { id: 'amide',    label: 'Propanamide', desc: 'Acyl tail. Provides hydrophobic packing in the deep MOR/NOP subpocket; standard fentanyl pharmacophore.' },
    { id: 'aniline',  label: 'N-phenyl', desc: 'Aniline ring. π-stacks with W318 (MOR BW7.55) — the aromatic-selectivity switch.' },
    { id: 'piperidine', label: 'Piperidine N', desc: 'Protonatable basic nitrogen. Forms the salt bridge with conserved D3.32 (D147 in MOR / D130 in NOP) — non-negotiable anchor.' },
    { id: 'indole',   label: 'Indolylmethyl', desc: 'Bulky aromatic head. Reaches the address region; engages NOP via shape complementarity without acidic groups that would clash with E194.' },
  ];

  return (
    <section id="lead" data-screen-label="07 Lead" style={{
      padding: '120px 0',
      borderBottom: '1px solid var(--line-soft)',
      background: 'var(--bg)',
      position: 'relative',
    }}>
      <div className="container">
        <div className="section-num">§ 06 — Lead compound</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 980 }}>
          The output: a piperidine-anchored dual MOR/NOP candidate.
        </h2>
        <p className="body-lg" style={{ marginTop: 24, maxWidth: 760, color: 'var(--fg-1)' }}>
          The pipeline converged on a single norfentanyl-scaffold lead. It satisfies the dual-agonist
          chemotype rules from Module 1 and presents pharmacophoric features that engage the conserved
          and divergent residues identified in Module 2.
        </p>

        <div style={{
          marginTop: 56,
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 32,
          alignItems: 'start',
        }} className="lead-grid">
          {/* Structure card */}
          <div className="card" style={{ padding: 32, background: 'var(--bg-1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <div className="label">2D structure · hover groups</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>generated · validated</div>
            </div>
            <div style={{ marginTop: 16, padding: 20, background: 'var(--bg)', borderRadius: 6, border: '1px solid var(--line-soft)' }}>
              <Structure highlight={highlight} setHighlight={setHighlight} />
            </div>

            {/* SMILES + IUPAC */}
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <CopyRow label="SMILES" value="CCC(=O)N(c1ccccc1)C1CCN(Cc2c[nH]c3ccccc23)CC1" />
              <CopyRow label="IUPAC" value="N-[1-(1H-indol-3-ylmethyl)piperidin-4-yl]-N-phenylpropanamide" />
              <CopyRow label="Scaffold" value="norfentanyl (4-anilidopiperidine)" />
            </div>
          </div>

          {/* Functional group panel */}
          <div>
            <div className="card" style={{ padding: 24 }}>
              <div className="label">Functional group map</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 14 }}>
                {groups.map(g => (
                  <button key={g.id}
                    onMouseEnter={() => setHighlight(g.id)}
                    onMouseLeave={() => setHighlight(null)}
                    style={{
                      textAlign: 'left',
                      padding: '14px 0',
                      borderTop: '1px solid var(--line-soft)',
                      background: highlight === g.id ? 'var(--accent-soft)' : 'transparent',
                      paddingLeft: highlight === g.id ? 12 : 0,
                      transition: 'all 0.15s',
                      cursor: 'pointer',
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: highlight === g.id ? 'var(--accent)' : 'var(--fg-3)',
                      }} />
                      <span className="mono" style={{ fontSize: 12, color: 'var(--fg)' }}>{g.label}</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 6, lineHeight: 1.5, paddingLeft: 16 }}>
                      {g.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Predicted descriptors */}
            <div className="card" style={{ marginTop: 16, padding: 24 }}>
              <div className="label">Predicted descriptors</div>
              <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
                <Desc k="MW" v="361.5" unit="g/mol" />
                <Desc k="LogP" v="3.8" unit="" />
                <Desc k="TPSA" v="36.0" unit="Å²" />
                <Desc k="HBD" v="1" unit="" />
                <Desc k="HBA" v="3" unit="" />
                <Desc k="RotB" v="5" unit="" />
                <Desc k="AromRings" v="3" unit="" />
                <Desc k="BasicN" v="1" unit="" />
                <Desc k="AcidicGroups" v="0" unit="" />
                <Desc k="Fsp³" v="0.35" unit="" />
              </div>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line-soft)' }}>
                <div className="label">Predicted binding</div>
                <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                  <Affinity tag="MOR" v="−9.4" unit="kcal/mol" color="var(--mor)" />
                  <Affinity tag="NOP" v="−9.0" unit="kcal/mol" color="var(--nop)" />
                  <Affinity tag="ΔΔG" v="−0.4" unit="dual" color="var(--dual)" />
                </div>
                <p className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 10 }}>
                  GNINA + MM/GBSA · pre-MD · in silico only
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rule check */}
        <div style={{ marginTop: 48 }}>
          <div className="label" style={{ marginBottom: 16 }}>Rule satisfaction · Module 1 dual-agonist chemotype</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0 }}>
            <RuleCard rule="Piperidine present" status="pass" detail="Required for D3.32 anchor; 96% of dual agonists have it." />
            <RuleCard rule="No morphinan scaffold" status="pass" detail="0% of dual agonists are morphinans." />
            <RuleCard rule="Moderate LogP (2–5)" status="pass" detail="Predicted 3.8 — sits in dual sweet spot." />
            <RuleCard rule="Minimal acidic groups" status="pass" detail="0 — avoids NOP ECL2 repulsion." />
            <RuleCard rule="Aromatic for W318" status="pass" detail="Aniline + indole — π-stacking available." />
          </div>
        </div>

        <style>{`
          @media (max-width: 1000px) {
            .lead-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

const Structure = ({ highlight, setHighlight }) => {
  // Coordinate system: hand-laid 2D skeletal of N-[1-(1H-indol-3-ylmethyl)piperidin-4-yl]-N-phenylpropanamide
  // We'll draw with bonds + atom labels for heteroatoms only (carbons implicit)
  const W = 620, H = 420;
  const c = (x, y) => ({ x, y });

  // Atom positions
  const atoms = {
    // Propanamide tail (left)
    Me: c(40, 230),
    CH2a: c(80, 250),
    Cq: c(120, 230),
    O: c(120, 185),
    // Amide N
    Nam: c(160, 250),
    // N-phenyl ring
    Pa: c(200, 230),
    Pb: c(240, 250),
    Pc: c(280, 230),
    Pd: c(280, 185),
    Pe: c(240, 165),
    Pf: c(200, 185),
    // Piperidine (4-position attaches to Nam)
    P1: c(160, 295), // C4
    P2: c(120, 315),
    P3: c(120, 360),
    Np: c(160, 380), // ring N
    P5: c(200, 360),
    P6: c(200, 315),
    // CH2 linker
    Lin: c(200, 425),
    // Indole 5-ring
    I3: c(245, 405),
    I2: c(290, 425),
    Ni: c(320, 390),
    I7a: c(290, 355),
    I3a: c(245, 360),
    // Indole 6-ring
    I4: c(205, 335),
    I5: c(205, 290),
    I6: c(245, 270),
    I7: c(290, 290),
  };

  // Bond list: [from, to, order, group]
  const bonds = [
    // propanamide
    ['Me', 'CH2a', 1, 'amide'],
    ['CH2a', 'Cq', 1, 'amide'],
    ['Cq', 'O', 2, 'amide'],
    ['Cq', 'Nam', 1, 'amide'],
    // N-phenyl ring (alternating double bonds)
    ['Nam', 'Pa', 1, 'aniline'],
    ['Pa', 'Pb', 2, 'aniline'],
    ['Pb', 'Pc', 1, 'aniline'],
    ['Pc', 'Pd', 2, 'aniline'],
    ['Pd', 'Pe', 1, 'aniline'],
    ['Pe', 'Pf', 2, 'aniline'],
    ['Pf', 'Pa', 1, 'aniline'],
    // Piperidine
    ['Nam', 'P1', 1, 'piperidine'],
    ['P1', 'P2', 1, 'piperidine'],
    ['P2', 'P3', 1, 'piperidine'],
    ['P3', 'Np', 1, 'piperidine'],
    ['Np', 'P5', 1, 'piperidine'],
    ['P5', 'P6', 1, 'piperidine'],
    ['P6', 'P1', 1, 'piperidine'],
    // CH2 linker
    ['Np', 'Lin', 1, 'indole'],
    // Indole 5-ring
    ['Lin', 'I3', 1, 'indole'],
    ['I3', 'I2', 2, 'indole'],
    ['I2', 'Ni', 1, 'indole'],
    ['Ni', 'I7a', 1, 'indole'],
    ['I7a', 'I3a', 2, 'indole'],
    ['I3a', 'I3', 1, 'indole'],
    // Indole 6-ring
    ['I3a', 'I4', 1, 'indole'],
    ['I4', 'I5', 2, 'indole'],
    ['I5', 'I6', 1, 'indole'],
    ['I6', 'I7', 2, 'indole'],
    ['I7', 'I7a', 1, 'indole'],
  ];

  const labels = {
    Me: 'CH₃', O: 'O', Nam: 'N', Np: 'N', Ni: 'NH',
  };

  const groupColor = {
    amide: 'var(--warn)',
    aniline: 'var(--accent)',
    piperidine: 'var(--dual)',
    indole: 'var(--mor)',
  };

  const drawBond = ([a, b, order, group], i) => {
    const p1 = atoms[a], p2 = atoms[b];
    const isHi = highlight === group;
    const stroke = isHi ? groupColor[group] : 'var(--fg-1)';
    const sw = isHi ? 2 : 1.4;
    if (order === 1) {
      return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />;
    }
    // Double bond — offset second line
    const dx = p2.x - p1.x, dy = p2.y - p1.y;
    const len = Math.sqrt(dx*dx + dy*dy);
    const nx = -dy/len * 3, ny = dx/len * 3;
    // Shrink the second line for aesthetic
    const t = 0.18;
    return (
      <g key={i}>
        <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line
          x1={p1.x + dx*t + nx} y1={p1.y + dy*t + ny}
          x2={p2.x - dx*t + nx} y2={p2.y - dy*t + ny}
          stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </g>
    );
  };

  // Group hit areas (rough convex hulls / bbox per group)
  const groupAreas = {
    amide: { x: 20, y: 175, w: 150, h: 90 },
    aniline: { x: 180, y: 155, w: 120, h: 110 },
    piperidine: { x: 100, y: 285, w: 120, h: 110 },
    indole: { x: 175, y: 260, w: 170, h: 180 },
  };

  return (
    <svg viewBox="0 140 360 320" style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 540, margin: '0 auto' }}>
      {/* Highlight regions */}
      {Object.entries(groupAreas).map(([g, area]) => (
        <rect
          key={g}
          x={area.x} y={area.y} width={area.w} height={area.h}
          rx={12}
          fill={highlight === g ? `${groupColor[g]}` : 'transparent'}
          opacity={highlight === g ? 0.08 : 0}
          stroke={highlight === g ? groupColor[g] : 'transparent'}
          strokeOpacity="0.3"
          style={{ transition: 'all 0.2s' }}
          onMouseEnter={() => setHighlight(g)}
          onMouseLeave={() => setHighlight(null)}
        />
      ))}

      {/* Bonds */}
      {bonds.map(drawBond)}

      {/* Heteroatom labels with white halos */}
      {Object.entries(labels).map(([k, l]) => {
        const a = atoms[k];
        const grp = bonds.find(b => b[0] === k || b[1] === k)?.[3];
        const isHi = grp && highlight === grp;
        const color = isHi ? groupColor[grp] : (l.startsWith('N') ? 'oklch(0.78 0.12 240)' : l === 'O' ? 'oklch(0.75 0.15 30)' : 'var(--fg)');
        return (
          <g key={k}>
            <circle cx={a.x} cy={a.y} r="9" fill="var(--bg)" />
            <text x={a.x} y={a.y + 4} textAnchor="middle" fontFamily="var(--mono)" fontSize="13" fontWeight="600" fill={color}>
              {l}
            </text>
          </g>
        );
      })}

      {/* Group labels */}
      {Object.entries(groupAreas).map(([g, area]) => (
        highlight === g && (
          <text key={g}
            x={area.x + area.w / 2}
            y={area.y - 6}
            textAnchor="middle"
            fontFamily="var(--mono)" fontSize="10"
            fill={groupColor[g]} letterSpacing="0.1em">
            {g.toUpperCase()}
          </text>
        )
      ))}
    </svg>
  );
};

const CopyRow = ({ label, value }) => {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 12px', background: 'var(--bg-2)', borderRadius: 4 }}>
      <span className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.12em', minWidth: 60, marginTop: 2 }}>
        {label}
      </span>
      <span className="mono" style={{ fontSize: 12, color: 'var(--fg)', flex: 1, wordBreak: 'break-all' }}>
        {value}
      </span>
      <button onClick={copy} className="mono" style={{
        fontSize: 10, color: copied ? 'var(--accent)' : 'var(--fg-3)',
        letterSpacing: '0.1em', padding: '2px 8px',
        border: '1px solid var(--line)', borderRadius: 3,
      }}>
        {copied ? 'COPIED' : 'COPY'}
      </button>
    </div>
  );
};

const Desc = ({ k, v, unit }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dashed var(--line-soft)', paddingBottom: 6 }}>
    <span className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>{k}</span>
    <span className="mono" style={{ fontSize: 13, color: 'var(--fg)' }}>
      {v}<span style={{ fontSize: 10, color: 'var(--fg-3)', marginLeft: 4 }}>{unit}</span>
    </span>
  </div>
);

const Affinity = ({ tag, v, unit, color }) => (
  <div style={{ flex: 1, padding: 12, border: `1px solid ${color}`, borderRadius: 4, background: 'var(--bg-2)' }}>
    <div className="mono" style={{ fontSize: 10, color, letterSpacing: '0.12em' }}>{tag}</div>
    <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--fg)', marginTop: 4 }}>{v}</div>
    <div className="mono" style={{ fontSize: 9, color: 'var(--fg-3)', marginTop: 2 }}>{unit}</div>
  </div>
);

const RuleCard = ({ rule, status, detail }) => (
  <div style={{
    padding: 18,
    border: '1px solid var(--line-soft)',
    borderTop: `2px solid ${status === 'pass' ? 'var(--dual)' : 'var(--warn)'}`,
    background: 'var(--bg-1)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--dual)',
        letterSpacing: '0.12em',
      }}>
        ✓ PASS
      </span>
    </div>
    <div className="mono" style={{ fontSize: 12, color: 'var(--fg)', marginTop: 8 }}>{rule}</div>
    <p style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 6, lineHeight: 1.5 }}>{detail}</p>
  </div>
);

window.Lead = Lead;
