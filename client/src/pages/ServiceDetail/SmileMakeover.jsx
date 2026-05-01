import React from 'react';
import { useNavigate } from 'react-router-dom';
import SmileMakeoverSlider from '../../components/service/SmileMakeoverSlider';
import '../../styles/ServiceDetail/SmileMakeover.css';

const process = [
  { step: '01', title: 'Smile Assessment', desc: 'We evaluate your current smile, discuss your goals, and take digital photos.' },
  { step: '02', title: 'Design Preview',   desc: 'A digital mock-up lets you visualise your new smile before any treatment begins.' },
  { step: '03', title: 'Treatment',        desc: 'Each procedure is carried out in a planned sequence for optimal results.' },
  { step: '04', title: 'Final Reveal',     desc: 'Your stunning new smile is revealed and maintained with follow-up care.' },
];

const subServices = [
  {
    name: 'Extraction',
    icon: '/images/Service_subServices/Extraction.png',
    img: '/images/Service_img/Extraction.webp',
    desc: 'Safe, gentle tooth extractions — from simple removals to surgical wisdom tooth procedures — with minimal discomfort.',
    bullets: [
      'Simple & surgical extraction options',
      'Wisdom tooth removal',
      'Sedation available for anxious patients',
      'Clear aftercare & healing guidance',
    ],
  },
  {
    name: 'Filling',
    icon: '/images/Service_subServices/filling.png',
    img: '/images/Service_img/Filling.jpg',
    desc: 'Tooth-coloured composite fillings that restore decayed or damaged teeth with seamless, natural-looking results.',
    bullets: [
      'Tooth-coloured composite resin',
      'Same-visit treatment — no waiting',
      'Strengthens damaged tooth structure',
      'Mercury-free & biocompatible materials',
    ],
  },
  {
    name: 'Scaling',
    icon: '/images/Service_subServices/scaling.png',
    img: '/images/Service_img/Scaling.webp',
    desc: 'Deep professional cleaning that removes plaque, tartar and bacteria build-up from teeth and below the gumline.',
    bullets: [
      'Removes stubborn tartar & calculus',
      'Prevents gum disease progression',
      'Freshens breath significantly',
      'Polishing for a smooth, clean finish',
    ],
  },
  {
    name: 'Dental Veneers',
    icon: '/images/Service_subServices/Dental Veneers.png',
    img: '/images/Service_img/dental-veneers.jpg',
    desc: 'Ultra-thin porcelain shells bonded to the front of your teeth to correct shape, colour, and alignment instantly.',
    bullets: [
      'Porcelain & composite veneer options',
      'Natural translucency matching real enamel',
      'Corrects chips, gaps & discolouration',
      'Minimal tooth preparation required',
    ],
  },
  {
    name: 'Sports Dentistry',
    icon: '/images/Service_subServices/Sports Dentistry.png',
    img: '/images/Service_img/Sports-Dentistry.jpg',
    desc: 'Protecting athletes\' smiles with custom-fitted mouthguards and emergency dental care for sports-related injuries.',
    bullets: [
      'Custom-fitted sports mouthguards',
      'Emergency trauma & knocked-out tooth care',
      'Jaw & facial injury management',
      'Performance-safe dental treatments',
    ],
  },
];

function SmileMakeover() {
  const navigate = useNavigate();
  return (
    <>
      <div className="banner-wrap">
        <div className="banner">
          <img className="banner-bg-img" src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80" alt="Smile Makeover" />
          <div className="banner-overlay" />
          <div className="banner-content"><h1>Smile Makeover</h1></div>
        </div>
      </div>

      <section className="sd-section">

        {/* Intro */}
        <div className="sd-intro">
          <div className="sd-intro-text">
            <h2>About <span className="highlight">Smile Makeover</span></h2>
            <p>A smile makeover combines multiple cosmetic and restorative treatments to completely transform your smile. Our specialists design a personalised plan based on your facial features, preferences, and dental health.</p>
            <button className="sd-cta-btn" onClick={() => navigate('/book-appointment')}>Book an Appointment →</button>
          </div>
          <div className="sd-intro-img">
            <SmileMakeoverSlider
              beforeSrc='/images/services/Smile Makeover after.png'
              afterSrc='/images/services/Smile Makeover before.png'
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

export default SmileMakeover;