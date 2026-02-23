import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-about">
          <h3>Sky Dental Clinics</h3>
          <p>Providing exceptional dental care since 1998. We're committed to helping you achieve and maintain optimal oral health with personalized treatment plans and a warm, welcoming environment.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/#services">Services</Link></li>
            <li><Link to="/#facilities">Facilities</Link></li>
            <li><Link to="/#reviews">Reviews</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Services</h4>
          <ul>
            <li><Link to="/#services">General Dentistry</Link></li>
            <li><Link to="/#services">Cosmetic Dentistry</Link></li>
            <li><Link to="/#services">Orthodontics</Link></li>
            <li><Link to="/#services">Implants</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:5551234567">(555) 123-4567</a></li>
            <li><a href="mailto:info@skydentalclinics.com">info@skydentalclinics.com</a></li>
            <li><Link to="/contact">Book Appointment</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Sky Dental Clinics. All rights reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
}

export default Footer;
