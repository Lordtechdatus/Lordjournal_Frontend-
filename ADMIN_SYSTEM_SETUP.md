# Admin System Setup Guide

This guide explains how to set up and use the new dedicated admin system for the Lord Journal platform.

## 🆕 New Admin System Features

The new admin system provides:

- **Separate Admin Table**: Dedicated `admins` table for admin credentials
- **Role-Based Access**: Multiple admin roles (super_admin, admin, moderator)
- **Enhanced Security**: Separate authentication from regular users
- **Admin Management**: Create, manage, and monitor admin accounts
- **Password Management**: Secure password change functionality

## 🗄️ Database Schema

### admins Table
```sql
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    given_names VARCHAR(255) NOT NULL,
    family_name VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin', 'moderator') DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_is_active (is_active)
);
```

### Admin Roles
- **super_admin**: Full access to all admin functions and admin management
- **admin**: Standard admin access to submissions and dashboard
- **moderator**: Limited access for content moderation

## 🚀 Setup Instructions

### 1. Backend Setup

1. **Install dependencies** (if not already installed):
   ```bash
   cd LordjournalBackend
   npm install bcrypt multer
   ```

2. **Create admin table and users**:
   ```bash
   node create_admin_user_v2.js
   ```
   
   This script will:
   - Create the `admins` table
   - Create default admin users
   - Set up role-based access

3. **Start the backend server**:
   ```bash
   npm start
   ```

### 2. Frontend Setup

1. **Start the frontend development server**:
   ```bash
   npm run dev
   ```

2. **Access the admin system**:
   - Navigate to `/admin-login` to log in as admin
   - After successful login, you'll be redirected to `/admin`

## 🔐 Default Admin Credentials

After running the setup script, you'll have these admin accounts:

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| `admin@lordjournal.com` | `admin123456` | `super_admin` | Full system access |

## 🔧 API Endpoints

### Admin Authentication (`/api/admin-auth`)
- `POST /login` - Admin login
- `GET /profile/:email` - Get admin profile
- `PUT /change-password` - Change admin password

### Admin Dashboard (`/api/admin`)
- `GET /submissions` - Get all submissions with filtering/pagination
- `PUT /submissions/:id/status` - Update submission status
- `GET /submissions/:id/download` - Download submission file
- `GET /dashboard/stats` - Get dashboard statistics

## 🛡️ Security Features

1. **Separate Authentication**: Admin login is completely separate from user login
2. **Single Admin Access**: Only one admin account with full system access
3. **Password Security**: 12-character minimum, bcrypt hashing
4. **Account Status**: Admin can be deactivated without deletion
5. **Session Management**: Last login tracking and token-based auth

## 📱 Usage

### Admin Login
1. Go to `/admin-login`
2. Use any of the admin credentials from the table above
3. You'll be redirected to `/admin` after successful login

### Dashboard Features
- **Statistics Overview**: Submission counts and trends
- **Submission Management**: View, filter, sort, and update submissions
- **File Downloads**: Download original paper files
- **Status Updates**: Change submission statuses in real-time

### Admin Management
- Single admin account with full system access
- No additional admin management needed
- Simplified security model

## 🔄 Migration from Old System

If you're upgrading from the previous admin system:

1. **Backup your database** before running the new setup
2. **Run the new setup script**: `node create_admin_user_v2.js`
3. **Update your frontend** to use the new admin authentication
4. **Test the new system** with the default credentials
5. **Remove old admin users** from the `users` table if desired
6. **Clean up old admin accounts** from the previous multi-admin system

## 🚨 Production Considerations

### Security
1. **Change default passwords** immediately after setup
2. **Use strong passwords** (16+ characters recommended)
3. **Implement proper JWT tokens** with expiration
4. **Add rate limiting** for admin routes
5. **Use HTTPS** for all admin communications

### Monitoring
1. **Log all admin actions** for audit purposes
2. **Monitor failed login attempts**
3. **Set up alerts** for suspicious admin activity
4. **Regular security reviews** of admin access

### Backup & Recovery
1. **Regular database backups** including admin table
2. **Admin account recovery** procedures
3. **Emergency access** protocols
4. **Disaster recovery** planning

## 🐛 Troubleshooting

### Common Issues

1. **Admin login fails**:
   - Ensure admin table exists: `DESCRIBE admins;`
   - Check if admin users exist: `SELECT * FROM admins;`
   - Verify backend is running on correct port

2. **Permission denied errors**:
   - Check admin role and active status
   - Verify admin middleware is working
   - Check authentication token validity

3. **Database connection issues**:
   - Verify database credentials
   - Check database server status
   - Ensure proper table permissions

### Debug Commands

```bash
# Check admin table structure
mysql -u username -p lordjournal_db -e "DESCRIBE admins;"

# List all admin users
mysql -u username -p lordjournal_db -e "SELECT * FROM admins;"

# Check admin table indexes
mysql -u username -p lordjournal_db -e "SHOW INDEX FROM admins;"
```

## 📞 Support

For technical support:

1. **Check application logs** for error details
2. **Verify database connectivity** and table structure
3. **Test admin authentication** with known credentials
4. **Review API endpoint responses** for error messages

## 🔮 Future Enhancements

Planned improvements for the admin system:

- **Two-factor authentication** (2FA)
- **Admin activity dashboard**
- **Advanced role permissions**
- **Admin audit trails**
- **Bulk operations** for submissions
- **Email notifications** for admin actions

---

**Note**: This admin system is designed for production use with proper security measures. Always change default passwords and implement additional security layers as needed for your specific deployment environment.
