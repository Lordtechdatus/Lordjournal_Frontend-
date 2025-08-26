import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function EducationJournal() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  const journalInfo = {
    about: [
      "The Lord Journal of Education (LJE) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is devoted to advancing research and innovation in the field of education, serving as a dynamic platform for educators, researchers, policymakers, and practitioners.",
      "LJE promotes interdisciplinary scholarship that addresses the evolving needs of educational systems, pedagogical practices, and learning technologies across global contexts. The journal encourages dialogue between theory and practice, fostering inclusive and evidence-based educational reform.",
      "With a commitment to scholarly rigor, editorial excellence, and open accessibility, LJE aims to shape the future of education by supporting research that empowers learners and enhances teaching across all levels."
    ],
    aimAndScopeIntro: [
      "The Lord Journal of Education aims to publish original research, review articles, case studies, and educational innovations that contribute to the theory and practice of teaching, learning, and educational leadership.",
      "LJE welcomes contributions from diverse educational contexts, including formal, informal, and non-formal learning environments, and encourages interdisciplinary and cross-cultural perspectives."
    ],
    scope: [
      { title: "Curriculum and Instruction", description: "Instructional design, curriculum development, subject pedagogy, and interdisciplinary teaching." },
      { title: "Educational Technology", description: "E-learning, blended learning, EdTech innovations, digital literacy, and AI in education." },
      { title: "Teacher Education and Professional Development", description: "Pre-service and in-service teacher training, reflective practice, and pedagogical competency." },
      { title: "Educational Leadership and Management", description: "School leadership, organizational behavior, education policy, and institutional governance." },
      { title: "Inclusive and Special Education", description: "Disability studies, learning accommodations, assistive technologies, and equity in education." },
      { title: "Assessment and Evaluation", description: "Learning analytics, formative and summative assessment, educational measurement, and feedback systems." },
      { title: "Early Childhood and Primary Education", description: "Child development, foundational learning, early years pedagogy, and play-based learning." },
      { title: "Higher Education and Research Training", description: "University teaching, research supervision, graduate education, and academic policy." },
      { title: "Sociology and Philosophy of Education", description: "Educational equity, critical pedagogy, multiculturalism, and ethics in education." },
      { title: "Lifelong Learning and Adult Education", description: "Vocational training, continuing education, community learning, and skills development." }
    ],
    editorialBoard: []
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const STYLE_ID = 'education-journal-styles';
    if (!document.getElementById(STYLE_ID)) {
      const styleTag = document.createElement('style');
      styleTag.id = STYLE_ID;
      styleTag.innerHTML = `
        .journal-page { min-height: 100vh; background-color: #f8f9fa; }
        .journal-header { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 60px 20px 40px; text-align: center; }
        .journal-title { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; }
        .journal-subtitle { font-size: clamp(1rem, 2vw, 1.2rem); opacity: 0.9; max-width: 800px; margin: 0 auto; }
        .journal-nav { background: white; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: sticky; top: 70px; z-index: 100; }
        .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: center; gap: 2rem; align-items: center; }
        .nav-link { color: #0369a1; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; transition: all 0.2s ease; font-weight: 500; }
        .nav-link:hover, .nav-link.active { background: #e0f2fe; }
        .main-content { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
        .section-title { font-size: 1.8rem; font-weight: 700; color: #0369a1; margin-bottom: 1.5rem; }
        .section-paragraph { color: #374151; line-height: 1.7; margin-bottom: 1rem; }
        .scope-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem; margin-bottom: 3rem; }
        .scope-item { background: white; padding: 1rem 1.25rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.08); }
        .scope-title { font-weight: 600; color: #0369a1; margin-bottom: 0.5rem; }
        .scope-description { color: #4b5563; font-size: 0.95rem; }
        .editorial-board { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
        .editor-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .editor-name { font-size: 1.2rem; font-weight: 600; color: #0369a1; margin-bottom: 0.5rem; }
        .editor-role { color: #4b5563; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .editor-affiliation { color: #6b7280; font-size: 0.9rem; }
        .submit-button { display: inline-block; background: #0284c7; color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.2s ease; margin-top: 2rem; }
        .submit-button:hover { background: #0369a1; transform: translateY(-2px); }
        @media (max-width: 768px) { .journal-header { padding: 30px 15px; } .nav-container { flex-wrap: wrap; gap: 1rem; } .nav-link { font-size: 0.9rem; } }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div className="journal-page">
      <header className="journal-header">
        <h1 className="journal-title">Lord Journal of Education (LJE)</h1>
        <p className="journal-subtitle">A peer-reviewed, open-access international journal by Lord-Tech Datus Sol Pvt. Ltd.</p>
      </header>

      <nav className="journal-nav">
        <div className="nav-container">
          <Link to="/" className="nav-link">
            <span role="img" aria-label="home">🏠</span> Home
          </Link>
          <a
            href="#editorial-board"
            className={'nav-link' + (activeTab === 'editorial' ? ' active' : '')}
            onClick={() => setActiveTab('editorial')}
          >
            Editorial Board
          </a>
          <Link to="/login" className="nav-link">Login</Link>
        </div>
      </nav>

      <main className="main-content">
        <section id="about-us">
          <h2 className="section-title">About Us</h2>
          {journalInfo.about.map((paragraph, index) => (
            <p key={index} className="section-paragraph">{paragraph}</p>
          ))}
        </section>

        <section id="editorial-board">
          <h2 className="section-title">Editorial Board</h2>
          {journalInfo.editorialBoard.length === 0 ? (
            <p className="section-paragraph">Editorial Board will be updated soon.</p>
          ) : (
            <div className="editorial-board">
              {journalInfo.editorialBoard.map((editor, index) => (
                <div key={index} className="editor-card">
                  <div className="editor-name">{editor.name}</div>
                  <div className="editor-role">{editor.role}</div>
                  {editor.affiliation && (
                    <div className="editor-affiliation">{editor.affiliation}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="aim-and-scope">
          <h2 className="section-title">Aim and Scope</h2>
          {journalInfo.aimAndScopeIntro.map((paragraph, index) => (
            <p key={index} className="section-paragraph">{paragraph}</p>
          ))}
          <div className="scope-grid">
            {journalInfo.scope.map((item, index) => (
              <div key={index} className="scope-item">
                <div className="scope-title">{item.title}</div>
                <div className="scope-description">{item.description}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ textAlign: 'center' }}>
          <Link to="/Login" className="submit-button">Submit Your Paper</Link>
        </div>
      </main>
    </div>
  );
}


