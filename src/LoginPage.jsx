import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPasswordStrong = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      alert('Enter a valid email address');
      return;
    }
    if (!isPasswordStrong(password)) {
      alert('Password must be at least 8 characters, include uppercase, lowercase, and a number.');
      return;
    }
    localStorage.setItem('isLoggedIn', 'true');
    alert('Logged in with email!');
    router.push('/');
  };

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    brand: {
      fontSize: '2.2rem',
      fontWeight: 'bold',
      color: '#0052cc',
    },
    subtitle: {
      marginTop: '8px',
      color: '#555',
    },
    box: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '40px',
      gap: '2rem',
      flexWrap: 'wrap',
    },
    column: {
      flex: 1,
      minWidth: '280px',
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '10px',
      margin: '12px 0',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
    },
    button: {
      background: '#0052cc',
      color: 'white',
      padding: '10px 20px',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    buttonHover: {
      background: '#003d99',
    },
    secondaryBtn: {
      marginTop: '20px',
      background: '#eee',
      border: 'none',
      padding: '10px 16px',
      fontSize: '1rem',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    or: {
      marginTop: '20px',
      fontWeight: 'bold',
      color: '#999',
    },
    forgot: {
      fontSize: '0.9rem',
      color: '#777',
      marginTop: '10px',
    },
  };

  return (
    <GoogleOAuthProvider clientId="513447738204-t72iq6dqng049ou3ntbcthq0588jfr27.apps.googleusercontent.com">
      <div style={styles.container}>
        <h1 style={styles.brand}>Lord Journal <span style={{ fontWeight: 400 }}>Login</span></h1>
        <p style={styles.subtitle}>Access research faster and smarter</p>

        <div style={styles.box}>
          <div style={styles.column}>
            <GoogleLogin
              onSuccess={(response) => {
                console.log('Google login success:', response);
                localStorage.setItem('isLoggedIn', 'true');
                router.push('/');
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            <p style={styles.or}>OR</p>
            <button style={styles.secondaryBtn}>Sign up with Email</button>
          </div>

          <form onSubmit={handleSubmit} style={styles.column}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Login</button>
            <p style={styles.forgot}>Forgot password?</p>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;
