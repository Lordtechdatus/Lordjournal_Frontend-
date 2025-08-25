import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DatabasesPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDatabase, setExpandedDatabase] = useState(null);

  // Mock database data
  const databases = [
    {
      id: 1,
      name: "Global Research Archive",
      category: "multidisciplinary",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=500&auto=format&fit=crop&q=80",
      description: "Comprehensive database covering research across multiple disciplines with over 10 million scholarly articles.",
      coverage: "1950-present",
      contentTypes: ["Journal Articles", "Conference Papers", "Books", "Reports"],
      accessModel: "Subscription",
      updateFrequency: "Daily",
      specialFeatures: [
        "Advanced search algorithms",
        "Citation analysis tools",
        "Full-text access",
        "Personalized alerts"
      ]
    },
    {
      id: 2,
      name: "Medical Sciences Database",
      category: "medical",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&auto=format&fit=crop&q=80",
      description: "Specialized database for medical research, clinical trials, and healthcare studies from leading institutions.",
      coverage: "1980-present",
      contentTypes: ["Journal Articles", "Clinical Trials", "Case Studies", "Medical Guidelines"],
      accessModel: "Subscription with institutional options",
      updateFrequency: "Weekly",
      specialFeatures: [
        "Disease classification search",
        "Patient outcome data",
        "Drug interaction tools",
        "Medical imaging library"
      ]
    },
    {
      id: 3,
      name: "Engineering Knowledge Base",
      category: "engineering",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&auto=format&fit=crop&q=80",
      description: "Technical database covering all engineering disciplines with technical papers, standards, and patents.",
      coverage: "1970-present",
      contentTypes: ["Technical Papers", "Standards", "Patents", "Design Specifications"],
      accessModel: "Tiered subscription",
      updateFrequency: "Monthly",
      specialFeatures: [
        "CAD model integration",
        "Material property search",
        "Technical drawing viewer",
        "Engineering calculators"
      ]
    },
    {
      id: 4,
      name: "Social Sciences Repository",
      category: "social",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&auto=format&fit=crop&q=80",
      description: "Extensive collection of research in sociology, psychology, economics, and related fields.",
      coverage: "1960-present",
      contentTypes: ["Journal Articles", "Case Studies", "Survey Data", "Qualitative Research"],
      accessModel: "Subscription with open access options",
      updateFrequency: "Bi-weekly",
      specialFeatures: [
        "Demographic data analysis",
        "Survey methodology tools",
        "Statistical analysis integration",
        "Qualitative coding assistance"
      ]
    },
    {
      id: 5,
      name: "Environmental Science Data Center",
      category: "environmental",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=80",
      description: "Database focused on climate research, biodiversity, conservation, and environmental policy studies.",
      coverage: "1975-present",
      contentTypes: ["Research Papers", "Climate Data", "Species Records", "Policy Documents"],
      accessModel: "Mixed (subscription and open access)",
      updateFrequency: "Weekly",
      specialFeatures: [
        "Geographic information system (GIS) integration",
        "Climate model data access",
        "Species distribution mapping",
        "Environmental impact assessment tools"
      ]
    },
    {
      id: 6,
      name: "Historical Archives Digital Collection",
      category: "humanities",
      image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&auto=format&fit=crop&q=80",
      description: "Digitized historical documents, manuscripts, and artifacts from major archives and museums worldwide.",
      coverage: "Antiquity-present",
      contentTypes: ["Manuscripts", "Historical Documents", "Artifacts", "Maps"],
      accessModel: "Institutional subscription",
      updateFrequency: "Quarterly",
      specialFeatures: [
        "High-resolution document viewer",
        "Paleographic analysis tools",
        "Timeline visualization",
        "Cross-reference with historical events"
      ]
    },
    {
      id: 7,
      name: "Business & Economics Intelligence",
      category: "business",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80",
      description: "Comprehensive database of business research, market reports, economic indicators, and financial data.",
      coverage: "1990-present",
      contentTypes: ["Research Papers", "Market Reports", "Financial Data", "Case Studies"],
      accessModel: "Premium subscription",
      updateFrequency: "Daily",
      specialFeatures: [
        "Real-time market data integration",
        "Company financial analysis tools",
        "Economic forecasting models",
        "Industry benchmarking"
      ]
    },
    {
      id: 8,
      name: "Computer Science Knowledge Graph",
      category: "technology",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80",
      description: "Specialized database for computer science research, algorithms, software engineering, and AI studies.",
      coverage: "1985-present",
      contentTypes: ["Research Papers", "Code Repositories", "Technical Documentation", "Datasets"],
      accessModel: "Subscription with academic discounts",
      updateFrequency: "Weekly",
      specialFeatures: [
        "Code snippet search",
        "Algorithm visualization",
        "Dataset integration",
        "Machine learning model repository"
      ]
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Databases' },
    { id: 'multidisciplinary', name: 'Multidisciplinary' },
    { id: 'medical', name: 'Medical' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'social', name: 'Social Sciences' },
    { id: 'environmental', name: 'Environmental' },
    { id: 'humanities', name: 'Humanities' },
    { id: 'business', name: 'Business' },
    { id: 'technology', name: 'Technology' }
  ];

  // Filter databases based on active filter and search query
  const filteredDatabases = databases.filter(database => {
    const matchesCategory = activeFilter === 'all' || database.category === activeFilter;
    const matchesSearch = searchQuery === '' || 
      database.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      database.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      database.contentTypes.some(type => type.toLowerCase().includes(searchQuery.toLowerCase()));
    
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

  // Toggle database details
  const toggleDatabaseDetails = (databaseId) => {
    if (expandedDatabase === databaseId) {
      setExpandedDatabase(null);
    } else {
      setExpandedDatabase(databaseId);
    }
  };

  // Inject styles once
  useEffect(() => {
    const STYLE_ID = "databases-page-styles";
    if (!document.getElementById(STYLE_ID)) {
      const styleTag = document.createElement("style");
      styleTag.id = STYLE_ID;
      styleTag.innerHTML = `
        /* Databases Page Styles */
        .databases-page {
          min-height: 100vh;
          background-color: #f8f9fa;
          padding-bottom: 60px;
        }
        
        .databases-header {
          background: linear-gradient(135deg, #006064 0%, #00acc1 100%);
          color: white;
          padding: 80px 20px;
          text-align: center;
          position: relative;
        }
        
        .databases-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        
        .databases-subtitle {
          font-size: clamp(1rem, 2vw, 1.3rem);
          max-width: 800px;
          margin: 0 auto 2rem;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          text-decoration: none;
          display: flex;
          align-items: center;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 20px;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .back-button:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-2px);
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
          color: #006064;
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
        
        .databases-content {
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
          background: #006064;
          color: white;
          border-color: #006064;
        }
        
        .databases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }
        
        .database-card {
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
        
        .database-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .database-image {
          height: 180px;
          width: 100%;
          object-fit: cover;
        }
        
        .database-content {
          padding: 25px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .database-name {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: #006064;
          line-height: 1.3;
        }
        
        .database-description {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 15px;
        }
        
        .database-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          color: #666;
        }
        
        .meta-label {
          font-weight: 600;
          margin-right: 5px;
          color: #444;
        }
        
        .content-types {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 15px;
        }
        
        .content-type {
          background: #e0f7fa;
          color: #006064;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .database-details-button {
          display: inline-block;
          margin-top: auto;
          color: #006064;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          background: none;
          text-align: left;
          padding: 0;
        }
        
        .database-details-button:hover {
          color: #00838f;
          text-decoration: underline;
        }
        
        .database-features {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
          font-size: 0.9rem;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .database-features.expanded {
          max-height: 300px;
          opacity: 1;
          margin-bottom: 10px;
        }
        
        .features-title {
          font-weight: 600;
          margin-bottom: 10px;
          color: #006064;
        }
        
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .feature-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 8px;
          font-size: 0.9rem;
          color: #555;
        }
        
        .feature-icon {
          color: #006064;
          margin-right: 8px;
          font-size: 0.8rem;
          margin-top: 4px;
        }
        
        .access-button {
          display: inline-block;
          margin-top: 15px;
          background: #006064;
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .access-button:hover {
          background: #00838f;
          transform: translateY(-2px);
        }
        
        .no-results {
          text-align: center;
          padding: 40px;
          color: #666;
          font-size: 1.1rem;
          grid-column: 1 / -1;
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
        .database-card:nth-child(1) { animation-delay: 0.1s; }
        .database-card:nth-child(2) { animation-delay: 0.2s; }
        .database-card:nth-child(3) { animation-delay: 0.3s; }
        .database-card:nth-child(4) { animation-delay: 0.4s; }
        .database-card:nth-child(5) { animation-delay: 0.5s; }
        .database-card:nth-child(6) { animation-delay: 0.6s; }
        .database-card:nth-child(7) { animation-delay: 0.7s; }
        .database-card:nth-child(8) { animation-delay: 0.8s; }
        
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
          height: 450px;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .skeleton-image {
          height: 180px;
          width: 100%;
        }
        
        .skeleton-content {
          padding: 25px;
        }
        
        .skeleton-name {
          height: 24px;
          margin-bottom: 10px;
          width: 80%;
        }
        
        .skeleton-description {
          height: 60px;
          margin-bottom: 15px;
        }
        
        .skeleton-meta {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .skeleton-meta-item {
          height: 20px;
          width: 100px;
        }
        
        .skeleton-tags {
          display: flex;
          gap: 5px;
          margin-bottom: 15px;
        }
        
        .skeleton-tag {
          height: 24px;
          width: 80px;
          border-radius: 20px;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .databases-header {
            padding: 60px 15px;
          }
          
          .databases-title {
            font-size: 2.2rem;
          }
          
          .databases-subtitle {
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
          
          .databases-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }
        }
        
        @media (max-width: 480px) {
          .databases-header {
            padding: 50px 15px;
          }
          
          .databases-title {
            font-size: 1.8rem;
          }
          
          .databases-content {
            padding: 30px 15px;
          }
          
          .databases-grid {
            grid-template-columns: 1fr;
          }
          
          .filter-button {
            font-size: 0.8rem;
            padding: 6px 12px;
          }
          
          .database-content {
            padding: 20px;
          }
          
          .database-name {
            font-size: 1.2rem;
          }
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div className="databases-page">
      <header className="databases-header" style={{ marginTop: '70px' }}>
        {/* Removed back button as we now have the header navigation */}
        <h1 className="databases-title">Research Databases</h1>
        <p className="databases-subtitle">
          Access our comprehensive collection of specialized academic databases covering various fields of study
        </p>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search databases by name, content type, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">Search</button>
        </div>
      </header>

      <main className="databases-content">
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
          <div className="databases-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="skeleton-card">
                <div className="skeleton-image skeleton"></div>
                <div className="skeleton-content">
                  <div className="skeleton-name skeleton"></div>
                  <div className="skeleton-description skeleton"></div>
                  <div className="skeleton-meta">
                    <div className="skeleton-meta-item skeleton"></div>
                    <div className="skeleton-meta-item skeleton"></div>
                  </div>
                  <div className="skeleton-tags">
                    <div className="skeleton-tag skeleton"></div>
                    <div className="skeleton-tag skeleton"></div>
                    <div className="skeleton-tag skeleton"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredDatabases.length > 0 ? (
          <div className="databases-grid">
            {filteredDatabases.map((database) => (
              <div key={database.id} className="database-card">
                <img
                  src={database.image}
                  alt={database.name}
                  className="database-image"
                  loading="lazy"
                />
                <div className="database-content">
                  <h2 className="database-name">{database.name}</h2>
                  <p className="database-description">{database.description}</p>
                  
                  <div className="database-meta">
                    <div className="meta-item">
                      <span className="meta-label">Coverage:</span>
                      {database.coverage}
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Updates:</span>
                      {database.updateFrequency}
                    </div>
                  </div>
                  
                  <div className="content-types">
                    {database.contentTypes.slice(0, 3).map((type, index) => (
                      <span key={index} className="content-type">{type}</span>
                    ))}
                    {database.contentTypes.length > 3 && (
                      <span className="content-type">+{database.contentTypes.length - 3}</span>
                    )}
                  </div>
                  
                  <button 
                    className="database-details-button"
                    onClick={() => toggleDatabaseDetails(database.id)}
                  >
                    {expandedDatabase === database.id ? 'Hide Features' : 'Show Features'} →
                  </button>
                  
                  <div className={`database-features ${expandedDatabase === database.id ? 'expanded' : ''}`}>
                    <h3 className="features-title">Special Features</h3>
                    <ul className="features-list">
                      {database.specialFeatures.map((feature, index) => (
                        <li key={index} className="feature-item">
                          <span className="feature-icon">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a href="#" className="access-button">Access Database</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No databases found matching your criteria</h3>
            <p>Try adjusting your search or filter settings</p>
          </div>
        )}
      </main>
    </div>
  );
}
