import React, { useRef, useEffect, useState } from 'react';
import '../styles/VideoSection.css';

function VideoSection() {
  const videoRef = useRef(null);
  const [media, setMedia] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/media/latest')
      .then(res => {
        if (!res.ok) return null;
        return res.json();
      })
      .then(data => setMedia(data))
      .catch(() => setMedia(null));
  }, []);

  const handleMouseEnter = () => { if (videoRef.current) videoRef.current.pause(); };
  const handleMouseLeave = () => { if (videoRef.current) videoRef.current.play(); };

  const renderMedia = () => {
    if (media && media.resource_type === 'video') {
      return (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          src={media.url}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      );
    }

    if (media && media.resource_type === 'image') {
      return (
        <img
          src={media.url}
          alt="Facility"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      );
    }

    // No media uploaded — render nothing
    return null;
  };

  const mediaContent = renderMedia();

  return (
    <section className="virtual-tour" id="tour">
      <div className="virtual-tour-inner">
        <div className="virtual-tour-header">
          <h2>Take a Virtual Tour of Our <span className="highlight">Facility</span></h2>
          <p>Experience our modern environment, advanced technology, and patient-first care.</p>
        </div>
        <div
          className="virtual-tour-video"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="video-wrapper">
            {mediaContent ? mediaContent : (
              <div className="video-placeholder">
                <div className="video-placeholder-icon">🎬</div>
                <p>Virtual tour coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;