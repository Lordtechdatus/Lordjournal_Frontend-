-- Create user_submissions table to track paper submissions
CREATE TABLE IF NOT EXISTS user_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    journal_name VARCHAR(255) NOT NULL,
    journal_icon VARCHAR(10) DEFAULT '📄',
    paper_title VARCHAR(500) NOT NULL,
    file_path VARCHAR(500),
    status ENUM('submitted', 'under_review', 'accepted', 'rejected', 'published') DEFAULT 'submitted',
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_journal_name (journal_name),
    INDEX idx_status (status)
);

-- Insert some sample data for testing
INSERT INTO user_submissions (user_id, journal_name, journal_icon, paper_title, status) VALUES
(1, 'Lord Journal of Civil Engineering', '🏗️', 'Advanced Structural Analysis Methods', 'published'),
(1, 'Lord Journal of Civil Engineering', '🏗️', 'Sustainable Construction Materials', 'under_review'),
(1, 'Lord Journal of Mechanical Engineering', '⚙️', 'Thermodynamic Optimization in HVAC Systems', 'submitted'),
(2, 'Lord Journal of Computer Science & Engineering', '💻', 'Machine Learning Algorithms for Data Processing', 'published'),
(2, 'Lord Journal of Computer Science & Engineering', '💻', 'Blockchain Technology in Supply Chain', 'under_review'),
(3, 'Lord Journal of Electrical Engineering', '⚡', 'Renewable Energy Integration', 'published'),
(3, 'Lord Journal of Electronics Engineering', '🔌', 'IoT Sensor Networks', 'submitted');
