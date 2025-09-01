import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitPaper } from '../server/FetchNodeAdmin';

const JOURNAL_CATEGORIES = [
  {
    id: 'civil-engineering',
    name: 'Lord Journal of Civil Engineering',
    description: 'Research in structural engineering, geotechnical engineering, transportation engineering, and environmental engineering.',
    icon: '🏗️'
  },
  {
    id: 'mechanical-engineering',
    name: 'Lord Journal of Mechanical Engineering',
    description: 'Research in mechanical systems, thermodynamics, fluid mechanics, and manufacturing engineering.',
    icon: '⚙️'
  },
  {
    id: 'electronics-engineering',
    name: 'Lord Journal of Electronics Engineering',
    description: 'Research in electronic circuits, embedded systems, signal processing, and communication systems.',
    icon: '🔌'
  },
  {
    id: 'electrical-engineering',
    name: 'Lord Journal of Electrical Engineering',
    description: 'Research in power systems, control systems, renewable energy, and electrical machines.',
    icon: '⚡'
  },
  {
    id: 'computer-science-engineering',
    name: 'Lord Journal of Computer Science & Engineering',
    description: 'Research in algorithms, software engineering, artificial intelligence, and computer networks.',
    icon: '💻'
  },
  {
    id: 'applied-science',
    name: 'Lord Journal of Applied Science',
    description: 'Research in applied mathematics, physics, chemistry, and interdisciplinary sciences.',
    icon: '🔬'
  },
  {
    id: 'ai-ml-data-science',
    name: 'Lord Journal of Artificial Intelligence, Machine Learning & Data Science',
    description: 'Research in AI algorithms, machine learning models, data analytics, and intelligent systems.',
    icon: '🤖'
  },
  {
    id: 'law-social-science',
    name: 'Lord Journal of Law & Social Science',
    description: 'Research in legal studies, social sciences, public policy, and human rights.',
    icon: '⚖️'
  },
  {
    id: 'education',
    name: 'Lord Journal of Education',
    description: 'Research in educational technology, pedagogy, curriculum development, and learning sciences.',
    icon: '📚'
  },
  {
    id: 'management',
    name: 'Lord Journal of Management',
    description: 'Research in business management, organizational behavior, marketing, and entrepreneurship.',
    icon: '📊'
  }
];

const styles = `
.submission-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,242,247,0.9) 100%);
}

.submission-header {
  text-align: center;
  margin-bottom: 50px;
}

.submission-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(45deg, #0052cc, #4285f4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  letter-spacing: -0.5px;
}

.submission-subtitle {
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.submission-steps {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  gap: 20px;
}

.step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.step.active {
  background: #0052cc;
  color: white;
}

.step.completed {
  background: #10b981;
  color: white;
}

.step.pending {
  background: #f1f5f9;
  color: #64748b;
}

.journal-selection {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.journal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.journal-card {
  background: white;
  border: 2px solid #e1e5ee;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.journal-card:hover {
  border-color: #0052cc;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 82, 204, 0.15);
}

.journal-card.selected {
  border-color: #0052cc;
  background: #f6f8ff;
}

.journal-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.journal-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.journal-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

.selected-indicator {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 24px;
  height: 24px;
  background: #0052cc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
}

.upload-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.upload-area:hover {
  border-color: #0052cc;
  background: #f6f8ff;
}

.upload-area.dragover {
  border-color: #0052cc;
  background: #f6f8ff;
}

.upload-icon {
  font-size: 3rem;
  color: #9ca3af;
  margin-bottom: 15px;
}

.upload-text {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.upload-hint {
  color: #9ca3af;
  font-size: 0.9rem;
}

.file-input {
  display: none;
}

.file-info {
  margin-top: 20px;
  padding: 15px;
  background: #f0f9ff;
  border-radius: 8px;
  border-left: 4px solid #0052cc;
}

.file-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.file-details {
  color: #666;
  font-size: 0.9rem;
}

.submit-section {
  text-align: center;
  margin-top: 40px;
}

.submit-button {
  background: linear-gradient(45deg, #0052cc, #4285f4);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 82, 204, 0.3);
}

.submit-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.error-message {
  color: #ef4444;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 12px;
  margin: 15px 0;
  text-align: center;
}

.success-message {
  color: #10b981;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  padding: 12px;
  margin: 15px 0;
  text-align: center;
}

@media (max-width: 768px) {
  .submission-container {
    padding: 100px 15px 40px;
  }
  
  .submission-title {
    font-size: 2.2rem;
  }
  
  .journal-grid {
    grid-template-columns: 1fr;
  }
  
  .submission-steps {
    flex-direction: column;
    align-items: center;
  }
}`;

