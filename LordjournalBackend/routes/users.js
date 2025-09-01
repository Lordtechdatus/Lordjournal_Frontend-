const express = require('express');
const { body, validationResult } = require('express-validator');
const UserService = require('./userService');
const { authenticateToken } = require('./authMiddleware');

const router = express.Router();

// Validation middleware for profile updates
const validateProfileUpdate = [
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

// Validation middleware for password change
const validatePasswordChange = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number'),
  body('confirmNewPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('New password confirmation does not match new password');
      }
      return true;
    })
];

// Get user profile (same as /auth/me but alternative endpoint)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    res.json({
      ok: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        created_at: req.user.created_at,
        updated_at: req.user.updated_at,
        last_login_at: req.user.last_login_at
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, validateProfileUpdate, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { email } = req.body;
    const updates = {};
    
    if (email && email !== req.user.email) {
      updates.email = email;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No changes provided' });
    }

    const success = await UserService.updateUser(req.user.id, updates);
    
    if (!success) {
      return res.status(400).json({ error: 'Failed to update profile' });
    }

    // Get updated user data
    const updatedUser = await UserService.findUserById(req.user.id);

    res.json({
      ok: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        created_at: updatedUser.created_at,
        updated_at: updatedUser.updated_at,
        last_login_at: updatedUser.last_login_at
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Server error during profile update' });
  }
});

// Change password
router.put('/password', authenticateToken, validatePasswordChange, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { currentPassword, newPassword } = req.body;

    const success = await UserService.changePassword(req.user.id, currentPassword, newPassword);
    
    if (!success) {
      return res.status(400).json({ error: 'Failed to change password' });
    }

    res.json({
      ok: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Password change error:', error);
    
    if (error.message === 'Current password is incorrect') {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ error: 'Server error during password change' });
  }
});

// Delete user account
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    const success = await UserService.deleteUser(req.user.id);
    
    if (!success) {
      return res.status(400).json({ error: 'Failed to delete account' });
    }

    res.json({
      ok: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Account deletion error:', error);
    res.status(500).json({ error: 'Server error during account deletion' });
  }
});

// Get user by ID (admin functionality - you might want to add role-based access control)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // For now, users can only view their own profile
    // You can modify this to allow admin access later
    if (userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const user = await UserService.findUserById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
        last_login_at: user.last_login_at
      }
    });

  } catch (error) {
    console.error('User fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
