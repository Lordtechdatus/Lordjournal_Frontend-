import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HEADER_STYLE_ID = 'header-inline-styles';
const styles = `
.header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 0;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  min-height: 70px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 10px;
  transition: opacity 0.2s ease;
}

.logo-section:hover {
  opacity: 0.8;
}

.logo-image {
  height: 40px;
  width: auto;
}

.logo-placeholder {
  height: 40px;
  width: 40px;
  background: #0052cc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  border-radius: 4px;
}

.logo-text {
  margin: 0;
  font-size: 1.6rem;
  color: #0052cc;
  font-weight: 700;
}

.nav-menu {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}

.nav-link {
  color: #213547;
  font-weight: 500;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: nowrap;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  height: 100%;
  min-height: 40px;
}

.nav-link:hover {
  background: #f0f4ff;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
}

.nav-link-dropdown {
  color: #213547;
  font-weight: 500;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: nowrap;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  height: 100%;
  min-height: 40px;
}

.nav-link-dropdown:hover {
  background: #f0f4ff;
}

.dropdown-arrow {
  font-size: 12px;
  transition: transform 0.2s;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 80%;
  text-align: left;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  z-index: 1001;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: all 0.2s ease;
}

.dropdown-menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 10px 16px;
  color: #213547;
  text-decoration: none;
  text-align: left;
  font-size: 14px;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f5f5f5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: #f8f9fa;
  color: #0052cc;
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.login-button,
.logout-button {
  color: #213547;
  font-weight: 500;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
}

.mobile-nav {
  display: none;
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.mobile-nav.open {
  display: block;
}

.mobile-nav-link {
  display: block;
  padding: 15px 20px;
  color: #213547;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.mobile-dropdown {
  background: #f8f9fa;
}

.mobile-dropdown-item {
  display: block;
  padding: 12px 40px;
  color: #213547;
  text-decoration: none;
  font-size: 14px;
  border-bottom: 1px solid #e9ecef;
  transition: background-color 0.2s;
}

.mobile-dropdown-item:hover {
  background: #e9ecef;
  color: #0052cc;
}

@media (max-width: 900px) {
  .nav-menu { display: none; }
  .mobile-menu-button { display: block; }
  .header-container { padding: 0 1rem; }
}

@media (max-width: 480px) {
  .logo-text { font-size: 1.2rem; }
  .logo-image { height: 30px; }
}
`;

