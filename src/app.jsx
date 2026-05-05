// App shell — composes all sections and provides scroll-spy nav
const { useState, useEffect } = React;

const Nav = () => {
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const ids = ['crisis', 'biology', 'pocket', 'chemoinformatics', 'pipeline', 'lead', 'results', 'materials'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const items = [
    { id: 'crisis', label: 'Problem' },
    { id: 'biology', label: 'Receptors' },
    { id: 'pocket', label: 'Pocket' },
    { id: 'chemoinformatics', label: 'Data' },
    { id: 'pipeline', label: 'Pipeline' },
    { id: 'lead', label: 'Lead' },
    { id: 'results', label: 'Results' },
    { id: 'materials', label: 'Materials' },
  ];

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="nav-brand">
          <span className="glyph">μ</span>
          <span>OPIOID SAFETY · MOR/NOP</span>
        </a>
        <div className="nav-links">
          {items.map(it => (
            <a key={it.id} href={`#${it.id}`} className={active === it.id ? 'active' : ''}>
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <Crisis />
      <Biology />
      <Pocket />
      <Chemoinformatics />
      <Pipeline />
      <Lead />
      <Results />
      <Materials />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
