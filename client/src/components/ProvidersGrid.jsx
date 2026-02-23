import React from 'react';
import '../styles/ProvidersGrid.css';

const providers = [
  {
    name: 'Dr. Melvin Mathew',
    specialty: 'Oral Surgery',
    image: '/images/doctors/doc 1.png'
  },
  {
    name: 'Dr. James Patel',
    specialty: 'Cosmetic Dentistry',
    image: '/images/doctors/doc 2.png'
  },
  {
    name: 'Dr. Emily Nguyen',
    specialty: 'Orthodontics',
    image: '/images/doctors/doc 3.png'
  }
];

function ProvidersGrid() {
  return (
    <section className="providers" id="providers">
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
              <p className="provider-name">{p.name}</p>
              <p className="provider-specialty">{p.specialty}</p>
              <div className="provider-card-footer">
                <a href="#providers" className="provider-learn">Learn More →</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProvidersGrid;