import { useEffect, useState } from 'react';

// Simple API client for Node admin backend
const API_BASE = '/api'; // Add /api prefix to match backend routes
const TOKEN_STORAGE_KEY = 'adminAuthToken';

// API helper functions
async function makeRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  console.log('Making request to:', url); // Debug log
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
}

export async function healthCheck() {
  return makeRequest('/health');
}

export async function adminLogin(credentials) {
  const response = await makeRequest('/registration/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
  
  if (response.token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
  }
  
  return response;
}

// Registration API functions
export async function checkEmail(email) {
  return makeRequest('/registration/check-email', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
}

export async function registerUser(userData) {
  return makeRequest('/registration/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
}

export async function verifyEmail(token) {
  return makeRequest(`/registration/verify/${token}`);
}

export async function getUserProfile(email) {
  return makeRequest(`/registration/profile/${email}`);
}

export async function submitPaper(submissionData) {
  return makeRequest('/registration/submit-paper', {
    method: 'POST',
    body: JSON.stringify(submissionData)
  });
}

export async function updateProfile(profileData) {
  return makeRequest('/registration/update-profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  });
}

export async function recordCookieConsent(consentData) {
  return makeRequest('/registration/cookie-consent', {
    method: 'POST',
    body: JSON.stringify(consentData)
  });
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

// Connection Test Component
export default function ConnectionTest() {
  const [status, setStatus] = useState('checking...');
  const [detail, setDetail] = useState('');

  const checkConnection = async () => {
    setStatus('checking...');
    setDetail('');
    
    try {
      const res = await healthCheck();
      setStatus('✅ Connected to Backend');
      setDetail(`API Base: ${API_BASE}\nResponse: ${JSON.stringify(res, null, 2)}`);
    } catch (err) {
      setStatus('❌ Connection Failed');
      setDetail(`Error: ${err.message}\n\nMake sure your backend is running on http://localhost:3000`);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div style={{ 
      fontFamily: 'system-ui', 
      padding: '20px',
      maxWidth: '500px',
      margin: '20px auto',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>🔌 Backend Connection Test</h3>
      <p><strong>Status:</strong> {status}</p>
      {detail && (
        <pre style={{ 
          background: '#f0f0f0', 
          padding: '12px', 
          borderRadius: '4px',
          fontSize: '12px',
          overflow: 'auto'
        }}>
          {detail}
        </pre>
      )}
      <button 
        onClick={checkConnection}
        style={{ 
          padding: '10px 16px',
          marginTop: '12px',
          backgroundColor: '#007bff',
          cursor: 'pointer'
        }}
      >
        🔄 Test Again
      </button>
    </div>
  );
}
