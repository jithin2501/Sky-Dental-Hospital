import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AboutUs/AboutUs.css';

function AboutSection() {
  return (
    <>
      {/* Anchor sits above the section so scroll lands at the title */}
      <div id="about" />

      <section className="about">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem', color: '#0A3D5C' }}>
          About Sky Dental
        </h2>

        <div className="about-inner">
          <div className="about-left">
            <h2 className="section-title" style={{ color: '#0A3D5C', marginBottom: '0.2rem', fontSize: '2.8rem', lineHeight: '1.25' }}>
              Your Trusted Partner in <span className="highlight">Dental Health</span>
            </h2>
            <p className="about-desc">
              We believe quality dental care should be accessible to everyone. Sky Dental Hospital is the best dental hospital in Kasaragod and Kanhangad, dedicated
              to delivering expert, compassionate oral healthcare — empowering patients across Odayanchal and Parapally to make confident decisions
              about their smiles. With transparency and trust at the core, we're reshaping the way people
              experience dental care in Kerala.
            </p>
            <div className="about-stats-row">
              <div className="about-stat-item">
                <div>
                  <span className="about-stat-number">20+</span>
                  <span className="about-stat-label">Expert Doctors</span>
                </div>
              </div>
              <div className="about-stat-item">
                <div>
                  <span className="about-stat-number">10+</span>
                  <span className="about-stat-label">Years Of Experience</span>
                </div>
              </div>
              <div className="about-stat-item">
                <div>
                  <span className="about-stat-number">50K+</span>
                  <span className="about-stat-label">Happy Patients</span>
                </div>
              </div>
            </div>
            <Link to="/about" className="learn-more-btn">
              Learn More About Us
              <span className="btn-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>

          <div className="about-right-gallery">
            <div className="about-gallery-main">
              <img
                src="/images/About sky dental/About 1.jpg"
                alt="Modern Sky Dental Clinic Interior in Odayanchal Parapally"
                loading="lazy"
              />
            </div>
            <div className="about-gallery-side">
              <div className="about-gallery-side-box">
                <img
                  src="/images/About sky dental/About 2.jpg"
                  alt="Advanced Dental Equipment at Sky Dental Hospital"
                />
              </div>
              <div className="about-gallery-side-box">
                <img
                  src="/images/About us/im.jpg"
                  alt="Sky Dental Hospital Expert Doctors Team"
                />
              </div>
            </div>

            {/* Rotating Badge */}
            <div className="about-promo-badge">
              <div className="about-badge-inner">
                <svg className="about-rotating-svg" viewBox="0 0 100 100">
                  <defs>
                    <path
                      id="aboutCirclePath"
                      d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                    />
                  </defs>
                  <text fill="white" fontSize="9.5" fontWeight="900" letterSpacing="1">
                    <textPath xlinkHref="#aboutCirclePath">
                      YOUR SMILE OUR PASSION • YOUR SMILE OUR PASSION •
                    </textPath>
                  </text>
                </svg>
                <div className="about-badge-icon">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3534/3534066.png"
                    alt="Sky Dental Healthcare Icon"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default AboutSection;