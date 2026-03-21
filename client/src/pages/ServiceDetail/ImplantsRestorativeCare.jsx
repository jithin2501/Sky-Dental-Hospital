import React from 'react';
import { useNavigate } from 'react-router-dom';
import DentalImplantsSlider from '../../components/service/DentalImplantsSlider';
import '../../styles/ServiceDetail/ImplantsRestorativeCare.css';

const process = [
  { step: '01', title: 'Evaluation',        desc: 'X-rays and 3D scans assess bone volume and implant placement site.' },
  { step: '02', title: 'Implant Placement', desc: 'Titanium post surgically placed into the jawbone under local anaesthesia.' },
  { step: '03', title: 'Osseointegration',  desc: 'Implant fuses with bone over 2–4 months for a solid foundation.' },
  { step: '04', title: 'Crown Fitting',     desc: 'A bespoke, natural-looking crown attached to complete your new tooth.' },
];

const subServices = [
  {
    name: 'Dental Implants',
    icon: '/images/Service_subServices/dental-surgery.png',
    img: '/images/Service_img/Dental Implants.jpg',
    desc: 'Titanium implants that permanently replace missing teeth roots, topped with lifelike crowns for a complete, lasting restoration.',
    bullets: [
      'Single, multiple & full-arch implants',
      'Same-day & immediate-load options',
      'Bone grafting if required',
      'Lifetime results with proper care',
    ],
  },
  {
    name: 'Root Canal Treatment',
    icon: '/images/Service_subServices/root-canal.png',
    img: '/images/Service_img/Root Canal Treatment.png',
    desc: 'Modern root canal treatment that saves infected teeth, relieves pain, and keeps your natural smile intact.',
    bullets: [
      'Painless with modern anaesthesia',
      'Removes infection & seals the root',
      'Saves the natural tooth',
      'Crown placed for long-term protection',
    ],
  },
  {
    name: 'Digital Smile Designing',
    icon: '/images/Service_subServices/Digital Smile.png',
    img: '/images/Service_img/Digital Smile Designing.webp',
    desc: 'Advanced digital technology that lets you preview and co-design your perfect smile before a single treatment begins.',
    bullets: [
      'Digital photographs & facial analysis',
      'Virtual smile simulation preview',
      'Precise treatment blueprint',
      'Predictable, agreed-upon results',
    ],
  },
];

function ImplantsRestorativeCare() {
  const navigate = useNavigate();
  return (
    <>
      <div className="banner-wrap">
        <div className="banner">
          <img className="banner-bg-img" src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1400&q=80" alt="Implants & Restorative Care" />
          <div className="banner-overlay" />
          <div className="banner-content"><h1>Implants & Restorative Care</h1></div>
        </div>
      </div>

      <section className="sd-section">

        {/* Intro */}
        <div className="sd-intro">
          <div className="sd-intro-text">
            <h2>About <span className="highlight">Implants & Restorative Care</span></h2>
            <p>Dental implants are the gold standard for replacing missing teeth — offering a permanent, natural-looking solution that feels and functions just like real teeth. Combined with root canal therapy and digital smile design, we offer complete restorative solutions.</p>
            <button className="sd-cta-btn" onClick={() => navigate('/book-appointment')}>Book an Appointment →</button>
          </div>
          <div className="sd-intro-img">
            <DentalImplantsSlider
              beforeSrc="/images/services/Dental Implants.png"
              afterSrc="/images/services/Dental Restorations.png"
              beforeLabel="Before"
              afterLabel="After"
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

export default ImplantsRestorativeCare;