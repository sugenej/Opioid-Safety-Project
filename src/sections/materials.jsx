// Materials directory — links to paper, poster, slides, quad chart, supplementary
const Materials = () => {
  const items = [
    {
      kind: 'Paper',
      title: 'Engineering MOR/NOP Selectivity for Safer Analgesics',
      sub: 'Research paper · Baldursson 2026',
      meta: 'PDF · 24 pp',
      href: 'uploads/Research Paper 2026 Baldursson (1).pdf',
      tag: 'PRIMARY',
      ext: 'PDF',
    },
    {
      kind: 'Poster',
      title: 'Research Poster',
      sub: 'Visual abstract · 2026',
      meta: 'PDF · 1 pp',
      href: 'uploads/ISEF Poster 26\' (1).pdf',
      tag: 'PRESENTATION',
      ext: 'PDF',
    },
    {
      kind: 'Summary',
      title: 'Project Summary (JB ’26)',
      sub: 'Executive overview',
      meta: 'PDF · short-form',
      href: 'uploads/Project Summary JB 26.pdf',
      tag: 'OVERVIEW',
      ext: 'PDF',
    },
    {
      kind: 'Slides',
      title: 'Slide deck',
      sub: 'Presentation slides — coming soon',
      meta: 'add link →',
      href: '#',
      tag: 'PRESENTATION',
      ext: 'PPT',
      placeholder: true,
    },
    {
      kind: 'Quad',
      title: 'Quad chart',
      sub: 'One-page summary diagram — coming soon',
      meta: 'add link →',
      href: '#',
      tag: 'OVERVIEW',
      ext: 'PDF',
      placeholder: true,
    },
    {
      kind: 'Code',
      title: 'Pipeline source',
      sub: 'chemoinformatics → fragment_filter → docking_dual',
      meta: 'add repo →',
      href: '#',
      tag: 'CODE',
      ext: 'GIT',
      placeholder: true,
    },
  ];

  return (
    <section id="materials" data-screen-label="08 Materials" style={{ padding: '120px 0', borderBottom: '1px solid var(--line-soft)' }}>
      <div className="container">
        <div className="section-num">§ 07 — Supplementary materials</div>
        <h2 className="h-section" style={{ marginTop: 16, maxWidth: 880 }}>
          Directory of artifacts.
        </h2>
        <p className="body-lg" style={{ marginTop: 24, maxWidth: 760, color: 'var(--fg-1)' }}>
          Paper, poster, slide deck, quad chart, and supporting materials.
        </p>

        <div style={{
          marginTop: 48,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {items.map(it => (
            <a key={it.title} href={it.href} target={it.placeholder ? '_self' : '_blank'} rel="noreferrer"
              onClick={it.placeholder ? (e) => e.preventDefault() : undefined}
              style={{
                display: 'block',
                padding: 24,
                border: '1px solid var(--line-soft)',
                background: 'var(--bg-1)',
                borderRadius: 6,
                transition: 'all 0.15s',
                opacity: it.placeholder ? 0.55 : 1,
                cursor: it.placeholder ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={e => {
                if (!it.placeholder) {
                  e.currentTarget.style.borderColor = 'var(--accent-line)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--line-soft)';
                e.currentTarget.style.transform = 'none';
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.12em' }}>
                  {it.tag}
                </div>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: 9,
                  padding: '2px 6px',
                  border: '1px solid var(--line)', borderRadius: 3,
                  color: 'var(--fg-2)',
                }}>
                  {it.ext}
                </div>
              </div>
              <h3 className="serif" style={{ fontSize: 22, fontWeight: 400, marginTop: 16 }}>
                {it.title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 6 }}>{it.sub}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 14, borderTop: '1px solid var(--line-soft)' }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>
                  {it.meta}
                </span>
                <span className="mono" style={{ fontSize: 12, color: it.placeholder ? 'var(--fg-3)' : 'var(--accent)' }}>
                  {it.placeholder ? '—' : 'open ↗'}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* GitHub block */}
        <div style={{ marginTop: 56 }}>
          <div className="label" style={{ marginBottom: 12 }}>Project status</div>
          <div style={{
            padding: 20, background: 'var(--bg-1)', border: '1px solid var(--line-soft)',
            borderRadius: 6, fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.7,
          }}>
            Unpublished work — full pipeline source available on GitHub.
            <a href="#" className="mono" style={{ color: 'var(--accent)', marginLeft: 8 }}>
              github.com/your-handle/opioid-safety →
            </a>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 8 }}>
              swap in real link when ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.Materials = Materials;
