import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HOMEPAGE_STYLE_ID = 'homepage-inline-styles';

const styles = `
/* Global smooth scrolling and prevent horizontal overflow */
html {
  scroll-behavior: smooth;
  overflow-x: hidden;
  max-width: 100vw;
}

body {
  overflow-x: hidden;
  max-width: 100vw;
}

/* Hero Section */
.hero-section {
  background-image: 
    linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%),
    url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=80');
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  color: #1a202c;
  text-align: center;
  width: 100%;
  max-width: 100vw;
  padding: 120px 20px 60px 20px;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%);
  pointer-events: none;
  z-index: 1;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 180px);
  position: relative;
  z-index: 2;
}

/* Optional modifier to nudge hero content right on large screens without overflow */
.hero-content.right-shift {
  margin-left: clamp(0px, 4vw, 48px);
  margin-right: clamp(0px, 0vw, 0px);
  align-items: flex-start;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 1.5rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease 0.3s forwards;
  color: #1a202c;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  margin-bottom: 3rem;
  opacity: 0;
  max-width: 800px;
  margin: 0 auto 3rem auto;
  line-height: 1.6;
  transform: translateY(30px);
  animation: fadeInUp 1s ease 0.6s forwards;
  color: #4a5568;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-container {
  margin: 2rem auto;
  max-width: 750px;
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 50px;
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.12),
    0 5px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  align-items: center;
  padding: 0.75rem;
  width: 100%;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease 0.9s forwards;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(255, 255, 255, 0.6);
  position: relative;
  overflow: hidden;
}

.search-results {
  max-width: 750px;
  width: 100%;
  margin: 1rem auto 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 24px;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.08),
    0 5px 15px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  animation: fadeInUp 0.4s ease forwards;
}

.search-result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  text-decoration: none;
  color: #1a1a1a;
  transition: background-color 0.2s ease;
}

.search-result-item:hover {
  background: #f7fafc;
}

.search-result-title {
  font-weight: 600;
}

.search-result-link {
  color: #0052cc;
  font-weight: 600;
}

.search-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%);
  border-radius: 50px;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.search-container:hover {
  transform: translateY(-3px);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 8px 30px rgba(0, 82, 204, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

.search-container:hover::before {
  opacity: 1;
}

.search-input {
  flex: 1;
  border: none;
  padding: 1.2rem 2rem;
  font-size: 1.1rem;
  outline: none;
  background: transparent;
  color: #333;
  font-weight: 500;
  position: relative;
  z-index: 2;
  border-radius: 40px;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: #666;
  font-weight: 400;
}

.search-button {
  background: linear-gradient(135deg, #0052cc 0%, #007fff 100%);
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 40px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px rgba(0, 82, 204, 0.25);
  position: relative;
  overflow: hidden;
  z-index: 2;
  min-width: 120px;
}

.search-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
}

.search-button:hover::before {
  left: 100%;
}

.search-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 30px rgba(0, 82, 204, 0.35);
  background: linear-gradient(135deg, #0041a3 0%, #0066cc 100%);
}

.search-button:active {
  transform: translateY(0);
}

.advanced-search {
  color: #4a5568;
  text-decoration: none;
  font-size: 1rem;
  margin-top: 2rem;
  display: inline-block;
  opacity: 0;
  animation: fadeInUp 1s ease 1.2s forwards;
  transition: all 0.3s ease;
  font-weight: 500;
  border-bottom: 1px solid transparent;
}

.advanced-search:hover {
  color: #0052cc;
  transform: translateY(-2px);
  border-bottom-color: #0052cc;
  text-shadow: none;
}

/* Card Section */
.card-section {
  background: linear-gradient(180deg, #fafbfc 0%, #f8f9fa 100%);
  width: 100%;
  padding: 100px 20px;
  box-sizing: border-box;
  position: relative;
}

.card-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(180deg, rgba(248, 249, 250, 0) 0%, rgba(248, 249, 250, 1) 100%);
  pointer-events: none;
}

.card-section-header {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease 0.3s forwards;
}

.card-section-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  position: relative;
}

.card-section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #0052cc 0%, #007fff 100%);
  border-radius: 2px;
}

.card-section-subtitle {
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.6;
  font-weight: 400;
}

.card-grid {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  padding: 0 20px;
}

.card-item {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  opacity: 0;
  transform: translateY(50px);
  animation: fadeInUp 0.8s ease forwards;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-item:nth-child(1) { animation-delay: 0.1s; }
.card-item:nth-child(2) { animation-delay: 0.2s; }
.card-item:nth-child(3) { animation-delay: 0.3s; }
.card-item:nth-child(4) { animation-delay: 0.4s; }
.card-item:nth-child(5) { animation-delay: 0.5s; }
.card-item:nth-child(6) { animation-delay: 0.6s; }

.card-item:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  filter: brightness(0.9);
}

.card-item:hover .card-image {
  transform: scale(1.1);
  filter: brightness(0.7);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 82, 204, 0.1) 0%, rgba(0, 168, 255, 0.2) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.card-item:hover .card-overlay {
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 2;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  backdrop-filter: blur(20px);
  padding: 2rem;
  margin: 1.5rem;
  border-radius: 16px;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.card-item:hover .card-content {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%);
  transform: translateY(-5px);
}

.card-title {
  color: #1a1a1a;
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.card-item:hover .card-title {
  color: #0052cc;
}

.card-description {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: 1;
  transform: none;
  transition: all 0.3s ease;
}



/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    padding: 100px 0 50px;
    background-attachment: scroll;
    background-image: 
      linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 250, 252, 0.92) 100%),
      url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=80');
    overflow: hidden;
    width: 100vw;
    max-width: 100vw;
  }

  /* Make hero content and search area span full viewport width on mobile */
  .hero-content {
    max-width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0;
  }

  .search-container {
    flex-direction: column;
    border-radius: 30px;
    padding: 1.25rem;
    max-width: 100%;
    width: calc(100% - 30px);
    margin-left: 15px;
    margin-right: 15px;
    gap: 1rem;
  }

  .search-results {
    width: 100%;
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
  }

  .search-input {
    width: 100%;
    padding: 1rem 1.5rem;
    text-align: center;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.8);
  }

  .search-button {
    width: 100%;
    padding: 1rem 1.5rem;
    border-radius: 25px;
  }

  .card-grid {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 0 10px;
  }

  .card-section {
    padding: 80px 15px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 90px 0 40px;
    width: 100vw;
    max-width: 100vw;
  }

  .hero-content {
    max-width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    margin: 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .search-results {
    width: calc(100% - 20px);
    margin: 1rem 10px 0;
    border-radius: 20px;
  }

  .search-container {
    max-width: calc(100% - 20px);
    width: calc(100% - 20px);
    border-radius: 25px;
    margin: 1rem 10px 0;
    padding: 1rem;
  }

  .card-section {
    padding: 60px 10px;
  }

  .card-section-title {
    font-size: 2rem;
  }

  .card-item {
    min-height: 250px;
  }

  .card-content {
    padding: 1.5rem;
    margin: 1rem;
  }
}

/* Loading animation */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.loading {
  animation: pulse 2s ease-in-out infinite;
}
`;

