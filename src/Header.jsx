import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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

.login-button {
  background: #0052cc;      /* solid blue */
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.15s ease;
  box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
}

.login-button:hover {
  background-color: #0956b2;   /* darker blue on hover */
}

.login-button:active {
  background-color: #084a99;   /* even darker on click */
}

.login-button:focus-visible {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}

/* keep logout visually different but styled */
.logout-button {
  background: none;
  color: #213547;
  font-weight: 500;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 6px 12px;
}

.mobile-menu-button {
  display: none;
  background: none;
  border: none;        
  outline: none; 
  font-size: 1.8rem;
  cursor: pointer;
  padding: 6px;
  color: #0052cc; /* default color */
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

  .auth-buttons {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .login-btn {
    background: #0052cc;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .login-btn:hover {
    background: #003d99;
    transform: translateY(-1px);
  }

  /* User Menu Styles */
  .user-menu {
    position: relative;
  }

  .user-menu-trigger {
    display: flex;
    align-items: center;
    gap: 10px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  .user-menu-trigger:hover {
    background: rgba(0, 82, 204, 0.1);
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(45deg, #0052cc, #4285f4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
  }

  .user-name {
    font-weight: 500;
    color: #333;
  }

  .dropdown-arrow {
    font-size: 12px;
    color: #666;
    transition: transform 0.2s ease;
  }

  .user-menu.open .dropdown-arrow {
    transform: rotate(180deg);
  }

  .user-dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #e1e5ee;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    min-width: 200px;
    z-index: 1000;
    margin-top: 8px;
  }

  .user-info {
    padding: 15px;
    border-bottom: 1px solid #f1f5f9;
  }

  .user-email {
    color: #666;
    font-size: 0.9rem;
  }

  .user-actions {
    padding: 10px;
  }

  .user-action-btn {
    width: 100%;
    padding: 10px 15px;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s ease;
    font-size: 0.9rem;
  }

  .user-action-btn:hover {
    background: #f8fafc;
  }

  .user-action-btn.logout {
    color: #ef4444;
  }

  .user-action-btn.logout:hover {
    background: #fef2f2;
  }
`;

function Header({ currentPage, onNavigate }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);
  const closeDelayRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Check authentication status on component mount and route changes
  useEffect(() => {
    checkAuthStatus();
  }, [location.pathname]);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const checkAuthStatus = () => {
    const authToken = localStorage.getItem('adminAuthToken');
    const userEmail = localStorage.getItem('userEmail');
    
    if (authToken && userEmail) {
      setIsLoggedIn(true);
      // Get user info from localStorage or fetch from API
      setUserInfo({
        name: localStorage.getItem('userName') || userEmail.split('@')[0],
        email: userEmail,
        initials: userEmail.split('@')[0].substring(0, 2).toUpperCase()
      });
    } else {
      setIsLoggedIn(false);
      setUserInfo(null);
    }
  };

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('adminAuthToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Reset state
    setIsLoggedIn(false);
    setUserInfo(null);
    setIsUserMenuOpen(false);
    
    // Redirect to homepage
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
    setIsUserMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const openMenu = () => {
    if (closeDelayRef.current) {
      clearTimeout(closeDelayRef.current);
    }
    setDropdownOpen(true);
  };

  const closeMenu = () => {
    closeDelayRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  
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
    'Lord Journal of Education' ,
    'Lord Journal of Management'
  ];      

  const navItems = [
    { name: 'Journals', hasDropdown: true },
    { name: 'Publish with us', hasDropdown: false },
    { name: 'Submission Link', hasDropdown: false }
  ];

  // No loading state needed - remove this section

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
                      if (journal === 'Lord Journal of Electronics Engineering') to = '/journals/electronics-engineering';
                      if (journal === 'Lord Journal of Electrical Engineering') to = '/journals/electrical-engineering';
                      if (journal === 'Lord Journal of Computer Science & Engineering (CSE)') to = '/j  ournals/computer-science-engineering';
                      if (journal === 'Lord Journal of Applied Science') to = '/journals/applied-science';
                      if (journal === 'Lord Journal of Artificial Intelligence, Machine Learning & Data Science') to = '/journals/ai-ml-data-science';
                      if (journal === 'Lord Journal of Law & Social Science') to = '/journals/law-social-science';
                      if (journal === 'Lord Journal of Education') to = '/journals/education';
                      if (journal === 'Lord Journal of Management') to = '/journals/management';
                      
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
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.name === 'Submission Link') {
                      navigate('/submit');
                    }
                  }}
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

         {/* User Authentication Section */}
         <div className="user-section">
          {isLoggedIn && userInfo ? (
            // Logged in user
            <div className={`user-menu ${isUserMenuOpen ? 'open' : ''}`} ref={userMenuRef}>
              <button 
                className="user-menu-trigger"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="user-avatar">
                  {userInfo.initials}
                </div>
                <span className="user-name">{userInfo.name}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="user-dropdown-menu">
                  <div className="user-info">
                    <div className="user-email">{userInfo.email}</div>
                  </div>
                  <div className="user-actions">
                    <button onClick={handleProfile} className="user-action-btn">
                      👤 My Profile
                    </button>
                    <button onClick={handleLogout} className="user-action-btn logout">
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Not logged in
            <div className="auth-buttons">
              <button onClick={handleLogin} className="login-btn">
                🔑 Login
              </button>
            </div>
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
                        if (journal === 'Lord Journal of Electronics Engineering') to = '/journals/electronics-engineering';
                        if (journal === 'Lord Journal of Electrical Engineering') to = '/journals/electrical-engineering';
                        if (journal === 'Lord Journal of Computer Science & Engineering (CSE)') to = '/journals/computer-science-engineering';
                        if (journal === 'Lord Journal of Applied Science') to = '/journals/applied-science';
                        if (journal === 'Lord Journal of Artificial Intelligence, Machine Learning & Data Science') to = '/journals/ai-ml-data-science';
                        if (journal === 'Lord Journal of Law & Social Science') to = '/journals/law-social-science';
                        if (journal === 'Lord Journal of Education') to = '/journals/education';
                        if (journal === 'Lord Journal of Management') to = '/journals/management';
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
                    if (item.name === 'Submission Link') {
                      navigate('/submit');
                    }
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