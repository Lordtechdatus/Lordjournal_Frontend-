const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('./pool');

// JWT Secret - In production, use environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const JWT_EXPIRES_IN = '7d';

class UserService {
  
  // Create a new user
  static async createUser(email, password) {
    try {
      // Check if user already exists
      const existingUser = await this.findUserByEmail(email);
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Hash password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Insert user into database
      const query = 'INSERT INTO users (email, password_hash) VALUES (?, ?)';
      
      return new Promise((resolve, reject) => {
        pool.query(query, [email.toLowerCase(), passwordHash], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              id: results.insertId,
              email: email.toLowerCase(),
              created_at: new Date()
            });
          }
        });
      });
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    
    return new Promise((resolve, reject) => {
      pool.query(query, [email.toLowerCase()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.length > 0 ? results[0] : null);
        }
      });
    });
  }

  // Find user by ID
  static async findUserById(id) {
    const query = 'SELECT id, email, created_at, updated_at, last_login_at FROM users WHERE id = ?';
    
    return new Promise((resolve, reject) => {
      pool.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.length > 0 ? results[0] : null);
        }
      });
    });
  }

  // Authenticate user
  static async authenticateUser(email, password) {
    try {
      const user = await this.findUserByEmail(email);
      if (!user) {
        return null;
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return null;
      }

      // Update last login
      await this.updateLastLogin(user.id);

      // Return user without password hash
      const { password_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  }

  // Update last login timestamp
  static async updateLastLogin(userId) {
    const query = 'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?';
    
    return new Promise((resolve, reject) => {
      pool.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Update user profile
  static async updateUser(userId, updates) {
    try {
      const allowedUpdates = ['email'];
      const updateFields = [];
      const updateValues = [];

      Object.keys(updates).forEach(key => {
        if (allowedUpdates.includes(key)) {
          updateFields.push(`${key} = ?`);
          updateValues.push(key === 'email' ? updates[key].toLowerCase() : updates[key]);
        }
      });

      if (updateFields.length === 0) {
        throw new Error('No valid fields to update');
      }

      updateValues.push(userId);
      const query = `UPDATE users SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

      return new Promise((resolve, reject) => {
        pool.query(query, updateValues, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.affectedRows > 0);
          }
        });
      });
    } catch (error) {
      throw error;
    }
  }

  // Change password
  static async changePassword(userId, oldPassword, newPassword) {
    try {
      const user = await this.findUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Get user with password hash for verification
      const userWithPassword = await this.findUserByEmail(user.email);
      const isValidOldPassword = await bcrypt.compare(oldPassword, userWithPassword.password_hash);
      
      if (!isValidOldPassword) {
        throw new Error('Current password is incorrect');
      }

      const saltRounds = 12;
      const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

      const query = 'UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
      
      return new Promise((resolve, reject) => {
        pool.query(query, [newPasswordHash, userId], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.affectedRows > 0);
          }
        });
      });
    } catch (error) {
      throw error;
    }
  }

  // Delete user account
  static async deleteUser(userId) {
    const query = 'DELETE FROM users WHERE id = ?';
    
    return new Promise((resolve, reject) => {
      pool.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  }

  // Generate JWT token
  static generateToken(user) {
    return jwt.sign(
      { 
        id: user.id, 
        email: user.email 
      }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  // Verify JWT token
  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

module.exports = UserService;
