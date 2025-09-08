import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkEmail, adminLogin } from '../server/FetchNodeAdmin';

const LOGIN_STYLE_ID = 'login-inline-styles';

const styles = `
.login-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  text-align: center;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,242,247,0.9) 100%);
}

.login-brand {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #0052cc, #4285f4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.login-subtitle {
  color: #555;
  margin-bottom: 40px;
  font-size: 1.1rem;
  font-weight: 400;
}

.login-box {
  display: flex;
  justify-content: space-between;
  gap: 2.5rem;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
  perspective: 1000px;
}

.login-column {
  flex: 1;
  min-width: 300px;
  background: white;
  padding: 35px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  position: relative;
}

.login-column:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.08);
  transform: translateY(-5px);
}

.login-column h3 {
  font-size: 1.5rem;
  margin-bottom: 25px;
  font-weight: 600;
  color: #333;
}

.input-container {
  position: relative;
  margin: 20px 0;
}

.login-input {
  display: block;
  width: 100%;
  padding: 15px 16px;
  font-size: 1rem;
  border: 1.5px solid #e1e5ee;
  border-radius: 12px;
  box-sizing: border-box;
  background-color: #f8fafc;
  color: #333;
  transition: all 0.25s ease;
  font-family: inherit;
}

.login-input:focus {
  outline: none;
  border-color: #4285f4;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.15);
  background-color: #fff;
  transform: translateY(-2px);
}

.login-input::placeholder {
  color: #a0aec0;
  transition: all 0.25s ease;
}

.login-input:focus::placeholder {
  opacity: 0.5;
  transform: translateX(5px);
}

.login-button {
  background: #0052cc;
  color: white;
  padding: 15px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
}

.login-button:hover {
  background: linear-gradient(45deg, #003d99, #2a75f3);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 82, 204, 0.3);
}

.login-button:active {
  transform: translateY(1px);
}

.google-button {
  background: white;
  color: #333;
  padding: 15px 24px;
  font-size: 1rem;
  border: 1.5px solid #e1e5ee;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 25px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.google-button:hover {
  background: #f8fafc;
  border-color: #d1d5db;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
}

.google-button svg {
  width: 20px;
  height: 20px;
}

.signup-button {
  background: #f3f4f6;
  color: #333;
  border: none;
  padding: 15px 24px;
  font-size: 1rem;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  font-weight: 500;
}

.signup-button:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
}

.or-divider {
  position: relative;
  margin: 25px 0;
  text-align: center;
  font-weight: 500;
  color: #94a3b8;
  font-size: 0.9rem;
}

.or-divider::before,
.or-divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background-color: #e5e7eb;
}

.or-divider::before {
  left: 0;
}

.or-divider::after {
  right: 0;
}

.form-footer {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #6b7280;
}

.form-footer a {
  color: #4285f4;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.form-footer a:hover {
  color: #0052cc;
}

@media (max-width: 768px) {
  .login-box {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .login-container {
    padding: 100px 15px 40px;
  }
  
  .login-brand {
    font-size: 2.2rem;
  }
  
  .login-column {
    padding: 25px 20px;
  }
}`;

function LoginPage({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();

  // Inject styles once
  useEffect(() => {
    if (!document.getElementById(LOGIN_STYLE_ID)) {
      const tag = document.createElement('style');
      tag.id = LOGIN_STYLE_ID;
      tag.type = 'text/css';
      tag.appendChild(document.createTextNode(styles));
      document.head.appendChild(tag);
    }

    // Add Inter font if not already present
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Inter"]')) {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
    }
  }, []);

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      alert('Enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (!showPasswordInput) {
        // First step: Check if email exists
        const response = await checkEmail(email);
        
        if (response.success) {
          if (response.exists) {
            // User exists - show password input
            setUserExists(true);
            setShowPasswordInput(true);
          } else {
            // New user - redirect to registration
            navigate('/register', { state: { email } });
          }
        } else {
          alert(response.message || 'Something went wrong. Please try again.');
        }
      } else {
        // Second step: Login with password
        const loginResponse = await adminLogin({ email, password });
        
        if (loginResponse.success || loginResponse.token) {
          // Store user email and name for profile access
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userName', loginResponse.user?.given_names || email.split('@')[0]);
          // Login successful - redirect to profile
          navigate('/profile');
        } else {
          alert(loginResponse.message || 'Login failed. Please check your password.');
        }
      }
    } catch (error) {
      alert('Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setShowPasswordInput(false);
    setUserExists(false);
    setPassword('');
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoading(false);
      if (onNavigate) {
        onNavigate('home');
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-brand" style={{animation: 'fadeInDown 0.6s ease-out'}}>
        Lord Journal <span style={{ fontWeight: 300 }}>Login</span>
      </div>
      
      <p className="login-subtitle" style={{animation: 'fadeIn 0.8s ease-out'}}>
        Access research faster and smarter
      </p>

      <div className="login-box">
        <div 
          className="login-column"
          style={{animation: 'fadeInLeft 0.6s ease-out'}}
        >
          <h3>Quick Access</h3>
          <button className="google-button" onClick={handleGoogleLogin} disabled={isLoading}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isLoading ? 'Connecting...' : 'Continue with Google'}
          </button>
          <p className="or-divider">OR</p>
          <button className="signup-button" disabled={isLoading} onClick={() => navigate('/register')}>
            Sign up with Email
          </button>
          <p className="form-footer">By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="login-column"
          style={{animation: 'fadeInRight 0.6s ease-out'}}
        >
          <h3>{showPasswordInput ? 'Enter Your Password' : 'Enter Your Email'}</h3>
          <p style={{ color: '#666', marginBottom: '20px', fontSize: '0.9rem' }}>
            {showPasswordInput 
              ? `Welcome back! Please enter your password for ${email}`
              : 'We\'ll send you a secure link to access your account'
            }
          </p>
          
          {!showPasswordInput ? (
            // Email input
            <div className="input-container">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                required
                className="login-input"
                autoComplete="email"
                style={emailFocused ? {transform: 'translateY(-2px)'} : {}}
              />
            </div>
          ) : (
            // Password input
            <>
              <div className="input-container">
                <input
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required
                  className="login-input"
                  autoComplete="current-password"
                  style={passwordFocused ? {transform: 'translateY(-2px)'} : {}}
                />
              </div>
              
              <button 
                type="button"
                onClick={handleBackToEmail}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  marginBottom: '20px',
                  textDecoration: 'underline'
                }}
              >
                ← Use different email
              </button>
            </>
          )}
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Checking...' : (showPasswordInput ? 'Login' : 'Continue')}
          </button>
          
          {!showPasswordInput && (
            <p className="form-footer" style={{ marginTop: '15px' }}>
              Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setShowPasswordInput(true); }}>Sign in</a>
            </p>
          )}
        </form>
      </div>
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes fadeInDown {
            from { 
              opacity: 0;
              transform: translateY(-20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInLeft {
            from { 
              opacity: 0;
              transform: translateX(-20px);
            }
            to { 
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeInRight {
            from { 
              opacity: 0;
              transform: translateX(20px);
            }
            to { 
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default LoginPage;