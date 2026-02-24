import React, { useState } from 'react';  
import { useParams, useNavigate } from 'react-router-dom';
import { originalFacilities } from '../components/FacilitiesSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/FacilityDetail.css';

function FacilityDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const facility = originalFacilities.find(f => f.slug === slug);

  if (!facility) {
    return (
      <div className="fd-page">
        <Header />
        <div className="fd-not-found">
          <h2>Facility not found.</h2>
          <button onClick={() => navigate('/#facilities')} className="fd-back-btn">← Back to Facilities</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="fd-page">
      <Header />

      {/* ── Banner ── */}
      <div className="fd-banner">
        <img src={facility.banner} alt={facility.title} className="fd-banner-img" />
        <div className="fd-banner-overlay" />
        <div className="fd-banner-content">
          <h1>{facility.title}</h1>
        </div>
      </div>

      {/* ── Body ── */}
      <section className="fd-body">

        {/* Tagline + About */}
        <div className="fd-intro">
          <div className="fd-intro-text">
            <span className="fd-tag">Our Facility</span>
            <h2>{facility.tagline}</h2>
            <p>{facility.about}</p>
            <button className="fd-cta-btn" onClick={() => navigate('/contact')}>
              Book an Appointment →
            </button>
          </div>

          {/* Highlights grid */}
          <div className="fd-highlights">
            {facility.highlights.map((h, i) => (
              <div className="fd-highlight-card" key={i}>
                <span className="fd-highlight-icon">{h.icon}</span>
                <span className="fd-highlight-label">{h.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detail cards */}
        <div className="fd-details">
          <h3>What Sets Us Apart</h3>
          <div className="fd-detail-grid">
            {facility.details.map((d, i) => (
              <div className="fd-detail-card" key={i}>
                <div className="fd-detail-num">0{i + 1}</div>
                <h4>{d.heading}</h4>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back button */}
        <div className="fd-back-wrap">
          <button className="fd-back-btn" onClick={() => navigate('/#facilities')}>
            ← Back to Facilities
          </button>
        </div>

      </section>

      <Footer />
    </div>
  );
}

export default FacilityDetail;