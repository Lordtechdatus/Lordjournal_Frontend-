import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CivilEngineeringJournal() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  // Journal content
  const journalInfo = {
    about: [
      "The Lord Journal of Civil Engineering (LJCE) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd.. It is dedicated to advancing the understanding, development, and application of civil engineering principles in both academic and practical contexts.",
      "Our mission is to provide a platform for researchers, academicians, industry professionals, and policymakers to share groundbreaking research, innovative technologies, and best practices that drive progress in infrastructure, sustainability, and resilient systems.",
      "The journal is committed to academic integrity, global accessibility, and the highest standards of editorial and peer-review practices. LJCE serves as a conduit for knowledge exchange between diverse regions and engineering disciplines, addressing the evolving challenges of the modern built environment."
    ],
    aimAndScopeIntro: [
      "The Lord Journal of Civil Engineering (LJCE) aims to foster innovation and academic excellence by publishing high-quality, original contributions that promote advancement in all major domains of civil engineering.",
      "LJCE invites submissions that are theoretical, experimental, computational, or practical in nature, with a strong emphasis on interdisciplinary research and solutions that support sustainable development."
    ],
    scope: [
      {
        title: "Structural Engineering",
        description: "Structural analysis, innovative design methods, high-performance materials, and earthquake-resistant structures."
      },
      {
        title: "Geotechnical Engineering",
        description: "Foundation engineering, soil dynamics, ground improvement, and geosynthetics."
      },
      {
        title: "Environmental Engineering",
        description: "Water and wastewater treatment, pollution control, waste management, and sustainable environmental technologies."
      },
      {
        title: "Transportation Engineering",
        description: "Traffic systems, pavement materials, transport planning, intelligent transportation systems (ITS), and urban mobility."
      },
      {
        title: "Water Resources and Hydraulic Engineering",
        description: "Hydrology, stormwater management, irrigation engineering, hydraulic structures, and climate resilience in water systems."
      },
      {
        title: "Construction Engineering and Materials",
        description: "Emerging construction technologies, material innovations, sustainability in construction, and lifecycle analysis."
      },
      {
        title: "Earthquake and Disaster Engineering",
        description: "Seismic risk assessment, disaster mitigation strategies, resilient infrastructure, and recovery planning."
      },
      {
        title: "Smart and Sustainable Infrastructure",
        description: "Digital construction, smart cities, Building Information Modeling (BIM), IoT integration, and sustainable urban development."
      }
    ],
    editorialBoard: [
      {
        name: "Dr. Manoj Kumar Trivedi",
        role: "Editor-in-Chief",
        affiliation: "MITS-DU, Gwalior"
      },
      {
        name: "Dr. K. N Jha",
        role: "Editorial Board Member",
        affiliation: "IIT Delhi"
      },
      {
        name: "Dr. Sparsh Johari",
        role: "Editorial Board Member",
        affiliation: "IIT Guwahati"
      },
      {
        name: "Dr. Vedat Togan",
        role: "Editorial Board Member",
        affiliation: "Karadeniz Technical University"
      },
      {
        name: "Dr. Abhilash Shukla",
        role: "Editorial Board Member",
        affiliation: "MITS-DU, Gwalior"
      },
      {
        name: "Dr. Prachi Singh",
        role: "Editorial Board Member",
        affiliation: "MITS-DU, Gwalior"
      },
      {
        name: "Dr. Jay Singh Rajput",
        role: "Editorial Board Member",
        affiliation: "NEERI, Nagpur"
      }
    ]
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Inject styles
  useEffect(() => {
    const STYLE_ID = 'civil-engineering-journal-styles';
    if (!document.getElementById(STYLE_ID)) {
      const styleTag = document.createElement('style');
      styleTag.id = STYLE_ID;
      styleTag.innerHTML = `
        .journal-page {
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        .journal-header {
        background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
        color: white;
        padding: 60px 20px 40px; 
        text-align: center;
        }

        .journal-title {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .journal-subtitle {
          font-size: clamp(1rem, 2vw, 1.2rem);
          opacity: 0.9;
          max-width: 800px;
          margin: 0 auto 0.5rem;
          font-weight: 600;
        }

        .journal-description {
          font-size: clamp(0.9rem, 1.8vw, 1rem);
          opacity: 0.8;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.4;
        }

        .journal-nav {
          background: white;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: sticky;
          top: 70px;
          z-index: 100;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: #1e3a8a;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .nav-link:hover,
        .nav-link.active {
          background: #e0e7ff;
        }

        .main-content {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .metric-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-align: center;
        }

        .metric-value {
          font-size: 2rem;
          font-weight: 700;
          color: #1e3a8a;
          margin-bottom: 0.5rem;
        }

        .metric-label {
          color: #4b5563;
          font-size: 0.9rem;
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1e3a8a;
          margin-bottom: 1.5rem;
        }

        .section-paragraph {
          color: #374151;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .scope-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
          margin-bottom: 3rem;
        }

        .scope-item {
          background: white;
          padding: 1rem 1.25rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.08);
        }

        .scope-title {
          font-weight: 600;
          color: #1e3a8a;
          margin-bottom: 0.5rem;
        }

        .scope-description {
          color: #4b5563;
          font-size: 0.95rem;
        }

        .editorial-board {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .editor-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .editor-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1e3a8a;
          margin-bottom: 0.5rem;
        }

        .editor-role {
          color: #4b5563;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .editor-affiliation {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .articles-list {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .article-item {
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .article-item:last-child {
          border-bottom: none;
        }

        .article-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e3a8a;
          margin-bottom: 0.5rem;
        }

        .article-meta {
          display: flex;
          justify-content: space-between;
          color: #6b7280;
          font-size: 0.9rem;
        }

        .submit-button {
          display: inline-block;
          background: #1e3a8a;
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
          margin-top: 2rem;
        }

        .submit-button:hover {
          background: #1e40af;
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .main-content {
            padding: 0 1.5rem;
          }
          
          .scope-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1rem;
          }
          
          .editorial-board {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.25rem;
          }
        }

        @media (max-width: 768px) {
          .journal-page {
            font-size: 14px;
          }

          .journal-header {
            padding: 20px 15px 15px;
            margin-top: 0;
          }

          .journal-title {
            font-size: 2rem !important;
            line-height: 1.1;
            margin-bottom: 0.5rem;
          }

          .journal-subtitle {
            font-size: 1rem !important;
            line-height: 1.3;
            margin-bottom: 0.5rem;
          }

          .journal-description {
            font-size: 0.8rem !important;
            line-height: 1.3;
          }

          .journal-nav {
            padding: 0.75rem 0;
            position: relative;
            top: 0;
          }

          .nav-container {
            flex-direction: column;
            gap: 0.5rem;
            padding: 0 15px;
            align-items: stretch;
          }

          .nav-link {
            font-size: 0.8rem;
            padding: 0.5rem 0.75rem;
            text-align: center;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
          }

          .main-content {
            margin: 1rem auto;
            padding: 0 15px;
            max-width: 100%;
          }

          .section-title {
            font-size: 1.25rem;
            margin-bottom: 0.875rem;
            text-align: center;
          }

          .section-paragraph {
            font-size: 0.85rem;
            line-height: 1.5;
            text-align: justify;
          }

          .scope-grid {
            grid-template-columns: 1fr;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }

          .scope-item {
            padding: 0.75rem;
          }

          .scope-title {
            font-size: 0.9rem;
            margin-bottom: 0.375rem;
          }

          .scope-description {
            font-size: 0.8rem;
            line-height: 1.4;
          }

          .editorial-board {
            grid-template-columns: 1fr;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
          }

          .editor-card {
            padding: 1rem;
            text-align: center;
          }

          .editor-name {
            font-size: 1rem;
          }

          .editor-role {
            font-size: 0.8rem;
          }

          .editor-affiliation {
            font-size: 0.8rem;
          }

          .submit-button {
            padding: 0.75rem 1.25rem;
            font-size: 0.85rem;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
          }
        }

        @media (max-width: 480px) {
          .journal-page {
            font-size: 13px;
          }

          .journal-header {
            padding: 15px 10px 10px;
          }

          .journal-title {
            font-size: 1.8rem !important;
            margin-bottom: 1.5rem;
          }

          .journal-subtitle {
            font-size: 0.9rem !important;
            line-height: 1.2;
            margin-bottom: 0.375rem;
          }

          .journal-description {
            font-size: 0.75rem !important;
            line-height: 1.2;
          }

          .nav-container {
            padding: 0 10px;
            gap: 0.375rem;
          }

          .nav-link {
            font-size: 0.75rem;
            padding: 0.4rem 0.6rem;
          }

          .main-content {
            padding: 0 10px;
            margin: 0.75rem auto;
          }

          .section-title {
            font-size: 1.1rem;
            margin-bottom: 0.75rem;
          }

          .section-paragraph {
            font-size: 0.8rem;
            line-height: 1.4;
          }

          .scope-item {
            padding: 0.6rem;
          }

          .scope-title {
            font-size: 0.85rem;
            margin-bottom: 0.25rem;
          }

          .scope-description {
            font-size: 0.75rem;
            line-height: 1.3;
          }

          .editor-card {
            padding: 0.75rem;
          }

          .editor-name {
            font-size: 0.9rem;
          }

          .editor-role {
            font-size: 0.75rem;
          }

          .editor-affiliation {
            font-size: 0.75rem;
          }

          .submit-button {
            padding: 0.6rem 1rem;
            font-size: 0.8rem;
            margin-top: 1rem;
          }
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div className="journal-page">
      <header className="journal-header">
        <h1 className="journal-title">LJCE</h1>
        <p className="journal-subtitle">Lord Journal of Civil Engineering</p>
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
          <Link to="/submit" className="nav-link">
            Submit Paper
          </Link>
        </div>
      </nav>

      <main className="main-content">
        {/* About Us */}
        <section id="about-us">
          <h2 className="section-title">About Us</h2>
          {journalInfo.about.map((paragraph, index) => (
            <p key={index} className="section-paragraph">{paragraph}</p>
          ))}
        </section>

        {/* Editorial Board */}
        <section id="editorial-board">
          <h2 className="section-title">Editorial Board</h2>
          <div className="editorial-board">
            {journalInfo.editorialBoard.map((editor, index) => (
              <div key={index} className="editor-card">
                <div className="editor-name">{editor.name}</div>
                <div className="editor-role">{editor.role}</div>
                <div className="editor-affiliation">{editor.affiliation}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Aim and Scope */}
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

        {/* Submit Paper CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/submit" className="submit-button">
            Submit Your Paper
          </Link>
        </div>
      </main>
    </div>
  );
}
