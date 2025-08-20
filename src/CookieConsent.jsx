import { useState, useEffect } from "react";

const COOKIE_STYLE_ID = "cookie-consent-inline-style";

const styles = `
.cookie-consent {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(34, 34, 34, 0.95);
  color: #fff;
  padding: 15px 20px;
  text-align: center;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
}

.cookie-text {
  font-size: 0.95rem;
  margin: 0;
}

.cookie-buttons {
  display: flex;
  gap: 10px;
}

.accept-button {
  background-color: #0052cc;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.accept-button:hover {
  background-color: #003d99;
}

.decline-button {
  background-color: transparent;
  color: #fff;
  border: 1px solid #fff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.decline-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.cookie-link {
  color: #4dabf7;
  text-decoration: underline;
  cursor: pointer;
}

.cookie-link:hover {
  color: #74c0fc;
}

@media (max-width: 768px) {
  .cookie-consent {
    flex-direction: column;
    padding: 15px;
  }
}
`;

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  // Inject styles once
  useEffect(() => {
    if (!document.getElementById(COOKIE_STYLE_ID)) {
      const tag = document.createElement("style");
      tag.id = COOKIE_STYLE_ID;
      tag.type = "text/css";
      tag.appendChild(document.createTextNode(styles));
      document.head.appendChild(tag);
    }
  }, []);

  // Run only once on mount
  useEffect(() => {
    const hasConsent = localStorage.getItem("cookieConsent");
    if (!hasConsent) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent">
      <p className="cookie-text">
        This site uses cookies to improve your experience and analyze site traffic. 
        By continuing, you consent to our use of cookies. 
        Learn more in our{" "}
        <a href="/privacy" className="cookie-link">
          Privacy Policy
        </a>.
      </p>
      <div className="cookie-buttons">
        <button onClick={acceptCookies} className="accept-button">
          Accept All Cookies
        </button>
        <button onClick={declineCookies} className="decline-button">
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
