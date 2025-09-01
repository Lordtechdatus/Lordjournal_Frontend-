# Cookie Consent System Setup

## Overview
This system implements a complete cookie consent banner with session cookies, backend tracking, and database storage.

## Features
- ✅ **Session Cookies**: Expire when browser closes (no persistent storage)
- ✅ **Backend Integration**: Records consent in database
- ✅ **User Tracking**: Links consent to logged-in users
- ✅ **Analytics**: Tracks user agent, IP, session ID
- ✅ **GDPR Compliant**: Clear accept/decline options

## Database Setup

### 1. Create the cookie_consents table:
```sql
-- Run this SQL script in your MySQL database
source create_cookie_consents_table.sql
```

### 2. Table Structure:
```sql
CREATE TABLE cookie_consents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,                    -- Links to users table if logged in
    user_email VARCHAR(255) NULL,        -- Email if available
    consent BOOLEAN NOT NULL,            -- true = accepted, false = declined
    user_agent TEXT NULL,                -- Browser information
    ip_address VARCHAR(45) NULL,         -- User's IP address
    session_id VARCHAR(255) NULL,        -- Unique session identifier
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

## Backend API

### Endpoint: `POST /api/registration/cookie-consent`

**Request Body:**
```json
{
  "userEmail": "user@example.com",     // Optional - for logged-in users
  "consent": true,                     // Required - true/false
  "userAgent": "Mozilla/5.0...",      // Optional - auto-detected
  "ipAddress": "192.168.1.1",         // Optional - auto-detected by backend
  "sessionId": "session_123456789"    // Optional - auto-generated
}
```

**Response:**
```json
{
  "success": true,
  "message": "Cookie consent recorded successfully",
  "consentId": 123
}
```

## Frontend Usage

### 1. Cookie Banner
The `CookieConsent` component automatically appears on first visit and:
- Shows after 1 second delay
- Uses session cookies (expire on browser close)
- Records consent in backend
- Handles both logged-in and anonymous users

### 2. Check Consent Status
```javascript
import { hasCookieConsent, isCookieConsentAccepted } from './utils/cookieUtils';

// Check if user has made a choice
const consent = hasCookieConsent(); // true/false/null

// Check if cookies are accepted
const accepted = isCookieConsentAccepted(); // true/false
```

### 3. Session Management
```javascript
import { getSessionId, generateSessionId } from './utils/cookieUtils';

// Get current session ID
const sessionId = getSessionId();

// Generate new session ID
const newSessionId = generateSessionId();
```

## Cookie Behavior

### Session Cookies (No Expiration Date)
- **Accept**: `cookieConsent=true` + `sessionId=session_123`
- **Decline**: `cookieConsent=false` + `sessionId=session_123`
- **Expires**: When browser/tab closes
- **Path**: `/` (entire site)
- **SameSite**: `Lax` (CSRF protection)

### Cookie Values
- `cookieConsent`: "true" | "false"
- `sessionId`: "session_1234567890_abc123def"

## Database Analytics

### Query Examples:

**Total consent rate:**
```sql
SELECT 
  consent,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM cookie_consents), 2) as percentage
FROM cookie_consents 
GROUP BY consent;
```

**Consent by user type:**
```sql
SELECT 
  CASE 
    WHEN user_id IS NOT NULL THEN 'Logged In'
    ELSE 'Anonymous'
  END as user_type,
  consent,
  COUNT(*) as count
FROM cookie_consents 
GROUP BY user_type, consent;
```

**Recent consent activity:**
```sql
SELECT 
  DATE(created_at) as date,
  consent,
  COUNT(*) as count
FROM cookie_consents 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY DATE(created_at), consent
ORDER BY date DESC;
```

## Security Features

### 1. Session-Based
- No persistent cookies
- Automatic cleanup on browser close
- No tracking across sessions

### 2. User Privacy
- Anonymous users tracked by session only
- Logged-in users linked to account
- IP address logging for security

### 3. GDPR Compliance
- Clear accept/decline options
- No pre-checked boxes
- Easy to understand language
- Link to privacy policy

## Testing

### 1. Test Cookie Banner
- Clear browser cookies
- Refresh page
- Banner should appear after 1 second

### 2. Test Session Cookies
- Accept cookies
- Check browser dev tools → Application → Cookies
- Should see `cookieConsent=true` and `sessionId=...`
- Close browser and reopen
- Cookies should be gone

### 3. Test Backend Recording
- Check database `cookie_consents` table
- Should see new record with consent choice
- Verify user linking works for logged-in users

## Customization

### 1. Banner Text
Edit `src/CookieConsent.jsx`:
```javascript
<p className="cookie-text">
  Your custom cookie message here...
</p>
```

### 2. Styling
Modify the `styles` constant in `CookieConsent.jsx`:
```javascript
const styles = `
  .cookie-consent {
    /* Your custom styles */
  }
`;
```

### 3. Timing
Change banner delay:
```javascript
const timer = setTimeout(() => {
  setVisible(true);
}, 2000); // 2 seconds instead of 1
```

## Troubleshooting

### Banner Not Appearing
- Check if `cookieConsent` cookie exists
- Verify component is imported in App.jsx
- Check browser console for errors

### Backend Errors
- Verify database table exists
- Check API endpoint is accessible
- Verify CORS settings

### Cookie Issues
- Check browser cookie settings
- Verify SameSite policy
- Test in incognito mode

## Production Considerations

### 1. IP Address Detection
Add middleware to detect real IP:
```javascript
app.use((req, res, next) => {
  req.ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  next();
});
```

### 2. Rate Limiting
Add rate limiting to prevent spam:
```javascript
const rateLimit = require('express-rate-limit');
const consentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});
app.use('/api/registration/cookie-consent', consentLimiter);
```

### 3. Data Retention
Add cleanup job for old consent records:
```sql
-- Delete consent records older than 1 year
DELETE FROM cookie_consents 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);
```
