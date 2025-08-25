import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CivilEngineeringJournal() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  // Mock data for the journal
  const journalInfo = {
    metrics: {
      impactFactor: "3.8",
      acceptanceRate: "32%",
      reviewTime: "45 days",
      publicationTime: "60 days"
    },
    editorialBoard: [
      {
        name: "Prof. Sarah Johnson",
        role: "Editor-in-Chief",
        affiliation: "Stanford University, USA",
        expertise: "Structural Engineering"
      },
      {
        name: "Dr. Michael Chen",
        role: "Associate Editor",
        affiliation: "MIT, USA",
        expertise: "Geotechnical Engineering"
      },
      {
        name: "Prof. Emma Williams",
        role: "Associate Editor",
        affiliation: "Imperial College London, UK",
        expertise: "Construction Management"
      },
      {
        name: "Dr. Rajesh Patel",
        role: "Associate Editor",
        affiliation: "IIT Delhi, India",
        expertise: "Transportation Engineering"
      }
    ],
    recentArticles: [
      {
        title: "Sustainable Materials in Modern Construction: A Comprehensive Review",
        authors: "Smith et al.",
        date: "2024",
        citations: 45
      },
      {
        title: "Advanced Seismic Design Methods for High-Rise Buildings",
        authors: "Zhang et al.",
        date: "2024",
        citations: 32
      },
      {
        title: "Smart Infrastructure Systems: IoT Integration in Civil Engineering",
        authors: "Brown et al.",
        date: "2023",
        citations: 78
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
          padding: 40px 20px;
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
          margin: 0 auto;
        }

        .journal-nav {
          background: white;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
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

        @media (max-width: 768px) {
          .journal-header {
            padding: 30px 15px;
          }

          .nav-container {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .nav-link {
            font-size: 0.9rem;
          }

          .metric-card {
            padding: 1rem;
          }

          .metric-value {
            font-size: 1.5rem;
          }
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div className="journal-page">
      <header className="journal-header">
        <h1 className="journal-title">Lord Journal of Civil Engineering</h1>
        <p className="journal-subtitle">
          A leading international journal in civil engineering research and innovation
        </p>
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
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </div>
      </nav>

      <main className="main-content">
        {/* Journal Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">{journalInfo.metrics.impactFactor}</div>
            <div className="metric-label">Impact Factor</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{journalInfo.metrics.acceptanceRate}</div>
            <div className="metric-label">Acceptance Rate</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{journalInfo.metrics.reviewTime}</div>
            <div className="metric-label">Average Review Time</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{journalInfo.metrics.publicationTime}</div>
            <div className="metric-label">Time to Publication</div>
          </div>
        </div>

        {/* Editorial Board */}
        <section id="editorial-board">
          <h2 className="section-title">Editorial Board</h2>
          <div className="editorial-board">
            {journalInfo.editorialBoard.map((editor, index) => (
              <div key={index} className="editor-card">
                <div className="editor-name">{editor.name}</div>
                <div className="editor-role">{editor.role}</div>
                <div className="editor-affiliation">{editor.affiliation}</div>
                <div className="editor-affiliation">{editor.expertise}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Articles */}
        <section>
          <h2 className="section-title">Recent Articles</h2>
          <div className="articles-list">
            {journalInfo.recentArticles.map((article, index) => (
              <div key={index} className="article-item">
                <div className="article-title">{article.title}</div>
                <div className="article-meta">
                  <span>{article.authors} • {article.date}</span>
                  <span>{article.citations} citations</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Submit Paper CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/Login" className="submit-button">
            Submit Your Paper
          </Link>
        </div>
      </main>
    </div>
  );
}
