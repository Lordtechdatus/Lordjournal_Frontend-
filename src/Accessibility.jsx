import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Accessibility() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#1a1a1a', background: '#f7f9fa', minHeight: '100vh' }}>
        <Header />
      <section
        style={{
          marginTop: '70px',
          background: 'linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)',
          color: '#fff',
          padding: '60px 20px 30px 20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Lord Journals Accessibility Statement
        </h1>
        <div
          style={{
            display: 'inline-block',
            background: '#1976d2',
            color: '#fff',
            borderRadius: '20px',
            padding: '0.4em 1.2em',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginBottom: '1.5rem',
          }}
        >
          We're committed to easy access for everyone
        </div>
      </section>

      {/* Main Content */}
      <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
          {/* Statement and Features */}
          <div style={{ flex: 2, minWidth: '300px' }}>
            <p>
              Lord Journals is committed to making our website as accessible as possible to everyone, including those with visual, hearing, cognitive, and motor impairments. We’re constantly working towards improving the accessibility of our website to ensure we provide equal access to all of our users.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '2em 0 1em 0', color: '#1a1a1a' }}>
              <li>✔️ Recent versions of popular screen readers</li>
              <li>✔️ Operating system screen magnifiers</li>
              <li>✔️ Speech recognition software</li>
              <li>✔️ Operating system speech packages</li>
            </ul>
            <p style={{ marginTop: '1.5em' }}>
              We always make sure that our website follows accessibility best practices by following the principles of universal design. This ensures the site is flexible and adaptable to different users’ needs or preferences, and is accessible through a variety of different technologies, including mobile devices or assistive technologies.
            </p>
          </div>
          {/* Contact Box */}
          <div
            style={{
              flex: 1,
              minWidth: '260px',
              background: '#e3eaf2',
              borderRadius: '12px',
              padding: '1.5em',
              marginTop: '1em',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              height: 'fit-content'
            }}
          >
            <h3 style={{ color: '#0d1b2a', marginTop: 0 }}>Contact us for feedback or questions</h3>
            <p style={{ fontSize: '1em', color: '#37474f' }}>
              If you would like to request accessibility-related assistance, report any accessibility problems, or request any information in accessible alternative formats, please use our queries form or contact us.
            </p>
            <a
              href="#"
              style={{
                display: 'inline-block',
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#1976d2',
                color: '#fff',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Accessibility queries form
            </a>
          </div>
        </div>

        {/* Accessibility Practices */}
        <section style={{ marginTop: '3em', background: '#fff', borderRadius: '12px', padding: '2em', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <h2 style={{ color: '#1b263b' }}>Accessibility Practices</h2>
          <ul style={{ listStyle: 'none', padding: 0, color: '#1a1a1a' }}>
            <li>✔️ Realigning the ability to adjust the font size</li>
            <li>✔️ Maintaining color/contrast ratios for text</li>
            <li>✔️ Providing keyboard accessible navigation</li>
            <li>✔️ Providing skip to content links at the top of the page</li>
            <li>✔️ Exposing information to the accessibility API through the use of ARIA attributes</li>
          </ul>
        </section>

        {/* WCAG Section */}
        <section style={{ marginTop: '3em', background: '#f7f9fa', borderRadius: '12px', padding: '2em' }}>
          <h2 style={{ color: '#1b263b' }}>Web Content Accessibility Guidelines (WCAG) 2.1</h2>
          <p>
            Wherever possible, Lord Journals will aim to meet level AA of the Web Content Accessibility Guidelines (WCAG 2.1). These guidelines outline four main principles:
          </p>
          <ul>
            <li><strong>Perceivable:</strong> Information and user interface components must be presentable to users in ways they can perceive.</li>
            <li><strong>Operable:</strong> User interface components and navigation must be operable.</li>
            <li><strong>Understandable:</strong> Information and the operation of user interface must be understandable.</li>
            <li><strong>Robust:</strong> Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Accessibility;