import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/hero.css';

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="hero"
      id="home"
      style={{
        backgroundImage: "url('./images/banner_logo/banner.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="hero-content">
        <div className="hero-text">
          <h1>Your Journey to a Brighter Smile Starts Here</h1>
          <p>
            Sky Dental Hospital is your trusted choice for modern, affordable
            dental care in Kanhangad, Kasaragod, offering expert treatment
            and comfortable care for brighter smiles.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate('/book-appointment')}>
              Schedule Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;