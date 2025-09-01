import React from "react";

const PRIVACY_STYLE_ID = 'privacy-inline-styles';

const styles = `
.privacy-container {
  min-height: 100vh;
  background: #f8f9fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.privacy-header-space {
  height: 80px;
  background: transparent;
}

.privacy-footer-space {
  height: 80px;
  background: transparent;
}

.privacy-content {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.privacy-title-section {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 60px 40px 40px;
  text-align: center;
  position: relative;
  margin-top: 50px;
}

.privacy-title-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.privacy-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}

.privacy-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0 0 30px 0;
  position: relative;
  z-index: 1;
}

.privacy-date {
  background: rgba(255, 255, 255, 0.2);
  padding: 12px 24px;
  border-radius: 25px;
  display: inline-block;
  font-size: 0.95rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 1;
}

.privacy-body {
  padding: 50px 40px;
  line-height: 1.8;
  color: #2c3e50;
}

.privacy-main-content {
  margin: 40px 0;
}

.privacy-content-text {
  font-size: 1.05rem;
  margin-bottom: 25px;
  color: #495057;
  text-align: justify;
  line-height: 1.8;
}

.privacy-intro {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 40px;
  border-left: 5px solid #667eea;
  position: relative;
}
  

.privacy-intro-text {
  font-size: 1.1rem;
  margin: 0 0 20px 0;
  color: #495057;
}

.privacy-intro-text:last-child {
  margin-bottom: 0;
}

.privacy-section {
  margin-bottom: 50px;
  position: relative;
}

.privacy-section-title {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 25px 0;
  padding-bottom: 15px;
  border-bottom: 3px solid #667eea;
  position: relative;
}

.privacy-section-title::before {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.privacy-section-text {
  font-size: 1.05rem;
  margin-bottom: 20px;
  color: #495057;
}

.privacy-list {
  list-style: none;
  padding: 0;
  margin: 25px 0;
}

.privacy-list-item {
  background: white;
  margin-bottom: 15px;
  padding: 20px 25px;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
}

.privacy-list-item::before {
  content: '✓';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  background: #667eea;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
}

.privacy-list-item:hover {
  transform: translateX(5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.privacy-definition {
  background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
  padding: 25px;
  border-radius: 12px;
  margin: 20px 0;
  border-left: 4px solid #e53e3e;
}

.privacy-definition-term {
  font-weight: 600;
  color: #2d3748;
  font-size: 1.1rem;
}

.privacy-definition-text {
  color: #4a5568;
  margin-top: 8px;
}

.privacy-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, #667eea, transparent);
  margin: 60px 0;
  border-radius: 1px;
}

.privacy-footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 40px;
  text-align: center;
  margin-top: 50px;
}

.privacy-footer-text {
  font-size: 1.1rem;
  margin: 0 0 20px 0;
  opacity: 0.9;
}

.privacy-contact {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px 25px;
  border-radius: 25px;
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.privacy-contact:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.privacy-contact::before {
  content: '📧';
  font-size: 1.2rem;
}

.privacy-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.privacy-link:hover {
  color: #764ba2;
  border-bottom-color: #764ba2;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .privacy-container {
    padding: 0;
  }
  
  .privacy-header-space {
    height: 60px;
  }
  
  .privacy-footer-space {
    height: 60px;
  }
  
  .privacy-content {
    border-radius: 15px;
    margin: 0 15px;
  }
  
  .privacy-title-section {
    padding: 40px 25px 30px;
  }
  
  .privacy-title {
    font-size: 2.5rem;
  }
  
  .privacy-subtitle {
    font-size: 1rem;
  }
  
  .privacy-body {
    padding: 30px 25px;
  }
  
  .privacy-intro {
    padding: 25px 20px;
  }
  
  .privacy-content-text {
    font-size: 1rem;
    text-align: left;
  }
}

@media (max-width: 480px) {
  .privacy-container {
    padding: 0;
  }
  
  .privacy-header-space {
    height: 50px;
  }
  
  .privacy-footer-space {
    height: 50px;
  }
  
  .privacy-content {
    margin: 0 10px;
  }
  
  .privacy-title-section {
    padding: 30px 20px 25px;
  }
  
  .privacy-title {
    font-size: 2rem;
  }
  
  .privacy-body {
    padding: 25px 20px;
  }
  
  .privacy-intro {
    padding: 20px 15px;
  }
  
  .privacy-content-text {
    font-size: 0.95rem;
  }
}
`;

