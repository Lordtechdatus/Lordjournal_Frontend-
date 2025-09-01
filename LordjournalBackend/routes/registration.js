const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const pool = require('./pool');
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { email, givenNames, familyName, password, termsAccepted, marketingAccepted } = req.body;

    // Validation
    if (!email || !givenNames || !familyName || !password || !termsAccepted) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    if (password.length < 12) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 12 characters long'
      });
    }

    // Check if user already exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Insert new user
    const [result] = await connection.execute(
      `INSERT INTO users (email, given_names, family_name, password_hash, terms_accepted, marketing_accepted, verification_token) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [email, givenNames, familyName, passwordHash, termsAccepted, marketingAccepted, verificationToken]
    );

    const userId = result.insertId;

    // Create user profile
    await connection.execute(
      'INSERT INTO user_profiles (user_id) VALUES (?)',
      [userId]
    );

    // TODO: Send verification email here
    // For now, we'll just return success

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email for verification.',
      userId: userId,
      verificationToken: verificationToken // Remove this in production
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  } finally {
    connection.release();
  }
});

// Email Verification
router.get('/verify/:token', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { token } = req.params;

    // Find user with this verification token
    const [users] = await connection.execute(
      'SELECT id, email FROM users WHERE verification_token = ? AND email_verified = FALSE',
      [token]
    );

    if (users.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    const userId = users[0].id;

    // Mark email as verified
    await connection.execute(
      'UPDATE users SET email_verified = TRUE, verification_token = NULL WHERE id = ?',
      [userId]
    );

    res.json({
      success: true,
      message: 'Email verified successfully! You can now login.'
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during verification'
    });
  } finally {
    connection.release();
  }
});

// Check if email exists (for login flow)
router.post('/check-email', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if user exists
    const [users] = await connection.execute(
      'SELECT id, email_verified FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      // New user - redirect to registration
      return res.json({
        success: true,
        exists: false,
        message: 'Email not found. Please register.',
        redirectTo: 'register'
      });
    } else {
      // Existing user - redirect to login
      return res.json({
        success: true,
        exists: true,
        message: 'Email found. Please login.',
        redirectTo: 'login',
        emailVerified: users[0].email_verified
      });
    }

  } catch (error) {
    console.error('Email check error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during email check'
    });
  } finally {
    connection.release();
  }
});

// User Login
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

    // Find user by email
    const [users] = await connection.execute(
      'SELECT id, email, given_names, family_name, password_hash, email_verified FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = users[0];

    // Check if email is verified
    // Temporarily commented out for testing - remove this comment to re-enable
    /*
    if (!user.email_verified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your email before logging in'
      });
    }
    */

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token (you'll need to implement this)
    // For now, we'll return a simple success response
    const token = `user_${user.id}_${Date.now()}`; // Simple token for demo

    // Update last login
    await connection.execute(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        given_names: user.given_names,
        family_name: user.family_name,
        email_verified: user.email_verified
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  } finally {
    connection.release();
  }
});

// Get user profile
router.get('/profile/:email', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { email } = req.params;

    // Get user data from database
    const [users] = await connection.execute(
      `SELECT 
        u.id, u.email, u.given_names, u.family_name, u.email_verified, 
        u.created_at, u.last_login,
        up.phone, up.institution, up.department, up.research_interests, up.bio
      FROM users u 
      LEFT JOIN user_profiles up ON u.id = up.user_id 
      WHERE u.email = ?`,
      [email]
    );

    // Get journal submissions data
    const [submissions] = await connection.execute(
      `SELECT 
        journal_name, 
        journal_icon,
        COUNT(*) as count,
        status
      FROM user_submissions 
      WHERE user_id = ? 
      GROUP BY journal_name, status
      ORDER BY journal_name`,
      [users[0].id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = users[0];
    
    // Process journal submissions data
    const journalSubmissions = [];
    const journalMap = new Map();
    
    submissions.forEach(submission => {
      const key = submission.journal_name;
      if (!journalMap.has(key)) {
        journalMap.set(key, {
          journal_name: submission.journal_name,
          icon: submission.journal_icon || '📄',
          count: 0,
          status: submission.status
        });
      }
      journalMap.get(key).count += submission.count;
    });
    
    journalMap.forEach(submission => {
      journalSubmissions.push(submission);
    });
    
    // Calculate stats
    const totalPapers = submissions.reduce((sum, sub) => sum + sub.count, 0);
    const published = submissions.filter(sub => sub.status === 'published').reduce((sum, sub) => sum + sub.count, 0);
    const underReview = submissions.filter(sub => sub.status === 'under_review').reduce((sum, sub) => sum + sub.count, 0);
    
    // Format the response
    const userProfile = {
      id: user.id,
      email: user.email,
      given_names: user.given_names,
      family_name: user.family_name,
      email_verified: Boolean(user.email_verified),
      created_at: user.created_at,
      last_login: user.last_login,
      phone: user.phone,
      institution: user.institution,
      department: user.department,
      research_interests: user.research_interests,
      bio: user.bio,
      stats: {
        total_papers: totalPapers,
        published: published,
        under_review: underReview,
        citations: 0 // You can add citations tracking later
      },
      journal_submissions: journalSubmissions
    };

    res.json({
      success: true,
      user: userProfile
    });

  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while getting profile'
    });
  } finally {
    connection.release();
  }
});

// Submit Paper
router.post('/submit-paper', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { userEmail, journalName, journalIcon, paperTitle, fileName } = req.body;
    
    if (!userEmail || !journalName || !paperTitle) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // Get user ID
    const [users] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [userEmail]
    );
    
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const userId = users[0].id;
    
    // Insert submission
    const [result] = await connection.execute(
      `INSERT INTO user_submissions 
       (user_id, journal_name, journal_icon, paper_title, file_path, status) 
       VALUES (?, ?, ?, ?, ?, 'submitted')`,
      [userId, journalName, journalIcon, paperTitle, fileName]
    );
    
    res.json({
      success: true,
      message: 'Paper submitted successfully',
      submissionId: result.insertId
    });
    
  } catch (error) {
    console.error('Error submitting paper:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during paper submission'
    });
  } finally {
    connection.release();
  }
});

// Update User Profile
router.put('/update-profile', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { 
      userEmail, 
      given_names, 
      family_name, 
      new_email, 
      current_password, 
      new_password 
    } = req.body;
    
    if (!userEmail || !given_names || !family_name) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // Get user data
    const [users] = await connection.execute(
      'SELECT id, email, password_hash FROM users WHERE email = ?',
      [userEmail]
    );
    
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const user = users[0];
    const userId = user.id;
    
    // Check if email is being changed
    if (new_email && new_email !== userEmail) {
      // Check if new email already exists
      const [existingUsers] = await connection.execute(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [new_email, userId]
      );
      
      if (existingUsers.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }
    
    // Handle password change
    if (new_password) {
      if (!current_password) {
        return res.status(400).json({
          success: false,
          message: 'Current password is required to change password'
        });
      }
      
      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(current_password, user.password_hash);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }
      
      // Hash new password
      const saltRounds = 12;
      const newPasswordHash = await bcrypt.hash(new_password, saltRounds);
      
      // Update password
      await connection.execute(
        'UPDATE users SET password_hash = ? WHERE id = ?',
        [newPasswordHash, userId]
      );
    }
    
    // Update user profile
    const updateFields = [];
    const updateValues = [];
    
    updateFields.push('given_names = ?');
    updateValues.push(given_names);
    
    updateFields.push('family_name = ?');
    updateValues.push(family_name);
    
    if (new_email && new_email !== userEmail) {
      updateFields.push('email = ?');
      updateValues.push(new_email);
      
      // Reset email verification if email is changed
      updateFields.push('email_verified = FALSE');
    }
    
    updateValues.push(userId);
    
    const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
    await connection.execute(updateQuery, updateValues);
    
    // Update user_profiles table if it exists
    try {
      await connection.execute(
        `INSERT INTO user_profiles (user_id, updated_at) 
         VALUES (?, NOW()) 
         ON DUPLICATE KEY UPDATE updated_at = NOW()`,
        [userId]
      );
    } catch (error) {
      // user_profiles table might not exist, that's okay
      console.log('user_profiles table not found, skipping update');
    }
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        given_names,
        family_name,
        email: new_email || userEmail,
        email_changed: new_email && new_email !== userEmail
      }
    });
    
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during profile update'
    });
  } finally {
    connection.release();
  }
});

// Cookie Consent Tracking
router.post('/cookie-consent', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { 
      userEmail, 
      consent, 
      userAgent, 
      ipAddress, 
      sessionId 
    } = req.body;
    
    if (!consent || typeof consent !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Consent status is required'
      });
    }
    
    // Get user ID if email is provided (for logged-in users)
    let userId = null;
    if (userEmail) {
      const [users] = await connection.execute(
        'SELECT id FROM users WHERE email = ?',
        [userEmail]
      );
      if (users.length > 0) {
        userId = users[0].id;
      }
    }
    
    // Store cookie consent in database
    const [result] = await connection.execute(
      `INSERT INTO cookie_consents 
       (user_id, user_email, consent, user_agent, ip_address, session_id, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [userId, userEmail || null, consent, userAgent || null, ipAddress || null, sessionId || null]
    );
    
    res.json({
      success: true,
      message: 'Cookie consent recorded successfully',
      consentId: result.insertId
    });
    
  } catch (error) {
    console.error('Error recording cookie consent:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during cookie consent recording'
    });
  } finally {
    connection.release();
  }
});

module.exports = router;
