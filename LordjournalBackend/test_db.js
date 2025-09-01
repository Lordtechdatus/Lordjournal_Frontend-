// Database Test Script
// Run this to test your database connection and create tables

const pool = require('./routes/pool');

async function testDatabase() {
  console.log('🔌 Testing database connection...');
  
  try {
    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    
    // Test if tables exist
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📋 Existing tables:', tables.map(t => Object.values(t)[0]));
    
    // Check if users table exists
    const [usersTable] = await connection.execute(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = 'lordjournal_db' 
      AND table_name = 'users'
    `);
    
    if (usersTable[0].count === 0) {
      console.log('⚠️  Users table does not exist. Please run the SQL script first.');
      console.log('📝 Run the database_setup.sql file in MySQL Workbench');
    } else {
      console.log('✅ Users table exists!');
      
      // Count users
      const [userCount] = await connection.execute('SELECT COUNT(*) as count FROM users');
      console.log(`👥 Total users: ${userCount[0].count}`);
      
      // Show sample users
      const [users] = await connection.execute('SELECT id, email, given_names, family_name FROM users LIMIT 5');
      if (users.length > 0) {
        console.log('📊 Sample users:');
        users.forEach(user => {
          console.log(`   ID: ${user.id}, Email: ${user.email}, Name: ${user.given_names} ${user.family_name}`);
        });
      }
    }
    
    connection.release();
    console.log('✅ Database test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure MySQL is running');
    console.log('2. Check your .env file has correct database credentials');
    console.log('3. Create the database and tables using database_setup.sql');
  }
}

// Run the test
testDatabase();
