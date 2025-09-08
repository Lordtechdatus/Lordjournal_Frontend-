import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, clearAuthToken, updateProfile } from '../server/FetchNodeAdmin';
import InstitutionField from './components/InstitutionField';

const PROFILE_STYLE_ID = 'profile-inline-styles';







const styles = `
.profile-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  text-align: center;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,242,247,0.9) 100%);
}

.profile-brand {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #0052cc, #4285f4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.profile-subtitle {
  color: #555;
  margin-bottom: 40px;
  font-size: 1.1rem;
  font-weight: 400;
}

.profile-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;
}

.profile-sidebar {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  height: fit-content;
  text-align: center;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(45deg, #0052cc, #4285f4);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 3rem;
  color: white;
  font-weight: 600;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.profile-email {
  color: #666;
  font-size: 1rem;
  margin-bottom: 20px;
}

.profile-status {
  display: inline-block;
  padding: 6px 16px;
  background: #10b981;
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 20px;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.profile-action-btn {
  padding: 12px 20px;
  border: 1px solid #e1e5ee;
  background: white;
  color: #333;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.profile-action-btn:hover {
  background: #f8fafc;
  border-color: #0052cc;
  color: #0052cc;
}

.profile-action-btn.danger {
  border-color: #ef4444;
  color: #ef4444;
}

.profile-action-btn.danger:hover {
  background: #fef2f2;
}

.profile-main {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: left;
}

.profile-section {
  margin-bottom: 30px;
}

.profile-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f1f5f9;
}

.profile-field {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}

.profile-field-label {
  width: 150px;
  font-weight: 500;
  color: #666;
  font-size: 0.9rem;
}

.profile-field-value {
  flex: 1;
  color: #333;
  font-size: 1rem;
}

.profile-field-value.empty {
  color: #999;
  font-style: italic;
}



.profile-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.profile-stat {
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e1e5ee;
}

.profile-stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #0052cc;
  margin-bottom: 8px;
}

.profile-stat-label {
  color: #666;
  font-size: 0.9rem;
}

.journal-submissions {
  margin-top: 20px;
}

.submission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.submission-card {
  background: #f8fafc;
  border: 1px solid #e1e5ee;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.submission-card:hover {
  border-color: #0052cc;
  box-shadow: 0 4px 15px rgba(0, 82, 204, 0.1);
}

.submission-journal {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.journal-icon {
  font-size: 1.8rem;
}

.journal-name {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
  line-height: 1.3;
}

.submission-count {
  text-align: center;
  margin-bottom: 15px;
}

.count-number {
  font-size: 2rem;
  font-weight: 700;
  color: #0052cc;
  margin-bottom: 5px;
}

.count-label {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.submission-status {
  text-align: center;
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge.published {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.under_review {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.submitted {
  background: #dbeafe;
  color: #1e40af;
}

.no-submissions {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.no-submissions-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  opacity: 0.5;
}

.no-submissions-text {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.no-submissions-hint {
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .profile-container {
    padding: 100px 15px 40px;
  }
  
  .profile-brand {
    font-size: 2.2rem;
  }
  
  .submission-grid {
    grid-template-columns: 1fr;
  }
}

/* Edit Profile Modal Styles */
.edit-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.edit-modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.edit-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e1e5ee;
}

.edit-modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f1f5f9;
  color: #333;
}

.edit-modal-content {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #0052cc;
  box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.1);
}

.password-toggle-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e1e5ee;
  text-align: center;
}

.password-toggle-btn {
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  color: #6c757d;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.password-toggle-btn:hover {
  background: #e9ecef;
  border-color: #adb5bd;
  color: #495057;
}

.password-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e1e5ee;
}

.password-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.password-section-header h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.close-password-btn {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #6c757d;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-password-btn:hover {
  background: #e9ecef;
  border-color: #adb5bd;
  color: #495057;
}

.edit-modal-footer {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e1e5ee;
  justify-content: flex-end;
}

.cancel-btn {
  padding: 10px 20px;
  border: 1px solid #d1d5db;
  background: white;
  color: #666;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.save-btn {
  padding: 10px 20px;
  border: none;
  background: #0052cc;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.save-btn:hover {
  background: #003d99;
}

@media (max-width: 768px) {
  .edit-modal {
    margin: 10px;
    max-height: 95vh;
  }
  
  .edit-modal-header,
  .edit-modal-content,
  .edit-modal-footer {
    padding: 16px;
  }
  
  .edit-modal-footer {
    flex-direction: column;
  }
  
  .cancel-btn,
  .save-btn {
    width: 100%;
  }
}`;

