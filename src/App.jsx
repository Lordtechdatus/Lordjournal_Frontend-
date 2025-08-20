import { useEffect, useState } from "react";
import Header from "./Header";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";

const APP_STYLE_ID = "app-inline-style";

const styles = `
#root {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 100px auto 50px;
  padding: 0 20px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.logo {
  height: 4em;
  padding: 1em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  max-width: 600px;
}

.card button {
  background-color: #0052cc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 600;
  margin-bottom: 15px;
  transition: background-color 0.3s;
}

.card button:hover {
  background-color: #0047b3;
}

.card p {
  color: #444;
  font-size: 1.1rem;
}

/* Responsive styles */
@media (max-width: 768px) {
  .container { margin-top: 120px; }
  .logo { height: 3em; }
}

@media (max-width: 480px) {
  .container { margin-top: 100px; padding: 0 15px; }
  .logo-container { flex-direction: column; gap: 10px; }
  .logo { height: 2.5em; }
  .card { padding: 1.5em; }
}
`;

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Inject App.css styles once
  useEffect(() => {
    if (!document.getElementById(APP_STYLE_ID)) {
      const tag = document.createElement("style");
      tag.id = APP_STYLE_ID;
      tag.type = "text/css";
      tag.appendChild(document.createTextNode(styles));
      document.head.appendChild(tag);
    }
  }, []);

  // Simple navigation function
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={navigateTo} />;
      case 'home':
      default:
        return <Homepage />;
    }
  };

  return (
    <>
      <Header onNavigate={navigateTo} currentPage={currentPage} />
      {renderCurrentPage()}
      <Footer />
      <CookieConsent />
    </>
  );
}

export default App;
