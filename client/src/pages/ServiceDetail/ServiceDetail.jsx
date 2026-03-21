import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import SmileMakeover             from './SmileMakeover';
import BracesInvisalign          from './BracesInvisalign';
import ImplantsRestorativeCare   from './ImplantsRestorativeCare';
import CosmeticAdvancedDentistry from './CosmeticAdvancedDentistry';

import OrthodonticsSlider      from '../../components/service/OrthodonticsSlider';
import DentalImplantsSlider    from '../../components/service/DentalImplantsSlider';
import CosmeticDentistrySlider from '../../components/service/CosmeticDentistrySlider';



const legacyData = {
  'orthodontics': {
    title: 'Orthodontics', useSlider: true, aboutImg: null,
    banner: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1400&q=80',
    desc: 'We use advanced orthodontic techniques to gradually move your teeth into alignment, improve your bite, and enhance dental health.',
    features: ['Traditional Metal Braces','Clear Ceramic Braces','Invisible Aligners','Retainers & Follow-up Care','Early Orthodontic Treatment for Children','Adult Orthodontics'],
    process: [
      { step: '01', title: 'Consultation',   desc: 'We assess your teeth and discuss the best treatment options for you.' },
      { step: '02', title: 'Treatment Plan', desc: 'A personalised plan is created with a clear timeline and expected results.' },
      { step: '03', title: 'Treatment',      desc: 'Braces or aligners are fitted and adjusted regularly to guide your teeth.' },
      { step: '04', title: 'Retention',      desc: 'Retainers keep your teeth in their new position after treatment.' },
    ],
  },
  'dental-implants-restorations': {
    title: 'Dental Implants & Restorations', useSlider: true, aboutImg: '',
    banner: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1400&q=80',
    desc: 'Professional dental implant and restoration treatments designed to replace missing teeth and restore your smile.',
    features: ['Single Tooth Implants','Full Mouth Reconstruction','Dental Crowns & Bridges','Dentures & Partial Dentures','Bone Grafting','Same-Day Implants'],
    process: [
      { step: '01', title: 'Evaluation',        desc: 'X-rays and 3D scans to assess bone structure and plan implant placement.' },
      { step: '02', title: 'Implant Placement', desc: 'The titanium implant is surgically placed into the jawbone.' },
      { step: '03', title: 'Healing',           desc: 'The implant fuses with the bone over a few months for a stable foundation.' },
      { step: '04', title: 'Crown Fitting',     desc: 'A natural-looking crown is attached to complete your new tooth.' },
    ],
  },
  'pediatric-dentistry': {
    title: 'Pediatric Dentistry', useSlider: false, aboutImg: '/images/services/Pediatric Dentistry.png',
    banner: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1400&q=80',
    desc: 'Specialised dental care for children, ensuring their oral health is maintained with gentle, child-friendly treatments.',
    features: ['Routine Checkups & Cleanings','Fluoride Treatments','Dental Sealants','Early Orthodontic Assessment','Cavity Prevention & Fillings','Emergency Pediatric Care'],
    process: [
      { step: '01', title: 'Welcome Visit', desc: 'A friendly introduction to make children comfortable in our clinic.' },
      { step: '02', title: 'Examination',   desc: 'Gentle checkup to assess teeth, gums, and overall oral development.' },
      { step: '03', title: 'Treatment',     desc: 'Child-friendly procedures performed with patience and care.' },
      { step: '04', title: 'Education',     desc: 'We teach kids good brushing habits to keep their smiles healthy.' },
    ],
  },
  'cosmetic-dentistry': {
    title: 'Cosmetic Dentistry', useSlider: true, aboutImg: null,
    banner: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80',
    desc: 'Expert cosmetic dentistry treatments to enhance the appearance of your smile with veneers, crowns, and other aesthetic procedures.',
    features: ['Porcelain Veneers','Teeth Whitening','Smile Makeovers','Dental Bonding','Gum Contouring','Tooth-Colored Fillings'],
    process: [
      { step: '01', title: 'Smile Analysis', desc: 'We assess your smile and understand your aesthetic goals.' },
      { step: '02', title: 'Design',         desc: 'A digital smile preview is created so you can see results before treatment.' },
      { step: '03', title: 'Procedure',      desc: 'Cosmetic treatments are carried out with precision and artistry.' },
      { step: '04', title: 'Reveal',         desc: 'Your new smile is revealed — brighter, whiter, and more beautiful.' },
    ],
  },
};

function LegacyPage({ service, slug, navigate }) {
  const renderSlider = () => {
    if (service.useSlider && slug === 'orthodontics')
      return <OrthodonticsSlider beforeSrc="/images/services/orth2.png" afterSrc="/images/services/orth1.png" beforeLabel="Braces" afterLabel="Normal" />;
    if (service.useSlider && slug === 'dental-implants-restorations')
      return <DentalImplantsSlider beforeSrc="/images/services/Dental Implants.png" afterSrc="/images/services/Dental Restorations.png" beforeLabel="Before" afterLabel="After" />;
    if (service.useSlider && slug === 'cosmetic-dentistry')
      return <CosmeticDentistrySlider beforeSrc='/images/services/Cosmetic Dentistry before.png' afterSrc='/images/services/Cosmetic Dentistry after.png' beforeLabel='Before' afterLabel='After' />;
    if (service.aboutImg) return <img src={service.aboutImg} alt={service.title} />;
    return <div className="sd-img-placeholder">Image coming soon</div>;
  };

  return (
    <>
      <div className="banner-wrap">
        <div className="banner">
          <img className="banner-bg-img" src={service.banner} alt={service.title} />
          <div className="banner-overlay" />
          <div className="banner-content"><h1>{service.title}</h1></div>
        </div>
      </div>
      <section className="sd-section">
        <div className="sd-intro">
          <div className="sd-intro-text">
            <h2>About <span className="highlight">{service.title}</span></h2>
            <p>{service.desc}</p>
            <button className="sd-cta-btn" onClick={() => navigate('/book-appointment')}>Book an Appointment →</button>
          </div>
          <div className="sd-intro-img">{renderSlider()}</div>
        </div>
        <div className="sd-features">
          <h3>What We Offer</h3>
          <div className="sd-features-grid">
            {service.features.map((f, i) => (
              <div className="sd-feature-item" key={i}>
                <span className="sd-feature-check">✓</span><span>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sd-process">
          <h3>Our Process</h3>
          <div className="sd-process-steps">
            {service.process.map((p, i) => (
              <div className="sd-step" key={i}>
                <div className="sd-step-num">{p.step}</div>
                <h4>{p.title}</h4><p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const renderPage = () => {
    switch (slug) {
      case 'smile-makeover':              return <SmileMakeover />;
      case 'braces-invisalign':           return <BracesInvisalign />;
      case 'implants-restorative-care':   return <ImplantsRestorativeCare />;
      case 'cosmetic-advanced-dentistry': return <CosmeticAdvancedDentistry />;
      default: {
        const legacy = legacyData[slug];
        if (legacy) return <LegacyPage service={legacy} slug={slug} navigate={navigate} />;
        return (
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h2>Service not found.</h2>
            <button onClick={() => navigate('/')} className="sd-back-btn">← Back to Home</button>
          </div>
        );
      }
    }
  };

  return (
    <div className="sd-page">
      <Header />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default ServiceDetail;