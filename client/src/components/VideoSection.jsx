import React, { useRef } from 'react';
import '../styles/VideoSection.css';

function VideoSection() {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) videoRef.current.play();
  };

  return (
    <section className="virtual-tour" id="tour">
      <div className="virtual-tour-inner">
        <div className="virtual-tour-header">
          <h2>Take a Virtual Tour of Our <span className="highlight">Facility</span></h2>
          <p>Experience our modern environment, advanced technology, and patient-first care — all from the comfort of your home.</p>
        </div>
        <div
          className="virtual-tour-video"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="video-wrapper">
            <video ref={videoRef} autoPlay muted loop playsInline>
              <source src="/images/Virtual Tour/hospital vedio.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;