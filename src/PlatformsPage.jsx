import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PlatformsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Mock platform data
  const platforms = [
    {
      id: 1,
      name: "Lord Research Hub",
      category: "research",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&auto=format&fit=crop&q=80",
      description: "A comprehensive platform for researchers to access journals, papers, and collaborate with peers worldwide.",
      features: [
        "Access to over 10,000 research papers",
        "Collaboration tools for research teams",
        "Advanced search algorithms",
        "Citation management tools",
        "Research metrics and analytics"
      ],
      pricing: "Subscription based with institutional access options",
      rating: 4.8
    },
    {
      id: 2,
      name: "Lord Clinical Trials",
      category: "medical",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&auto=format&fit=crop&q=80",
      description: "Platform designed for medical researchers to manage clinical trials, collect data, and analyze results.",
      features: [
        "Patient recruitment and management",
        "Data collection and validation",
        "Regulatory compliance tools",
        "Statistical analysis features",
        "Integration with medical devices"
      ],
      pricing: "Enterprise pricing with custom packages",
      rating: 4.7
    },
    {
      id: 3,
      name: "EduConnect",
      category: "education",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&auto=format&fit=crop&q=80",
      description: "An educational platform connecting students with academic resources, courses, and expert educators.",
      features: [
        "Virtual classrooms and webinars",
        "Course material repository",
        "Progress tracking and assessments",
        "Peer learning communities",
        "Certification programs"
      ],
      pricing: "Free basic access with premium features",
      rating: 4.5
    },
    {
      id: 4,
      name: "DataViz Pro",
      category: "analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80",
      description: "Advanced data visualization and analytics platform for researchers and data scientists.",
      features: [
        "Interactive visualization tools",
        "Big data processing capabilities",
        "Machine learning integration",
        "Customizable dashboards",
        "Export in multiple formats"
      ],
      pricing: "Tiered subscription model",
      rating: 4.6
    },
    {
      id: 5,
      name: "Peer Review System",
      category: "publishing",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=80",
      description: "Streamlined platform for managing the academic peer review process for journals and publications.",
      features: [
        "Blind review management",
        "Reviewer matching algorithm",
        "Feedback collection tools",
        "Publication workflow automation",
        "Integration with major academic databases"
      ],
      pricing: "Based on publication volume",
      rating: 4.4
    },
    {
      id: 6,
      name: "Academic Conference Manager",
      category: "events",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&auto=format&fit=crop&q=80",
      description: "Complete solution for planning, managing, and hosting academic conferences and events.",
      features: [
        "Abstract submission and review",
        "Virtual conference hosting",
        "Scheduling and program creation",
        "Attendee registration and management",
        "Post-event analytics"
      ],
      pricing: "Per event with annual options",
      rating: 4.3
    }
  ];

  // Categories for tabs
  const categories = [
    { id: 'all', name: 'All Platforms' },
    { id: 'research', name: 'Research' },
    { id: 'medical', name: 'Medical' },
    { id: 'education', name: 'Education' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'publishing', name: 'Publishing' },
    { id: 'events', name: 'Events' }
  ];

  // Filter platforms based on active tab
  const filteredPlatforms = platforms.filter(platform => {
    return activeTab === 'all' || platform.category === activeTab;
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
    const STYLE_ID = "platforms-page-styles";
    if (!document.getElementById(STYLE_ID)) {
      const styleTag = document.createElement("style");
      styleTag.id = STYLE_ID;
      styleTag.innerHTML = `
        /* Platforms Page Styles */
        .platforms-page {
          min-height: 100vh;
          background-color: #f8f9fa;
          padding-bottom: 60px;
        }
        
        .platforms-header {
          background: linear-gradient(135deg, #1a3a8f 0%, #4169e1 100%);
          color: white;
          padding: 80px 20px;
          text-align: center;
          position: relative;
        }
        
        .platforms-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        
        .platforms-subtitle {
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
        
        .platforms-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        
        .tabs-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
          justify-content: center;
        }
        
        .tab {
          background: white;
          border: 1px solid #e0e0e0;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .tab:hover {
          background: #f0f0f0;
        }
        
        .tab.active {
          background: #1a3a8f;
          color: white;
          border-color: #1a3a8f;
        }
        
        .platforms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }
        
        .platform-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease forwards;
          height: 100%;
        }
        
        .platform-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        
        .platform-image {
          height: 200px;
          width: 100%;
          object-fit: cover;
        }
        
        .platform-content {
          padding: 25px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .platform-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        
        .platform-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1a3a8f;
          margin: 0;
        }
        
        .platform-rating {
          display: flex;
          align-items: center;
          background: #f0f7ff;
          color: #1a3a8f;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        .platform-rating-star {
          color: #ffc107;
          margin-right: 5px;
        }
        
        .platform-description {
          color: #666;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .platform-features {
          margin-bottom: 20px;
        }
        
        .features-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }
        
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          font-size: 0.95rem;
          color: #555;
        }
        
        .feature-icon {
          color: #1a3a8f;
          margin-right: 10px;
          font-size: 0.8rem;
        }
        
        .platform-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }
        
        .platform-pricing {
          font-size: 0.9rem;
          color: #666;
        }
        
        .platform-link {
          display: inline-block;
          color: #1a3a8f;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        
        .platform-link:hover {
          color: #0d2b6b;
          transform: translateX(3px);
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
        .platform-card:nth-child(1) { animation-delay: 0.1s; }
        .platform-card:nth-child(2) { animation-delay: 0.2s; }
        .platform-card:nth-child(3) { animation-delay: 0.3s; }
        .platform-card:nth-child(4) { animation-delay: 0.4s; }
        .platform-card:nth-child(5) { animation-delay: 0.5s; }
        .platform-card:nth-child(6) { animation-delay: 0.6s; }
        
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
          height: 500px;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .skeleton-image {
          height: 200px;
          width: 100%;
        }
        
        .skeleton-content {
          padding: 25px;
        }
        
        .skeleton-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        
        .skeleton-title {
          height: 28px;
          width: 70%;
        }
        
        .skeleton-rating {
          height: 28px;
          width: 60px;
          border-radius: 20px;
        }
        
        .skeleton-description {
          height: 80px;
          margin-bottom: 20px;
        }
        
        .skeleton-features {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .skeleton-feature {
          height: 16px;
          margin-bottom: 8px;
        }
        
        .skeleton-feature:nth-child(1) { width: 90%; }
        .skeleton-feature:nth-child(2) { width: 80%; }
        .skeleton-feature:nth-child(3) { width: 85%; }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .platforms-header {
            padding: 60px 15px;
          }
          
          .platforms-title {
            font-size: 2.2rem;
          }
          
          .platforms-subtitle {
            font-size: 1rem;
          }
          
          .tabs-container {
            overflow-x: auto;
            padding-bottom: 10px;
            justify-content: flex-start;
            flex-wrap: nowrap;
          }
          
          .platforms-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }
        }
        
        @media (max-width: 480px) {
          .platforms-header {
            padding: 50px 15px;
          }
          
          .platforms-title {
            font-size: 1.8rem;
          }
          
          .platforms-content {
            padding: 30px 15px;
          }
          
          .platforms-grid {
            grid-template-columns: 1fr;
          }
          
          .tab {
            font-size: 0.8rem;
            padding: 6px 12px;
          }
          
          .platform-content {
            padding: 20px;
          }
          
          .platform-name {
            font-size: 1.2rem;
          }
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div className="platforms-page">
      <header className="platforms-header" style={{ marginTop: '70px' }}>
        {/* Removed back button as we now have the header navigation */}
        <h1 className="platforms-title">Academic Platforms</h1>
        <p className="platforms-subtitle">
          Explore our suite of digital platforms designed to enhance research, education, and academic collaboration
        </p>
      </header>

      <main className="platforms-content">
        <div className="tabs-container">
          {categories.map(category => (
            <button
              key={category.id}
              className={`tab ${activeTab === category.id ? 'active' : ''}`}
              onClick={() => setActiveTab(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {!isLoaded ? (
          <div className="platforms-grid">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="skeleton-card">
                <div className="skeleton-image skeleton"></div>
                <div className="skeleton-content">
                  <div className="skeleton-header">
                    <div className="skeleton-title skeleton"></div>
                    <div className="skeleton-rating skeleton"></div>
                  </div>
                  <div className="skeleton-description skeleton"></div>
                  <div className="skeleton-features">
                    <div className="skeleton-feature skeleton"></div>
                    <div className="skeleton-feature skeleton"></div>
                    <div className="skeleton-feature skeleton"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPlatforms.length > 0 ? (
          <div className="platforms-grid">
            {filteredPlatforms.map((platform) => (
              <div key={platform.id} className="platform-card">
                <img
                  src={platform.image}
                  alt={platform.name}
                  className="platform-image"
                  loading="lazy"
                />
                <div className="platform-content">
                  <div className="platform-header">
                    <h2 className="platform-name">{platform.name}</h2>
                    <div className="platform-rating">
                      <span className="platform-rating-star">★</span>
                      {platform.rating}
                    </div>
                  </div>
                  <p className="platform-description">{platform.description}</p>
                  <div className="platform-features">
                    <h3 className="features-title">Key Features</h3>
                    <ul className="features-list">
                      {platform.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="feature-item">
                          <span className="feature-icon">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="platform-footer">
                    <div className="platform-pricing">{platform.pricing}</div>
                    <a href="#" className="platform-link">Learn More →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No platforms found in this category</h3>
            <p>Please select a different category</p>
          </div>
        )}
      </main>
    </div>
  );
}
