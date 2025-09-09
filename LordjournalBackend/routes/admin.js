const express = require('express');
const router = express.Router();
const pool = require('./pool');
const path = require('path');
const fs = require('fs').promises;
const { emitStatusUpdate, emitStatusUpdateToAdmins } = require('../websocket');

// Admin authentication middleware - check if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // For now, we'll use a simple token format: admin_{id}_{timestamp}_{role}
    // In production, you should implement proper JWT validation
    if (!token.startsWith('admin_')) {
      return res.status(401).json({ error: 'Invalid admin token' });
    }

    // Extract admin email from token (temporary solution)
    // In production, decode JWT and get admin info
    const tokenParts = token.split('_');
    if (tokenParts.length < 4) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    // Get admin email from the request body or query (temporary workaround)
    // In production, this should come from JWT payload
    let adminEmail = req.body.email || req.query.email;
    
    // If no email in request, try to get it from the token (temporary)
    if (!adminEmail) {
      // This is a temporary workaround - in production use proper JWT
      adminEmail = 'admin@lordjournal.com'; // Default for testing
    }

    if (!adminEmail) {
      return res.status(401).json({ error: 'Admin email required' });
    }

    // Check if admin exists and is active
    const connection = await pool.getConnection();
    try {
      const [admins] = await connection.execute(
        'SELECT id, email, role, is_active FROM admins WHERE email = ? AND is_active = TRUE',
        [adminEmail]
      );
      
      if (admins.length > 0) {
        req.admin = admins[0]; // Add admin info to request
        next();
      } else {
        res.status(403).json({ error: 'Admin access required' });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all submissions with pagination, filtering, and sorting
router.get('/submissions', requireAdmin, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const {
      page = 1,
      limit = 10,
      journal = '',
      status = '',
      dateFrom = '',
      dateTo = '',
      search = '',
      sortBy = 'submission_date',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    
    // Build WHERE clause for filtering
    let whereClause = 'WHERE 1=1';
    const params = [];
    
    if (journal) {
      whereClause += ' AND us.journal_name LIKE ?';
      params.push(`%${journal}%`);
    }
    
    if (status) {
      whereClause += ' AND us.status = ?';
      params.push(status);
    }
    
    if (dateFrom) {
      whereClause += ' AND DATE(us.submission_date) >= ?';
      params.push(dateFrom);
    }
    
    if (dateTo) {
      whereClause += ' AND DATE(us.submission_date) <= ?';
      params.push(dateTo);
    }
    
    if (search) {
      whereClause += ' AND (u.given_names LIKE ? OR u.family_name LIKE ? OR us.paper_title LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    // Validate sort parameters
    const allowedSortFields = ['submission_date', 'paper_title', 'journal_name', 'status', 'given_names'];
    const allowedSortOrders = ['ASC', 'DESC'];
    
    if (!allowedSortFields.includes(sortBy)) sortBy = 'submission_date';
    if (!allowedSortOrders.includes(sortOrder.toUpperCase())) sortOrder = 'DESC';
    
    // Get total count for pagination
    const [countResult] = await connection.execute(
      `SELECT COUNT(*) as total FROM user_submissions us 
       JOIN users u ON us.user_id = u.id ${whereClause}`,
      params
    );
    
    const total = countResult[0].total;
    
    // Get submissions with user information
    const [submissions] = await connection.execute(
      `SELECT 
        us.id,
        us.journal_name,
        us.journal_icon,
        us.paper_title,
        us.file_path,
        us.status,
        us.submission_date,
        us.updated_at,
        u.id as user_id,
        u.given_names,
        u.family_name,
        u.email
       FROM user_submissions us
       JOIN users u ON us.user_id = u.id
       ${whereClause}
       ORDER BY us.${sortBy} ${sortOrder}
       LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset]
    );
    
    // Get unique journals and statuses for filter dropdowns
    const [journals] = await connection.execute(
      'SELECT DISTINCT journal_name FROM user_submissions ORDER BY journal_name'
    );
    
    const [statuses] = await connection.execute(
      'SELECT DISTINCT status FROM user_submissions ORDER BY status'
    );
    
    res.json({
      success: true,
      data: {
        submissions,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        },
        filters: {
          journals: journals.map(j => j.journal_name),
          statuses: statuses.map(s => s.status)
        }
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching submissions'
    });
  } finally {
    connection.release();
  }
});

// Update submission status
router.put('/submissions/:id/status', requireAdmin, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }
    
    const allowedStatuses = ['submitted', 'under_review', 'accepted', 'rejected', 'published'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    // First, get the submission details before updating
    const [submissionDetails] = await connection.execute(
      `SELECT us.id, us.paper_title, us.journal_name, us.status, u.email as author_email
       FROM user_submissions us
       JOIN users u ON us.user_id = u.id
       WHERE us.id = ?`,
      [id]
    );
    
    if (submissionDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    const submission = submissionDetails[0];
    
    // Update the status
    const [result] = await connection.execute(
      'UPDATE user_submissions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    // Emit WebSocket events for real-time updates
    const submissionData = {
      id: submission.id,
      status: status,
      paperTitle: submission.paper_title,
      journalName: submission.journal_name,
      authorEmail: submission.author_email,
      updatedAt: new Date().toISOString()
    };
    
    // Emit to the specific user
    emitStatusUpdate(submission.author_email, submissionData);
    
    // Emit to all admins
    emitStatusUpdateToAdmins(submissionData);
    
    res.json({
      success: true,
      message: 'Status updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating submission status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating status'
    });
  } finally {
    connection.release();
  }
});

// Download submission file
router.get('/submissions/:id/download', requireAdmin, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { id } = req.params;
    
    // Get submission details
    const [submissions] = await connection.execute(
      'SELECT file_path, paper_title FROM user_submissions WHERE id = ?',
      [id]
    );
    
    if (submissions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    const submission = submissions[0];
    
    if (!submission.file_path) {
      return res.status(404).json({
        success: false,
        message: 'No file attached to this submission'
      });
    }
    
    // For now, we'll assume files are stored in a uploads directory
    // You may need to adjust this path based on your file storage setup
    const filePath = path.join(__dirname, '../uploads', submission.file_path);
    
    try {
      await fs.access(filePath);
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: 'File not found on server'
      });
    }
    
    // Set headers for file download
    const fileName = submission.paper_title || 'paper';
    const fileExtension = path.extname(submission.file_path);
    
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}${fileExtension}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    
    // Stream the file
    const fileStream = require('fs').createReadStream(filePath);
    fileStream.pipe(res);
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error while downloading file'
    });
  } finally {
    connection.release();
  }
});

// Get dashboard statistics
router.get('/dashboard/stats', requireAdmin, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    // Get total submissions
    const [totalResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM user_submissions'
    );
    
    // Get submissions by status
    const [statusResult] = await connection.execute(
      'SELECT status, COUNT(*) as count FROM user_submissions GROUP BY status'
    );
    
    // Get submissions by journal
    const [journalResult] = await connection.execute(
      'SELECT journal_name, COUNT(*) as count FROM user_submissions GROUP BY journal_name ORDER BY count DESC LIMIT 5'
    );
    
    // Get recent submissions
    const [recentResult] = await connection.execute(
      `SELECT us.id, us.paper_title, us.journal_name, us.status, us.submission_date,
              u.given_names, u.family_name
       FROM user_submissions us
       JOIN users u ON us.user_id = u.id
       ORDER BY us.submission_date DESC
       LIMIT 5`
    );
    
    // Get submissions by month (last 6 months)
    const [monthlyResult] = await connection.execute(
      `SELECT 
        DATE_FORMAT(submission_date, '%Y-%m') as month,
        COUNT(*) as count
       FROM user_submissions
       WHERE submission_date >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
       GROUP BY DATE_FORMAT(submission_date, '%Y-%m')
       ORDER BY month DESC`
    );
    
    res.json({
      success: true,
      data: {
        totalSubmissions: totalResult[0].total,
        statusBreakdown: statusResult,
        topJournals: journalResult,
        recentSubmissions: recentResult,
        monthlyTrends: monthlyResult
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching dashboard statistics'
    });
  } finally {
    connection.release();
  }
});





module.exports = router;
