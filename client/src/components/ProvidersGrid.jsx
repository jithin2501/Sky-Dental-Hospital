import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProvidersGrid.css';

const providers = [
  {
    id: 'melvin-mathew',
    name: 'Dr. Melvin Mathew',
    specialty: 'Oral Surgery',
    image: '/images/doctors/doc 1.png',
  },
  {
    id: 'james-patel',
    name: 'Dr. James Patel',
    specialty: 'Cosmetic Dentistry',
    image: '/images/doctors/doc 2.png',
  },
  {
    id: 'emily-nguyen',
    name: 'Dr. Emily Nguyen',
    specialty: 'Orthodontics',
    image: '/images/doctors/doc 3.png',
  },
  {
    id: 'sarah-thomas',
    name: 'Dr. Sarah Thomas',
    specialty: 'Periodontics',
    image: '/images/doctors/doc 1.png',
  },
  {
    id: 'arjun-menon',
    name: 'Dr. Arjun Menon',
    specialty: 'Endodontics',
    image: '/images/doctors/doc 2.png',
  },
  {
    id: 'priya-sharma',
    name: 'Dr. Priya Sharma',
    specialty: 'Pediatric Dentistry',
    image: '/images/doctors/doc 3.png',
  },
];

function ProvidersGrid() {
  return (
    <>
      <div id="team" />

      <section className="providers">
        <div className="providers-header">
          <h2>Meet Our <span className="providers-highlight">Team</span></h2>
          <p>Our skilled dentists work together to deliver safe, advanced, and personalized dental care. Your comfort, health, and smile are always our top priorities.</p>
        </div>

        <div className="providers-grid">
          {providers.map((p, i) => (
            <div className="provider-card" key={i}>
              <div className="provider-card-top">
                <img src={p.image} alt={p.name} />
              </div>
              <div className="provider-card-body">
                <p className="provider-specialty">{p.specialty}</p>
                <p className="provider-name">{p.name}</p>
                <div className="provider-card-footer">
                  <Link to={`/team/${p.id}`} className="provider-learn">
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
      </section>
    </>
  );
}

export default ProvidersGrid;