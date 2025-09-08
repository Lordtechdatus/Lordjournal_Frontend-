const express = require('express');
const router = express.Router();
const pool = require('./pool');
const bcrypt = require('bcrypt');

// Admin Login - Single Admin System
router.post('/login', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Only allow admin@lordjournal.com
    if (email !== 'admin@lordjournal.com') {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    // Find admin by email
    const [admins] = await connection.execute(
      'SELECT id, email, password_hash, given_names, family_name, role, is_active FROM admins WHERE email = ?',
      [email]
    );

    if (admins.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const admin = admins[0];

    // Check if admin is active
    if (!admin.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate simple admin token (in production, use proper JWT)
    const token = `admin_${admin.id}_${Date.now()}_${admin.role}`;

    // Update last login
    await connection.execute(
      'UPDATE admins SET last_login = NOW() WHERE id = ?',
      [admin.id]
    );

    res.json({
      success: true,
      message: 'Admin login successful',
      token: token,
      admin: {
        id: admin.id,
        email: admin.email,
        given_names: admin.given_names,
        family_name: admin.family_name,
        role: admin.role,
        is_active: admin.is_active
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error during admin login'
    });
  } finally {
    connection.release();
  }
});

// Get admin profile
router.get('/profile/:email', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { email } = req.params;

    // Only allow admin@lordjournal.com
    if (email !== 'admin@lordjournal.com') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Get admin data from database
    const [admins] = await connection.execute(
      `SELECT 
        id, email, given_names, family_name, role, is_active, 
        last_login, created_at, updated_at
       FROM admins 
       WHERE email = ?`,
      [email]
    );

    if (admins.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    const admin = admins[0];
    
    // Format the response
    const adminProfile = {
      id: admin.id,
      email: admin.email,
      given_names: admin.given_names,
      family_name: admin.family_name,
      role: admin.role,
      is_active: Boolean(admin.is_active),
      last_login: admin.last_login,
      created_at: admin.created_at,
      updated_at: admin.updated_at
    };

    res.json({
      success: true,
      admin: adminProfile
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error while getting admin profile'
    });
  } finally {
    connection.release();
  }
});

// Change admin password
router.put('/change-password', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { email, currentPassword, newPassword } = req.body;
    
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Only allow admin@lordjournal.com
    if (email !== 'admin@lordjournal.com') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    if (newPassword.length < 12) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 12 characters long'
      });
    }

    // Get admin data
    const [admins] = await connection.execute(
      'SELECT id, password_hash FROM admins WHERE email = ?',
      [email]
    );
    
    if (admins.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    const admin = admins[0];
    
    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.password_hash);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    // Hash new password
    const saltRounds = 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
    
    // Update password
    await connection.execute(
      'UPDATE admins SET password_hash = ? WHERE id = ?',
      [newPasswordHash, admin.id]
    );
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error while changing password'
    });
  } finally {
    connection.release();
  }
});

module.exports = router;
