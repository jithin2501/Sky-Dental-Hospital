import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Services.css';

const services = [
  {
    title: 'Orthodontics',
    slug: 'orthodontics',
    img: '/images/Our Services/braces.png',
    desc: 'We use advanced orthodontic techniques to gradually move your teeth into alignment, improve your bite, and enhance dental health.'
  },
  {
    title: 'Dental Implants & Restorations',
    slug: 'dental-implants-restorations',
    img: '/images/Our Services/dental-surgery.png',
    desc: 'Professional dental implant and restoration treatments designed to replace missing teeth and restore your smile with natural-looking results.'
  },
  {
    title: 'Pediatric Dentistry',
    slug: 'pediatric-dentistry',
    img: '/images/Our Services/pediatric.png',
    desc: 'Specialized dental care for children, ensuring their oral health is maintained with gentle, child-friendly treatments.'
  },
  {
    title: 'Cosmetic Dentistry',
    slug: 'cosmetic-dentistry',
    img: '/images/Our Services/facelift.png',
    desc: 'Expert cosmetic dentistry treatments to enhance the appearance of your smile with veneers, crowns, and other aesthetic procedures.'
  }
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

function Services() {
  const navigate = useNavigate();

  return (
    <section className="services" id="services">
      <div className="services-header">
        <h2>Our <span className="highlight">Services</span></h2>
        <p>Get the care your smile deserves with our comprehensive dental services. We provide gentle, reliable treatments designed to keep your teeth strong and beautiful.</p>
      </div>

      <div className="services-layout">
        <div className="services-col">
          {services.slice(0, 2).map((s, i) => (
            <div className="service-card" key={i}>
              <div className="service-card-header">
                <div className="service-icon">
                  <img src={s.img} alt={s.title} />
                </div>
                <h3>{s.title}</h3>
              </div>
              <p>{s.desc}</p>
              <span className="service-link" onClick={() => navigate(`/services/${s.slug}`)}>
                View Detail →
              </span>
            </div>
          ))}
        </div>

        <div className="services-center-img">
          <img src="/images/Our Services/dental machine.jpg" alt="Dental Equipment" />
          <div className="operational-day">
            <h4>Operational Day</h4>
            <div className="op-days">
              {days.map(d => (
                <div className="op-day" key={d}>
                  <span className="day-label">{d}</span>
                  <span className="check">✓</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="services-col">
          {services.slice(2).map((s, i) => (
            <div className="service-card" key={i}>
              <div className="service-card-header">
                <div className="service-icon">
                  <img src={s.img} alt={s.title} />
                </div>
                <h3>{s.title}</h3>
              </div>
              <p>{s.desc}</p>
              <span className="service-link" onClick={() => navigate(`/services/${s.slug}`)}>
                View Detail →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;