import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/hero.css';

function Hero() {
  const navigate = useNavigate();
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);

  const seoPoints = [
    "Best Dental Hospital in Kasaragod & Kanhangad",
    "Top-Rated Clinic in Odayanchal & Parapally",
    "Advanced Implants & Painless Laser Treatments",
    "Expert Dental Care in Kasaragod District",
    "World-Class Smile Makeovers in Kerala"
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % seoPoints.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [seoPoints.length]);

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
          <div className="hero-badge">
            <div className="badge-dot"></div>
            <span key={currentTextIndex} className="badge-text-anim">
              {seoPoints[currentTextIndex]}
            </span>
          </div>
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