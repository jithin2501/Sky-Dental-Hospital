import React, { useState } from 'react';
import '../../styles/serviceStyles/CosmeticDentistrySlider.css';

function CosmeticDentistrySlider({
  beforeSrc   = '/images/services/Cosmetic Dentistry before.png',
  afterSrc    = '/images/services/Cosmetic Dentistry after.png',
  beforeLabel = 'Before',
  afterLabel  = 'After',
}) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="cd-comparison-container" style={{ '--slider-pos': `${sliderPos}%` }}>

      {/* Base layer: AFTER (enhanced teeth) — always fully visible underneath */}
      <img src={afterSrc} alt={afterLabel} className="cd-comparison-image cd-image-after-base" />
      <span className="cd-label cd-label-after">{afterLabel}</span>

      {/* Top layer: BEFORE (natural teeth) — clipped from the right as slider moves */}
      <img src={beforeSrc} alt={beforeLabel} className="cd-comparison-image cd-image-before-clip" />
      <span className="cd-label cd-label-before">{beforeLabel}</span>

      {/* Slider handle */}
      <div className="cd-slider-handle">
        <div className="cd-handle-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-4 4m0 0l4 4m-4-4h16m0 0l-4-4m4 4l-4 4" />
          </svg>
        </div>
      </div>

      <input
        type="range" min="0" max="100" value={sliderPos}
        className="cd-slider-input"
        aria-label="Before/After Comparison Slider"
        onChange={(e) => setSliderPos(Number(e.target.value))}
      />
    </div>
  );
}

export default CosmeticDentistrySlider;