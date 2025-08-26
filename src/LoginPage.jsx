import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LOGIN_STYLE_ID = 'login-inline-styles';

const styles = `
.login-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  text-align: center;
  font-family: Arial, sans-serif;
  min-height: 100vh;
}

.login-brand {
  font-size: 2.2rem;
  font-weight: bold;
  color: #0052cc;
  margin-bottom: 8px;
}

.login-subtitle {
  color: #555;
  margin-bottom: 40px;
}

.login-box {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
}

.login-column {
  flex: 1;
  min-width: 280px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.login-input {
  display: block;
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.login-input:focus {
  outline: none;
  border-color: #0052cc;
  box-shadow: 0 0 0 2px rgba(0, 82, 204, 0.2);
}

.login-button {
  background: #0052cc;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  transition: background-color 0.3s;
}

.login-button:hover {
  background: #003d99;
}

.google-button {
  background: #db4437;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.google-button:hover {
  background: #c23321;
}

.signup-button {
  background: #eee;
  border: none;
  padding: 12px 16px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.signup-button:hover {
  background: #ddd;
}

.or-divider {
  margin: 20px 0;
  font-weight: bold;
  color: #999;
}

.forgot-link {
  font-size: 0.9rem;
  color: #0052cc;
  margin-top: 10px;
  cursor: pointer;
  text-decoration: underline;
}

.back-button {
  position: absolute;
  top: 90px;
  left: 20px;
  background: none;
  border: none;
  color: #0052cc;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.back-button:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-box {
    flex-direction: column;
  }
  
  .login-container {
    padding: 100px 15px 40px;
  }
}
`;

function LoginPage({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Inject styles once
  useEffect(() => {
    if (!document.getElementById(LOGIN_STYLE_ID)) {
      const tag = document.createElement('style');
      tag.id = LOGIN_STYLE_ID;
      tag.type = 'text/css';
      tag.appendChild(document.createTextNode(styles));
      document.head.appendChild(tag);
    }
  }, []);

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPasswordStrong = (password) =>
    password.length >= 6; // Simplified validation

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      alert('Enter a valid email address');
      return;
    }
    if (!isPasswordStrong(password)) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    localStorage.setItem('isLoggedIn', 'true');
    alert('Logged in successfully!');
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    localStorage.setItem('isLoggedIn', 'true');
    alert('Logged in with Google!');
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <div className="login-container">
      <Link className="back-button" onClick={handleBack} to="/">
        ← Back to Home
      </Link>
      
      <h1 className="login-brand">Lord Journal <span style={{ fontWeight: 400 }}>Login</span></h1>
      <p className="login-subtitle">Access research faster and smarter</p>

      <div className="login-box">
        <div className="login-column">
          <h3>Quick Login</h3>
          <button className="google-button" onClick={handleGoogleLogin}>
            🚀 Continue with Google
          </button>
          <p className="or-divider">OR</p>
          <button className="signup-button">Sign up with Email</button>
          </div>

        <form onSubmit={handleSubmit} className="login-column">
          <h3>Email Login</h3>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            className="login-input"
            autoComplete="email"
            />
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            className="login-input"
            autoComplete="current-password"
            />
          <button type="submit" className="login-button">Login</button>
          <p className="forgot-link">Forgot password?</p>
          </form>
        </div>
      </div>
  );
}

export default LoginPage;
