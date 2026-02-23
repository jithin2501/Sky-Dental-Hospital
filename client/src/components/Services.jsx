import React from 'react';
import '../styles/Services.css';

const ToothIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2C9.5 2 7 4.5 7 7c0 3.5 2 6 5 9 3-3 5-5.5 5-9 0-2.5-2.5-5-5-5z"/>
    <circle cx="12" cy="7" r="1.5"/>
  </svg>
);

const services = [
  {
    title: 'Braces',
    desc: 'We use advanced orthodontic techniques to gradually move your teeth into alignment, improve your bite, and enhance dental health.'
  },
  {
    title: 'Teeth Whitening',
    desc: 'Professional teeth whitening treatments designed to remove stains and brighten your smile safely and effectively.'
  },
  {
    title: 'Dental Implants',
    desc: 'Restore your missing teeth with high-quality dental implants that look, feel, and function like your natural teeth.'
  },
  {
    title: 'Root Canal',
    desc: 'Expert root canal treatments to save infected teeth and provide long-lasting relief from dental pain.'
  }
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

function Services() {
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
                <div className="service-icon"><ToothIcon /></div>
                <h3>{s.title}</h3>
              </div>
              <p>{s.desc}</p>
              <a href="#services" className="service-link">View Detail →</a>
            </div>
          ))}
        </div>

        <div className="services-center-img">
          <img
            src="/images/Our Services/dental machine.jpg"
            alt="Dental Equipment"
          />
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
                <div className="service-icon"><ToothIcon /></div>
                <h3>{s.title}</h3>
              </div>
              <p>{s.desc}</p>
              <a href="#services" className="service-link">View Detail →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
