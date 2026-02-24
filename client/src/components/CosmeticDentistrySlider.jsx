import React, { useState } from 'react';
import '../styles/serviceStyles/CosmeticDentistrySlider.css';

const BEFORE_IMG = '/images/services/Cosmetic Dentistry before.png';
const AFTER_IMG  = '/images/services/Cosmetic Dentistry after.png';

function CosmeticDentistrySlider({
  beforeSrc   = BEFORE_IMG,
  afterSrc    = AFTER_IMG,
  beforeLabel = 'Before',
  afterLabel  = 'After',
}) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div
      className="cd-comparison-container"
      style={{ '--slider-pos': `${sliderPos}%` }}
    >
      {/* Base layer: Before */}
      <img src={beforeSrc} alt={beforeLabel} className="cd-comparison-image cd-image-before" />
      <span className="cd-label cd-label-before">{beforeLabel}</span>

      {/* Top layer: After — clipped by slider */}
      <img src={afterSrc} alt={afterLabel} className="cd-comparison-image cd-image-after" />
      <span className="cd-label cd-label-after">{afterLabel}</span>

      {/* Slider handle */}
      <div className="cd-slider-handle">
        <div className="cd-handle-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-4 4m0 0l4 4m-4-4h16m0 0l-4-4m4 4l-4 4" />
          </svg>
        </div>
      </div>

      {/* Hidden range input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        className="cd-slider-input"
        aria-label="Before/After Comparison Slider"
        onChange={(e) => setSliderPos(Number(e.target.value))}
      />
    </div>
  );
}

export default CosmeticDentistrySlider;