import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ElectronicsEngineeringJournal() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  const journalInfo = {
    about: [
      "The Lord Journal of Electronics Engineering (LJEE) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is dedicated to publishing cutting-edge research, technological advancements, and practical innovations across all domains of electronics and electrical engineering.",
      "LJEE serves as a vital academic bridge between research institutions, industry professionals, and policy developers, offering a global platform for sharing impactful research and engineering solutions that address current and future challenges in electronic systems, embedded technologies, and smart devices.",
      "With a strong emphasis on editorial excellence, academic transparency, and global knowledge dissemination, LJEE promotes collaborative, interdisciplinary research that supports sustainable innovation and digital transformation."
    ],
    aimAndScopeIntro: [
      "The Lord Journal of Electronics Engineering aims to publish original research, review articles, and technical notes that contribute to the advancement of knowledge in the field of electronics and its applications.",
      "LJEE invites theoretical, experimental, and applied research works that reflect innovation and contribute to solving real-world challenges through electronic and embedded systems."
    ],
    scope: [
      { title: "Analog and Digital Electronics", description: "Circuit design, VLSI, signal processing, semiconductor devices, and integrated circuits." },
      { title: "Embedded Systems and IoT", description: "Microcontrollers, sensors and actuators, real-time systems, IoT architectures, and edge computing." },
      { title: "Communication Systems", description: "Wireless networks, optical communication, modulation techniques, 5G/6G systems, and antenna design." },
      { title: "Power Electronics and Energy Systems", description: "Smart grids, renewable energy integration, power converters, motor drives, and electric vehicles." },
      { title: "Control Systems and Automation", description: "Feedback systems, robotics, adaptive control, PID tuning, and automation technologies." },
      { title: "Artificial Intelligence and Machine Learning in Electronics", description: "Hardware acceleration, embedded AI, edge ML, neural networks on chips." },
      { title: "Instrumentation and Measurement", description: "Sensors, signal conditioning, data acquisition systems, and biomedical instrumentation." },
      { title: "Nanoelectronics and MEMS", description: "Nanoscale devices, MEMS/NEMS technologies, quantum electronics, and future electronic materials." },
      { title: "Cyber-Physical Systems and Security", description: "Embedded security, secure communication protocols, system reliability, and fault tolerance." }
    ],
    editorialBoard: [
      { name: "Dr. Vikas Mahor", role: "Editor-in-Chief", affiliation: "" }
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const STYLE_ID = 'electronics-engineering-journal-styles';
    if (!document.getElementById(STYLE_ID)) {
      const styleTag = document.createElement('style');
      styleTag.id = STYLE_ID;
      styleTag.innerHTML = `
        .journal-page { min-height: 100vh; background-color: #f8f9fa; }
        .journal-header { background: linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%); color: white; padding: 60px 20px 40px; text-align: center; }
        .journal-title { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; }
        .journal-subtitle { font-size: clamp(1rem, 2vw, 1.2rem); opacity: 0.9; max-width: 800px; margin: 0 auto; }
        .journal-nav { background: white; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: sticky; top: 70px; z-index: 100; }
        .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: center; gap: 2rem; align-items: center; }
        .nav-link { color: #4c1d95; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; transition: all 0.2s ease; font-weight: 500; }
        .nav-link:hover, .nav-link.active { background: #ede9fe; }
        .main-content { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
        .section-title { font-size: 1.8rem; font-weight: 700; color: #4c1d95; margin-bottom: 1.5rem; }
        .section-paragraph { color: #374151; line-height: 1.7; margin-bottom: 1rem; }
        .scope-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem; margin-bottom: 3rem; }
        .scope-item { background: white; padding: 1rem 1.25rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.08); }
        .scope-title { font-weight: 600; color: #4c1d95; margin-bottom: 0.5rem; }
        .scope-description { color: #4b5563; font-size: 0.95rem; }
        .editorial-board { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
        .editor-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .editor-name { font-size: 1.2rem; font-weight: 600; color: #4c1d95; margin-bottom: 0.5rem; }
        .editor-role { color: #4b5563; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .editor-affiliation { color: #6b7280; font-size: 0.9rem; }
        .submit-button { display: inline-block; background: #4c1d95; color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.2s ease; margin-top: 2rem; }
        .submit-button:hover { background: #6d28d9; transform: translateY(-2px); }
        @media (max-width: 768px) { .journal-header { padding: 30px 15px; } .nav-container { flex-wrap: wrap; gap: 1rem; } .nav-link { font-size: 0.9rem; } }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div className="journal-page">
      <header className="journal-header">
        <h1 className="journal-title">Lord Journal of Electronics Engineering (LJEE)</h1>
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


