import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MechanicalEngineeringJournal() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  const journalInfo = {
    about: [
      "The Lord Journal of Mechanical Engineering (LJME) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is dedicated to advancing research and knowledge in the diverse field of mechanical engineering, connecting academic rigor with industrial innovation.",
      "LJME provides a high-impact platform for researchers, engineers, academicians, and industry professionals to share original research, transformative ideas, and best practices. The journal focuses on promoting technological innovation, sustainability, and interdisciplinary collaboration in mechanical systems and design.",
      "With a strong commitment to editorial excellence, academic transparency, and global reach, LJME seeks to be a critical resource for addressing the ever-evolving challenges in energy, manufacturing, automation, and mechanical systems design."
    ],
    aimAndScopeIntro: [
      "The Lord Journal of Mechanical Engineering aims to publish original, high-quality research articles, technical notes, and review papers that drive the advancement of mechanical engineering and its allied disciplines.",
      "LJME welcomes theoretical, experimental, and computational studies as well as innovative engineering applications that contribute to sustainable and smart technologies."
    ],
    scope: [
      { title: "Thermal and Fluid Sciences", description: "Heat transfer, fluid dynamics, thermodynamics, HVAC systems, and energy systems." },
      { title: "Design and Manufacturing", description: "CAD/CAM, product design, sustainable manufacturing, precision engineering, and rapid prototyping." },
      { title: "Materials and Metallurgy", description: "Smart materials, composite materials, metallurgy, material testing and characterization." },
      { title: "Robotics and Automation", description: "Mechatronics, autonomous systems, industrial automation, control systems, and sensors." },
      { title: "Dynamics and Vibrations", description: "Mechanical system dynamics, structural vibrations, modal analysis, and noise control." },
      { title: "Energy Systems and Renewable Technologies", description: "Energy conversion, renewable energy technologies, internal combustion engines, and energy storage." },
      { title: "Computational Methods in Mechanical Engineering", description: "Finite element analysis (FEA), computational fluid dynamics (CFD), multiphysics simulation." },
      { title: "Tribology and Machine Elements", description: "Friction, lubrication, wear, bearings, gears, and mechanical joints." },
      { title: "Aerospace and Automotive Engineering", description: "Aerodynamics, propulsion systems, vehicle design and testing, and automotive electronics." }
    ],
    editorialBoard: [
      { name: "Dr. Subodh Sharma", role: "Editor-in-Chief", affiliation: "" }
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const STYLE_ID = 'mechanical-engineering-journal-styles';
    if (!document.getElementById(STYLE_ID)) {
      const styleTag = document.createElement('style');
      styleTag.id = STYLE_ID;
      styleTag.innerHTML = `
        .journal-page { min-height: 100vh; background-color: #f8f9fa; }
        .journal-header { background: linear-gradient(135deg, #0b3b5c 0%, #0f5f8a 100%); color: white; padding: 60px 20px 40px; text-align: center; }
        .journal-title { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; }
        .journal-subtitle { font-size: clamp(1rem, 2vw, 1.2rem); opacity: 0.9; max-width: 800px; margin: 0 auto; }
        .journal-nav { background: white; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: sticky; top: 70px; z-index: 100; }
        .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: center; gap: 2rem; align-items: center; }
        .nav-link { color: #0b3b5c; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; transition: all 0.2s ease; font-weight: 500; }
        .nav-link:hover, .nav-link.active { background: #e0f2ff; }
        .main-content { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
        .section-title { font-size: 1.8rem; font-weight: 700; color: #0b3b5c; margin-bottom: 1.5rem; }
        .section-paragraph { color: #374151; line-height: 1.7; margin-bottom: 1rem; }
        .scope-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem; margin-bottom: 3rem; }
        .scope-item { background: white; padding: 1rem 1.25rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.08); }
        .scope-title { font-weight: 600; color: #0b3b5c; margin-bottom: 0.5rem; }
        .scope-description { color: #4b5563; font-size: 0.95rem; }
        .editorial-board { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
        .editor-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .editor-name { font-size: 1.2rem; font-weight: 600; color: #0b3b5c; margin-bottom: 0.5rem; }
        .editor-role { color: #4b5563; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .editor-affiliation { color: #6b7280; font-size: 0.9rem; }
        .submit-button { display: inline-block; background: #0b3b5c; color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.2s ease; margin-top: 2rem; }
        .submit-button:hover { background: #0f5f8a; transform: translateY(-2px); }
        @media (max-width: 768px) { .journal-header { padding: 30px 15px; } .nav-container { flex-wrap: wrap; gap: 1rem; } .nav-link { font-size: 0.9rem; } }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div className="journal-page">
      <header className="journal-header">
        <h1 className="journal-title">Lord Journal of Mechanical Engineering (LJME)</h1>
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


