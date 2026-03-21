import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrthodonticsSlider from '../../components/service/OrthodonticsSlider';
import '../../styles/ServiceDetail/BracesInvisalign.css';

const process = [
  { step: '01', title: 'Consultation',   desc: 'We assess your teeth and discuss the best orthodontic options for you.' },
  { step: '02', title: 'Treatment Plan', desc: 'A personalised plan is created with a clear timeline and expected results.' },
  { step: '03', title: 'Treatment',      desc: 'Braces or aligners are fitted and adjusted regularly to guide your teeth.' },
  { step: '04', title: 'Retention',      desc: 'Retainers keep your teeth in their new position after treatment ends.' },
];

const subServices = [
  {
    name: 'Teeth Whitening',
    icon: '/images/Service_subServices/Teeth Whitening.png',
    img: '/images/Service_img/Teeth Whitening.jpeg',
    desc: 'Professional-grade whitening that lifts stains and brightens your smile several shades in just one visit.',
    bullets: [
      'In-chair & take-home options',
      'Safe for enamel — clinically tested',
      'Results last 12–24 months',
      'Immediate, visible difference',
    ],
  },
  {
    name: 'Kids & Teen Dental Care',
    icon: '/images/Service_subServices/Kids Dental Care.png',
    img: '/images/Service_img/Kids Dental Care.jpg',
    desc: 'Friendly, age-appropriate dental care that builds healthy habits early and makes every visit something kids look forward to.',
    bullets: [
      'Gentle, child-friendly techniques',
      'Early orthodontic assessment',
      'Sealants & fluoride protection',
      'Fun, positive clinic environment',
    ],
  },
  {
    name: 'Crown & Bridge Dentistry',
    icon: '/images/Service_subServices/Bridge Dentistry.png',
    img: '/images/Service_img/Bridge Dentistry.jpg',
    desc: 'Durable, natural-looking crowns and bridges that restore broken or missing teeth with a seamless aesthetic fit.',
    bullets: [
      'Porcelain, zirconia & metal-fused options',
      'Protects weakened or cracked teeth',
      'Fixed bridges replace missing teeth',
      'Same-day CAD/CAM crown options',
    ],
  },
];

function BracesInvisalign() {
  const navigate = useNavigate();
  return (
    <>
      <div className="banner-wrap">
        <div className="banner">
          <img className="banner-bg-img" src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1400&q=80" alt="Braces & Invisalign" />
          <div className="banner-overlay" />
          <div className="banner-content"><h1>Braces & Invisalign</h1></div>
        </div>
      </div>

      <section className="sd-section">

        {/* Intro */}
        <div className="sd-intro">
          <div className="sd-intro-text">
            <h2>About <span className="highlight">Braces & Invisalign</span></h2>
            <p>Whether you prefer traditional braces or the near-invisible convenience of Invisalign, our orthodontic experts craft a personalised treatment plan — alongside whitening, crowns, and dedicated kids' care.</p>
            <button className="sd-cta-btn" onClick={() => navigate('/book-appointment')}>Book an Appointment →</button>
          </div>
          <div className="sd-intro-img">
            <OrthodonticsSlider
              beforeSrc="/images/services/orth2.png"
              afterSrc="/images/services/orth1.png"
              beforeLabel="Braces"
              afterLabel="Normal"
            />
          </div>
        </div>

        {/* Process */}
        <div className="sd-process">
          <h3>Our Process</h3>
          <div className="sd-process-steps">
            {process.map((p, i) => (
              <div className="sd-step" key={i}>
                <div className="sd-step-num">{p.step}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-service cards */}
        <div className="sd-sub-cards">
          {subServices.map((sub, i) => (
            <div className={`sd-sub-card ${i % 2 === 0 ? 'sd-sub-card--normal' : 'sd-sub-card--reverse'}`} key={i}>
              <div className="sd-sub-card-img">
                <img src={sub.img} alt={sub.name} />
                <div className="sd-sub-card-img-overlay" />
                <span className="sd-sub-card-badge">{sub.name}</span>
              </div>
              <div className="sd-sub-card-body">
                <h4><img src={sub.icon} alt={sub.name} className="sd-sub-card-icon" />{sub.name}</h4>
                <p>{sub.desc}</p>
                <ul className="sd-sub-card-bullets">
                  {sub.bullets.map((b, j) => (
                    <li key={j}><span className="sd-bullet-dot" />{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}

export default BracesInvisalign;