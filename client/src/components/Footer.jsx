import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">

      {/* Wave sits absolutely at the very top, overlapping the section above */}
      <div className="footer-wave-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path fill="#071E2E" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <div className="footer-main">

        {/* Brand Column */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="./images/banner_logo/hospital_logos.png" alt="Sky Dental Logo" className="footer-logo-img" />
            <div className="footer-logo-text">
              <span className="main">SKY DENTAL</span>
              <span className="sub">Clinics</span>
            </div>
          </Link>

          <div className="footer-brand-divider" />

          <p>Providing exceptional dental care since 1998. Committed to helping you achieve optimal oral health with personalized treatment and a warm, welcoming environment.</p>

          {/* Social Links */}
          <div className="footer-socials">
            <a href="#" className="footer-social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="footer-social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" style={{fill:'none', stroke:'currentColor', strokeWidth:2, strokeLinecap:'round'}}/></svg>
            </a>
            <a href="#" className="footer-social-link" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
            <a href="#" className="footer-social-link" aria-label="Google Maps">
              <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#about">About Us</Link></li>
            <li><Link to="/#services">Services</Link></li>
            <li><Link to="/#facilities">Facilities</Link></li>
            <li><Link to="/#team">Our Team</Link></li>
            <li><Link to="/#reviews">Reviews</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/#services">General Dentistry</Link></li>
            <li><Link to="/#services">Cosmetic Dentistry</Link></li>
            <li><Link to="/#services">Orthodontics</Link></li>
            <li><Link to="/#services">Dental Implants</Link></li>
            <li><Link to="/#services">Teeth Whitening</Link></li>
            <li><Link to="/#services">Root Canal</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact Us</h4>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.28 6.28l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div className="footer-contact-info">
              <span>Phone</span>
              <a href="tel:+919876543210">+91 98765 43210</a>
            </div>
          </div>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div className="footer-contact-info">
              <span>Email</span>
              <a href="mailto:info@skydentalclinics.com">info@skydentalclinics.com</a>
            </div>
          </div>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div className="footer-contact-info">
              <span>Location</span>
              <p>Kanhangad, Kasaragod, Kerala</p>
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
          <p>© 2026 Sky Dental Clinics. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;