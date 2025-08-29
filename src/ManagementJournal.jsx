import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ManagementJournal() {
  const [activeTab, setActiveTab] = useState('about');

  const journalInfo = {
    about: [
      "The Lord Journal of Management (LJM) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is committed to publishing impactful research and insightful analyses that shape contemporary management practices and theories across industries and cultures.",
      "LJM provides a critical platform for academics, business leaders, consultants, and policymakers to share evidence-based insights, case studies, and emerging trends that enhance organizational effectiveness and strategic leadership in the 21st century.",
      "The journal fosters a strong connection between research and practice, advocating for ethical leadership, sustainable enterprise, and innovative thinking. With rigorous editorial and peer-review standards, LJM promotes global knowledge exchange in the field of management."
    ],
    aimAndScopeIntro: [
      "The Lord Journal of Management aims to support the advancement of management science, organizational studies, and business strategy by publishing original research, conceptual papers, and case analyses with practical and theoretical relevance.",
      "LJM welcomes interdisciplinary, international, and comparative studies that reflect the dynamic challenges of modern business and institutional environments.",
      "Scope of the Journal Includes (but is not limited to):"
    ],
    scope: [
      { title: "Strategic Management and Leadership", description: "Competitive strategy, corporate governance, strategic planning, and executive leadership." },
      { title: "Human Resource Management (HRM)", description: "Talent acquisition, employee engagement, organizational behavior, and performance management." },
      { title: "Marketing and Consumer Behavior", description: "Branding, digital marketing, market research, behavioral economics, and customer experience." },
      { title: "Finance and Accounting", description: "Corporate finance, financial modeling, accounting standards, risk analysis, and investment strategies." },
      { title: "Operations and Supply Chain Management", description: "Logistics, production planning, quality control, lean systems, and global supply networks." },
      { title: "Entrepreneurship and Innovation", description: "Startups, innovation management, venture capital, and entrepreneurial ecosystems." },
      { title: "Organizational Development and Change", description: "Culture change, organizational design, change management, and transformation strategies." },
      { title: "Business Analytics and Decision Sciences", description: "Data-driven decision-making, predictive analytics, AI applications in management, and business intelligence." },
      { title: "Corporate Social Responsibility (CSR) and Sustainability", description: "Ethical business, sustainable development goals (SDGs), ESG frameworks, and impact investing." },
      { title: "International Business and Global Strategy", description: "Cross-cultural management, globalization, international trade, and emerging markets." }
    ],
    editorialBoard: {
      editorInChief: "",
      members: []
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const STYLE_ID = 'management-journal-styles';
    if (!document.getElementById(STYLE_ID)) {
      const styleTag = document.createElement('style');
      styleTag.id = STYLE_ID;
      styleTag.innerHTML = `
        .journal-page { min-height: 100vh; background-color: #f8f9fa; }
        .journal-header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 60px 20px 40px; text-align: center; }
        .journal-title { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; }
        .journal-subtitle { font-size: clamp(1rem, 2vw, 1.2rem); opacity: 0.9; max-width: 800px; margin: 0 auto 0.5rem; font-weight: 600; }
        .journal-description { font-size: clamp(0.9rem, 1.8vw, 1rem); opacity: 0.8; max-width: 800px; margin: 0 auto; line-height: 1.4; }
        .journal-nav { background: white; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: sticky; top: 70px; z-index: 100; }
        .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: center; gap: 2rem; align-items: center; }
        .nav-link { color: #0f172a; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; transition: all 0.2s ease; font-weight: 500; }
        .nav-link:hover, .nav-link.active { background: #e2e8f0; }
        .main-content { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
        .section-title { font-size: 1.8rem; font-weight: 700; color: #0f172a; margin-bottom: 1.5rem; }
        .section-paragraph { color: #374151; line-height: 1.7; margin-bottom: 1rem; }
        .scope-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem; margin-bottom: 3rem; }
        .scope-item { background: white; padding: 1rem 1.25rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.08); }
        .scope-title { font-weight: 600; color: #0f172a; margin-bottom: 0.5rem; }
        .scope-description { color: #4b5563; font-size: 0.95rem; }
        .submit-button { display: inline-block; background: #0f172a; color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.2s ease; margin-top: 2rem; }
        .submit-button:hover { background: #111827; transform: translateY(-2px); }
        @media (max-width: 768px) {
          .journal-nav { position: relative; top: 0; }
          .nav-container { flex-direction: column; gap: 0.5rem; padding: 0 15px; align-items: stretch; }
          .nav-link { font-size: 0.85rem; text-align: center; border: 1px solid #e5e7eb; border-radius: 6px; }
          .section-title { font-size: 1.25rem; text-align: center; }
          .section-paragraph { font-size: 0.9rem; text-align: justify; }
          .scope-grid { grid-template-columns: 1fr; }
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div className="journal-page">
      <header className="journal-header">
        <h1 className="journal-title">LJM</h1>
        <p className="journal-subtitle">Lord Journal of Management</p>
        <p className="journal-description">A peer-reviewed, open-access international journal by Lord-Tech Datus Sol Pvt. Ltd.</p>
      </header>

      <nav className="journal-nav">
        <div className="nav-container">
          <Link to="/" className="nav-link">
            <span role="img" aria-label="home">🏠</span> Home
          </Link>
          <a href="#about-us" className={'nav-link' + (activeTab === 'about' ? ' active' : '')} onClick={() => setActiveTab('about')}>About Us</a>
          <a href="#aim-and-scope" className={'nav-link' + (activeTab === 'scope' ? ' active' : '')} onClick={() => setActiveTab('scope')}>Aim and Scope</a>
          <a href="#editorial-board" className={'nav-link' + (activeTab === 'editorial' ? ' active' : '')} onClick={() => setActiveTab('editorial')}>Editorial Board</a>
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

        <section id="editorial-board">
          <h2 className="section-title">Editorial Board</h2>
          {(!journalInfo.editorialBoard.editorInChief && journalInfo.editorialBoard.members.length === 0) ? (
            <p className="section-paragraph">Editor-in-Chief and Editorial Board will be updated soon.</p>
          ) : (
            <div>
              {journalInfo.editorialBoard.editorInChief && (
                <p className="section-paragraph"><strong>Editor-in-Chief:</strong> {journalInfo.editorialBoard.editorInChief}</p>
              )}
              {journalInfo.editorialBoard.members.length > 0 && (
                <ul>
                  {journalInfo.editorialBoard.members.map((m, idx) => (
                    <li key={idx} className="section-paragraph">{m}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>

        <div style={{ textAlign: 'center' }}>
          <Link to="/Login" className="submit-button">Submit Your Paper</Link>
        </div>
      </main>
    </div>
  );
}