function svgFallbackDataUrl(text = 'Image Unavailable') {
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#e9eef7'/>
        <stop offset='100%' stop-color='#cfd9ea'/>
      </linearGradient>
    </defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
          font-family='Arial, sans-serif' font-size='20' fill='#334155'>
      ${text}
    </text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function Homepage() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Inject styles once
  useEffect(() => {
    if (!document.getElementById(HOMEPAGE_STYLE_ID)) {
      const tag = document.createElement('style');
      tag.id = HOMEPAGE_STYLE_ID;
      tag.type = 'text/css';
      tag.appendChild(document.createTextNode(styles));
      document.head.appendChild(tag);
    }

    // Preload images
    const timer = setTimeout(() => setImagesLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const cards = [
    {
      title: 'Discover Open Access',
      description: 'Explore thousands of freely available research papers and academic resources.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80'
    },
    {
      title: 'Publish with Us',
      description: 'Share your research with the global academic community through our publishing platform.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80'
    },
    {
      title: 'Track Your Research',
      description: 'Monitor citations, impact metrics, and collaboration opportunities for your work.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80'
    },
    {
      title: 'Featured Articles',
      description: 'Discover trending research and breakthrough studies across all disciplines.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80'
    },
    {
      title: 'Browse by Subject',
      description: 'Navigate through organized categories to find research in your field of interest.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80'
    },
    {
      title: 'About Lord Journals',
      description: 'Learn more about our mission to advance academic research and scholarly communication.',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80'
    },
  ];

  return (
    <Fragment>
      <HeroSection />
      <CardSection cards={cards} imagesLoaded={imagesLoaded} />
    </Fragment>
  );
}

function HeroSection() {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);

  const journals = [
    { title: 'Lord Journal of Civil Engineering', route: '/journals/civil-engineering', keywords: ['civil', 'ljce', 'infrastructure'] },
    { title: 'Lord Journal of Mechanical Engineering', route: '/journals/mechanical-engineering', keywords: ['mechanical', 'ljme', 'manufacturing'] },
    { title: 'Lord Journal of Electronics', route: '/journals/electronics-engineering', keywords: ['electronics', 'ljee', 'embedded', 'vlsi', 'iot'] },
    { title: 'Lord Journal of Electrical Engineering', route: '/journals/electrical-engineering', keywords: ['electrical', 'power', 'grids', 'machines'] },
    { title: 'Lord Journal of Computer Science & Engineering (CSE)', route: '/journals/computer-science-engineering', keywords: ['computer', 'cse', 'software', 'networks', 'ai'] },
    { title: 'Lord Journal of Applied Science', route: '/journals/applied-science', keywords: ['applied', 'physics', 'chemistry', 'materials'] },
    { title: 'Lord Journal of Artificial Intelligence, Machine Learning & Data Science', route: '/journals/ai-ml-data-science', keywords: ['ai', 'ml', 'data', 'aimlds', 'nlp', 'vision'] },
    { title: 'Lord Journal of Law & Social Science', route: '/journals/law-social-science', keywords: ['law', 'social', 'justice', 'policy'] },
    { title: 'Lord Journal of Education', route: '/journals/education', keywords: ['education', 'learning', 'edtech'] },
  ];

  useEffect(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }
    const matches = journals.filter(j => {
      const hay = `${j.title} ${j.keywords.join(' ')}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 8);
    setResults(matches);
  }, [searchValue]);

  return (
   <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Discover Academic Excellence</h1>
        <p className="hero-subtitle">
          Access millions of research papers, journals, and academic resources from leading institutions worldwide
        </p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search articles, journals, authors, or keywords..."
            className="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoComplete="off"
          />
          <button className="search-button">
            🔍 Search
          </button>
        </div>
        {results.length > 0 && (
          <div className="search-results">
            {results.map((r, idx) => (
              <Link key={idx} to={r.route} className="search-result-item">
                <span className="search-result-title">{r.title}</span>
                <span className="search-result-link">Open →</span>
              </Link>
            ))}
          </div>
        )}
        {/* <a href="#services" className="advanced-search">
          Advanced search options →
        </a> */}
      </div>
    </section>
  );
}

function CardSection({ cards, imagesLoaded }) {
  return (
    <section className="card-section" id="services">
      <div className="card-section-header">
        <h2 className="card-section-title">Explore Our Services</h2>
        <p className="card-section-subtitle">
          Discover comprehensive academic resources and tools designed to support your research journey
        </p>
      </div>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div key={index} className={`card-item ${!imagesLoaded ? 'loading' : ''}`}>
            <img
              src={card.image}
              alt={card.title}
              className="card-image"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = svgFallbackDataUrl('Image Unavailable');
              }}
              loading="lazy"
            />
            <div className="card-overlay"></div>
            <div className="card-content">
              <div className="card-title">{card.title}</div>
              <div className="card-description">{card.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Homepage;