const PrivacyPolicy = () => {

  // Inject styles once
  React.useEffect(() => {
    if (!document.getElementById(PRIVACY_STYLE_ID)) {
      const tag = document.createElement("style");
      tag.id = PRIVACY_STYLE_ID;
      tag.type = "text/css";
      tag.appendChild(document.createTextNode(styles));
      document.head.appendChild(tag);
    }
  }, []);

  return (
    <div className="privacy-container">
      {/* Header Space */}
      <div className="privacy-header-space"></div>
      
      <div className="privacy-content">
        {/* Body Content */}
        <div className="privacy-title-section">
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-subtitle">Your privacy and data protection rights</p>
            <div className="privacy-date">
              Last updated: <strong>July 28, 2025</strong>
            </div>
          </div>
        <div className="privacy-body">
          {/* Introduction */}
         
          
          <div className="privacy-intro">
            <p className="privacy-intro-text">
              This privacy policy ("policy") governs the collection, use, and protection of personal data 
              for <strong>Lord Journal</strong>, a scholarly publishing platform dedicated to advancing 
              research and academic excellence.
            </p>
            <p className="privacy-intro-text">
              We are committed to protecting your privacy and ensuring the security of your personal 
              information. This policy explains how we collect, use, store, and protect your data when 
              you use our services.
            </p>
          </div>

          {/* All Content in One Section */}
          <div className="privacy-main-content">
            <p className="privacy-content-text">
              <strong>Data Processing Overview:</strong> Lord Journal processes personal data to provide scholarly publishing services, 
              facilitate research submissions, and maintain academic integrity. Our processing activities are designed to support 
              the academic community while respecting your privacy rights.
            </p>

            <p className="privacy-content-text">
              <strong>Website Usage:</strong> When you visit our website, we collect limited technical data to ensure proper 
              functionality and security. For registered users, we process account information to provide personalized services 
              and maintain your profile.
            </p>

            <p className="privacy-content-text">
              <strong>Research Submissions:</strong> We handle manuscript data, author information, and peer review communications 
              to facilitate the publishing process. We may contact you regarding your submissions, account updates, or important 
              service announcements.
            </p>

            <p className="privacy-content-text">
              <strong>Analytics and Legal Compliance:</strong> We use aggregated, anonymized data to improve our services and 
              understand user needs. We may process data to comply with legal obligations and protect our rights and interests.
            </p>

            <p className="privacy-content-text">
              <strong>Key Definitions:</strong> Personal Data refers to any information that can identify you directly or indirectly, 
              including your name, email address, institutional affiliation, and research interests. Processing means any operation 
              performed on personal data, including collection, storage, analysis, sharing, and deletion of information. 
              Lord Journal serves as the Data Controller, determining the purposes and means of processing your personal data.
            </p>

            <p className="privacy-content-text">
              <strong>Your Rights:</strong> Under applicable data protection laws, you have the right to access, rectify, erase, 
              port, object to, and restrict processing of your personal data. You can request a copy of the personal data we hold 
              about you, correct any inaccurate or incomplete information, request deletion under certain circumstances, receive 
              your data in a structured format, object to processing for certain purposes, and request limitation of processing 
              under specific conditions.
            </p>

            <p className="privacy-content-text">
              <strong>Contact Information:</strong> If you have any questions about our privacy practices or wish to exercise 
              your rights, please contact us at <a href="mailto:privacy@lordjournal.com" className="privacy-link">privacy@lordjournal.com</a>. 
              We are committed to addressing your concerns promptly and transparently.
            </p>
          </div>

          {/* Privacy Policy Title at Bottom */}
          
        </div>
      </div>

      {/* Footer Space */}
      <div className="privacy-footer-space"></div>
    </div>
  );
};

export default PrivacyPolicy;
