import Header from '../Header';
import Footer from '../Footer';
import CookieConsent from '../CookieConsent';

export default function Layout({ children, currentPage, onNavigate }) {
  return (
    <>
      <Header onNavigate={onNavigate} currentPage={currentPage} />
      {children}
      <Footer />
      <CookieConsent />
    </>
  );
}
