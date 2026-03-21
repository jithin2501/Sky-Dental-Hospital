import React, { useState } from 'react';
import '../styles/serviceStyles/SmileMakeoverSlider.css';

const BEFORE_IMG = '/images/services/Smile Makeover before.png';
const AFTER_IMG = '/images/services/Smile Makeover after.png';

function SmileMakeoverSlider({
  beforeSrc   = BEFORE_IMG,
  afterSrc    = AFTER_IMG,
  beforeLabel = 'Before',
  afterLabel  = 'After',
}) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div
      className="sm-comparison-container"
      style={{ '--slider-pos': `${sliderPos}%` }}
    >
      {/* Base layer: Before */}
      <img src={beforeSrc} alt={beforeLabel} className="sm-comparison-image sm-image-before" />
      <span className="sm-label sm-label-before">{beforeLabel}</span>

      {/* Top layer: After — clipped by slider */}
      <img src={afterSrc} alt={afterLabel} className="sm-comparison-image sm-image-after" />
      <span className="sm-label sm-label-after">{afterLabel}</span>

      {/* Slider handle */}
      <div className="sm-slider-handle">
        <div className="sm-handle-button">
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
        className="sm-slider-input"
        aria-label="Before/After Comparison Slider"
        onChange={(e) => setSliderPos(Number(e.target.value))}
      />
    </div>
  );
}

export default SmileMakeoverSlider;