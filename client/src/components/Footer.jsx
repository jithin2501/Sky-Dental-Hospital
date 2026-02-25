import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHome = (e) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">

      <div className="footer-wave-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path fill="#071E2E" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <div className="footer-main">

        {/* Brand Column */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/images/banner_logo/hospital_logos.png" alt="Sky Dental Logo" className="footer-logo-img" />
            <div className="footer-logo-text">
              <span className="main">SKY DENTAL</span>
              <span className="sub">Hospital</span>
            </div>
          </Link>

          <div className="footer-brand-divider" />

          <p>Providing exceptional dental care since 1998. Committed to helping you achieve optimal oral health with personalized treatment and a warm, welcoming environment.</p>

          <div className="footer-socials">
            <a href="#" className="footer-social-link" aria-label="Facebook">
              <img src="/images/social/facebok-icon.jpg" alt="Facebook" />
            </a>
            <a href="#" className="footer-social-link" aria-label="Instagram">
              <img src="/images/social/instagram-icon.jpg" alt="Instagram" />
            </a>
            <a href="#" className="footer-social-link" aria-label="WhatsApp">
              <img src="/images/social/whatsapp-icon.jpg" alt="WhatsApp" />
            </a>
            <a href="#" className="footer-social-link" aria-label="Youtube">
              <img src="/images/social/youtube-icon.jpg" alt="Youtube" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/" onClick={handleHome}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
            <li><a href="#facilities" onClick={(e) => { e.preventDefault(); scrollToSection('facilities'); }}>Facilities</a></li>
            <li><a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection('team'); }}>Our Team</a></li>
            <li><a href="#reviews" onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}>Reviews</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services/orthodontics">Orthodontics</Link></li>
            <li><Link to="/services/general-dentistry">General Dentistry</Link></li>
            <li><Link to="/services/pediatric-dentistry">Pediatric Dentistry</Link></li>
            <li><Link to="/services/cosmetic-dentistry">Cosmetic Dentistry</Link></li>
            <li><Link to="/services/dental-implants-restorations">Dental Implants & Restorations</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact Us</h4>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <img src="/images/social/phone-icon.png" alt="Phone" />
            </div>
            <div className="footer-contact-info">
              <a href="tel:+917356734344">+91 73567 34344</a>
            </div>
          </div>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <img src="/images/social/email-icon.png" alt="Email" />
            </div>
            <div className="footer-contact-info">
              <a href="mailto:ad.skydentalhospital@gmail.com">ad.skydentalhospital@gmail.com</a>
            </div>
          </div>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <img src="/images/social/location-icon.png" alt="Location" />
            </div>
            <div className="footer-contact-info">
              <p>Sky Dental, Kanhangad - Rajapuram - Malom Rd, Pullur, Kerala 671531</p>
            </div>
          </div>

          <Link to="/contact" className="footer-cta">
            Book Appointment
            <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© 2026 Sky Dental Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;