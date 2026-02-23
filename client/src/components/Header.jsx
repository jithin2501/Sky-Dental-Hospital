import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import '../styles/MobileMenu.css';

// Polls for an element by id and scrolls to it once found
function scrollWhenReady(id, behavior = 'smooth', maxWait = 3000) {
  const start = Date.now();
  const attempt = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior });
    } else if (Date.now() - start < maxWait) {
      requestAnimationFrame(attempt);
    }
  };
  requestAnimationFrame(attempt);
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      // Navigate via React Router (no full reload), then poll for element
      sessionStorage.setItem('scrollTo', id);
      navigate('/');
    } else {
      scrollWhenReady(id);
    }
  };

  // Runs whenever we land on '/' — picks up the stored scroll target
  useEffect(() => {
    if (location.pathname === '/') {
      const target = sessionStorage.getItem('scrollTo');
      if (target) {
        sessionStorage.removeItem('scrollTo');
        // 'instant' so the user never sees the page scroll from the top
        scrollWhenReady(target, 'instant');
      }
    }
  }, [location.pathname]);

  return (
    <>
      <header className={scrolled ? 'header scrolled' : 'header'}>
        <nav className="nav">
          <Link to="/" className="logo">
            <img src="./images/banner_logo/hospital_logo.png" alt="Sky Dental Logo" className="logo-img" />
            <div className="logo-text-wrapper">
              <span className="logo-text main-title">SKY DENTAL</span>
              <span className="logo-text sub-title"><b>CLINICS</b></span>
            </div>
          </Link>

          <ul className="nav-links">
            <li>
              <button className="nav-btn" onClick={() => scrollTo('home')}>Home</button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => scrollTo('about')}>About</button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => scrollTo('services')}>Services</button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => scrollTo('facilities')}>Facilities</button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => scrollTo('team')}>Team</button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => scrollTo('reviews')}>Reviews</button>
            </li>
            <li>
              <Link to="/contact" className={location.pathname === '/contact' ? 'nav-active' : ''}>Contact</Link>
            </li>
            <li>
              <Link to="/contact" className="cta-button">Book Appointment</Link>
            </li>
          </ul>

          <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}>
            <svg viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>✕</button>
        <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
        <button className="mobile-nav-btn" onClick={() => scrollTo('about')}>About</button>
        <button className="mobile-nav-btn" onClick={() => scrollTo('services')}>Services</button>
        <button className="mobile-nav-btn" onClick={() => scrollTo('facilities')}>Facilities</button>
        <button className="mobile-nav-btn" onClick={() => scrollTo('team')}>Team</button>
        <button className="mobile-nav-btn" onClick={() => scrollTo('reviews')}>Reviews</button>
        <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
        <Link to="/contact" className="cta-button" onClick={() => setMobileOpen(false)}>Book Appointment</Link>
      </div>
    </>
  );
}

export default Header;