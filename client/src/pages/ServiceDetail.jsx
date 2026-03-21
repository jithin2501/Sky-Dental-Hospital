import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OrthodonticsSlider from '../components/service/OrthodonticsSlider';
import DentalImplantsSlider from '../components/service/DentalImplantsSlider';
import CosmeticDentistrySlider from '../components/service/CosmeticDentistrySlider';
import SmileMakeoverSlider from '../components/service/SmileMakeoverSlider';
import '../styles/serviceStyles/ServiceDetail.css';

const serviceData = {

  /* ── 1. SMILE MAKEOVER ──────────────────────────────────────────────── */
  'smile-makeover': {
    title: 'Smile Makeover',
    useSlider: true,
    aboutImg: null,
    banner: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80',
    tagline: 'Your Dream Smile, Crafted With Precision',
    desc: 'A smile makeover combines multiple cosmetic and restorative treatments to completely transform your smile. Our specialists design a personalised plan based on your facial features, preferences, and dental health.',
    process: [
      { step: '01', title: 'Smile Assessment', desc: 'We evaluate your current smile, discuss your goals, and take digital photos.' },
      { step: '02', title: 'Design Preview',   desc: 'A digital mock-up lets you visualise your new smile before any treatment begins.' },
      { step: '03', title: 'Treatment',        desc: 'Each procedure is carried out in a planned sequence for optimal results.' },
      { step: '04', title: 'Final Reveal',     desc: 'Your stunning new smile is revealed and maintained with follow-up care.' },
    ],
    subServices: [
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
    ],
  },

  /* ── 2. BRACES & INVISALIGN ─────────────────────────────────────────── */
  'braces-invisalign': {
    title: 'Braces & Invisalign',
    useSlider: true,
    aboutImg: null,
    banner: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1400&q=80',
    tagline: 'Straighten Your Smile with Confidence',
    desc: 'Whether you prefer traditional braces or the near-invisible convenience of Invisalign, our orthodontic experts craft a personalised treatment plan — alongside whitening, crowns, and dedicated kids\' care.',
    process: [
      { step: '01', title: 'Consultation',   desc: 'We assess your teeth and discuss the best orthodontic options for you.' },
      { step: '02', title: 'Treatment Plan', desc: 'A personalised plan is created with a clear timeline and expected results.' },
      { step: '03', title: 'Treatment',      desc: 'Braces or aligners are fitted and adjusted regularly to guide your teeth.' },
      { step: '04', title: 'Retention',      desc: 'Retainers keep your teeth in their new position after treatment ends.' },
    ],
    subServices: [
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
    ],
  },

  /* ── 3. IMPLANTS & RESTORATIVE CARE ────────────────────────────────── */
  'implants-restorative-care': {
    title: 'Implants & Restorative Care',
    useSlider: true,
    aboutImg: null,
    banner: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1400&q=80',
    tagline: 'Restore Your Smile, Restore Your Life',
    desc: 'Dental implants are the gold standard for replacing missing teeth — offering a permanent, natural-looking solution that feels and functions just like real teeth. Combined with root canal therapy and digital smile design, we offer complete restorative solutions.',
    process: [
      { step: '01', title: 'Evaluation',        desc: 'X-rays and 3D scans assess bone volume and implant placement site.' },
      { step: '02', title: 'Implant Placement', desc: 'Titanium post surgically placed into the jawbone under local anaesthesia.' },
      { step: '03', title: 'Osseointegration',  desc: 'Implant fuses with bone over 2–4 months for a solid foundation.' },
      { step: '04', title: 'Crown Fitting',     desc: 'A bespoke, natural-looking crown attached to complete your new tooth.' },
    ],
    subServices: [
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
    ],
  },

  /* ── 4. COSMETIC & ADVANCED DENTISTRY ──────────────────────────────── */
  'cosmetic-advanced-dentistry': {
    title: 'Cosmetic & Advanced Dentistry',
    useSlider: true,
    aboutImg: null,
    banner: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80',
    tagline: 'Advanced Care for an Extraordinary Smile',
    desc: 'From precision cosmetic procedures to cutting-edge laser dentistry and comprehensive full mouth rehabilitation, our advanced dentistry services combine artistry and technology for outstanding, long-lasting results.',
    process: [
      { step: '01', title: 'Smile Analysis', desc: 'We assess your smile and understand your aesthetic and functional goals.' },
      { step: '02', title: 'Design',         desc: 'A digital smile preview is created so you can see results before treatment.' },
      { step: '03', title: 'Procedure',      desc: 'Advanced treatments are carried out with precision, artistry, and care.' },
      { step: '04', title: 'Reveal',         desc: 'Your new smile is revealed — brighter, healthier, and more beautiful.' },
    ],
    subServices: [
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
    ],
  },

  /* ── LEGACY slugs ───────────────────────────────────────────────────── */
  'orthodontics': {
    title: 'Orthodontics', useSlider: true, aboutImg: null,
    banner: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1400&q=80',
    tagline: 'Straighten Your Smile with Confidence',
    desc: 'We use advanced orthodontic techniques to gradually move your teeth into alignment, improve your bite, and enhance dental health.',
    subServices: [],
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
    tagline: 'Restore Your Smile, Restore Your Life',
    desc: 'Professional dental implant and restoration treatments designed to replace missing teeth and restore your smile.',
    subServices: [],
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
    tagline: 'Gentle Care for Little Smiles',
    desc: 'Specialised dental care for children, ensuring their oral health is maintained with gentle, child-friendly treatments.',
    subServices: [],
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
    tagline: 'Your Perfect Smile Starts Here',
    desc: 'Expert cosmetic dentistry treatments to enhance the appearance of your smile with veneers, crowns, and other aesthetic procedures.',
    subServices: [],
    features: ['Porcelain Veneers','Teeth Whitening','Smile Makeovers','Dental Bonding','Gum Contouring','Tooth-Colored Fillings'],
    process: [
      { step: '01', title: 'Smile Analysis', desc: 'We assess your smile and understand your aesthetic goals.' },
      { step: '02', title: 'Design',         desc: 'A digital smile preview is created so you can see results before treatment.' },
      { step: '03', title: 'Procedure',      desc: 'Cosmetic treatments are carried out with precision and artistry.' },
      { step: '04', title: 'Reveal',         desc: 'Your new smile is revealed — brighter, whiter, and more beautiful.' },
    ],
  },
};

