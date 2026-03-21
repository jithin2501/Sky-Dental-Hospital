import React from 'react';
import { useNavigate } from 'react-router-dom';
import CosmeticDentistrySlider from '../../components/service/CosmeticDentistrySlider';
import '../../styles/ServiceDetail/CosmeticAdvancedDentistry.css';

const process = [
  { step: '01', title: 'Smile Analysis', desc: 'We assess your smile and understand your aesthetic and functional goals.' },
  { step: '02', title: 'Design',         desc: 'A digital smile preview is created so you can see results before treatment.' },
  { step: '03', title: 'Procedure',      desc: 'Advanced treatments are carried out with precision, artistry, and care.' },
  { step: '04', title: 'Reveal',         desc: 'Your new smile is revealed — brighter, healthier, and more beautiful.' },
];

const subServices = [
  {
    name: 'Cosmetic Dentistry',
    icon: '/images/Service_subServices/Cosmetic Dentistry.png',
    img: '/images/Service_img/Cosmetic Dentistry.jpg',
    desc: 'A wide range of aesthetic treatments that refine, reshape, and rejuvenate your smile with expert artistry.',
    bullets: [
      'Veneers, bonding & contouring',
      'Smile design & makeovers',
      'Gum reshaping & aesthetics',
      'Natural-looking, lasting results',
    ],
  },
  {
    name: 'Surgery',
    icon: '/images/Service_subServices/Surgery.png',
    img: '/images/Service_img/Surgery.jpg',
    desc: 'Specialist oral surgical procedures performed with precision, from wisdom teeth to complex reconstructive surgery.',
    bullets: [
      'Wisdom tooth & complex extractions',
      'Bone & soft tissue grafting',
      'Cyst & lesion removal',
      'IV sedation available',
    ],
  },
  {
    name: 'Laser Dentistry',
    icon: '/images/Service_subServices/Laser Dentistry.png',
    img: '/images/Service_img/Laser Dentistry.webp',
    desc: 'Minimally invasive laser treatments that replace drills and scalpels for faster healing and less discomfort.',
    bullets: [
      'Gum contouring & recontouring',
      'Cavity detection & treatment',
      'Teeth whitening acceleration',
      'Faster healing, less bleeding',
    ],
  },
  {
    name: 'Full Mouth Rehabilitation',
    icon: '/images/Service_subServices/Mouth Rehabilitation.png',
    img: '/images/Service_img/Full Mouth Rehabilitation.jpg',
    desc: 'A complete, phased rebuilding of your entire mouth — restoring function, health, comfort, and aesthetics simultaneously.',
    bullets: [
      'Complete bite reconstruction',
      'Combination of implants, crowns & veneers',
      'Gum therapy & jaw alignment',
      'Phased treatment over weeks or months',
    ],
  },
];

function CosmeticAdvancedDentistry() {
  const navigate = useNavigate();
  return (
    <>
      <div className="banner-wrap">
        <div className="banner">
          <img className="banner-bg-img" src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80" alt="Cosmetic & Advanced Dentistry" />
          <div className="banner-overlay" />
          <div className="banner-content"><h1>Cosmetic & Advanced Dentistry</h1></div>
        </div>
      </div>

      <section className="sd-section">

        {/* Intro */}
        <div className="sd-intro">
          <div className="sd-intro-text">
            <h2>About <span className="highlight">Cosmetic & Advanced Dentistry</span></h2>
            <p>From precision cosmetic procedures to cutting-edge laser dentistry and comprehensive full mouth rehabilitation, our advanced dentistry services combine artistry and technology for outstanding, long-lasting results.</p>
            <button className="sd-cta-btn" onClick={() => navigate('/book-appointment')}>Book an Appointment →</button>
          </div>
          <div className="sd-intro-img">
            <CosmeticDentistrySlider
              beforeSrc='/images/services/Cosmetic Dentistry before.png'
              afterSrc='/images/services/Cosmetic Dentistry after.png'
              beforeLabel='Before'
              afterLabel='After'
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

export default CosmeticAdvancedDentistry;