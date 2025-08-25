import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BooksPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBook, setExpandedBook] = useState(null);

  // Mock book data
  const books = [
    {
      id: 1,
      title: "Advanced Research Methodologies",
      author: "Dr. Sarah Johnson",
      category: "research",
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=80",
      description: "A comprehensive guide to research methodologies across various disciplines, featuring case studies and practical applications.",
      publicationDate: "2023",
      publisher: "Lord Academic Press",
      pages: 412,
      isbn: "978-3-16-148410-0",
      tags: ["Research", "Methodology", "Academic"]
    },
    {
      id: 2,
      title: "Principles of Quantum Computing",
      author: "Prof. Michael Chen",
      category: "technology",
      coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=80",
      description: "Explores the fundamental concepts of quantum computing and its potential applications in solving complex problems.",
      publicationDate: "2022",
      publisher: "Lord Scientific Publications",
      pages: 356,
      isbn: "978-1-56619-909-4",
      tags: ["Quantum", "Computing", "Technology"]
    },
    {
      id: 3,
      title: "Global Climate Change: Analysis and Solutions",
      author: "Dr. Emma Rodriguez",
      category: "environmental",
      coverImage: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500&auto=format&fit=crop&q=80",
      description: "An in-depth analysis of climate change data with proposed solutions for mitigation and adaptation strategies.",
      publicationDate: "2023",
      publisher: "Lord Environmental Press",
      pages: 480,
      isbn: "978-0-12-345678-9",
      tags: ["Climate", "Environment", "Sustainability"]
    },
    {
      id: 4,
      title: "Modern Approaches to Healthcare Management",
      author: "Dr. James Wilson",
      category: "medical",
      coverImage: "https://images.unsplash.com/photo-1585435557343-3b348031e799?w=500&auto=format&fit=crop&q=80",
      description: "Examines contemporary healthcare management strategies with a focus on efficiency, quality, and patient outcomes.",
      publicationDate: "2022",
      publisher: "Lord Medical Publications",
      pages: 328,
      isbn: "978-3-16-148410-1",
      tags: ["Healthcare", "Management", "Medical"]
    },
    {
      id: 5,
      title: "Artificial Intelligence: Ethics and Implementation",
      author: "Prof. David Thompson",
      category: "technology",
      coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=80",
      description: "Addresses the ethical considerations and practical implementation of artificial intelligence across various sectors.",
      publicationDate: "2023",
      publisher: "Lord Tech Press",
      pages: 392,
      isbn: "978-0-13-601970-1",
      tags: ["AI", "Ethics", "Technology"]
    },
    {
      id: 6,
      title: "Behavioral Economics: Decision Making Processes",
      author: "Dr. Lisa Martinez",
      category: "economics",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80",
      description: "Explores how psychological factors influence economic decisions and market behaviors.",
      publicationDate: "2022",
      publisher: "Lord Economics Publications",
      pages: 304,
      isbn: "978-1-4028-9462-6",
      tags: ["Economics", "Psychology", "Behavior"]
    },
    {
      id: 7,
      title: "Contemporary Literary Theory",
      author: "Prof. Robert Anderson",
      category: "humanities",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=80",
      description: "A critical examination of modern literary theories and their application in textual analysis.",
      publicationDate: "2023",
      publisher: "Lord Humanities Press",
      pages: 276,
      isbn: "978-0-684-84328-5",
      tags: ["Literature", "Theory", "Humanities"]
    },
    {
      id: 8,
      title: "International Law in the Digital Age",
      author: "Dr. Thomas Clark",
      category: "law",
      coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=80",
      description: "Analyzes how digital technologies are reshaping international law and governance frameworks.",
      publicationDate: "2022",
      publisher: "Lord Legal Publications",
      pages: 420,
      isbn: "978-0-19-953532-1",
      tags: ["Law", "Digital", "International"]
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Books' },
    { id: 'research', name: 'Research' },
    { id: 'technology', name: 'Technology' },
    { id: 'environmental', name: 'Environmental' },
    { id: 'medical', name: 'Medical' },
    { id: 'economics', name: 'Economics' },
    { id: 'humanities', name: 'Humanities' },
    { id: 'law', name: 'Law' }
  ];

  // Filter books based on active category and search query
  const filteredBooks = books.filter(book => {
    const matchesCategory = activeCategory === 'all' || book.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
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

  // Toggle book details
  const toggleBookDetails = (bookId) => {
    if (expandedBook === bookId) {
      setExpandedBook(null);
    } else {
      setExpandedBook(bookId);
    }
  };

  // Inject styles once
  useEffect(() => {
    const STYLE_ID = "books-page-styles";
    if (!document.getElementById(STYLE_ID)) {
      const styleTag = document.createElement("style");
      styleTag.id = STYLE_ID;
      styleTag.innerHTML = `
        /* Books Page Styles */
        .books-page {
          min-height: 100vh;
          background-color: #f8f9fa;
          padding-bottom: 60px;
        }
        
        .books-header {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
          padding: 80px 20px;
          text-align: center;
          position: relative;
        }
        
        .books-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        
        .books-subtitle {
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
          color: #2c3e50;
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
        
        .books-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        
        .category-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
          justify-content: center;
        }
        
        .category-tab {
          background: white;
          border: 1px solid #e0e0e0;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .category-tab:hover {
          background: #f0f0f0;
        }
        
        .category-tab.active {
          background: #2c3e50;
          color: white;
          border-color: #2c3e50;
        }
        
        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }
        
        .book-card {
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
          position: relative;
        }
        
        .book-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .book-cover {
          height: 320px;
          width: 100%;
          object-fit: cover;
        }
        
        .book-content {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .book-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 5px;
          color: #2c3e50;
          line-height: 1.3;
        }
        
        .book-author {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 10px;
          font-style: italic;
        }
        
        .book-description {
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 15px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .book-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }
        
        .book-year {
          background: #f0f7ff;
          color: #2c3e50;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        .book-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 10px;
        }
        
        .book-tag {
          background: #f5f5f5;
          color: #666;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
        }
        
        .book-details-button {
          display: inline-block;
          margin-top: 15px;
          color: #2c3e50;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: color 0.2s;
          cursor: pointer;
          border: none;
          background: none;
          text-align: left;
          padding: 0;
        }
        
        .book-details-button:hover {
          color: #1a252f;
          text-decoration: underline;
        }
        
        .book-details {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
          font-size: 0.9rem;
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .book-details.expanded {
          opacity: 1;
          max-height: 200px;
        }
        
        .book-details-row {
          display: flex;
          margin-bottom: 8px;
        }
        
        .book-details-label {
          font-weight: 600;
          min-width: 100px;
          color: #2c3e50;
        }
        
        .book-details-value {
          color: #666;
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
        .book-card:nth-child(1) { animation-delay: 0.1s; }
        .book-card:nth-child(2) { animation-delay: 0.2s; }
        .book-card:nth-child(3) { animation-delay: 0.3s; }
        .book-card:nth-child(4) { animation-delay: 0.4s; }
        .book-card:nth-child(5) { animation-delay: 0.5s; }
        .book-card:nth-child(6) { animation-delay: 0.6s; }
        .book-card:nth-child(7) { animation-delay: 0.7s; }
        .book-card:nth-child(8) { animation-delay: 0.8s; }
        
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
        
        .skeleton-cover {
          height: 320px;
          width: 100%;
        }
        
        .skeleton-content {
          padding: 20px;
        }
        
        .skeleton-title {
          height: 24px;
          margin-bottom: 10px;
          width: 80%;
        }
        
        .skeleton-author {
          height: 18px;
          margin-bottom: 15px;
          width: 60%;
        }
        
        .skeleton-description {
          height: 60px;
          margin-bottom: 15px;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .books-header {
            padding: 60px 15px;
          }
          
          .books-title {
            font-size: 2.2rem;
          }
          
          .books-subtitle {
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
          
          .category-tabs {
            overflow-x: auto;
            padding-bottom: 10px;
            justify-content: flex-start;
            flex-wrap: nowrap;
          }
          
          .books-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
          }
          
          .book-cover {
            height: 280px;
          }
        }
        
        @media (max-width: 480px) {
          .books-header {
            padding: 50px 15px;
          }
          
          .books-title {
            font-size: 1.8rem;
          }
          
          .books-content {
            padding: 30px 15px;
          }
          
          .books-grid {
            grid-template-columns: 1fr;
          }
          
          .category-tab {
            font-size: 0.8rem;
            padding: 6px 12px;
          }
          
          .book-cover {
            height: 240px;
          }
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div className="books-page">
      <header className="books-header" style={{ marginTop: '70px' }}>
        {/* Removed back button as we now have the header navigation */}
        <h1 className="books-title">Academic Books Collection</h1>
        <p className="books-subtitle">
          Discover our comprehensive collection of scholarly books covering a wide range of academic disciplines
        </p>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search books by title, author, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">Search</button>
        </div>
      </header>

      <main className="books-content">
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {!isLoaded ? (
          <div className="books-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="skeleton-card">
                <div className="skeleton-cover skeleton"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title skeleton"></div>
                  <div className="skeleton-author skeleton"></div>
                  <div className="skeleton-description skeleton"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="books-grid">
            {filteredBooks.map((book) => (
              <div key={book.id} className="book-card">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="book-cover"
                  loading="lazy"
                />
                <div className="book-content">
                  <h2 className="book-title">{book.title}</h2>
                  <p className="book-author">by {book.author}</p>
                  <p className="book-description">{book.description}</p>
                  <div className="book-meta">
                    <span className="book-year">{book.publicationDate}</span>
                  </div>
                  <div className="book-tags">
                    {book.tags.map((tag, index) => (
                      <span key={index} className="book-tag">{tag}</span>
                    ))}
                  </div>
                  <button 
                    className="book-details-button"
                    onClick={() => toggleBookDetails(book.id)}
                  >
                    {expandedBook === book.id ? 'Hide Details' : 'View Details'} →
                  </button>
                  <div className={`book-details ${expandedBook === book.id ? 'expanded' : ''}`}>
                    <div className="book-details-row">
                      <span className="book-details-label">Publisher:</span>
                      <span className="book-details-value">{book.publisher}</span>
                    </div>
                    <div className="book-details-row">
                      <span className="book-details-label">Pages:</span>
                      <span className="book-details-value">{book.pages}</span>
                    </div>
                    <div className="book-details-row">
                      <span className="book-details-label">ISBN:</span>
                      <span className="book-details-value">{book.isbn}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No books found matching your criteria</h3>
            <p>Try adjusting your search or filter settings</p>
          </div>
        )}
      </main>
    </div>
  );
}
