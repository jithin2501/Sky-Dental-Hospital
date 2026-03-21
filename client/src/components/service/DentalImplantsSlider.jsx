import React, { useState } from 'react';
import '../../styles/serviceStyles/DentalImplantsSlider.css';

function DentalImplantsSlider({
  beforeSrc   = '/images/services/Dental Implants.png',
  afterSrc    = '/images/services/Dental Restorations.png',
  beforeLabel = 'Before',
  afterLabel  = 'After',
}) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="di-comparison-container" style={{ '--slider-pos': `${sliderPos}%` }}>

      {/* Base layer: AFTER (good teeth) — always fully visible underneath */}
      <img src={afterSrc} alt={afterLabel} className="di-comparison-image di-image-after-base" />
      <span className="di-label di-label-after">{afterLabel}</span>

      {/* Top layer: BEFORE (bad teeth) — clipped from the right as slider moves */}
      <img src={beforeSrc} alt={beforeLabel} className="di-comparison-image di-image-before-clip" />
      <span className="di-label di-label-before">{beforeLabel}</span>

      {/* Slider handle */}
      <div className="di-slider-handle">
        <div className="di-handle-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-4 4m0 0l4 4m-4-4h16m0 0l-4-4m4 4l-4 4" />
          </svg>
        </div>
      </div>

      <input
        type="range" min="0" max="100" value={sliderPos}
        className="di-slider-input"
        aria-label="Before/After Comparison Slider"
        onChange={(e) => setSliderPos(Number(e.target.value))}
      />
    </div>
  );
}

export default DentalImplantsSlider;