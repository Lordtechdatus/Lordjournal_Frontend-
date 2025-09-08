import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LawSocialScienceJournal() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  // Reusable scroll function for anchor links
  const scrollToSection = (sectionId, tabName = null) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 115; // Main header (70px) + navbar height + padding
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }                     
    if (tabName) {
      setActiveTab(tabName);
    }
  };

  const journalInfo = {
    about: [
      "The Lord Journal of Law & Social Science (LJLSS) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is devoted to the interdisciplinary exploration of legal systems, governance, human rights, and societal structures, offering a scholarly platform that merges legal scholarship with social science inquiry.",
      "LJLSS serves academicians, legal practitioners, policymakers, sociologists, and researchers by encouraging original research and critical analysis that address pressing legal and social issues from global and regional perspectives.",
      "The journal is committed to academic integrity, diversity of thought, and open access to knowledge, promoting scholarship that contributes to inclusive policy, social justice, and rule of law in a rapidly changing world."
    ],
    aimAndScopeIntro: [
      "The Lord Journal of Law & Social Science aims to publish original articles, theoretical analyses, case studies, and critical reviews that explore intersections of law, policy, and social development.",
      "The journal encourages submissions from both disciplinary and interdisciplinary perspectives that bring new insights into the ways legal systems interact with social change."
    ],
    scope: [
      { title: "Constitutional and Administrative Law", description: "Governance models, constitutional theory, judicial review, and institutional accountability." },
      { title: "Human Rights and International Law", description: "Civil liberties, refugee law, humanitarian law, global treaties, and human rights protection mechanisms." },
      { title: "Criminal Justice and Criminology", description: "Criminal law, penal reform, victimology, law enforcement, and crime prevention strategies." },
      { title: "Legal Theory and Jurisprudence", description: "Philosophy of law, legal positivism, natural law theory, and comparative jurisprudence." },
      { title: "Socio-Legal Studies", description: "Legal consciousness, access to justice, legal pluralism, and law in everyday life." },
      { title: "Gender, Law, and Society", description: "Feminist legal theory, LGBTQ+ rights, gender-based violence, and anti-discrimination law." },
      { title: "Law and Technology", description: "Cyber law, data protection, AI and legal ethics, digital governance, and intellectual property." },
      { title: "Environmental and Climate Law", description: "Environmental regulation, climate justice, sustainable development, and ecological governance." },
      { title: "Social Policy and Welfare", description: "Education, health, labor law, poverty alleviation, and public policy evaluation." },
      { title: "Cultural Studies and Identity Politics", description: "Migration, ethnicity, indigeneity, nationalism, and media & law." }
    ],
    editorialBoard: [
      { name: "Dr. Amrish Kumar Sharma", role: "Editor-in-Chief", affiliation: "" }
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const STYLE_ID = 'law-social-science-journal-styles';
    if (!document.getElementById(STYLE_ID)) {
      const styleTag = document.createElement('style');
      styleTag.id = STYLE_ID;
      styleTag.innerHTML = `
        .journal-page {
          min-height: 100vh;
          background-color: #f8f9fa;
          scroll-padding-top: 115px;
        }

        /* Global scroll behavior for anchor links */
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 115px;
        }

        /* Ensure all sections have proper scroll margin */
        section[id] {
          scroll-margin-top: 115px;
        }
        .journal-header { background: linear-gradient(135deg, #111827 0%, #1f2937 100%); color: white; padding: 60px 20px 40px; text-align: center; }
        .journal-title { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; }
        .journal-subtitle { font-size: clamp(1rem, 2vw, 1.2rem); opacity: 0.9; max-width: 800px; margin: 0 auto 0.5rem; font-weight: 600; }
        .journal-description { font-size: clamp(0.9rem, 1.8vw, 1rem); opacity: 0.8; max-width: 800px; margin: 0 auto; line-height: 1.4; }
        .journal-nav { background: white; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: sticky; top: 70px; z-index: 100; }
        .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: center; gap: 2rem; align-items: center; }
        .nav-link { color: #111827; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; transition: all 0.2s ease; font-weight: 500; }
        .nav-link:hover, .nav-link.active { background: #e5e7eb; }
        .main-content {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
          text-align: left;
        }
        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1.5rem;
          text-align: left;
          scroll-margin-top: 115px;
        }
        .section-paragraph {
          color: #374151;
          line-height: 1.7;
          margin-bottom: 1rem;
          text-align: left;
          max-width: 100%;
        }
        .scope-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem; margin-bottom: 3rem; }
        .scope-item {
          background: white;
          padding: 1rem 1.25rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.08);
          text-align: left;
        }
        .scope-title {
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.5rem;
          text-align: left;
        }
        .scope-description {
          color: #4b5563;
          font-size: 0.95rem;
          text-align: left;
          line-height: 1.5;
        }
        .editorial-board { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
        .editor-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-align: left;
        }
        .editor-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.5rem;
          text-align: left;
        }
        .editor-role {
          color: #4b5563;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          text-align: left;
        }
        .editor-affiliation {
          color: #6b7280;
          font-size: 0.9rem;
          text-align: left;
        }
        .submit-button { display: inline-block; background: #111827; color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.2s ease; margin-top: 2rem; }
        .submit-button:hover { background: #1f2937; transform: translateY(-2px); }
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
          .section-title {
            font-size: 1.25rem;
            margin-bottom: 0.875rem;
            text-align: left;
          }
          .section-paragraph {
            font-size: 0.85rem;
            line-height: 1.5;
            text-align: left;
          }
          .scope-grid { grid-template-columns: 1fr; gap: 0.5rem; margin-bottom: 1.5rem; }
          .scope-item { padding: 0.75rem; }
          .scope-title { font-size: 0.9rem; margin-bottom: 0.375rem; }
          .scope-description { font-size: 0.8rem; line-height: 1.4; }
          .editorial-board { grid-template-columns: 1fr; gap: 0.75rem; margin-bottom: 1.5rem; }
          .editor-card {
            padding: 1rem;
            text-align: left;
          }
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
          .section-title {
            font-size: 1.1rem;
            margin-bottom: 0.75rem;
            text-align: left;
          }
          .section-paragraph {
            font-size: 0.8rem;
            line-height: 1.4;
            text-align: left;
          }
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
        <h1 className="journal-title">LJLSS</h1>
        <p className="journal-subtitle">Lord Journal of Law & Social Science</p>
        <p className="journal-description">A peer-reviewed, open-access international journal by Lord-Tech Datus Sol Pvt. Ltd.</p>
      </header>

      <nav className="journal-nav">
        <div className="nav-container">
          <Link to="/" className="nav-link">
            <span role="img" aria-label="home">🏠</span> Home
          </Link>
          <a
            href="#about-us"
            className={'nav-link' + (activeTab === 'about' ? ' active' : '')}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about-us', 'about');
            }}
          >
            About Us
          </a>
          <a
            href="#editorial-board"
            className={'nav-link' + (activeTab === 'editorial' ? ' active' : '')}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('editorial-board', 'editorial');
            }}
          >
            Editorial Board
          </a>
          <a
            href="#aim-and-scope"
            className={'nav-link' + (activeTab === 'scope' ? ' active' : '')}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('aim-and-scope', 'scope');
            }}
          >
            Aim & Scope
          </a>
          <Link to="/submit" className="nav-link">
            Submit Paper
          </Link>
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
          <Link to="/submit" className="submit-button">Submit Your Paper</Link>
        </div>
      </main>
    </div>
  );
}