function Header({ onNavigate, currentPage }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Inject styles once
  useEffect(() => {
    if (!document.getElementById(HEADER_STYLE_ID)) {
      const tag = document.createElement('style');
      tag.id = HEADER_STYLE_ID;
      tag.type = 'text/css';
      tag.appendChild(document.createTextNode(styles));
      document.head.appendChild(tag);
    }
  }, []);

  // Initialize login state only once on mount
  useEffect(() => {
    try {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
    } catch (error) {
      console.warn('Error reading localStorage:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    try {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
    } catch (error) {
      console.warn('Error removing from localStorage:', error);
    }
  }, []);

  const handleLogin = useCallback(() => {
    navigate('/login');
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [navigate]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false); // Also close mobile dropdown when closing mobile menu
  }, []);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen(prev => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.nav-item')) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen, closeDropdown]);

  const journalCategories = [
    'Lord Journal of Civil Engineering',
    'Lord Journal of Mechanical Engineering',
    'Lord Journal of Electronics Engineering',
    'Lord Journal of Electrical Engineering',
    'Lord Journal of Computer Science & Engineering (CSE)',
    'Lord Journal of Applied Science',
    'Lord Journal of Artificial Intelligence, Machine Learning & Data Science',
    'Lord Journal of Law & Social Science',
    'Lord Journal of Education' 
  ];      

  const navItems = [
    { name: 'Journals', hasDropdown: true },
    { name: 'Publish with us', hasDropdown: false },
    { name: 'Submission Link', hasDropdown: false }
  ];

  // Skeleton while loading initial state
  if (isLoading) {
    return (
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo-section" style={{ textDecoration: 'none' }}>
            <div className="logo-placeholder">LJ</div>
            <h1 className="logo-text">Lord Journals</h1>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo-section" style={{ textDecoration: 'none' }}>
          <div className="logo-placeholder">LJ</div>
          <h1 className="logo-text">Lord Journals</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-menu" aria-label="Primary">
          {navItems.map((item, idx) => (
            <div key={`nav-${idx}`} className="nav-item">
              {item.hasDropdown ? (
                <>
                  <div
                    className="nav-link-dropdown"
                    onClick={toggleDropdown}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    {item.name}
                    <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
                  </div>
                  <div 
                    className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    {journalCategories.map((journal, jIdx) => {
                      let to = '#';
                      if (journal === 'Lord Journal of Civil Engineering') to = '/journals/civil-engineering';
                      if (journal === 'Lord Journal of Mechanical Engineering') to = '/journals/mechanical-engineering';
                      if (journal === 'Lord Journal of Electronics') to = '/journals/electronics-engineering';
                      if (journal === 'Lord Journal of Electrical Engineering') to = '/journals/electrical-engineering';
                      if (journal === 'Lord Journal of Computer Science & Engineering (CSE)') to = '/journals/computer-science-engineering';
                      if (journal === 'Lord Journal of Applied Science') to = '/journals/applied-science';
                      if (journal === 'Lord Journal of Artificial Intelligence, Machine Learning & Data Science') to = '/journals/ai-ml-data-science';
                      if (journal === 'Lord Journal of Law & Social Science') to = '/journals/law-social-science';
                      if (journal === 'Lord Journal of Education') to = '/journals/education';
                      return (
                        <Link
                          key={`journal-${jIdx}`}
                          to={to}
                          className="dropdown-item"
                          onClick={() => { closeDropdown(); }}
                        >
                          {journal}
                        </Link>
                      );
                    })}
                  </div>
                </>
              ) : (
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => e.preventDefault()}
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Right - Auth */}
        <div className="auth-section">
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
              <span role="img" aria-label="unlocked">🔓</span>
            </>
          ) : (
            <>
              <button onClick={handleLogin} className="login-button">
                Log in
              </button>
              <span role="img" aria-label="locked">🔐</span>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav open">
          {navItems.map((item, idx) => (
            <div key={`mobile-nav-${idx}`}>
              {item.hasDropdown ? (
                <>
                  <div
                    className="mobile-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileDropdownOpen(!mobileDropdownOpen);
                    }}
                  >
                    {item.name} <span className={`dropdown-arrow ${mobileDropdownOpen ? 'open' : ''}`}>▼</span>
                  </div>
                  {mobileDropdownOpen && (
                    <div className="mobile-dropdown">
                      {journalCategories.map((journal, jIdx) => {
                        let to = '#';
                        if (journal === 'Lord Journal of Civil Engineering') to = '/journals/civil-engineering';
                        if (journal === 'Lord Journal of Mechanical Engineering') to = '/journals/mechanical-engineering';
                        if (journal === 'Lord Journal of Electronics') to = '/journals/electronics-engineering';
                        if (journal === 'Lord Journal of Electrical Engineering') to = '/journals/electrical-engineering';
                        if (journal === 'Lord Journal of Computer Science & Engineering (CSE)') to = '/journals/computer-science-engineering';
                        if (journal === 'Lord Journal of Applied Science') to = '/journals/applied-science';
                        if (journal === 'Lord Journal of Artificial Intelligence, Machine Learning & Data Science') to = '/journals/ai-ml-data-science';
                        if (journal === 'Lord Journal of Law & Social Science') to = '/journals/law-social-science';
                        if (journal === 'Lord Journal of Education') to = '/journals/education';
                        return (
                          <Link
                            key={`mobile-journal-${jIdx}`}
                            to={to}
                            className="mobile-dropdown-item"
                            onClick={() => { closeMobileMenu(); }}
                          >
                            {journal}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href="#"
                  className="mobile-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    closeMobileMenu();
                  }}
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;