// Footer
const Footer = () => (
  <footer style={{ padding: '60px 0 40px', background: 'var(--bg)' }}>
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="serif" style={{ fontSize: 18 }}>Opioid Safety Project</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 6, letterSpacing: '0.08em' }}>
            J. Baldursson · 2025–2026 · Computational Drug Design
          </div>
        </div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.12em' }}>
          IN SILICO · NOT YET VALIDATED IN VIVO
        </div>
      </div>
    </div>
  </footer>
);

window.Footer = Footer;
