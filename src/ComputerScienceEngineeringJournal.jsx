import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ComputerScienceEngineeringJournal() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  const journalInfo = {
    about: [
      "The Lord Journal of Computer Science & Engineering (LJCSE) is an open-access, peer-reviewed international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is dedicated to publishing high-quality research that advances theoretical foundations, practical methodologies, and emerging technologies across the vast domain of computer science and engineering.",
      "LJCSE provides a scholarly forum for academicians, researchers, software professionals, and technology leaders to exchange ideas, present breakthroughs, and explore interdisciplinary solutions to complex computational challenges.",
      "With a commitment to global dissemination, editorial excellence, and rigorous peer-review standards, the journal serves as a bridge between academic research and industry innovation, supporting the growth of intelligent, secure, and sustainable digital systems."
    ],
    aimAndScopeIntro: [
      "The Lord Journal of Computer Science & Engineering seeks to foster innovation and knowledge-sharing by publishing original research, review papers, and technical reports in both foundational areas and emerging trends of computer science and engineering.",
      "Submissions may span theoretical, experimental, computational, or applied studies that contribute to advancing the digital frontier."
    ],
    scope: [
      { title: "Artificial Intelligence and Machine Learning", description: "Deep learning, neural networks, reinforcement learning, natural language processing, and AI ethics." },
      { title: "Data Science and Big Data Analytics", description: "Data mining, statistical modeling, distributed data processing, and predictive analytics." },
      { title: "Computer Networks and Cybersecurity", description: "Network architecture, cloud computing, IoT security, cryptography, blockchain, and privacy preservation." },
      { title: "Software Engineering and Systems Development", description: "Agile methodologies, DevOps, software architecture, software testing, and quality assurance." },
      { title: "Human-Computer Interaction and UX Design", description: "User interface design, interaction models, usability testing, and accessibility." },
      { title: "Theoretical Computer Science", description: "Algorithms, automata theory, complexity theory, quantum computing, and computation models." },
      { title: "Computer Vision and Image Processing", description: "Object recognition, 3D vision, medical imaging, and augmented reality systems." },
      { title: "Embedded Systems and Internet of Things (IoT)", description: "IoT platforms, embedded AI, sensor networks, and cyber-physical systems." },
      { title: "Cloud, Edge, and Distributed Computing", description: "Resource management, virtualization, microservices, and real-time data processing." },
      { title: "Robotics and Autonomous Systems", description: "Motion planning, intelligent control, robotic perception, and multi-agent systems." }
    ],
    editorialBoard: [
      { name: "Dr. Priyanka Gupta", role: "Editor-in-Chief", affiliation: "" }
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const STYLE_ID = 'cse-journal-styles';
    if (!document.getElementById(STYLE_ID)) {
      const styleTag = document.createElement('style');
      styleTag.id = STYLE_ID;
      styleTag.innerHTML = `
        .journal-page { min-height: 100vh; background-color: #f8f9fa; }
        .journal-header { background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%); color: white; padding: 60px 20px 40px; text-align: center; }
        .journal-title { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; }
        .journal-subtitle { font-size: clamp(1rem, 2vw, 1.2rem); opacity: 0.9; max-width: 800px; margin: 0 auto 0.5rem; font-weight: 600; }
        .journal-description { font-size: clamp(0.9rem, 1.8vw, 1rem); opacity: 0.8; max-width: 800px; margin: 0 auto; line-height: 1.4; }
        .journal-nav { background: white; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: sticky; top: 70px; z-index: 100; }
        .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: center; gap: 2rem; align-items: center; }
        .nav-link { color: #1d4ed8; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; transition: all 0.2s ease; font-weight: 500; }
        .nav-link:hover, .nav-link.active { background: #dbeafe; }
        .main-content { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
        .section-title { font-size: 1.8rem; font-weight: 700; color: #1d4ed8; margin-bottom: 1.5rem; }
        .section-paragraph { color: #374151; line-height: 1.7; margin-bottom: 1rem; }
        .scope-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem; margin-bottom: 3rem; }
        .scope-item { background: white; padding: 1rem 1.25rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.08); }
        .scope-title { font-weight: 600; color: #1d4ed8; margin-bottom: 0.5rem; }
        .scope-description { color: #4b5563; font-size: 0.95rem; }
        .editorial-board { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
        .editor-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .editor-name { font-size: 1.2rem; font-weight: 600; color: #1d4ed8; margin-bottom: 0.5rem; }
        .editor-role { color: #4b5563; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .editor-affiliation { color: #6b7280; font-size: 0.9rem; }
        .submit-button { display: inline-block; background: #1d4ed8; color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.2s ease; margin-top: 2rem; }
        .submit-button:hover { background: #2563eb; transform: translateY(-2px); }
        @media (max-width: 1024px) {
          .main-content { padding: 0 1.5rem; }
          .scope-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; }
          .editorial-board { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.25rem; }
        }
        @media (max-width: 768px) {
          .journal-page { font-size: 14px; }
          .journal-header { padding: 20px 15px 15px; margin-top: 0; }
          .journal-title { font-size: 2rem !important; line-height: 1.1; margin-bottom: 0.5rem; }
          .journal-subtitle { font-size: 1rem !important; line-height: 1.3; margin-bottom: 0.5rem; }
          .journal-description { font-size: 0.8rem !important; line-height: 1.3; }
          .journal-nav { padding: 0.75rem 0; position: relative; top: 0; }
          .nav-container { flex-direction: column; gap: 0.5rem; padding: 0 15px; align-items: stretch; }
          .nav-link { font-size: 0.8rem; padding: 0.5rem 0.75rem; text-align: center; border: 1px solid #e5e7eb; border-radius: 6px; }
          .main-content { margin: 1rem auto; padding: 0 15px; max-width: 100%; }
          .section-title { font-size: 1.25rem; margin-bottom: 0.875rem; text-align: center; }
          .section-paragraph { font-size: 0.85rem; line-height: 1.5; text-align: justify; }
          .scope-grid { grid-template-columns: 1fr; gap: 0.5rem; margin-bottom: 1.5rem; }
          .scope-item { padding: 0.75rem; }
          .scope-title { font-size: 0.9rem; margin-bottom: 0.375rem; }
          .scope-description { font-size: 0.8rem; line-height: 1.4; }
          .editorial-board { grid-template-columns: 1fr; gap: 0.75rem; margin-bottom: 1.5rem; }
          .editor-card { padding: 1rem; text-align: center; }
          .editor-name { font-size: 1rem; }
          .editor-role { font-size: 0.8rem; }
          .editor-affiliation { font-size: 0.8rem; }
          .submit-button { padding: 0.75rem 1.25rem; font-size: 0.85rem; width: 100%; text-align: center; box-sizing: border-box; }
        }
        @media (max-width: 480px) {
          .journal-page { font-size: 13px; }
          .journal-header { padding: 15px 10px 10px; }
          .journal-title { font-size: 1.8rem !important; margin-bottom: 1.5rem; }
          .journal-subtitle { font-size: 0.9rem !important; line-height: 1.2; margin-bottom: 0.375rem; }
          .journal-description { font-size: 0.75rem !important; line-height: 1.2; }
          .nav-container { padding: 0 10px; gap: 0.375rem; }
          .nav-link { font-size: 0.75rem; padding: 0.4rem 0.6rem; }
          .main-content { padding: 0 10px; margin: 0.75rem auto; }
          .section-title { font-size: 1.1rem; margin-bottom: 0.75rem; }
          .section-paragraph { font-size: 0.8rem; line-height: 1.4; }
          .scope-item { padding: 0.6rem; }
          .scope-title { font-size: 0.85rem; margin-bottom: 0.25rem; }
          .scope-description { font-size: 0.75rem; line-height: 1.3; }
          .editor-card { padding: 0.75rem; }
          .editor-name { font-size: 0.9rem; }
          .editor-role { font-size: 0.75rem; }
          .editor-affiliation { font-size: 0.75rem; }
          .submit-button { padding: 0.6rem 1rem; font-size: 0.8rem; margin-top: 1rem; }
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div className="journal-page">
      <header className="journal-header">
        <h1 className="journal-title">LJCSE</h1>
        <p className="journal-subtitle">Lord Journal of Computer Science & Engineering</p>
        <p className="journal-description">A peer-reviewed, open-access international journal by Lord-Tech Datus Sol Pvt. Ltd.</p>
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


