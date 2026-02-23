import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/ServiceDetail.css';

const serviceData = {
  'orthodontics': {
    title: 'Orthodontics',
    detailImg: '',  // 👈 Add your About Orthodontics image path here
    banner: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1400&q=80',
    tagline: 'Straighten Your Smile with Confidence',
    desc: 'We use advanced orthodontic techniques to gradually move your teeth into alignment, improve your bite, and enhance dental health. Our experienced orthodontists provide personalized treatment plans using the latest technology.',
    features: [
      'Traditional Metal Braces', 'Clear Ceramic Braces',
      'Invisible Aligners', 'Retainers & Follow-up Care',
      'Early Orthodontic Treatment for Children', 'Adult Orthodontics'
    ],
    process: [
      { step: '01', title: 'Consultation', desc: 'We assess your teeth and discuss the best treatment options for you.' },
      { step: '02', title: 'Treatment Plan', desc: 'A personalized plan is created with a clear timeline and expected results.' },
      { step: '03', title: 'Treatment', desc: 'Braces or aligners are fitted and adjusted regularly to guide your teeth.' },
      { step: '04', title: 'Retention', desc: 'Retainers keep your teeth in their new position after treatment.' },
    ]
  },
  'dental-implants-restorations': {
    title: 'Dental Implants & Restorations',
    detailImg: '',  // 👈 Add your image path here
    banner: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1400&q=80',
    tagline: 'Restore Your Smile, Restore Your Life',
    desc: 'Professional dental implant and restoration treatments designed to replace missing teeth and restore your smile with natural-looking results. Our implants are built to last a lifetime with proper care.',
    features: [
      'Single Tooth Implants', 'Full Mouth Reconstruction',
      'Dental Crowns & Bridges', 'Dentures & Partial Dentures',
      'Bone Grafting', 'Same-Day Implants'
    ],
    process: [
      { step: '01', title: 'Evaluation', desc: 'X-rays and 3D scans to assess bone structure and plan implant placement.' },
      { step: '02', title: 'Implant Placement', desc: 'The titanium implant is surgically placed into the jawbone.' },
      { step: '03', title: 'Healing', desc: 'The implant fuses with the bone over a few months for a stable foundation.' },
      { step: '04', title: 'Crown Fitting', desc: 'A natural-looking crown is attached to complete your new tooth.' },
    ]
  },
  'pediatric-dentistry': {
    title: 'Pediatric Dentistry',
    detailImg: '',  // 👈 Add your image path here
    banner: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1400&q=80',
    tagline: 'Gentle Care for Little Smiles',
    desc: 'Specialized dental care for children, ensuring their oral health is maintained with gentle, child-friendly treatments. We create a positive, fun environment so children look forward to their dental visits.',
    features: [
      'Routine Checkups & Cleanings', 'Fluoride Treatments',
      'Dental Sealants', 'Early Orthodontic Assessment',
      'Cavity Prevention & Fillings', 'Emergency Pediatric Care'
    ],
    process: [
      { step: '01', title: 'Welcome Visit', desc: 'A friendly introduction to make children comfortable in our clinic.' },
      { step: '02', title: 'Examination', desc: 'Gentle checkup to assess teeth, gums, and overall oral development.' },
      { step: '03', title: 'Treatment', desc: 'Child-friendly procedures performed with patience and care.' },
      { step: '04', title: 'Education', desc: 'We teach kids good brushing habits to keep their smiles healthy.' },
    ]
  },
  'cosmetic-dentistry': {
    title: 'Cosmetic Dentistry',
    detailImg: '',  // 👈 Add your image path here
    banner: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80',
    tagline: 'Your Perfect Smile Starts Here',
    desc: 'Expert cosmetic dentistry treatments to enhance the appearance of your smile with veneers, crowns, and other aesthetic procedures. We combine artistry with advanced dental techniques for stunning, natural results.',
    features: [
      'Porcelain Veneers', 'Teeth Whitening',
      'Smile Makeovers', 'Dental Bonding',
      'Gum Contouring', 'Tooth-Colored Fillings'
    ],
    process: [
      { step: '01', title: 'Smile Analysis', desc: 'We assess your smile and understand your aesthetic goals.' },
      { step: '02', title: 'Design', desc: 'A digital smile preview is created so you can see results before treatment.' },
      { step: '03', title: 'Procedure', desc: 'Cosmetic treatments are carried out with precision and artistry.' },
      { step: '04', title: 'Reveal', desc: 'Your new smile is revealed — brighter, whiter, and more beautiful.' },
    ]
  }
};

function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = serviceData[slug];

  if (!service) {
    return (
      <div className="sd-page">
        <Header />
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h2>Service not found.</h2>
          <button onClick={() => navigate('/')} className="sd-back-btn">← Back to Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="sd-page">
      <Header />

      {/* Banner — same design as Contact */}
      <div className="banner-wrap">
        <div className="banner">
          <img className="banner-bg-img" src={service.banner} alt={service.title} />
          <div className="banner-overlay" />
          <div className="banner-content">
            <p className="banner-breadcrumb">
              <span onClick={() => navigate('/#services')} style={{ cursor: 'pointer' }}>Our Services</span>
              {' / '}{service.title}
            </p>
            <h1>{service.title}</h1>
            <p className="banner-tagline">{service.tagline}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="sd-section">

        {/* Intro */}
        <div className="sd-intro">
          {service.detailImg && (
            <div className="sd-intro-img">
              <img src={service.detailImg} alt={service.title} />
            </div>
          )}
          <div className="sd-intro-text">
            <h2>About <span className="highlight">{service.title}</span></h2>
            <p>{service.desc}</p>
            <button className="sd-cta-btn" onClick={() => navigate('/contact')}>
              Book an Appointment →
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="sd-features">
          <h3>What We Offer</h3>
          <div className="sd-features-grid">
            {service.features.map((f, i) => (
              <div className="sd-feature-item" key={i}>
                <span className="sd-feature-check">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="sd-process">
          <h3>Our Process</h3>
          <div className="sd-process-steps">
            {service.process.map((p, i) => (
              <div className="sd-step" key={i}>
                <div className="sd-step-num">{p.step}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}

export default ServiceDetail;