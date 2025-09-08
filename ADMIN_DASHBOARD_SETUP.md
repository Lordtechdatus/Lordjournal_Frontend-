# Admin Dashboard Setup Guide

This guide explains how to set up and use the admin dashboard for managing paper submissions in the Lord Journal system.

## Features

The admin dashboard provides the following capabilities:

- **View all submissions** with user information (name, email, paper title, journal, status)
- **Filter submissions** by journal, status, date range
- **Search submissions** by user name or paper title
- **Sort columns** by clicking on column headers
- **Pagination** for large numbers of submissions
- **Update submission status** directly from the dashboard
- **Download original files** (.doc, .docx, .pdf)
- **Dashboard statistics** showing submission counts and trends

## Setup Instructions

### 1. Backend Setup

1. **Install dependencies** (if not already installed):
   ```bash
   cd LordjournalBackend
   npm install multer
   ```

2. **Create admin user**:
   ```bash
   node create_admin_user.js
   ```
   This creates an admin user with:
   - Email: `admin@lordjournal.com`
   - Password: `admin123456`

3. **Start the backend server**:
   ```bash
   npm start
   ```

### 2. Frontend Setup

1. **Start the frontend development server**:
   ```bash
   npm run dev
   ```

2. **Access the admin dashboard**:
   - Navigate to `/admin-login` to log in as admin
   - After successful login, you'll be redirected to `/admin`

## Usage

### Admin Login

1. Go to `/admin-login`
2. Use the admin credentials:
   - Email: `admin@lordjournal.com`
   - Password: `admin123456`

### Dashboard Features

#### Statistics Cards
- **Total Submissions**: Overall count of all submissions
- **New Submissions**: Count of submissions with "submitted" status
- **Under Review**: Count of submissions being reviewed
- **Published**: Count of published papers

#### Filters
- **Search**: Search by user name or paper title
- **Journal**: Filter by specific journal
- **Status**: Filter by submission status
- **Date Range**: Filter by submission date
- **Items per page**: Choose pagination size (5, 10, 25, 50)

#### Submissions Table
- **Sortable columns**: Click column headers to sort
- **Status updates**: Change submission status using dropdown
- **Actions**: Download files and view details
- **Pagination**: Navigate through large result sets

#### File Management
- **Supported formats**: PDF, DOC, DOCX, TXT
- **File size limit**: 10MB per file
- **Download**: Click download button to get original files

## API Endpoints

### Admin Routes (`/api/admin`)

- `GET /submissions` - Get all submissions with filtering/pagination
- `PUT /submissions/:id/status` - Update submission status
- `GET /submissions/:id/download` - Download submission file
- `GET /dashboard/stats` - Get dashboard statistics

### Authentication

- Admin access is restricted to users with email `admin@lordjournal.com`
- JWT tokens are used for authentication
- All admin routes require valid authentication

## Database Schema

### user_submissions table
```sql
CREATE TABLE user_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    journal_name VARCHAR(255) NOT NULL,
    journal_icon VARCHAR(10) DEFAULT '📄',
    paper_title VARCHAR(500) NOT NULL,
    file_path VARCHAR(500),
    status ENUM('submitted', 'under_review', 'accepted', 'rejected', 'published') DEFAULT 'submitted',
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Security Considerations

1. **Change default admin password** in production
2. **Implement proper JWT token validation**
3. **Add rate limiting** for admin routes
4. **Log all admin actions** for audit purposes
5. **Restrict file upload types** and sizes
6. **Use HTTPS** in production

## File Storage

- Files are stored in `LordjournalBackend/uploads/`
- Unique filenames are generated to prevent conflicts
- File paths are stored in the database
- Original filenames are preserved for downloads

## Troubleshooting

### Common Issues

1. **Admin login fails**:
   - Ensure admin user exists in database
   - Check if backend is running
   - Verify email/password combination

2. **File uploads fail**:
   - Check uploads directory permissions
   - Verify file size limits
   - Check file type restrictions

3. **Dashboard not loading**:
   - Check browser console for errors
   - Verify API endpoints are accessible
   - Check authentication token validity

### Debug Mode

Enable debug logging in the backend by setting:
```bash
export DEBUG=app:*
```

## Production Deployment

1. **Environment variables**:
   - Set `NODE_ENV=production`
   - Configure database connection securely
   - Set up proper logging

2. **File storage**:
   - Consider using cloud storage (AWS S3, Google Cloud Storage)
   - Implement file backup strategies
   - Set up CDN for file delivery

3. **Security**:
   - Use strong admin passwords
   - Implement session management
   - Set up monitoring and alerting

## Support

For technical support or questions about the admin dashboard:
- Check the application logs
- Review the API documentation
- Contact the development team

---

**Note**: This admin dashboard is designed for internal use by journal administrators. Ensure proper access controls and security measures are in place before deploying to production.
