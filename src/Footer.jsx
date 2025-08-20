import { Fragment } from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Column 1 */}
        <div className="footer-column">
          <h4>Products</h4>
          <ul className="footer-list">
            <li>Journals</li>
            <li>Books</li>
            <li>Platforms</li>
            <li>Databases</li>
          </ul>
        </div>
        
        {/* Column 2 */}
        <div className="footer-column">
          <h4>Researchers & Partners</h4>
          <ul className="footer-list">
            <li>Authors</li>
            <li>Editors</li>
            <li>Open science</li>
            <li>Societies</li>
            <li>Partners & Affiliates</li>
            <li>Policies</li>
          </ul>
        </div>
        
        {/* Column 3 */}
        <div className="footer-column">
          <h4>Librarians</h4>
          <ul className="footer-list">
            <li>Overview</li>
            <li>Products</li>
            <li>Licensing</li>
            <li>Tools & Services</li>
            <li>Account Development</li>
            <li>Blog</li>
            <li>Sales and account contacts</li>
          </ul>
        </div>
        
        {/* Column 4 */}
        <div className="footer-column">
          <h4>Our Company</h4>
          <ul className="footer-list">
            <li>Overview</li>
            <li>About us</li>
            <li>Careers</li>
            <li>Education</li>
            <li>Professional</li>
            <li>Media Centre</li>
            <li>Locations & Contact</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} Lord Journal. All rights reserved.</div>
        <div className="social-icons">
          <a href="#" className="social-icon">
            <span>𝕏</span>
          </a>
          <a href="#" className="social-icon">
            <span>ƒ</span>
          </a>
          <a href="#" className="social-icon">
            <span>in</span>
          </a>
        </div>
        <div className="footer-links">
          <a href="/terms" className="footer-link">Terms</a>
          <a href="/privacy" className="footer-link">Privacy</a>
          <a href="/cookies" className="footer-link">Cookies</a>
          <a href="/accessibility" className="footer-link">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}