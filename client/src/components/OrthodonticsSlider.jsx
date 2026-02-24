import React, { useRef, useState } from 'react';
import '../styles/serviceStyles/OrthodonticsSlider.css';

const BEFORE_IMG = '/images/services/orth2.png';
const AFTER_IMG  = '/images/services/orth1.png';

function BeforeAfterSlider({
  beforeSrc   = BEFORE_IMG,
  afterSrc    = AFTER_IMG,
  beforeLabel = 'Braces',
  afterLabel  = 'Normal',
}) {
  const [sliderPos, setSliderPos] = useState(50);

  const handleInput = (e) => {
    setSliderPos(Number(e.target.value));
  };

  const containerStyle = {
    '--slider-pos': `${sliderPos}%`,
  };

  return (
    <div className="ba-comparison-container" style={containerStyle}>
      {/* After image (base layer) */}
      <img
        src={afterSrc}
        alt={afterLabel}
        className="ba-comparison-image ba-image-after"
      />
      <span className="ba-label ba-label-after">{afterLabel}</span>

      {/* Before image (clipped top layer) */}
      <img
        src={beforeSrc}
        alt={beforeLabel}
        className="ba-comparison-image ba-image-before"
      />
      <span className="ba-label ba-label-before">{beforeLabel}</span>

      {/* Slider handle */}
      <div className="ba-slider-handle">
        <div className="ba-handle-button">
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

      {/* Hidden range input for drag interaction */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        className="ba-slider-input"
        aria-label="Before/After Comparison Slider"
        onChange={handleInput}
      />
    </div>
  );
}

export default BeforeAfterSlider;