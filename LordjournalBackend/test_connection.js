const express = require('express');
const pool = require('./routes/pool');

const app = express();
const PORT = 3001; // Use different port to avoid conflicts

app.use(express.json());

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connection successful!');
    connection.release();
    
    res.json({ 
      success: true, 
      message: 'Database connection successful!',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Test registration endpoint
app.post('/test-registration', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('📧 Testing registration with email:', email);
    
    const connection = await pool.getConnection();
    
    // Check if user exists
    const [users] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    
    connection.release();
    
    res.json({
      success: true,
      exists: users.length > 0,
      message: users.length > 0 ? 'User exists' : 'User not found'
    });
    
  } catch (error) {
    console.error('❌ Registration test failed:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🧪 Test server running on http://localhost:${PORT}`);
  console.log('📋 Available endpoints:');
  console.log(`   GET  /test-db`);
  console.log(`   POST /test-registration`);
});
