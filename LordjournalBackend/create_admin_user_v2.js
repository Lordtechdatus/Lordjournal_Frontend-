const bcrypt = require('bcrypt');
const pool = require('./routes/pool');

async function createAdminTable() {
  const connection = await pool.getConnection();
  
  try {
    // Create admin table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        given_names VARCHAR(255) NOT NULL,
        family_name VARCHAR(255) NOT NULL,
        role ENUM('super_admin') DEFAULT 'super_admin',
        is_active BOOLEAN DEFAULT TRUE,
        last_login DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_role (role),
        INDEX idx_is_active (is_active)
      )
    `);
    

    
    // Check if admin already exists
    const [existingAdmins] = await connection.execute(
      'SELECT id, email, role FROM admins WHERE email = ?',
      ['admin@lordjournal.com']
    );
    
    if (existingAdmins.length > 0) {
      return;
    }
    
    // Create the single admin user
    const password = 'admin123456'; // Change this in production
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    const [result] = await connection.execute(
      `INSERT INTO admins (email, password_hash, given_names, family_name, role, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['admin@lordjournal.com', passwordHash, 'Admin', 'User', 'super_admin', true]
    );
    

    
  } catch (error) {
    // Error creating admin table/user
  } finally {
    connection.release();
    process.exit(0);
  }
}

// Run the function
createAdminTable().catch(() => {});
