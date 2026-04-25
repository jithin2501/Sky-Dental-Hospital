import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Gallery/Gallery.css';

function Gallery() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="gallery-page">
      <Header />
      
      {/* Banner */}
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
                <h2 className="gallery-heading">Sky dental hospital Gallery</h2>
                <p>New photos coming soon!</p>
            </div>
          ) : (
            sections.map((section, sIdx) => (
              <div key={section._id} className="gallery-section-group">
                <h2 className="gallery-heading">{section.title}</h2>
                <div className="gallery-grid">
                  {section.items.map((item) => (
                    <div key={item._id} className="gallery-item">
                      <div className="gallery-img-wrapper">
                        {item.resource_type === 'video' ? (
                          <video 
                            src={item.url} 
                            controls 
                            playsInline
                            className="gallery-video"
                          />
                        ) : (
                          <img src={item.url} alt={section.title} />
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

      <Footer />
    </div>
  );
}

export default Gallery;
