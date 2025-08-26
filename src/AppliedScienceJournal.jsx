import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AppliedScienceJournal() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  const journalInfo = {
    about: [
      "The Lord Journal of Applied Science (LJAS) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is devoted to the dissemination of significant and original scientific research that bridges theory with real-world applications across a wide spectrum of applied sciences.",
      "LJAS provides a multidisciplinary platform for academicians, researchers, technologists, practitioners, and policymakers to share research outcomes that have practical relevance and societal impact. The journal encourages studies that integrate scientific innovation with technological application, supporting sustainable solutions and scientific advancements.",
      "Committed to editorial integrity, scholarly rigor, and global accessibility, LJAS plays a pivotal role in fostering the exchange of applied scientific knowledge across domains and regions."
    ],
    aimAndScopeIntro: [
      "The Lord Journal of Applied Science aims to advance the frontiers of applied research by publishing original papers, comprehensive reviews, and technical notes that demonstrate innovative approaches to real-world challenges through science and technology.",
      "LJAS invites contributions across all branches of applied sciences that emphasize interdisciplinary perspectives, experimental results, and practical implementation."
    ],
    scope: [
      { title: "Applied Physics", description: "Photonics, nanomaterials, quantum technologies, sensor applications, and material physics." },
      { title: "Applied Chemistry", description: "Industrial chemistry, green chemistry, analytical techniques, and chemical process engineering." },
      { title: "Biotechnology and Life Sciences", description: "Genetic engineering, bioprocessing, pharmaceuticals, bioinformatics, and environmental biotech." },
      { title: "Environmental and Earth Sciences", description: "Environmental monitoring, climate science, geotechnical applications, and sustainable technologies." },
      { title: "Mathematical and Computational Sciences", description: "Applied mathematics, simulations, numerical modeling, and algorithmic development." },
      { title: "Food and Agricultural Sciences", description: "Post-harvest technology, food safety, crop science, and sustainable agriculture." },
      { title: "Applied Materials Science", description: "Composite materials, smart materials, corrosion science, and advanced coatings." },
      { title: "Forensic and Health Sciences", description: "Biomedical applications, forensic technology, diagnostics, and public health innovations." },
      { title: "Instrumentation and Measurement", description: "Scientific instrumentation, calibration techniques, and measurement systems for applied research." },
      { title: "Energy and Sustainable Technologies", description: "Renewable energy systems, energy efficiency, waste-to-energy solutions, and carbon management." }
    ],
    editorialBoard: []
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const STYLE_ID = 'applied-science-journal-styles';
    if (!document.getElementById(STYLE_ID)) {
      const styleTag = document.createElement('style');
      styleTag.id = STYLE_ID;
      styleTag.innerHTML = `
        .journal-page { min-height: 100vh; background-color: #f8f9fa; }
        .journal-header { background: linear-gradient(135deg, #7c2d12 0%, #b45309 100%); color: white; padding: 60px 20px 40px; text-align: center; }
        .journal-title { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; }
        .journal-subtitle { font-size: clamp(1rem, 2vw, 1.2rem); opacity: 0.9; max-width: 800px; margin: 0 auto; }
        .journal-nav { background: white; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: sticky; top: 70px; z-index: 100; }
        .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: center; gap: 2rem; align-items: center; }
        .nav-link { color: #7c2d12; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; transition: all 0.2s ease; font-weight: 500; }
        .nav-link:hover, .nav-link.active { background: #ffedd5; }
        .main-content { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
        .section-title { font-size: 1.8rem; font-weight: 700; color: #7c2d12; margin-bottom: 1.5rem; }
        .section-paragraph { color: #374151; line-height: 1.7; margin-bottom: 1rem; }
        .scope-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem; margin-bottom: 3rem; }
        .scope-item { background: white; padding: 1rem 1.25rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.08); }
        .scope-title { font-weight: 600; color: #7c2d12; margin-bottom: 0.5rem; }
        .scope-description { color: #4b5563; font-size: 0.95rem; }
        .editorial-board { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
        .editor-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .editor-name { font-size: 1.2rem; font-weight: 600; color: #7c2d12; margin-bottom: 0.5rem; }
        .editor-role { color: #4b5563; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .editor-affiliation { color: #6b7280; font-size: 0.9rem; }
        .submit-button { display: inline-block; background: #7c2d12; color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.2s ease; margin-top: 2rem; }
        .submit-button:hover { background: #b45309; transform: translateY(-2px); }
        @media (max-width: 768px) { .journal-header { padding: 30px 15px; } .nav-container { flex-wrap: wrap; gap: 1rem; } .nav-link { font-size: 0.9rem; } }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div className="journal-page">
      <header className="journal-header">
        <h1 className="journal-title">Lord Journal of Applied Science (LJAS)</h1>
        <p className="journal-subtitle">A peer-reviewed, open-access international journal by Lord-Tech Datus Sol Pvt. Ltd.</p>
      </header>

      <nav className="journal-nav">
        <div className="nav-container">
          <Link to="/" className="nav-link">
            <span role="img" aria-label="home">🏠</span> Home
          </Link>
          <a
            href="#editorial-board"
            className={'nav-link' + (activeTab === 'editorial' ? ' active' : '')}
            onClick={() => setActiveTab('editorial')}
          >
            Editorial Board
          </a>
          <Link to="/login" className="nav-link">Login</Link>
        </div>
      </nav>

      <main className="main-content">
        <section id="about-us">
          <h2 className="section-title">About Us</h2>
          {journalInfo.about.map((paragraph, index) => (
            <p key={index} className="section-paragraph">{paragraph}</p>
          ))}
        </section>

        <section id="editorial-board">
          <h2 className="section-title">Editorial Board</h2>
          {journalInfo.editorialBoard.length === 0 ? (
            <p className="section-paragraph">Editorial Board will be updated soon.</p>
          ) : (
            <div className="editorial-board">
              {journalInfo.editorialBoard.map((editor, index) => (
                <div key={index} className="editor-card">
                  <div className="editor-name">{editor.name}</div>
                  <div className="editor-role">{editor.role}</div>
                  {editor.affiliation && (
                    <div className="editor-affiliation">{editor.affiliation}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="aim-and-scope">
          <h2 className="section-title">Aim and Scope</h2>
          {journalInfo.aimAndScopeIntro.map((paragraph, index) => (
            <p key={index} className="section-paragraph">{paragraph}</p>
          ))}
          <div className="scope-grid">
            {journalInfo.scope.map((item, index) => (
              <div key={index} className="scope-item">
                <div className="scope-title">{item.title}</div>
                <div className="scope-description">{item.description}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ textAlign: 'center' }}>
          <Link to="/Login" className="submit-button">Submit Your Paper</Link>
        </div>
      </main>
    </div>
  );
}


