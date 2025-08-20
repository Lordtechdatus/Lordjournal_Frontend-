import { Fragment, useEffect } from 'react';

const HOMEPAGE_STYLE_ID = 'homepage-inline-styles';

const styles = `
.hero-section {
  background: linear-gradient(135deg, #0052cc 0%, #007fff 50%, #0052cc 100%);
  color: #fff;
  text-align: center;
  width: 100%;
  padding: 120px 20px 40px 20px;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
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
  min-height: calc(100vh - 160px);
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 2rem;
  opacity: 0.95;
  max-width: 800px;
  margin: 0 auto 2rem auto;
  line-height: 1.5;
}

.search-container {
  margin: 2rem auto;
  max-width: 700px;
  display: flex;
  background: #fff;
  border-radius: 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  align-items: center;
  padding: 0.75rem;
  width: 100%;
}

.search-input {
  flex: 1;
  border: none;
  padding: 1.25rem 1.5rem;
  font-size: 0.95rem;
  outline: none;
  background: transparent;
  color: #333;
}

.search-button {
  background: #0052cc;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 40px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.search-button:hover {
  background: #003d99;
}

.advanced-search {
  color: #e3f2fd;
  text-decoration: none;
  font-size: 0.95rem;
  margin-top: 1.5rem;
  display: inline-block;
}

.advanced-search:hover {
  text-decoration: underline;
}

.card-section {
  background: #fafbfc;
  width: 100%;
  padding: 80px 20px;
  box-sizing: border-box;
}

.card-section-header {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;
}

.card-section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.card-section-subtitle {
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
}

.card-grid {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
}

.card-item {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s;
}

.card-item:hover {
  transform: translateY(-5px);
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
  transition: transform 0.5s;
}

.card-item:hover .card-image {
  transform: scale(1.05);
}

.card-content {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  margin: 1rem;
  border-radius: 12px;
  transition: background 0.3s;
}

.card-item:hover .card-content {
  background: rgba(255, 255, 255, 0.95);
}

.card-title {
  color: #1a1a1a;
  font-weight: 600;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 100px 20px 40px;
  }

  .search-container {
    flex-direction: column;
    border-radius: 20px;
  }

  .search-input {
    width: 100%;
    padding: 1rem;
    text-align: center;
  }

  .search-button {
    width: 100%;
    margin-top: 10px;
    padding: 0.8rem;
  }

  .card-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 90px 15px 30px;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }

  .card-section {
    padding: 50px 15px;
  }

  .card-section-title {
    font-size: 1.8rem;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }
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
  // Inject styles once
  useEffect(() => {
    if (!document.getElementById(HOMEPAGE_STYLE_ID)) {
      const tag = document.createElement('style');
      tag.id = HOMEPAGE_STYLE_ID;
      tag.type = 'text/css';
      tag.appendChild(document.createTextNode(styles));
      document.head.appendChild(tag);
    }
  }, []);

  const cards = [
    { title: 'Discover open access', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop' },
    { title: 'Publish with us', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop' },
    { title: 'Track your research', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' },
    { title: 'Featured articles and journals', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop' },
    { title: 'Browse by subject', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop' },
    { title: 'About Lord Journal Link', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop' },
  ];

  return (
    <Fragment>
      <HeroSection />
      <CardSection cards={cards} />
    </Fragment>
  );
}

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Search for research articles, academic books and more</h1>
        <p className="hero-subtitle">
          Access millions of research papers, journals, and academic resources from leading publishers worldwide
        </p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search articles, journals, authors..."
            className="search-input"
          />
          <button className="search-button">
            🔍 Search
          </button>
        </div>
        <a href="#" className="advanced-search">
          Advanced search options
        </a>
      </div>
    </section>
  );
}

function CardSection({ cards }) {
  return (
    <section className="card-section">
      <div className="card-section-header">
        <h2 className="card-section-title">Explore Our Services</h2>
        <p className="card-section-subtitle">
          Discover comprehensive academic resources and tools designed to support your research journey
        </p>
      </div>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div key={index} className="card-item">
            <img
              src={card.image}
              alt={card.title}
              className="card-image"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = svgFallbackDataUrl('Image Unavailable');
              }}
            />
            <div className="card-content">
              <div className="card-title">{card.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Homepage;
