const bcrypt = require('bcrypt');
const pool = require('./routes/pool');

async function createTestUser() {
  const connection = await pool.getConnection();
  
  try {
    const testEmail = 'test@example.com';
    const testPassword = 'password123456'; // 12+ characters
    const testNames = 'Test User';
    const testFamily = 'Test Family';
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(testPassword, 12);
    
    // Check if user already exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [testEmail]
    );
    
    if (existingUsers.length > 0) {
      // Update existing user
      await connection.execute(
        'UPDATE users SET password_hash = ?, given_names = ?, family_name = ?, email_verified = 1 WHERE email = ?',
        [hashedPassword, testNames, testFamily, testEmail]
      );
      console.log('✅ Test user updated successfully!');
    } else {
      // Create new user
      await connection.execute(
        'INSERT INTO users (email, given_names, family_name, password_hash, terms_accepted, marketing_accepted, email_verified) VALUES (?, ?, ?, ?, 1, 0, 1)',
        [testEmail, testNames, testFamily, hashedPassword]
      );
      console.log('✅ Test user created successfully!');
    }
    
    console.log('📧 Test Email:', testEmail);
    console.log('🔑 Test Password:', testPassword);
    console.log('🔐 Hashed Password:', hashedPassword);
    
  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    connection.release();
    process.exit(0);
  }
}

createTestUser();