function PaperSubmissionPage() {
  const navigate = useNavigate();
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem('adminAuthToken');
      const userEmail = localStorage.getItem('userEmail');
      const storedUserName = localStorage.getItem('userName');
      
      if (!authToken || !userEmail) {
        // User not logged in, redirect to login
        navigate('/login');
        return;
      }
      
      // User is logged in, show the page
      setUserName(storedUserName || userEmail.split('@')[0]);
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleJournalSelect = (journal) => {
    setSelectedJournal(journal);
    setError('');
  };

  const handleFileUpload = (file) => {
    if (!file) return;

    // Check file size (10MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return;
    }

    // Check file type
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      setError('Please upload only PDF, DOC, DOCX, or TXT files');
      return;
    }

    setUploadedFile(file);
    setError('');
    console.log('File uploaded:', file.name, 'Size:', (file.size / 1024 / 1024).toFixed(2) + 'MB');
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleSubmit = async () => {
    if (!selectedJournal) {
      setError('Please select a journal category');
      return;
    }

    if (!uploadedFile) {
      setError('Please upload your paper document');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const userEmail = localStorage.getItem('userEmail');
      
      // Prepare submission data
      const submissionData = {
        userEmail: userEmail,
        journalName: selectedJournal.name,
        journalIcon: selectedJournal.icon,
        paperTitle: uploadedFile.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        fileName: uploadedFile.name
      };
      
      // Submit to backend
      const response = await submitPaper(submissionData);
      
      if (response.success) {
        setSuccess('Paper submitted successfully! You will receive a confirmation email shortly.');
        
        // Reset form after successful submission
        setTimeout(() => {
          setSelectedJournal(null);
          setUploadedFile(null);
          setSuccess('');
          navigate('/profile');
        }, 3000);
      } else {
        setError(response.message || 'Failed to submit paper. Please try again.');
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      setError('Failed to submit paper. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentStep = () => {
    if (!selectedJournal) return 1;
    if (!uploadedFile) return 2;
    return 3;
  };

  const currentStep = getCurrentStep();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="submission-container">
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '20px' }}>⏳</div>
          <div>Checking authentication...</div>
        </div>
        <style>
          {styles}
        </style>
      </div>
    );
  }

  return (
    <div className="submission-container">
      <div className="submission-header">
        <h1 className="submission-title">Submit Your Paper</h1>
        <p className="submission-subtitle">
          Welcome, {userName}! Share your research with the academic community. Select a journal category, upload your paper, and submit for review.
        </p>
        
        <div className="submission-steps">
          <div className={`step ${currentStep >= 1 ? (currentStep > 1 ? 'completed' : 'active') : 'pending'}`}>
            <span>1</span>
            <span>Select Journal</span>
          </div>
          <div className={`step ${currentStep >= 2 ? (currentStep > 2 ? 'completed' : 'active') : 'pending'}`}>
            <span>2</span>
            <span>Upload Paper</span>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : 'pending'}`}>
            <span>3</span>
            <span>Submit</span>
          </div>
        </div>
      </div>

      {/* Journal Selection */}
      <div className="journal-selection">
        <h2 className="section-title">Select Journal Category</h2>
        <div className="journal-grid">
          {JOURNAL_CATEGORIES.map((journal) => (
            <div
              key={journal.id}
              className={`journal-card ${selectedJournal?.id === journal.id ? 'selected' : ''}`}
              onClick={() => handleJournalSelect(journal)}
            >
              {selectedJournal?.id === journal.id && (
                <div className="selected-indicator">✓</div>
              )}
              <div className="journal-icon">{journal.icon}</div>
              <div className="journal-name">{journal.name}</div>
              <div className="journal-description">{journal.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div className="upload-section">
        <h2 className="section-title">Upload Your Paper</h2>
        <div
          className={`upload-area ${isDragging ? 'dragover' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input').click()}
        >
          <div className="upload-icon">📄</div>
          <div className="upload-text">
            {uploadedFile ? 'Click to change file' : 'Click to upload or drag and drop'}
          </div>
          <div className="upload-hint">
            PDF, DOC, DOCX, or TXT files up to 10MB
          </div>
          <input
            id="file-input"
            type="file"
            className="file-input"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInputChange}
          />
        </div>

        {uploadedFile && (
          <div className="file-info">
            <div className="file-name">{uploadedFile.name}</div>
            <div className="file-details">
              Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
        )}
      </div>

      {/* Error/Success Messages */}
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* Submit Button */}
      <div className="submit-section">
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={!selectedJournal || !uploadedFile || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Paper'}
        </button>
      </div>

      <style>
        {styles}
      </style>
    </div>
  );
}

export default PaperSubmissionPage;
