import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Gallery/Gallery.css';

function Gallery() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Lightbox state
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeSectionIdx, setActiveSectionIdx] = useState(null);
  const [activeItemIdx, setActiveItemIdx] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setSections(data);
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (sectionIdx, itemIdx) => {
    const item = sections[sectionIdx].items[itemIdx];
    if (item.resource_type === 'image') {
      setSelectedImage(item.url);
      setActiveSectionIdx(sectionIdx);
      setActiveItemIdx(itemIdx);
      document.body.style.overflow = 'hidden'; // Prevent scroll
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setActiveSectionIdx(null);
    setActiveItemIdx(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    const currentSection = sections[activeSectionIdx];
    const imageOnlyIndices = currentSection.items
      .map((item, idx) => item.resource_type === 'image' ? idx : null)
      .filter(idx => idx !== null);

    const currentPos = imageOnlyIndices.indexOf(activeItemIdx);
    let nextPos = currentPos + direction;

    if (nextPos >= imageOnlyIndices.length) nextPos = 0;
    if (nextPos < 0) nextPos = imageOnlyIndices.length - 1;

    const nextItemIdx = imageOnlyIndices[nextPos];
    setActiveItemIdx(nextItemIdx);
    setSelectedImage(currentSection.items[nextItemIdx].url);
  };

  return (
    <div className="gallery-page">
      <Header />
      
      <div className="gallery-banner-wrap">
        <div className="gallery-banner">
          <img
            className="gallery-banner-bg"
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1400&q=80"
            alt="Gallery Banner"
          />
          <div className="gallery-banner-overlay" />
          <div className="gallery-banner-content">
            <h1>Gallery</h1>
          </div>
        </div>
      </div>

      <section className="gallery-section">
        <div className="gallery-container">
          
          {loading ? (
            <div className="gallery-loading">
                <div className="spinner"></div>
                <p>Loading our hospital gallery...</p>
            </div>
          ) : sections.length === 0 ? (
            <div className="gallery-empty">
                <p>New photos coming soon!</p>
            </div>
          ) : (
            sections.map((section, sIdx) => (
              <div key={section._id} className="gallery-section-group">
                <h2 className="gallery-heading">{section.title}</h2>
                <div className="gallery-grid">
                  {section.items.map((item, iIdx) => (
                    <div key={item._id} className="gallery-item">
                      <div className="gallery-img-wrapper" onClick={() => openLightbox(sIdx, iIdx)}>
                        {item.resource_type === 'video' ? (
                          <video 
                            src={item.url} 
                            controls 
                            playsInline
                            className="gallery-video"
                          />
                        ) : (
                          <img src={item.url} alt={section.title} className="gallery-clickable-img" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}

        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>✕</button>
          
          <button 
            className="lightbox-arrow lb-left" 
            onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}
          >
            ‹
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Fullscreen View" />
          </div>

          <button 
            className="lightbox-arrow lb-right" 
            onClick={(e) => { e.stopPropagation(); navigateImage(1); }}
          >
            ›
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Gallery;
