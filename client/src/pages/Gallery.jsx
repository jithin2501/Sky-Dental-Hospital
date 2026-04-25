import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Gallery/Gallery.css';

const IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    caption: "Modern Dental Equipment"
  },
  {
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    caption: "Patient Comfort Room"
  },
  {
    url: "https://images.unsplash.com/photo-1468493858157-0da44aaf1d13?w=800&q=80",
    caption: "Sterilized Environment"
  }
];

function Gallery() {
  return (
    <div className="gallery-page">
      <Header />
      
      {/* Banner - Same style as Contact */}
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
          <h2 className="gallery-heading">Sky dental hospital Gallery</h2>
          
          <div className="gallery-grid">
            {IMAGES.map((img, index) => (
              <div key={index} className="gallery-item">
                <div className="gallery-img-wrapper">
                  <img src={img.url} alt="Gallery" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Gallery;