function UserProfile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [editForm, setEditForm] = useState({
    given_names: '',
    family_name: '',
    email: '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem('adminAuthToken');
    if (!authToken) {
      navigate('/login');
      return;
    }

    // Get user profile
    loadUserProfile();
  }, [navigate]);

  const loadUserProfile = async () => {
    try {
      // Get the auth token
      const authToken = localStorage.getItem('adminAuthToken');
      if (!authToken) {
        setError('No authentication token found');
        setIsLoading(false);
        return;
      }

      // Get user email from localStorage
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        setError('No user email found');
        setIsLoading(false);
        return;
      }
      
  
      
      // Call the real API to get user profile
      const response = await getUserProfile(userEmail);
      
      
      
      if (response.success && response.user) {
        setUserProfile(response.user);
      } else {
        setError(response.message || 'Failed to load profile data');
      }
      
      setIsLoading(false);
    } catch (error) {
      setError('Failed to connect to server. Please try again.');
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuthToken();
    navigate('/login');
  };

  const handleEditProfile = () => {
    // Populate form with current user data
    setEditForm({
      given_names: userProfile.given_names || '',
      family_name: userProfile.family_name || '',
      email: userProfile.email || '',
      current_password: '',
      new_password: '',
      confirm_password: ''
    });
    setShowPasswordSection(false);
    setIsEditing(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    // Validate form
    if (!editForm.given_names.trim()) {
      alert('Given names are required');
      return;
    }
    if (!editForm.family_name.trim()) {
      alert('Family name is required');
      return;
    }
    if (!editForm.email.trim()) {
      alert('Email is required');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // If changing password, validate password fields
    // Validate password fields if password section is shown and any password is provided
    if (showPasswordSection && (editForm.new_password || editForm.current_password || editForm.confirm_password)) {
      if (!editForm.current_password) {
        alert('Current password is required to change password');
        return;
      }
      if (!editForm.new_password) {
        alert('New password is required');
        return;
      }
      if (editForm.new_password.length < 12) {
        alert('New password must be at least 12 characters long');
        return;
      }
      if (editForm.new_password !== editForm.confirm_password) {
        alert('New password and confirm password do not match');
        return;
      }
    }

    try {
      const userEmail = localStorage.getItem('userEmail');
      
      // Prepare update data
      const updateData = {
        userEmail: userEmail,
        given_names: editForm.given_names,
        family_name: editForm.family_name,
        new_email: editForm.email !== userEmail ? editForm.email : undefined,
        current_password: editForm.current_password || undefined,
        new_password: editForm.new_password || undefined
      };
      
      // Call API to update profile
      const response = await updateProfile(updateData);
      
      if (response.success) {
        // Update local state
        setUserProfile(prev => ({
          ...prev,
          given_names: editForm.given_names,
          family_name: editForm.family_name,
          email: editForm.email
        }));
        
        // Update localStorage
        localStorage.setItem('userEmail', editForm.email);
        localStorage.setItem('userName', editForm.given_names);
        
        setIsEditing(false);
        
        // Show success message
        if (response.data.email_changed) {
          alert('Profile updated successfully! Please check your new email for verification.');
        } else {
          alert('Profile updated successfully!');
        }
      } else {
        alert(response.message || 'Failed to update profile. Please try again.');
      }
      
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setShowPasswordSection(false);
    setEditForm({
      given_names: '',
      family_name: '',
      email: '',
      current_password: '',
      new_password: '',
      confirm_password: ''
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '20px' }}>⏳</div>
          <div>Loading your profile...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '20px', color: '#ef4444' }}>❌</div>
          <div style={{ color: '#ef4444', marginBottom: '20px' }}>{error}</div>
          <button 
            onClick={() => {
              setError('');
              setIsLoading(true);
              loadUserProfile();
            }} 
            style={{ 
              padding: '10px 20px', 
              background: '#0052cc', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer' 
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return null;
  }

  const initials = `${userProfile.given_names.charAt(0)}${userProfile.family_name.charAt(0)}`;

  return (
    <div className="profile-container">
      <div className="profile-brand">
        Lord Journal <span style={{ fontWeight: 300 }}>My Account</span>
      </div>
      
      <p className="profile-subtitle">
        Welcome back! Here's your account overview
      </p>

      <div className="profile-content">
        {/* Left Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-avatar">
            {initials}
          </div>
          
          <div className="profile-name">
            {userProfile.given_names} 
          </div>
          
          <div className="profile-email">
            {userProfile.email}
          </div>
          
          <div className="profile-actions">
            <button className="profile-action-btn" onClick={handleEditProfile}>
              ✏️ Edit Profile
            </button>
            <button className="profile-action-btn danger" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-main">
          {/* Personal Information */}
          <div className="profile-section">
            <h3>👤 Personal Information</h3>
            
            <div className="profile-field">
              <div className="profile-field-label">Full Name</div>
              <div className="profile-field-value">
                {userProfile.given_names} 
              </div>
            </div>
            
            <div className="profile-field">
              <div className="profile-field-label">Email Address</div>
              <div className="profile-field-value">
                {userProfile.email}
                {userProfile.email_verified && <span style={{ color: '#10b981', marginLeft: '8px' }}>✓</span>}
              </div>
            </div>
            
            <div className="profile-field">
              <div className="profile-field-label"> Family Name</div>
              <div className="profile-field-value">
              {userProfile.family_name}
              </div>
            </div>
            
            <div className= "profile-field">
              <div className="profile-field-label">Member Since</div>
              <div className="profile-field-value">
                {formatDate(userProfile.created_at)}
              </div>
            </div>
          </div>

          {/* Institution & Submission */}
          <div className="profile-section">
            <h3>🎓 Institution & Submission</h3>
            
            {/* Institution Field with Searchable Dropdown */}
            <InstitutionField userProfile={userProfile} setUserProfile={setUserProfile} />
            

            
            <div className="profile-field">
              <div className="profile-field-label">Submit Paper</div>
              <div className="profile-field-value" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button 
                  onClick={() => navigate('/submit')}
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: '#0052cc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#003d99'}
                  onMouseLeave={(e) => e.target.style.background = '#0052cc'}
                >
                  📄 Submit Your Paper
                </button>
                <span style={{ color: '#666', fontSize: '0.9rem' }}>
                  Click to submit your research paper
                </span>
              </div>
            </div>
          </div>


          {/* Statistics */}
          <div className="profile-section">
            <h3>📊 Research Statistics</h3>
            
            <div className="profile-stats">
              <div className="profile-stat">
                <div className="profile-stat-number">{userProfile.stats?.total_papers || 0}</div>
                <div className="profile-stat-label">Total Papers</div>
              </div>
              
              <div className="profile-stat">
                <div className="profile-stat-number">{userProfile.stats?.published || 0}</div>
                <div className="profile-stat-label">Published</div>
              </div>
              
            </div>
          </div>

          {/* Journal Submissions */}
          <div className="profile-section">
            <h3>📚 Journal Submissions</h3>
            
            <div className="journal-submissions">
              {userProfile.journal_submissions && userProfile.journal_submissions.length > 0 ? (
                <div className="submission-grid">
                  {userProfile.journal_submissions.map((submission, index) => (
                    <div key={index} className="submission-card">
                      <div className="submission-journal">
                        <div className="journal-icon">{submission.icon}</div>
                        <div className="journal-name">{submission.journal_name}</div>
                      </div>
                      <div className="submission-count">
                        <div className="count-number">{submission.count}</div>
                        <div className="count-label">Papers</div>
                      </div>
                      <div className="submission-status">
                        <span className={`status-badge ${submission.status}`}>
                          {submission.status === 'published' ? '✅ Published' : 
                           submission.status === 'under_review' ? '⏳ Under Review' : 
                           '📝 Submitted'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-submissions">
                  <div className="no-submissions-icon">📄</div>
                  <div className="no-submissions-text">No papers submitted yet</div>
                  <div className="no-submissions-hint">Click "Submit Your Paper" to get started</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="edit-modal-overlay" onClick={handleCancelEdit}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h3>Edit Profile</h3>
              <button className="close-btn" onClick={handleCancelEdit}>×</button>
            </div>
            
            <div className="edit-modal-content">
              <div className="form-group">
                <label>Given Names *</label>
                <input
                  type="text"
                  name="given_names"
                  value={editForm.given_names}
                  onChange={handleEditFormChange}
                  className="form-input"
                  placeholder="Enter your given names"
                />
              </div>
              
              <div className="form-group">
                <label>Family Name *</label>
                <input
                  type="text"
                  name="family_name"
                  value={editForm.family_name}
                  onChange={handleEditFormChange}
                  className="form-input"
                  placeholder="Enter your family name"
                />
              </div>
              
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditFormChange}
                  className="form-input"
                  placeholder="Enter your email address"
                />
              </div>
              
              {!showPasswordSection ? (
                  <div className="password-toggle-section">
                    <button 
                      type="button"
                      className="password-toggle-btn" 
                      onClick={() => setShowPasswordSection(true)}
                    >
                      🔒 Change Password
                    </button>
                </div>
              ) : (
                <div className="password-section">
                  <div className="password-section-header">
                    <h4>Change Password</h4>
                    <button 
                      type="button"
                      className="close-password-btn" 
                      onClick={() => setShowPasswordSection(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="form-group">
                    <label>Current Password *</label>
                    <input
                      type="password"
                      name="current_password"
                      value={editForm.current_password}
                      onChange={handleEditFormChange}
                      className="form-input"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password *</label>
                    <input
                      type="password"
                      name="new_password"
                      value={editForm.new_password}
                      onChange={handleEditFormChange}
                      className="form-input"
                      placeholder="Enter new password (min 12 characters)"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password *</label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={editForm.confirm_password}
                      onChange={handleEditFormChange}
                      className="form-input"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="edit-modal-footer">
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveProfile}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {styles}
      </style>
    </div>
  );
}

export default UserProfile;