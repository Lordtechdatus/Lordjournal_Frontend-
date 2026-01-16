import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if already logged in as admin
    const authToken = localStorage.getItem('adminAuthToken');
    const userEmail = localStorage.getItem('userEmail');
    
    if (authToken && userEmail === 'admin@lordjournal.com') {
      setIsLoggedIn(true);
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin-auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store admin authentication data
        localStorage.setItem('adminAuthToken', data.token);
        localStorage.setItem('userEmail', data.admin.email);
        localStorage.setItem('userName', `${data.admin.given_names} ${data.admin.family_name}`);
        localStorage.setItem('adminRole', data.admin.role);
        
        setIsLoggedIn(true);
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
      } catch (error) {
    setError('Login failed. Please try again.');
  } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>🔐 Admin Login</h1>
          <p>Access the admin dashboard to manage submissions</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Only authorized administrators can access this area.</p>
          <button
            onClick={() => navigate('/')}
            className="back-button"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <style jsx>{`
        .admin-login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .admin-login-card {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        .admin-login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .admin-login-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 10px;
        }

        .admin-login-header p {
          color: #666;
          font-size: 0.95rem;
        }

        .admin-login-form {
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
          font-size: 0.9rem;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .login-button {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          border: 1px solid #fcc;
          font-size: 0.9rem;
        }

        .admin-login-footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #e1e5e9;
        }

        .admin-login-footer p {
          color: #666;
          font-size: 0.85rem;
          margin-bottom: 15px;
        }

        .back-button {
          background: none;
          border: 2px solid #e1e5e9;
          color: #666;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .back-button:hover {
          border-color: #667eea;
          color: #667eea;
        }

        @media (max-width: 480px) {
          .admin-login-card {
            padding: 30px 20px;
          }

          .admin-login-header h1 {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
