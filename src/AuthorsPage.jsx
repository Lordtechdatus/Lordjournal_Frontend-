import React, { useEffect } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import './styles.css';

const STYLE_ID = 'authors-page-styles';

const AuthorsPage = () => {
  // Inject page-specific styles once
  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const tag = document.createElement('style');
      tag.id = STYLE_ID;
      tag.type = 'text/css';
      tag.appendChild(document.createTextNode(`
        .authors-page {
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
          color: #0f172a;
        }

        .authors-hero {
          position: relative;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 20px 80px;
          background:
            radial-gradient(1200px 500px at 50% -10%, rgba(59,130,246,0.15), transparent 60%),
            radial-gradient(800px 400px at 100% 10%, rgba(16,185,129,0.12), transparent 60%),
            linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          overflow: hidden;
        }

        .authors-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&auto=format&fit=crop&q=80') center/cover no-repeat;
          opacity: 0.08;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .authors-hero .hero-content h1 {
          font-size: clamp(2.2rem, 6vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          color: #0f172a;
        }

        .authors-hero .hero-content p {
          max-width: 780px;
          margin: 0 auto 2rem;
          color: #334155;
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          line-height: 1.7;
        }

        .cta-button {
          background: linear-gradient(135deg, #0052cc 0%, #007fff 100%);
          color: #fff;
          border: none;
          padding: 0.9rem 1.5rem;
          border-radius: 999px;
          font-weight: 700;
          letter-spacing: 0.01em;
          box-shadow: 0 10px 30px rgba(0,82,204,0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .cta-button:hover { transform: translateY(-2px); box-shadow: 0 14px 38px rgba(0,82,204,0.35); }

        .section-title {
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          font-weight: 800;
          text-align: center;
          margin: 60px 0 20px;
          color: #0f172a;
        }

        .benefits-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          padding: 0 20px;
        }

        .benefit-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 24px rgba(2, 6, 23, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .benefit-card:hover { transform: translateY(-6px); box-shadow: 0 16px 36px rgba(2, 6, 23, 0.12); }

        .benefit-icon {
          font-size: 2rem;
          display: inline-flex;
          width: 48px; height: 48px;
          align-items: center; justify-content: center;
          border-radius: 12px;
          background: #eef2ff;
          color: #1d4ed8;
          margin-bottom: 12px;
        }

        .benefit-card h3 { font-size: 1.1rem; margin-bottom: 8px; color: #0f172a; }
        .benefit-card p { color: #475569; line-height: 1.6; }

        .how-it-works { padding: 20px 0 0; }
        .process-steps {
          max-width: 1000px; margin: 0 auto; padding: 0 20px;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;
        }
        .process-step {
          background: #ffffff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 20px;
          box-shadow: 0 8px 22px rgba(2, 6, 23, 0.06);
        }
        .step-number { width: 36px; height: 36px; border-radius: 50%; background: #e0f2fe; color: #0369a1; display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 10px; }

        .resources-grid {
          max-width: 1000px; margin: 0 auto; padding: 0 20px;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;
        }
        .resource-card { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 20px; box-shadow: 0 8px 22px rgba(2, 6, 23, 0.06); }
        .resource-button { margin-top: 10px; background: #0ea5e9; border: none; color: white; padding: 10px 14px; border-radius: 999px; font-weight: 700; cursor: pointer; }
        .resource-button:hover { background: #0284c7; }

        .cta-section { text-align: center; padding: 80px 20px; background: linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%); margin-top: 40px; }
        .cta-section h2 { font-size: clamp(1.8rem, 4vw, 2.4rem); margin-bottom: 10px; }
        .cta-section p { color: #475569; margin-bottom: 20px; }

        @media (max-width: 768px) {
          .authors-hero { padding: 100px 16px 60px; }
        }
      `));
      document.head.appendChild(tag);
    }
  }, []);

  // Scroll to top on mount (in case routed directly)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="authors-page">
      {/* Hero Section */}
      <motion.section 
        className="authors-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1>Empower Your Research Journey</h1>
          <p>Join our global community of researchers and make your work more impactful</p>
          <button className="cta-button">Get Started</button>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <motion.h2 
          {...fadeIn}
          className="section-title"
        >
          Why Publish With Us?
        </motion.h2>
        <div className="benefits-grid">
          {[
            {
              title: "Global Reach",
              description: "Access a worldwide audience of researchers, institutions, and practitioners",
              icon: "🌍"
            },
            {
              title: "Fast Publication",
              description: "Efficient review process and rapid publication of accepted papers",
              icon: "⚡"
            },
            {
              title: "Quality Assurance",
              description: "Rigorous peer review process ensuring high academic standards",
              icon: "✓"
            },
            {
              title: "Open Access Options",
              description: "Choose between traditional and open access publishing models",
              icon: "🔓"
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <span className="benefit-icon">{benefit.icon}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <motion.h2 
          {...fadeIn}
          className="section-title"
        >
          Publication Process
        </motion.h2>
        <div className="process-steps">
          {[
            {
              step: 1,
              title: "Submit Your Manuscript",
              description: "Use our easy online submission system to submit your work"
            },
            {
              step: 2,
              title: "Peer Review",
              description: "Expert reviewers evaluate your work for quality and relevance"
            },
            {
              step: 3,
              title: "Revision",
              description: "Incorporate reviewer feedback to enhance your manuscript"
            },
            {
              step: 4,
              title: "Publication",
              description: "Your work is published and distributed globally"
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              className="process-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <div className="step-number">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources-section">
        <motion.h2 
          {...fadeIn}
          className="section-title"
        >
          Author Resources
        </motion.h2>
        <div className="resources-grid">
          {[
            {
              title: "Author Guidelines",
              description: "Comprehensive guide for manuscript preparation and submission",
              buttonText: "Read Guidelines"
            },
            {
              title: "Templates",
              description: "Download journal-specific templates for your manuscript",
              buttonText: "Get Templates"
            },
            {
              title: "FAQ",
              description: "Find answers to common questions about publishing",
              buttonText: "View FAQs"
            }
          ].map((resource, index) => (
            <motion.div
              key={index}
              className="resource-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <button className="resource-button">{resource.buttonText}</button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2>Ready to Publish Your Research?</h2>
        <p>Join thousands of researchers who trust us with their work</p>
        <button className="cta-button">Submit Manuscript</button>
      </motion.section>
    </div>
    </LazyMotion>
  );
};

export default AuthorsPage;
