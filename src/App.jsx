import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import CivilEngineeringJournal from "./CivilEngineeringJournal";
import Footer from "./Footer";
import JournalsPage from "./JournalsPage";
import BooksPage from "./BooksPage";
import DatabasesPage from "./DatabasesPage";
import PlatformsPage from "./PlatformsPage";



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

@media (max-width: 768px) {
  .container { margin-top: 120px; }
}

@media (max-width: 480px) {
  .container { margin-top: 100px; padding: 0 15px; }
}
`;

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    if (!document.getElementById(APP_STYLE_ID)) {
      const tag = document.createElement("style");
      tag.id = APP_STYLE_ID;
      tag.type = "text/css";
      tag.appendChild(document.createTextNode(styles));
      document.head.appendChild(tag);
    }
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <Routes>
      <Route path="/" element={
        <Layout currentPage={currentPage} onNavigate={navigateTo}>
          <Homepage />
        </Layout>
      } />
      <Route path="/login" element={
        <Layout currentPage={currentPage} onNavigate={navigateTo}>
          <LoginPage onNavigate={navigateTo} />
        </Layout>
      } />
      <Route path="/journals/civil-engineering" element={
        <Layout currentPage={currentPage} onNavigate={navigateTo}>
          <CivilEngineeringJournal />
        </Layout>
      } />
      <Route path="/footer" element={
        <Footer />
      } />
      <Route path="/journals" element={
        <Layout currentPage={currentPage} onNavigate={navigateTo}>
          <JournalsPage />
        </Layout>
      } />
      <Route path="/books" element={
        <Layout currentPage={currentPage} onNavigate={navigateTo}>
          <BooksPage />
        </Layout>
      } />
      <Route path="/databases" element={
        <Layout currentPage={currentPage} onNavigate={navigateTo}>
          <DatabasesPage />
        </Layout>
      } />
      <Route path="/platforms" element={
        <Layout currentPage={currentPage} onNavigate={navigateTo}>
          <PlatformsPage />
        </Layout>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;