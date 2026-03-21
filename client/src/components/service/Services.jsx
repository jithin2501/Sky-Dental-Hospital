import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/serviceStyles/Services.css';

const services = [
  {
    title: 'Smile Makeover',
    slug: 'smile-makeover',
    img: '/images/Our Services/Smile Makeover.png',
    desc: 'Transform your smile with our comprehensive makeover treatments — from veneers and whitening to full aesthetic restorations tailored to you.'
  },
  {
    title: 'Braces & Invisalign',
    slug: 'braces-invisalign',
    img: '/images/Our Services/braces.png',
    desc: 'Straighten your teeth discreetly with modern braces and clear aligner systems tailored to your lifestyle and dental goals.'
  },
  {
    title: 'Implants & Restorative Care',
    slug: 'implants-restorative-care',
    img: '/images/Our Services/dental-surgery.png',
    desc: 'Replace missing teeth permanently and restore full dental function with implants, root canal treatments, and digital smile solutions.'
  },
  {
    title: 'Cosmetic & Advanced Dentistry',
    slug: 'cosmetic-advanced-dentistry',
    img: '/images/Our Services/facelift.png',
    desc: 'From cosmetic enhancements to laser dentistry and full mouth rehabilitation — advanced care for a healthier, more beautiful smile.'
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