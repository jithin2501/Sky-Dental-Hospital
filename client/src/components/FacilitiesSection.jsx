import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Facility.css';

export const originalFacilities = [
  {
    slug: 'professional-dentist',
    title: 'Professional Dentist',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1400',
    tagline: 'Expert care from certified dental professionals.',
    about: 'Our team of board-certified dentists brings decades of combined experience across every dental specialty. We invest continuously in education and training to stay at the forefront of dental science, ensuring every patient receives evidence-based, compassionate care tailored to their unique needs.',
    highlights: [
      { icon: '🎓', label: 'Board-Certified Specialists' },
      { icon: '🏆', label: 'Award-Winning Care' },
      { icon: '💬', label: 'Multilingual Staff' },
      { icon: '🔬', label: 'Evidence-Based Practice' },
    ],
    details: [
      { heading: 'Highly Qualified Team', body: 'Every dentist on our roster holds advanced certifications and undergoes regular continuing-education programs to master the latest techniques.' },
      { heading: 'Patient-First Philosophy', body: 'We believe in transparent communication—walking you through every step of your treatment plan so you always feel informed and empowered.' },
      { heading: 'Multidisciplinary Approach', body: 'Our specialists collaborate across departments, from orthodontics to oral surgery, delivering seamlessly coordinated care under one roof.' },
    ]
  },
  {
    slug: 'modern-equipment',
    title: 'Modern Equipment',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1400',
    tagline: 'State-of-the-art technology for precise treatment.',
    about: 'We have invested in the most advanced dental technology available, from 3D cone-beam CT scanners and digital intraoral cameras to CAD/CAM same-day crown milling. Our cutting-edge equipment means faster diagnoses, less chair time, and significantly more comfortable procedures for every patient.',
    highlights: [
      { icon: '🖥️', label: '3D Cone-Beam CT Imaging' },
      { icon: '📷', label: 'Digital Intraoral Cameras' },
      { icon: '⚡', label: 'Same-Day CAD/CAM Crowns' },
      { icon: '🦷', label: 'Laser Dentistry' },
    ],
    details: [
      { heading: 'Precision Diagnostics', body: 'Our 3D imaging suite captures sub-millimetre detail, enabling accurate diagnosis of issues that traditional X-rays simply cannot reveal.' },
      { heading: 'Minimally Invasive Procedures', body: 'Laser dentistry and digital workflows allow us to treat decay and gum disease with minimal discomfort and dramatically faster healing times.' },
      { heading: 'In-House Milling Lab', body: 'With our on-site CAD/CAM system, ceramic crowns and veneers are designed, milled, and fitted in a single visit—no temporary restorations needed.' },
    ]
  },
  {
    slug: 'safe-sterilized',
    title: 'Safe & Sterilized',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1400',
    tagline: 'Hospital-grade hygiene in every treatment room.',
    about: 'Patient safety is non-negotiable. Our clinic follows strict sterilization and infection-control protocols that exceed international healthcare standards. Every instrument is individually packaged and autoclaved, treatment rooms are deep-cleaned between appointments, and our clinical team adheres to rigorous PPE guidelines at all times.',
    highlights: [
      { icon: '🧼', label: 'Autoclave Sterilization' },
      { icon: '🛡️', label: 'ISO-Certified Protocols' },
      { icon: '🌬️', label: 'HEPA Air Filtration' },
      { icon: '✅', label: 'Regular Safety Audits' },
    ],
    details: [
      { heading: 'Instrument Sterilization', body: 'All reusable instruments are ultrasonically cleaned, individually bagged, and autoclaved to 134 °C—eliminating 99.9999 % of pathogens.' },
      { heading: 'Environmental Controls', body: 'HEPA-grade air purifiers and UV surface sanitizers run continuously, keeping aerosol and surface contamination at absolute minimums.' },
      { heading: 'Transparent Compliance', body: 'Our sterilization logs and third-party audit reports are available on request—because we believe accountability is part of great care.' },
    ]
  },
  {
    slug: 'comfortable-environment',
    title: 'Comfortable Environment',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=1400',
    tagline: 'A calming space designed around your comfort.',
    about: 'We understand that dental anxiety is real. That is why every detail of our clinic—from the soothing colour palette and ambient lighting to the ergonomic chairs and noise-cancelling headphones available in every room—has been carefully designed to put you at ease from the moment you walk through the door.',
    highlights: [
      { icon: '🎧', label: 'Noise-Cancelling Headphones' },
      { icon: '💆', label: 'Ergonomic Dental Chairs' },
      { icon: '🌿', label: 'Calming Aromatherapy' },
      { icon: '📺', label: 'Ceiling Entertainment Screens' },
    ],
    details: [
      { heading: 'Anxiety-Free Zone', body: 'Our care coordinators are trained in comfort-focused communication, and we offer sedation options ranging from nitrous oxide to IV sedation for anxious patients.' },
      { heading: 'Kid-Friendly Spaces', body: 'Our dedicated paediatric waiting area features games, books, and a warm atmosphere that helps young patients feel safe and excited about their visit.' },
      { heading: 'Premium Amenities', body: 'Complimentary refreshments, warm blankets, and a quiet relaxation lounge ensure your time with us is as pleasant as possible from start to finish.' },
    ]
  },
  {
    slug: 'emergency-care',
    title: 'Emergency Care',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1400',
    tagline: 'Rapid response when you need us most.',
    about: 'Dental emergencies do not keep office hours—and neither do we. Our dedicated emergency dental team is available seven days a week to handle everything from acute toothaches and broken teeth to lost restorations and dental trauma. Same-day appointments are always prioritised for patients in pain.',
    highlights: [
      { icon: '🚨', label: 'Same-Day Appointments' },
      { icon: '📞', label: '24 / 7 Helpline' },
      { icon: '⏱️', label: 'Rapid Pain Relief' },
      { icon: '🏥', label: 'On-Call Specialists' },
    ],
    details: [
      { heading: 'Immediate Pain Management', body: 'From the moment you call, our team works to get you seen as quickly as possible—providing interim pain-relief advice while we prepare for your arrival.' },
      { heading: 'Full Emergency Suite', body: 'Our emergency treatment room is stocked with everything needed to handle trauma, re-implantation, extractions, and temporary restorations on the spot.' },
      { heading: 'Follow-Up Care', body: 'Every emergency case is followed up with a comprehensive review appointment to ensure complete healing and to prevent recurrence.' },
    ]
  },
];

