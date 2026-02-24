import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Contact.css';

function Contact() {
  const [zoom, setZoom] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const zoomLevels = [7856, 3928, 1964, 982, 491, 245];

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${zoomLevels[zoom]}!2d76.62711127599039!3d10.062224590046416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07e79e12537ab7%3A0xccbc8b5d4c9fb10e!2sMaria%20homes!5e0!3m2!1sen!2sin!4v1752908504232!5m2!1sen!2sin`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Sending data to the backend API
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form after successful submission
        setForm({ name: '', email: '', message: '' });
        // Hide success message after 4 seconds
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="contact-page">
      <Header />

      {/* Banner */}
      <div className="banner-wrap">
        <div className="banner">
          <img
            className="banner-bg-img"
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80"
            alt="Contact Banner"
          />
          <div className="banner-overlay" />
          <div className="banner-content">
            <h1>Contact Us</h1>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="contact-section">

        {/* Map */}
        <div className="map-wrapper">
          <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
            <defs>
              <clipPath id="blobClip" clipPathUnits="objectBoundingBox">
                <path d="
                  M 0.50, 0.03
                  C 0.38, 0.03  0.20, 0.10  0.08, 0.22
                  C -0.02, 0.33  -0.02, 0.67  0.08, 0.78
                  C 0.20, 0.90  0.38, 0.97  0.50, 0.97
                  C 0.62, 0.97  0.75, 0.88  0.85, 0.75
                  C 0.93, 0.64  0.97, 0.56  0.97, 0.50
                  C 0.97, 0.44  0.93, 0.36  0.85, 0.25
                  C 0.75, 0.12  0.62, 0.03  0.50, 0.03 Z
                "/>
              </clipPath>
            </defs>
          </svg>

          <div className="map-blob-clip">
            <iframe
              src={mapSrc}
              loading="lazy"
              allowFullScreen
              title="Sky Dental Location"
            />
          </div>

          <div className="map-zoom-btns">
            <button
              className="map-zoom-btn"
              onClick={() => setZoom(z => Math.min(z + 1, zoomLevels.length - 1))}
              title="Zoom in"
            >+</button>
            <button
              className="map-zoom-btn"
              onClick={() => setZoom(z => Math.max(z - 1, 0))}
              title="Zoom out"
            >−</button>
          </div>
        </div>

        {/* Form */}
        <div className="form-side">
          <h2>CONTACT US</h2>
          <p>Contact our office and we will get back to you regarding the intervention you require. We're here to make your smile brighter every day.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter your Name *"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Enter your Email Address *"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Enter your Message *"
                required
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <div className="btn-wrapper">
              <button type="submit" className="submit-btn">Submit Your Message</button>
            </div>
            {submitted && (
              <div className="success-msg show">
                ✓ Message sent! We'll contact you shortly.
              </div>
            )}
          </form>
        </div>

      </section>

      <Footer />
    </div>
  );
}

export default Contact;