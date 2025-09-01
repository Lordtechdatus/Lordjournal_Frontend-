-- Create cookie_consents table for tracking user cookie preferences
CREATE TABLE IF NOT EXISTS cookie_consents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    user_email VARCHAR(255) NULL,
    consent BOOLEAN NOT NULL,
    user_agent TEXT NULL,
    ip_address VARCHAR(45) NULL,
    session_id VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_user_email (user_email),
    INDEX idx_consent (consent),
    INDEX idx_created_at (created_at)
);

-- Sample data (optional - for testing)
INSERT INTO cookie_consents (user_email, consent, user_agent, ip_address, session_id) VALUES
('test@example.com', TRUE, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '192.168.1.1', 'session_123'),
('demo@example.com', FALSE, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '192.168.1.2', 'session_456');
