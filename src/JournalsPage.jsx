import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Journal page component
export default function JournalsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock journal data
  const journals = [
    {
      id: 1,
      title: "Lord Journal of Academic Excellence",
      category: "education",
      impactFactor: 4.8,
      coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=80",
      description: "A leading journal covering innovations in educational research and practice.",
      tags: ["Education", "Research", "Academic"]
    },
    {
      id: 2,
      title: "Lord Journal of International Medical Research",
      category: "medical",
      impactFactor: 5.2,
      coverImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&auto=format&fit=crop&q=80",
      description: "Cutting-edge research in medical science and clinical practice.",
      tags: ["Medical", "Healthcare", "Research"]
    },
    {
      id: 3,
      title: "Lord Journal of Environmental Science Today",
      category: "science",
      impactFactor: 4.5,
      coverImage: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=500&auto=format&fit=crop&q=80",
      description: "Focused on environmental challenges and sustainable solutions.",
      tags: ["Environment", "Science", "Sustainability"]
    },
    {
      id: 4,
      title: "Lord Journal of Digital Technology & Society",
      category: "technology",
      impactFactor: 3.9,
      coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=80",
      description: "Exploring the intersection of technology and societal impact.",
      tags: ["Technology", "Digital", "Society"]
    },
    {
      id: 5,
      title: "Lord Journal of Business Strategy Review",
      category: "business",
      impactFactor: 4.1,
      coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80",
      description: "Analysis of business trends, strategies, and management practices.",
      tags: ["Business", "Management", "Strategy"]
    },
    {
      id: 6,
      title: "Lord Journal of Psychology & Behavioral Sciences",
      category: "psychology",
      impactFactor: 4.7,
      coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=80",
      description: "Research on human behavior, cognition, and mental health.",
      tags: ["Psychology", "Behavior", "Mental Health"]
    },
    {
      id: 7,
      title: "Lord Journal of Arts & Humanities Quarterly",
      category: "humanities",
      impactFactor: 3.5,
      coverImage: "https://images.unsplash.com/photo-1580711465053-6757198851cf?w=500&auto=format&fit=crop&q=80",
      description: "Scholarly research in literature, philosophy, and the arts.",
      tags: ["Arts", "Humanities", "Culture"]
    },
    {
      id: 8,
      title: "Lord Journal of Law & Policy Review",
      category: "law",
      impactFactor: 3.8,
      coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=80",
      description: "Analysis of legal developments and policy implications.",
      tags: ["Law", "Policy", "Governance"]
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Journals' },
    { id: 'education', name: 'Education' },
    { id: 'medical', name: 'Medical' },
    { id: 'science', name: 'Science' },
    { id: 'technology', name: 'Technology' },
    { id: 'business', name: 'Business' },
    { id: 'psychology', name: 'Psychology' },
    { id: 'humanities', name: 'Humanities' },
    { id: 'law', name: 'Law' }
  ];

  // Filter journals based on active filter and search query
  const filteredJournals = journals.filter(journal => {
    const matchesCategory = activeFilter === 'all' || journal.category === activeFilter;
    const matchesSearch = searchQuery === '' || 
      journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      journal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      journal.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Simulate loading and scroll to top on page load
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Inject styles once
  useEffect(() => {
    const STYLE_ID = "journals-page-styles";
    if (!document.getElementById(STYLE_ID)) {
      const styleTag = document.createElement("style");
      styleTag.id = STYLE_ID;
      styleTag.innerHTML = `
        /* Journals Page Styles */
        .journals-page {
          min-height: 100vh;
          background-color: #f8f9fa;
        }
        
        .journals-header {
          background: linear-gradient(135deg, #0a2a38 0%, #1a4a68 100%);
          color: white;
          padding: 80px 20px;
          text-align: center;
        }
        
        .journals-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        
        .journals-subtitle {
          font-size: clamp(1rem, 2vw, 1.3rem);
          max-width: 800px;
          margin: 0 auto 2rem;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        .search-bar {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50px;
          padding: 5px;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 15px 20px;
          font-size: 1rem;
          color: white;
          outline: none;
        }
        
        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .search-button {
          background: white;
          color: #0a2a38;
          border: none;
          border-radius: 50px;
          padding: 10px 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .search-button:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
        }
        
        .journals-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        
        .filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
          justify-content: center;
        }
        
        .filter-button {
          background: white;
          border: 1px solid #e0e0e0;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .filter-button:hover {
          background: #f0f0f0;
        }
        
        .filter-button.active {
          background: #0a2a38;
          color: white;
          border-color: #0a2a38;
        }
        
        .journals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }
        
        .journal-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease forwards;
        }
        
        .journal-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .journal-image {
          height: 180px;
          width: 100%;
          object-fit: cover;
        }
        
        .journal-content {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .journal-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: #0a2a38;
          line-height: 1.3;
        }
        
        .journal-description {
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 15px;
          flex: 1;
        }
        
        .journal-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }
        
        .journal-impact {
          background: #f0f7ff;
          color: #0a2a38;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        .journal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 10px;
        }
        
        .journal-tag {
          background: #f5f5f5;
          color: #666;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
        }
        
        .journal-link {
          display: inline-block;
          margin-top: 15px;
          color: #0a2a38;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        
        .journal-link:hover {
          color: #1a4a68;
          text-decoration: underline;
        }
        
        .no-results {
          text-align: center;
          padding: 40px;
          color: #666;
          font-size: 1.1rem;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Animation delay for staggered effect */
        .journal-card:nth-child(1) { animation-delay: 0.1s; }
        .journal-card:nth-child(2) { animation-delay: 0.2s; }
        .journal-card:nth-child(3) { animation-delay: 0.3s; }
        .journal-card:nth-child(4) { animation-delay: 0.4s; }
        .journal-card:nth-child(5) { animation-delay: 0.5s; }
        .journal-card:nth-child(6) { animation-delay: 0.6s; }
        .journal-card:nth-child(7) { animation-delay: 0.7s; }
        .journal-card:nth-child(8) { animation-delay: 0.8s; }
        
        /* Loading state */
        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .skeleton-card {
          height: 350px;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .skeleton-image {
          height: 180px;
          width: 100%;
        }
        
        .skeleton-content {
          padding: 20px;
        }
        
        .skeleton-title {
          height: 24px;
          margin-bottom: 15px;
          width: 80%;
        }
        
        .skeleton-description {
          height: 60px;
          margin-bottom: 15px;
        }
        
        .skeleton-meta {
          height: 20px;
          width: 60%;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .journals-header {
            padding: 60px 15px;
          }
          
          .journals-title {
            font-size: 2.2rem;
          }
          
          .journals-subtitle {
            font-size: 1rem;
          }
          
          .search-bar {
            flex-direction: column;
            background: none;
            border: none;
            padding: 0;
            gap: 10px;
          }
          
          .search-input {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 50px;
            width: 100%;
          }
          
          .search-button {
            width: 100%;
            padding: 15px;
          }
          
          .filter-container {
            overflow-x: auto;
            padding-bottom: 10px;
            justify-content: flex-start;
            flex-wrap: nowrap;
          }
          
          .journals-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
          }
        }
        
        @media (max-width: 480px) {
          .journals-header {
            padding: 50px 15px;
          }
          
          .journals-title {
            font-size: 1.8rem;
          }
          
          .journals-content {
            padding: 30px 15px;
          }
          
          .journals-grid {
            grid-template-columns: 1fr;
          }
          
          .filter-button {
            font-size: 0.8rem;
            padding: 6px 12px;
          }
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div className="journals-page">
        <header className="journals-header" style={{ marginTop: '60px' }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <Link to="/" style={{ 
            textDecoration: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            color: 'white', 
            fontSize: '1rem',
            fontWeight: '600',
            padding: '8px 16px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            ← Back to Home
          </Link>
        </div>
        <h1 className="journals-title">Academic Journals</h1>
        <p className="journals-subtitle">
          Explore our collection of peer-reviewed journals spanning various disciplines,
          featuring cutting-edge research and scholarly articles.
        </p>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search journals by title, topic, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">Search</button>
        </div>
      </header>

      <main className="journals-content">
        <div className="filter-container">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-button ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {!isLoaded ? (
          <div className="journals-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="skeleton-card">
                <div className="skeleton-image skeleton"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title skeleton"></div>
                  <div className="skeleton-description skeleton"></div>
                  <div className="skeleton-meta skeleton"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredJournals.length > 0 ? (
          <div className="journals-grid">
            {filteredJournals.map((journal) => (
              <div key={journal.id} className="journal-card">
                <img
                  src={journal.coverImage}
                  alt={journal.title}
                  className="journal-image"
                  loading="lazy"
                />
                <div className="journal-content">
                  <h2 className="journal-title">{journal.title}</h2>
                  <p className="journal-description">{journal.description}</p>
                  <div className="journal-meta">
                    <span className="journal-impact">Impact Factor: {journal.impactFactor}</span>
                  </div>
                  <div className="journal-tags">
                    {journal.tags.map((tag, index) => (
                      <span key={index} className="journal-tag">{tag}</span>
                    ))}
                  </div>
                  <Link to={`/journals/${journal.id}`} className="journal-link">
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No journals found matching your criteria</h3>
            <p>Try adjusting your search or filter settings</p>
          </div>
        )}
      </main>
    </div>
  );
}
