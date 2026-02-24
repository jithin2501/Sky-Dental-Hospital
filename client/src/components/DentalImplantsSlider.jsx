import React, { useState } from 'react';
import '../styles/serviceStyles/DentalImplantsSlider.css';

const BEFORE_IMG = '/images/services/Dental Restorations.png';
const AFTER_IMG  = '/images/services/Dental Implants.png';

function DentalImplantsSlider({
  beforeSrc   = BEFORE_IMG,
  afterSrc    = AFTER_IMG,
  beforeLabel = 'Before',
  afterLabel  = 'After',
}) {
  const [sliderPos, setSliderPos] = useState(50);

  const containerStyle = {
    '--slider-pos': `${sliderPos}%`,
  };

  return (
    <div className="di-comparison-container" style={containerStyle}>
      {/* Base layer: Before (Implant/Missing) */}
      <img
        src={beforeSrc}
        alt={beforeLabel}
        className="di-comparison-image di-image-before"
      />
      <span className="di-label di-label-before">{beforeLabel}</span>

      {/* Top layer: After (Restored) — clipped by slider */}
      <img
        src={afterSrc}
        alt={afterLabel}
        className="di-comparison-image di-image-after"
      />
      <span className="di-label di-label-after">{afterLabel}</span>

      {/* Slider handle */}
      <div className="di-slider-handle">
        <div className="di-handle-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7l-4 4m0 0l4 4m-4-4h16m0 0l-4-4m4 4l-4 4"
            />
          </svg>
        </div>
      </div>

      {/* Hidden range input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        className="di-slider-input"
        aria-label="Before/After Comparison Slider"
        onChange={(e) => setSliderPos(Number(e.target.value))}
      />
    </div>
  );
}

export default DentalImplantsSlider;