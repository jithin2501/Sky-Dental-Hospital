import React from 'react';
import '../styles/hero.css';

function Hero() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="hero"
      id="home"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-text">
          <h1>Your Journey to a Brighter Smile Starts Here</h1>
          <p>
            Sky Dental Hospital is your trusted choice for modern, affordable
            dental care in Kanhangad, Kasaragod, offering expert treatment
            and comfortable care for brighter smiles.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={scrollToContact}>
              Schedule Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
