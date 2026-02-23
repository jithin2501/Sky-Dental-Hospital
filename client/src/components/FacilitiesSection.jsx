import React, { useRef, useState, useEffect } from 'react';
import '../styles/Facility.css';

const originalFacilities = [
  {
    title: 'Professional Dentist',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Modern Equipment',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Safe & Sterilized',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
  }
];

const COPIES = 10;

// Build infinite list: 10 copies before + originals + 10 copies after
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

  const CARD_W = () => {
    const vw = Math.min(window.innerWidth, 1200);
    return (vw - 48) / 3 + 24;
  };

  const totalOneSet = () => CARD_W() * originalFacilities.length;

  // Set initial scroll to middle copies
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

    // Infinite loop logic
    if (sl > COPIES * oneSet * 1.5) {
      el.scrollLeft = sl - oneSet;
    } else if (sl < COPIES * oneSet * 0.5) {
      el.scrollLeft = sl + oneSet;
    }

    // Update active dot
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

  // Mouse drag
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
            >
              <div className="facility-card-icon">
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