import React, { useState, useEffect } from 'react';
import { checkEmail, adminLogin } from '../server/FetchNodeAdmin';

const ConnectionTest = () => {
  const [status, setStatus] = useState('Testing...');
  const [details, setDetails] = useState('');
  const [testEmail] = useState('test@example.com');

  const runTests = async () => {
    setStatus('Running connection tests...');
    setDetails('');

    try {
      // Test 1: Basic API connectivity
      setDetails('Testing API connectivity...\n');
      const response = await checkEmail(testEmail);
      
      if (response.success !== undefined) {
        setDetails(prev => prev + `✅ API Connection: SUCCESS\nResponse: ${JSON.stringify(response, null, 2)}\n\n`);
      } else {
        setDetails(prev => prev + `❌ API Connection: FAILED\nResponse: ${JSON.stringify(response, null, 2)}\n\n`);
      }
    } catch (error) {
      setDetails(prev => prev + `❌ API Connection: FAILED\nError: ${error.message}\n\n`);
    }

    // Test 2: Environment detection
    const isProd = import.meta?.env?.PROD || window.location.hostname !== 'localhost';
    const apiBase = isProd ? '/api' : 'http://localhost:3000/api';
    
    setDetails(prev => prev + `Environment Detection:\n`);
    setDetails(prev => prev + `- Production Mode: ${isProd}\n`);
    setDetails(prev => prev + `- API Base URL: ${apiBase}\n`);
    setDetails(prev => prev + `- Current URL: ${window.location.href}\n\n`);

    setStatus('Tests completed');
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>🔌 Connection Test Dashboard</h2>
      <p><strong>Status:</strong> {status}</p>
      
      {details && (
        <pre style={{
          background: '#f0f0f0',
          padding: '15px',
          borderRadius: '4px',
          fontSize: '12px',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          border: '1px solid #ccc'
        }}>
          {details}
        </pre>
      )}
      
      <button 
        onClick={runTests}
        style={{
          padding: '10px 20px',
          marginTop: '15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        🔄 Run Tests Again
      </button>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
        <h4>💡 What to check:</h4>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Make sure your backend server is running on <code>http://localhost:3000</code></li>
          <li>Check that your backend has CORS enabled for <code>http://localhost:5175</code></li>
          <li>Verify your backend has the <code>/api/registration/check-email</code> endpoint</li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectionTest;
