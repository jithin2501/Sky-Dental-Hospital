import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import '../styles/MobileMenu.css';

function scrollWhenReady(id, behavior = 'smooth', maxWait = 3000) {
  const start = Date.now();

  // Hide page to prevent flash when navigating from another route
  if (behavior === 'instant') {
    document.documentElement.classList.add('scroll-pending');
  }

  const attempt = () => {
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 80;
      const extraOffsets = { services: -80, about: 0, facilities: 0, team: 0, reviews: 0 };
      const extra = extraOffsets[id] ?? 0;
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - extra;
      window.scrollTo({ top, behavior });
      // Reveal page after scroll position is set
      document.documentElement.classList.remove('scroll-pending');
    } else if (Date.now() - start < maxWait) {
      requestAnimationFrame(attempt);
    } else {
      // Timeout fallback — always reveal page
      document.documentElement.classList.remove('scroll-pending');
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
      sessionStorage.setItem('scrollTo', id);
      navigate('/');
    } else {
      scrollWhenReady(id);
    }
  };

  const goHome = () => {
    setMobileOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      const target = sessionStorage.getItem('scrollTo');
      if (target) {
        sessionStorage.removeItem('scrollTo');
        scrollWhenReady(target, 'instant');
      }
    }
  }, [location.pathname]);

  return (
    <>
      <header className={scrolled ? 'header scrolled' : 'header'}>
        <nav className="nav">
          <Link to="/" className="logo">
            <img src="/images/banner_logo/hospital_logos.png" alt="Sky Dental Logo" className="logo-img" />
            <div className="logo-text-wrapper">
              <span className="logo-text main-title">SKY DENTAL</span>
              <span className="logo-text sub-title"><b>HOSPITAL</b></span>
            </div>
          </Link>

          <ul className="nav-links">
            <li><button className="nav-btn" onClick={goHome}>Home</button></li>
            <li><button className="nav-btn" onClick={() => scrollTo('about')}>About</button></li>
            <li><button className="nav-btn" onClick={() => scrollTo('services')}>Services</button></li>
            <li><button className="nav-btn" onClick={() => scrollTo('facilities')}>Facilities</button></li>
            <li><button className="nav-btn" onClick={() => scrollTo('team')}>Team</button></li>
            <li><button className="nav-btn" onClick={() => scrollTo('reviews')}>Reviews</button></li>
            <li>
              <Link to="/contact" className={location.pathname === '/contact' ? 'nav-active' : ''}>Contact</Link>
            </li>
            <li>
              <Link to="/book-appointment" className="cta-button" onClick={() => setMobileOpen(false)}>Book Appointment</Link>
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

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>✕</button>
        <button className="mobile-nav-btn" onClick={goHome}>Home</button>
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