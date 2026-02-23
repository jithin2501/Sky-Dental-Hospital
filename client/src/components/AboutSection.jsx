import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AboutUs.css';

function AboutSection() {
  return (
    <section className="about" id="about">
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem', color: '#0A3D5C' }}>
        ABOUT SKY DENTAL
      </h2>
      <div className="about-inner">
        <div className="about-left">
          <h2 className="section-title" style={{ color: '#0A3D5C', marginBottom: '0.2rem', fontSize: '2.8rem', lineHeight: '1.25' }}>
            Your Trusted Partner in <span className="highlight">Dental Health</span>
          </h2>
          <p className="about-desc">
            We believe quality dental care should be accessible to everyone. Sky Dental Hospital was created
            to deliver expert, compassionate oral healthcare — empowering patients to make confident decisions
            about their smiles. With transparency and trust at the core, we're reshaping the way people
            experience dental care.
          </p>
          <div className="about-stats-row">
            <div className="about-stat-item">
              <div>
                <span className="about-stat-number">40+</span>
                <span className="about-stat-label">Expert Doctors</span>
              </div>
            </div>
            <div className="about-stat-item">
              <div>
                <span className="about-stat-number">30+</span>
                <span className="about-stat-label">Years Of Experience</span>
              </div>
            </div>
            <div className="about-stat-item">
              <div>
                <span className="about-stat-number">57K+</span>
                <span className="about-stat-label">Happy Patients</span>
              </div>
            </div>
          </div>
          <Link to="/about" className="learn-more-btn">
            Learn More About Us
            <span className="btn-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </Link>
        </div>

        <div className="about-right-gallery">
          <div className="about-gallery-main">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
              alt="Modern Dental Clinic"
            />
          </div>
          <div className="about-gallery-side">
            <div className="about-gallery-side-box">
              <img
                src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=400"
                alt="Dental Equipment"
              />
            </div>
            <div className="about-gallery-side-box">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=400"
                alt="Sky Dental Team"
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
                  alt="Dental Icon"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;