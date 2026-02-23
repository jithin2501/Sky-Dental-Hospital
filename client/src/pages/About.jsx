import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/About.css';

const branches = [
  {
    tag: 'Branch 01',
    name: 'Sky Dental Clinic',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.4!2d74.9!3d12.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS2FuaGFuZ2Fk!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin',
    address: 'Parappally, Kanhangad,\nKasaragod District, Kerala',
    services: ['General & Preventive', 'Dental Fillings', 'Cleaning & Whitening', 'Tooth Extractions'],
  },
  {
    tag: 'Branch 02',
    name: 'Sky Dental Hospital',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.4!2d74.98!3d12.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS2FuaGFuZ2Fk!5e0!3m2!1sen!2sin!4v1600000000001!5m2!1sen!2sin',
    address: 'Kanhangad Town,\nKasaragod District, Kerala',
    services: ['Dental Implants', 'Cosmetic Design', 'Orthodontics', 'Advanced Oral Surgery'],
  },
];

function About() {
  // Animate stats on mount
  useEffect(() => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      let current = 0;
      const increment = target / 60;
      const update = () => {
        if (current < target) {
          current += increment;
          stat.innerText = Math.ceil(current) + '%';
          setTimeout(update, 15);
        } else {
          stat.innerText = target + '%';
        }
      };
      update();
    });
  }, []);

  return (
    <div className="about-page">
      <Header />

      {/* ── Banner ── */}
      <div className="banner-wrap">
        <div className="banner">
          <img
            className="banner-bg-img"
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80"
            alt="Sky Dental Hospital"
          />
          <div className="banner-overlay" />
          <div className="banner-deco-circle c1" />
          <div className="banner-deco-circle c2" />
          <span className="banner-plus p1">+</span>
          <span className="banner-plus p2">+</span>
          <span className="banner-plus p3">+</span>
          <div className="banner-hollow" />
          <div className="banner-content">
            <h1>About Us</h1>
            <p>Sky Dental Hospital — providing advanced and compassionate dental care for patients of all ages. Trusted by thousands across Kasaragod district for over 25 years of dental excellence.</p>
          </div>
        </div>
      </div>

      {/* ── About Section ── */}
      <div className="about-section">
        <div className="image-composition">
          <div className="main-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"
              alt="Sky Dental Hospital Interior"
              className="main-image"
            />
            <div className="experience-badge">
              <img
                src="/images/Ceo/Dr Melvin mathew.png"
                alt="Dr. Melvin Mathew"
                className="doctor-photo"
              />
              <div className="badge-footer">
                <h3>25+</h3>
                <p>years of medical excellence</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-side">
          <div className="top-section">
            <div className="about-label">About Sky Dental Hospital</div>
            <h1 className="about-title">
              Commitment to your smile's <span className="about-highlight">health and beauty</span>
            </h1>
            <p className="about-description">
              Sky Dental Hospital is one of the most trusted dental hospitals in Parappally, Kanhangad,
              Kasaragod, providing advanced and compassionate dental care for patients of all ages.
              Founded by Dr. Melvin Mathew, our hospital was established with the vision of delivering
              world-class dental treatments locally, without patients needing to travel to big cities.
            </p>
          </div>
          <div className="bottom-section">
            <div className="about-divider" />
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number" data-target="98">0%</div>
                <div className="stat-text">Invisalign Treatment<br />Complete</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="100">0%</div>
                <div className="stat-text">Patient Satisfaction<br />Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Why Choose Us ── */}
      <section className="why-section">
        <div className="why-grid">
          <div className="why-left">
            <div className="why-label">Why Choose Us</div>
            <h2 className="why-title">
              Excellence results <span className="about-highlight">you can trust</span>
            </h2>
            <p className="why-subtitle">
              At Sky Dental Hospital, Parappally, Kanhangad, we provide comfortable, affordable, and
              trustworthy dental care for patients across Kasaragod district. From children to seniors,
              we offer personalized treatments using advanced technology in a safe and hygienic environment.
            </p>
            <Link to="/contact" className="contact-btn">
              Contact Us
              <span className="contact-btn-plus">+</span>
            </Link>
          </div>

          <div className="doctor-center">
            <img
              src="/images/About us/why choose us.png"
              alt="Doctor"
            />
          </div>

          <div className="features-col">
            {[
              {
                title: 'Expert Care',
                desc: 'Led by Dr. Melvin Mathew, an experienced and compassionate dentist.',
                icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
              },
              {
                title: 'Comprehensive Services',
                desc: 'From routine check-ups to implants, braces, and cosmetic dentistry – all under one roof.',
                icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
              },
              {
                title: 'Advanced Technology',
                desc: 'Modern equipment and techniques for safe and painless dentistry.',
                icon: <><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" /></>,
              },
              {
                title: 'Patient Comfort',
                desc: 'Friendly staff and a stress-free atmosphere.',
                icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
              },
            ].map((f, i) => (
              <div className="feature-item" key={i}>
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon}
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Purpose Section ── */}
      <div className="purpose-section">
        <div className="purpose-image-section">
          <div className="purpose-img-wrapper">
            <img
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"
              alt="Sky Dental Advanced Machine"
              className="purpose-main-img"
            />
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
              alt="Sky Dental Medical Team"
              className="purpose-sub-img"
            />
            <div className="rotating-badge">
              <div className="circle-text">
                <svg viewBox="0 0 100 100" width="100" height="100">
                  <defs>
                    <path id="circlePath" d="M 50,50 m -41,0 a 41,41 0 1,1 82,0 a 41,41 0 1,1 -82,0" />
                  </defs>
                  <text fontSize="7" fontWeight="700" letterSpacing="1.2" fill="white">
                    <textPath xlinkHref="#circlePath">
                      15+ YEARS OF EXPERIENCE • 15+ YEARS OF EXPERIENCE •
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
            <div className="decor-plus plus-1">+</div>
            <div className="decor-star star-1" />
          </div>
        </div>

        <div className="purpose-content">
          <div className="purpose-tagline"><span>+</span><span>Our Purpose</span></div>
          <h2>
            Compassionate Care for a <span className="about-highlight">Lifetime of Healthy Smiles</span>
          </h2>
          <p className="purpose-description">
            Sky Dental Hospital, Parappally, Kanhangad offers comfortable, affordable, and trustworthy
            dental care for all ages. With advanced technology and a caring approach, we ensure safe,
            stress-free visits and brighter smiles established with the vision of delivering world-class
            dental treatments locally.
          </p>
          <div className="purpose-features-grid">
            {['Trustworthy & Safe', 'Affordable Healthcare', 'Advanced Technology', 'Stress-Free Experience'].map((item, i) => (
              <div className="purpose-feature-item" key={i}>
                <div className="check-icon">
                  <svg viewBox="0 0 24 24" fill="white">
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                  </svg>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Process Section ── */}
      <section className="process-section">
        <div className="process-container">
          <div className="process-content">
            <div>
              <div className="about-label">Our Process</div>
              <h2 className="about-title proc-title">
                Our <span className="about-highlight">Dental Care Process</span>
              </h2>
            </div>
            <div className="proc-steps">
              {[
                {
                  num: 1,
                  title: 'Initial Consultation',
                  desc: "Your journey begins with an in-depth consultation. We'll listen to your concerns and discuss your personalized goals.",
                  icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>,
                  hasLine: true,
                },
                {
                  num: 2,
                  title: 'Treatment By Experts',
                  desc: "Once the plan is finalized, we'll proceed with your treatment using the latest technology and care.",
                  icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
                  hasLine: true,
                },
                {
                  num: 3,
                  title: 'Follow-Up Care',
                  desc: "After your treatment, we'll schedule follow-up appointments to monitor your progress and ensure lasting results.",
                  icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
                  hasLine: false,
                },
              ].map((step, i) => (
                <div className="proc-step-item" key={i}>
                  <div className="proc-step-icon-wrap">
                    <div className="proc-step-badge">{step.num}</div>
                    <div className="proc-step-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#088395" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {step.icon}
                      </svg>
                    </div>
                    {step.hasLine && <div className="proc-step-line" />}
                  </div>
                  <div className="proc-step-text">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="process-image-grid">
            <div className="proc-img-wrapper proc-img-1">
              <img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=400" alt="Consultation" />
            </div>
            <div className="proc-img-wrapper proc-img-2">
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400" alt="Procedure" />
            </div>
            <div className="proc-img-wrapper proc-img-3">
              <img src="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800" alt="Modern Clinic" />
            </div>
            <div className="proc-team-badge">
              <div className="proc-team-avatars">
                {[1, 2, 3, 4].map(n => (
                  <div className="proc-avatar" key={n}>
                    <img src={`https://i.pravatar.cc/100?u=${n}`} alt={`Team ${n}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Locations ── */}
      <div className="locations-section">
        <div className="loc-header">
          <span className="loc-label-tag">Our Locations</span>
          <h2>Two Branches, One Commitment to Your Smile</h2>
          <p>Visit us at either of our conveniently located branches in Kasaragod district — same trusted care, same quality standards at both.</p>
        </div>
        <div className="branches-grid">
          {branches.map((b, i) => (
            <div className="branch-card" key={i}>
              <div className="branch-map">
                <iframe src={b.mapSrc} allowFullScreen loading="lazy" title={b.name} />
              </div>
              <div className="branch-body">
                <div className="branch-head">
                  <div className="branch-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div className="branch-meta">
                    <span className="branch-tag">{b.tag}</span>
                    <span className="branch-name">{b.name}</span>
                  </div>
                </div>
                <div className="branch-divider" />
                <div className="branch-address">
                  <div className="branch-address-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#088395" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="branch-address-text">
                    <span className="branch-address-label">Address</span>
                    <span className="branch-address-val">{b.address}</span>
                  </div>
                </div>
                <div className="branch-services">
                  {b.services.map(s => (
                    <div className="branch-service-item" key={s}>
                      <span className="branch-dot" />
                      {s}
                    </div>
                  ))}
                </div>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="branch-map-link">
                  View on Google Maps
                  <svg viewBox="0 0 24 24" fill="none" stroke="#088395" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;