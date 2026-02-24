import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProvidersGrid.css';

function ProvidersGrid() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/doctors')
      .then(res => res.ok ? res.json() : [])
      .then(data => setDoctors(Array.isArray(data) ? data : []))
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div id="team" />
      <section className="providers">
        <div className="providers-header">
          <h2>Meet Our <span className="providers-highlight">Team</span></h2>
          <p>Our skilled dentists work together to deliver safe, advanced, and personalized dental care. Your comfort, health, and smile are always our top priorities.</p>
        </div>

        {loading ? (
          <div className="providers-loading">
            <div className="providers-spinner" />
          </div>
        ) : doctors.length === 0 ? (
          <div className="providers-empty">
            <p>Our team information will be available soon.</p>
          </div>
        ) : (
          <div className="providers-grid">
            {doctors.map((doc) => (
              <div className="provider-card" key={doc._id}>
                <div className="provider-card-top">
                  <img src={doc.image_url} alt={doc.name} />
                </div>
                <div className="provider-card-body">
                  <p className="provider-specialty">{doc.specialty}</p>
                  <p className="provider-name">{doc.name}</p>
                  <div className="provider-card-footer">
                    <Link to={`/team/${doc._id}`} className="provider-learn">
                      View Profile
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default ProvidersGrid;