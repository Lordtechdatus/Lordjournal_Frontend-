-- Lord Journal Database Setup
-- Run this in MySQL Workbench

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS lordjournal_db;
USE lordjournal_db;

-- Create users table for registration
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    given_names VARCHAR(255) NOT NULL,
    family_name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    terms_accepted BOOLEAN DEFAULT FALSE,
    marketing_accepted BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expires DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_verification_token (verification_token),
    INDEX idx_reset_token (reset_token)
);

-- Create user_sessions table for login tracking
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_session_token (session_token),
    INDEX idx_user_id (user_id)
);

-- Create user_profiles table for additional user information
CREATE TABLE IF NOT EXISTS user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    phone VARCHAR(20),
    institution VARCHAR(255),
    department VARCHAR(255),
    research_interests TEXT,
    profile_picture VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

-- Insert sample data (optional - for testing)
INSERT INTO users (email, given_names, family_name, password_hash, terms_accepted, marketing_accepted, email_verified) VALUES
('admin@lordjournal.com', 'Admin', 'User', '$2b$10$example.hash.here', TRUE, TRUE, TRUE),
('test@example.com', 'Test', 'User', '$2b$10$example.hash.here', TRUE, FALSE, FALSE);

-- Show the created tables
SHOW TABLES;

-- Describe the users table structure
DESCRIBE users;