/* ── Sub-service detail section — alternating cards only ────────────────── */
function SubServiceSection({ subServices }) {
  return (
    <div className="sd-sub-cards">
      {subServices.map((sub, i) => (
        <div className={`sd-sub-card ${i % 2 === 0 ? 'sd-sub-card--normal' : 'sd-sub-card--reverse'}`} key={i}>
          <div className="sd-sub-card-img">
            <img src={sub.img} alt={sub.name} />
            <div className="sd-sub-card-img-overlay" />
            <span className="sd-sub-card-badge">{sub.name}</span>
          </div>
          <div className="sd-sub-card-body">
            <h4>
              <img src={sub.icon} alt={sub.name} className="sd-sub-card-icon" />
              {sub.name}
            </h4>
            <p>{sub.desc}</p>
            <ul className="sd-sub-card-bullets">
              {sub.bullets.map((b, j) => (
                <li key={j}>
                  <span className="sd-bullet-dot" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Process steps ───────────────────────────────────────────────────────── */
function ProcessSteps({ process }) {
  return (
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
  );
}

/* ── Legacy flat layout ──────────────────────────────────────────────────── */
function LegacySection({ features, process }) {
  return (
    <>
      <div className="sd-features">
        <h3>What We Offer</h3>
        <div className="sd-features-grid">
          {features.map((f, i) => (
            <div className="sd-feature-item" key={i}>
              <span className="sd-feature-check">✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
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
    </>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────── */
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

  const renderImageSlot = () => {
    if (service.useSlider && slug === 'smile-makeover') {
      return (
        <SmileMakeoverSlider
          beforeSrc='/images/services/Smile Makeover after.png'
          afterSrc='/images/services/Smile Makeover before.png'
          beforeLabel='Before'
          afterLabel='After'
        />
      );
    }
    if (service.useSlider && (slug === 'orthodontics' || slug === 'braces-invisalign')) {
      return <OrthodonticsSlider beforeSrc="/images/services/orth2.png" afterSrc="/images/services/orth1.png" beforeLabel="Braces" afterLabel="Normal" />;
    }
    if (service.useSlider && (slug === 'dental-implants-restorations' || slug === 'implants-restorative-care')) {
      return <DentalImplantsSlider beforeSrc="/images/services/Dental Implants.png" afterSrc="/images/services/Dental Restorations.png" beforeLabel="Before" afterLabel="After" />;
    }
    if (service.useSlider && (slug === 'cosmetic-dentistry' || slug === 'cosmetic-advanced-dentistry')) {
      return <CosmeticDentistrySlider beforeSrc='/images/services/Cosmetic Dentistry before.png' afterSrc='/images/services/Cosmetic Dentistry after.png' beforeLabel='Before' afterLabel='After' />;
    }
    if (service.aboutImg) return <img src={service.aboutImg} alt={service.title} />;
    return <div className="sd-img-placeholder">Image coming soon</div>;
  };

  const hasSubServiceDetail = service.subServices && service.subServices.length > 0 && service.subServices[0].bullets;

  return (
    <div className="sd-page">
      <Header />

      <div className="banner-wrap">
        <div className="banner">
          <img className="banner-bg-img" src={service.banner} alt={service.title} />
          <div className="banner-overlay" />
          <div className="banner-content">
            <h1>{service.title}</h1>
          </div>
        </div>
      </div>

      <section className="sd-section">

        <div className="sd-intro">
          <div className="sd-intro-text">
            <h2>About <span className="highlight">{service.title}</span></h2>
            <p>{service.desc}</p>
            <button className="sd-cta-btn" onClick={() => navigate('/book-appointment')}>
              Book an Appointment →
            </button>
          </div>
          <div className="sd-intro-img">
            {renderImageSlot()}
          </div>
        </div>

        {hasSubServiceDetail
          ? (
            <>
              <ProcessSteps process={service.process || []} />
              <SubServiceSection subServices={service.subServices} />
            </>
          )
          : <LegacySection features={service.features || []} process={service.process || []} />
        }

      </section>

      <Footer />
    </div>
  );
}

export default ServiceDetail;