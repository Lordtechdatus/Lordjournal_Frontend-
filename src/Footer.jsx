import { useEffect } from "react";

const FOOTER_STYLE_ID = "footer-inline-styles";
const styles = `
.footer {
  background: #0a2a38;
  color: #cfd8dc;
  padding: 60px 20px;
  width: 100%;
}

.footer-grid {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
}

.footer-column h4 {
  color: #fff;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.footer-list {
  list-style: none;
  padding: 0;
  line-height: 1.8;
}

.footer-list li {
  margin-bottom: 8px;
  cursor: pointer;
  transition: color 0.2s;
}

.footer-list li:hover {
  color: #fff;
}

.footer-bottom {
  margin-top: 40px;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 20px;
  text-align: center;
  font-size: 0.9rem;
}

.footer-links {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.footer-link {
  color: #cfd8dc;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #fff;
  text-decoration: underline;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.social-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  transition: background 0.3s;
  text-decoration: none;
  color: inherit;
}

.social-icon:hover {
  background: rgba(255,255,255,0.2);
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .footer { padding: 40px 15px; }
  .footer-grid { grid-template-columns: 1fr; gap: 30px; }
}
`;

export default function Footer() {
  // Inject styles once
  useEffect(() => {
    if (typeof document !== "undefined" && !document.getElementById(FOOTER_STYLE_ID)) {
      const tag = document.createElement("style");
      tag.id = FOOTER_STYLE_ID;
      tag.type = "text/css";
      tag.appendChild(document.createTextNode(styles));
      document.head.appendChild(tag);
    }
  }, []);

  return (
    <footer className="footer" role="contentinfo">
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
          <h4>Researchers &amp; Partners</h4>
          <ul className="footer-list">
            <li>Authors</li>
            <li>Editors</li>
            <li>Open science</li>
            <li>Societies</li>
            <li>Partners &amp; Affiliates</li>
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
            <li>Tools &amp; Services</li>
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
            <li>Locations &amp; Contact</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} Lord Journal. All rights reserved.</div>

        <div className="social-icons" aria-label="Social links">
          <a href="#" className="social-icon" aria-label="X (Twitter)">
            <span>𝕏</span>
          </a>
          <a href="#" className="social-icon" aria-label="Facebook">
            <span>ƒ</span>
          </a>
          <a href="#" className="social-icon" aria-label="LinkedIn">
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
