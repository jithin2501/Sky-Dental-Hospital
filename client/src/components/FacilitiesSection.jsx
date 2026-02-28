import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Facility.css';

export const originalFacilities = [
  {
    slug: 'three-floor-center',
    title: 'Three-Floor Dentistry Center',
    // Modern dental clinic interior / reception area
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1400',
    tagline: 'Three dedicated floors exclusively designed for dental care.',
    about:
      'Sky Dental Clinic operates across three dedicated floors exclusively designed for dental care, enabling us to provide specialized treatments in a well-structured and organized environment. Each floor is equipped with modern dental units and facilities to ensure efficient patient care and smooth workflow.',
    highlights: [
      { icon: '🏢', label: 'Three Dedicated Floors' },
      { icon: '🦷', label: 'Specialized Treatment Areas' },
      { icon: '⚙️', label: 'Modern Dental Units' },
      { icon: '🔄', label: 'Smooth Workflow' },
    ],
    details: [
      {
        heading: 'Ground Floor – Patient Services',
        body: 'The ground floor is designed for easy accessibility and patient convenience. It includes the reception area, consultation rooms, and a comfortable waiting lounge, ensuring a welcoming and organized experience for all visitors.',
      },
      {
        heading: 'Specialized Treatment Floors',
        body: 'Each upper floor is dedicated to specific dental specialties, allowing our teams to work with focused expertise and purpose-built equipment in a well-organized clinical environment.',
      },
      {
        heading: 'Seamless Patient Flow',
        body: 'The multi-floor layout ensures patients move smoothly between consultation, treatment, and follow-up areas — minimizing wait times and maximizing comfort throughout every visit.',
      },
    ],
  },
  {
    slug: 'minor-operation-theatre',
    title: 'Minor Operation Theatre',
    // Hospital surgical / operating theatre room
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=80&w=1400',
    tagline: 'A fully equipped Minor OT for precise oral surgical procedures.',
    about:
      'Our clinic is equipped with a fully functional Minor Operation Theatre designed to perform minor oral surgical procedures in a sterile and controlled clinical environment, ensuring patient safety and procedural precision.',
    highlights: [
      { icon: '🏥', label: 'Sterile Clinical Environment' },
      { icon: '🔬', label: 'Precision Procedures' },
      { icon: '🛡️', label: 'Patient Safety First' },
      { icon: '⚕️', label: 'Qualified Surgical Team' },
    ],
    details: [
      {
        heading: 'Fully Functional Minor OT',
        body: 'Our Minor Operation Theatre is purpose-built for oral surgical procedures, maintained under strict sterile conditions with dedicated surgical lighting, instrument trays, and monitoring equipment at all times.',
      },
      {
        heading: 'Sterile & Controlled Environment',
        body: 'The OT is equipped with dedicated air-handling and infection-control systems, ensuring a completely controlled clinical space that meets international surgical safety standards for every procedure.',
      },
      {
        heading: 'Patient Safety Protocols',
        body: 'Every procedure is conducted with trained nursing staff, real-time patient monitoring, and internationally recognized safety protocols — ensuring you are in safe, expert hands from start to finish.',
      },
    ],
  },
  {
    slug: 'digital-xray-imaging',
    title: 'Digital Dental X-Ray Imaging',
    // Dental panoramic / digital X-ray machine
    image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&q=80&w=1400',
    tagline: 'Quick, clear, and accurate imaging with minimal radiation.',
    about:
      'We utilize advanced digital dental X-ray technology that provides quick, clear, and highly accurate imaging while minimizing radiation exposure. This allows our dentists to diagnose dental conditions effectively and plan treatments with precision.',
    highlights: [
      { icon: '📡', label: 'Low Radiation Exposure' },
      { icon: '🖥️', label: 'Instant Digital Results' },
      { icon: '🔍', label: 'High-Resolution Imaging' },
      { icon: '📋', label: 'Accurate Treatment Planning' },
    ],
    details: [
      {
        heading: 'Advanced Digital X-Ray Technology',
        body: 'Our digital X-ray sensors capture detailed images instantly and display them on-screen within seconds — enabling faster diagnosis and reducing the time you spend in the chair.',
      },
      {
        heading: 'Minimized Radiation Exposure',
        body: 'Compared to traditional film X-rays, our digital systems emit significantly lower levels of radiation, making them a safer choice for patients of all ages, including children.',
      },
      {
        heading: 'Precise Treatment Planning',
        body: 'High-resolution digital imaging reveals cavities, bone loss, impacted teeth, and other conditions with exceptional clarity, ensuring our dentists have everything they need to plan your care accurately.',
      },
    ],
  },
  {
    slug: 'intraoral-scanner',
    title: 'Intraoral Digital Scanner',
    // Digital dentistry / intraoral scanner technology
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=1400',
    tagline: 'Precise digital impressions — no discomfort, no mess.',
    about:
      'Our state-of-the-art intraoral scanner captures detailed digital impressions of teeth and gums, eliminating the discomfort of traditional impression methods and improving treatment accuracy for procedures such as crowns, aligners, and restorations.',
    highlights: [
      { icon: '📷', label: 'Digital Impressions' },
      { icon: '😌', label: 'No Messy Molds' },
      { icon: '🦷', label: 'Crown & Aligner Precision' },
      { icon: '⚡', label: 'Faster Treatment Planning' },
    ],
    details: [
      {
        heading: 'Comfortable, Mess-Free Scanning',
        body: 'Our intraoral scanner uses a small, lightweight wand to capture thousands of images per second, building a precise 3D model of your mouth — with zero gagging, no messy putty, and no discomfort whatsoever.',
      },
      {
        heading: 'Superior Treatment Accuracy',
        body: 'Digital impressions are far more accurate than traditional molds, resulting in better-fitting crowns, veneers, bridges, and clear aligners — with fewer chair-side adjustments needed.',
      },
      {
        heading: 'Instant Digital Records',
        body: 'Scans are stored digitally, shared instantly with our lab partners, and used for virtual treatment simulations — so you can visualize your results clearly before treatment even begins.',
      },
    ],
  },
  {
    slug: 'laser-dentistry',
    title: 'Advanced Laser Dentistry',
    // Dental laser treatment / dentist using laser on patient
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1400',
    tagline: 'Minimally invasive laser treatments for faster healing.',
    about:
      'Sky Dental Clinic offers laser-assisted dental treatments, enabling minimally invasive procedures with greater precision, reduced discomfort, and faster healing for patients.',
    highlights: [
      { icon: '⚡', label: 'Laser Precision' },
      { icon: '💉', label: 'Reduced Anesthesia Need' },
      { icon: '🩹', label: 'Faster Healing' },
      { icon: '🔬', label: 'Minimally Invasive' },
    ],
    details: [
      {
        heading: 'Minimally Invasive Procedures',
        body: 'Dental lasers allow us to treat gum disease, remove soft tissue, and address decay with pinpoint accuracy — preserving more healthy tissue and greatly reducing the need for cuts or stitches.',
      },
      {
        heading: 'Reduced Discomfort & Bleeding',
        body: 'Laser energy cauterizes as it works, minimizing bleeding and post-operative swelling. Many patients require little to no anesthesia for laser-assisted dental treatments.',
      },
      {
        heading: 'Faster Recovery Times',
        body: 'Because laser dentistry is so gentle on surrounding tissues, healing is significantly faster than with conventional techniques — getting you back to your daily routine much sooner.',
      },
    ],
  },
  {
    slug: 'autoclave-sterilization',
    title: 'B-Class Autoclave Sterilization',
    // Sterilization / clean wrapped dental instruments / autoclave
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1400',
    tagline: 'Hospital-grade sterilization for absolute patient safety.',
    about:
      'Patient safety and hygiene are our highest priorities. We follow strict sterilization protocols using a B-Class autoclave system, which ensures complete sterilization of dental instruments in accordance with international infection-control standards.',
    highlights: [
      { icon: '🧼', label: 'B-Class Autoclave System' },
      { icon: '🛡️', label: 'International Standards' },
      { icon: '✅', label: 'Zero Cross-Contamination' },
      { icon: '📋', label: 'Full Compliance Logs' },
    ],
    details: [
      {
        heading: 'B-Class Autoclave System',
        body: 'Our B-Class autoclave is the gold standard in dental sterilization, using a pre-vacuum cycle that ensures complete steam penetration of all instruments — including hollow and porous tools — eliminating all pathogens entirely.',
      },
      {
        heading: 'International Infection-Control Standards',
        body: 'Every sterilization cycle is validated and logged in full compliance with ISO infection-control standards, giving patients complete confidence that every instrument used in their care is absolutely safe.',
      },
      {
        heading: 'Comprehensive Hygiene Protocols',
        body: 'Beyond autoclave sterilization, our clinic enforces rigorous surface disinfection, single-use consumables, and strict PPE protocols — creating a safe, hygienic environment for every patient, every day.',
      },
    ],
  },
  {
    slug: 'parking-accessibility',
    title: 'Parking & Accessibility',
    // Wheelchair accessible hospital / clinic entrance with ramp
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1400',
    tagline: 'Convenient, inclusive access for every patient.',
    about:
      'For patient convenience, the clinic provides ample dedicated parking space and is fully designed to be accessible for individuals with mobility challenges, featuring wheelchair-friendly access and infrastructure to ensure a comfortable experience for all patients.',
    highlights: [
      { icon: '🚗', label: 'Dedicated Parking Facility' },
      { icon: '♿', label: 'Wheelchair-Friendly Access' },
      { icon: '🏗️', label: 'Inclusive Infrastructure' },
      { icon: '🗺️', label: 'Easy to Locate' },
    ],
    details: [
      {
        heading: 'Dedicated Parking Facility',
        body: 'We provide ample on-site parking for patients and visitors, ensuring stress-free arrival for every appointment — including reserved spaces for patients with disabilities located right at the clinic entrance.',
      },
      {
        heading: 'Handicap-Friendly Infrastructure',
        body: 'Sky Dental Clinic is fully accessible, with ramp access, wide doorways, and elevator connectivity between all three floors — so every patient can navigate our facility with ease and independence.',
      },
      {
        heading: 'Designed for Every Patient',
        body: 'From clear signage and accessible washrooms to staff trained in assisting patients with mobility needs, every detail of our clinic reflects our commitment to welcoming all patients, regardless of ability.',
      },
    ],
  },
];

const COPIES = 10;
const allCards = [
  ...Array(COPIES).fill(originalFacilities).flat(),
  ...originalFacilities,
  ...Array(COPIES).fill(originalFacilities).flat(),
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
      containerRef.current.scrollLeft =
        dragStartScroll.current + (dragStartX.current - e.pageX);
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleArrowClick = (e, slug) => {
    e.stopPropagation();
    if (!isDragging.current) navigate(`/facility/${slug}`);
  };

  return (
    <section className="facilities" id="facilities">
      <div className="facilities-section-header">
        <h2>
          Our <span className="facilities-highlight">World-Class</span> Facilities
        </h2>
        <p>
          Combining modern technology with expert care, we ensure your treatment is
          safe, precise, and completely comfortable at every step of your journey.
        </p>
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
            >
              <div
                className="facility-card-icon"
                onClick={(e) => handleArrowClick(e, f.slug)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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