const COPIES = 10;
const allCards = [
  ...Array(COPIES).fill(originalFacilities).flat(),
  ...originalFacilities,
  ...Array(COPIES).fill(originalFacilities).flat()
];

function FacilitiesSection() {
  const containerRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const navigate = useNavigate();

  const CARD_W = () => {
    const vw = Math.min(window.innerWidth, 1200);
    return (vw - 48) / 3 + 24;
  };

  const totalOneSet = () => CARD_W() * originalFacilities.length;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.scrollBehavior = 'auto';
    el.scrollLeft = COPIES * totalOneSet();
  }, []);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const sl = el.scrollLeft;
    const oneSet = totalOneSet();
    if (sl > COPIES * oneSet * 1.5) el.scrollLeft = sl - oneSet;
    else if (sl < COPIES * oneSet * 0.5) el.scrollLeft = sl + oneSet;
    const pos = el.scrollLeft % oneSet;
    const index = Math.floor(pos / CARD_W()) % originalFacilities.length;
    setActiveDot(index % originalFacilities.length);
  };

  const handleDotClick = (index) => {
    const el = containerRef.current;
    if (!el) return;
    const base = Math.round(el.scrollLeft / totalOneSet()) * totalOneSet();
    el.style.scrollBehavior = 'smooth';
    el.scrollLeft = base + index * CARD_W();
    setActiveDot(index);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.pageX;
    dragStartScroll.current = containerRef.current.scrollLeft;
    containerRef.current.style.cursor = 'grabbing';
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
      if (containerRef.current) containerRef.current.style.cursor = 'grab';
    };
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      containerRef.current.scrollLeft = dragStartScroll.current + (dragStartX.current - e.pageX);
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCardClick = (slug) => {
    if (!isDragging.current) navigate(`/facility/${slug}`);
  };

  return (
    <section className="facilities" id="facilities">
      <div className="facilities-section-header">
        <h2>Our <span className="facilities-highlight">World-Class</span> Facilities</h2>
        <p>Combining modern technology with expert care, we ensure your treatment is safe, precise, and completely comfortable at every step of your journey.</p>
      </div>

      <div className="facilities-cards-viewport">
        <div
          className="facilities-cards-container"
          ref={containerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
        >
          {allCards.map((f, i) => (
            <div
              key={i}
              className="facility-card"
              style={{ backgroundImage: `url('${f.image}')` }}
              onClick={() => handleCardClick(f.slug)}
            >
              <div
                className="facility-card-icon"
                onClick={(e) => { e.stopPropagation(); navigate(`/facility/${f.slug}`); }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
              <div className="facility-card-overlay">
                <h4>{f.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="facilities-controls">
          <div className="facilities-dots">
            {originalFacilities.map((_, i) => (
              <div
                key={i}
                className={`facilities-dot ${i === activeDot ? 'active' : ''}`}
                onClick={() => handleDotClick(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FacilitiesSection;