// The fentanyl crisis — frame the problem before the science
const Crisis = () => {
  const [year, setYear] = React.useState(2023);
  // Approximate US synthetic-opioid involved overdose deaths (mainly fentanyl)
  const data = [
    { y: 2013, d: 3105 },
    { y: 2014, d: 5544 },
    { y: 2015, d: 9580 },
    { y: 2016, d: 19413 },
    { y: 2017, d: 28466 },
    { y: 2018, d: 31335 },
    { y: 2019, d: 36359 },
    { y: 2020, d: 56516 },
    { y: 2021, d: 70601 },
    { y: 2022, d: 73838 },
    { y: 2023, d: 74702 },
  ];
  const max = Math.max(...data.map(d => d.d));
  const active = data.find(d => d.y === year) || data[data.length - 1];

  return (
    <section id="crisis" data-screen-label="02 Crisis" style={{
      borderBottom: '1px solid var(--line-soft)',
      padding: '120px 0',
      background: 'var(--bg)',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)', gap: 80, alignItems: 'start' }}
             className="crisis-grid">
          <div>
            <div className="section-num">§ 01 — The problem</div>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              Fentanyl is a binding-affinity problem with a death toll.
            </h2>
            <p className="body" style={{ marginTop: 24 }}>
              Fentanyl is roughly 100× more potent than morphine. It binds the μ-opioid receptor (MOR)
              with such efficacy that the same molecule that quiets pain also halts breathing —
              respiratory depression and analgesia share one receptor and one signaling pathway.
            </p>
            <p className="body" style={{ marginTop: 16 }}>
              The crisis is structural, not behavioral. No clean kinetics, no
              pharmacological off-ramp. The therapeutic window is measured in micrograms.
            </p>

            <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <FactRow k="Potency vs morphine" v="~100×" />
              <FactRow k="Lethal dose (opioid-naïve)" v="~2 mg" />
              <FactRow k="US OD deaths, 2023 (synth. opioid)" v="74,702" warn />
              <FactRow k="Leading cause of death, 18–45" v="Drug overdose" warn />
            </div>
          </div>

          <div>
            <div className="card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
                <div>
                  <div className="label">US synthetic-opioid overdose deaths</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 6 }}>
                    Source: CDC WONDER, mainly fentanyl & analogs
                  </div>
                </div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
                  2013 — 2023
                </div>
              </div>

              {/* Chart */}
              <div style={{ position: 'relative', height: 280, paddingLeft: 48, paddingBottom: 28 }}>
                {/* Y gridlines */}
                {[0, 0.25, 0.5, 0.75, 1].map(t => (
                  <div key={t} style={{
                    position: 'absolute',
                    left: 48, right: 0,
                    bottom: 28 + t * 250,
                    height: 1,
                    background: 'var(--line-soft)',
                    opacity: 0.5,
                  }}>
                    <span className="mono" style={{
                      position: 'absolute', left: -44, top: -8,
                      fontSize: 10, color: 'var(--fg-3)',
                    }}>
                      {Math.round((max * t) / 1000)}k
                    </span>
                  </div>
                ))}
                {/* Bars */}
                <div style={{ position: 'absolute', inset: 0, paddingLeft: 48, paddingBottom: 28, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                  {data.map(d => {
                    const isActive = d.y === year;
                    const h = (d.d / max) * 250;
                    return (
                      <div key={d.y}
                           onMouseEnter={() => setYear(d.y)}
                           style={{
                             flex: 1,
                             height: h,
                             background: isActive ? 'var(--warn)' : 'var(--bg-3)',
                             borderTop: isActive ? '1px solid var(--warn)' : '1px solid var(--line)',
                             cursor: 'pointer',
                             transition: 'background 0.2s, height 0.4s ease-out',
                             position: 'relative',
                           }}>
                        <span className="mono" style={{
                          position: 'absolute',
                          bottom: -22, left: 0, right: 0,
                          textAlign: 'center',
                          fontSize: 9,
                          color: isActive ? 'var(--warn)' : 'var(--fg-3)',
                        }}>
                          '{String(d.y).slice(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: 16, padding: 16, borderTop: '1px solid var(--line-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <div className="label">{active.y}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--warn)', marginTop: 4 }}>
                    {active.d.toLocaleString()}
                  </div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 4 }}>
                    deaths · {(active.d / data[0].d).toFixed(1)}× vs. 2013
                  </div>
                </div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', textAlign: 'right' }}>
                  hover bars to scrub
                </div>
              </div>
            </div>

            <div style={{ marginTop: 28, padding: 20, border: '1px solid var(--warn)', borderColor: 'oklch(0.75 0.12 70 / 0.3)', background: 'var(--warn-soft)', borderRadius: 8 }}>
              <div className="label" style={{ color: 'var(--warn)' }}>The pharmacological question</div>
              <p className="body" style={{ marginTop: 10, color: 'var(--fg-1)' }}>
                Can we keep MOR-mediated analgesia while disabling the lethal dose-response curve?
                The hypothesis driving this work: <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>recruit a second receptor</em> —
                NOP — to act as a built-in ceiling on respiratory depression.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .crisis-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
};

const FactRow = ({ k, v, warn }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    padding: '10px 0',
    borderBottom: '1px solid var(--line-soft)',
  }}>
    <span className="mono" style={{ fontSize: 11, color: 'var(--fg-2)', letterSpacing: '0.06em' }}>
      {k}
    </span>
    <span style={{
      fontFamily: 'var(--mono)',
      fontSize: 14,
      fontWeight: 500,
      color: warn ? 'var(--warn)' : 'var(--fg)',
    }}>
      {v}
    </span>
  </div>
);

window.Crisis = Crisis;
