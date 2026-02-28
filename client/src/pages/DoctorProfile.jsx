import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/DoctorProfile.css';

function DoctorProfile() {
  const { id } = useParams();
  const [doctors,  setDoctors]  = useState([]);
  const [profiles, setProfiles] = useState({});
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/doctors').then(r => r.ok ? r.json() : []),
      fetch('http://localhost:5000/api/doctor-profiles').then(r => r.ok ? r.json() : []),
    ])
      .then(([docs, profs]) => {
        setDoctors(Array.isArray(docs) ? docs : []);
        const profMap = {};
        if (Array.isArray(profs)) {
          profs.forEach(p => { if (p.doctor?._id) profMap[p.doctor._id] = p; });
        }
        setProfiles(profMap);
      })
      .catch(() => { setDoctors([]); setProfiles({}); })
      .finally(() => setLoading(false));
  }, []);

  const displayDoctors = id
    ? doctors.filter(d => d._id === id)
    : doctors;

  return (
    <div className="dp-page">
      <Header />

      <div className="dp-banner-wrap">
        <div className="dp-banner">
          <img
            className="dp-banner-bg"
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80"
            alt="Sky Dental"
          />
          <div className="dp-banner-overlay" />
          <div className="dp-banner-content">
            <h1>Our Medical Team</h1>
          </div>
        </div>
      </div>

      <div className="dp-container">
        {loading ? (
          <div className="dp-loading"><div className="dp-spinner" /></div>
        ) : displayDoctors.length === 0 ? (
          <div className="dp-not-found">
            <p>No team members found.</p>
            <Link to="/" className="dp-back-btn">Back to Home</Link>
          </div>
        ) : (
          displayDoctors.map((doctor, index) => {
            const profile = profiles[doctor._id];
            return (
              <section
                key={doctor._id}
                id={'doc-' + doctor._id}
                className={'dp-profile' + (index % 2 === 1 ? ' dp-profile-reverse' : '')}
              >
                <div className="dp-img-wrap">
                  <img src={doctor.image_url} alt={doctor.name} />
                </div>

                <div className="dp-info">
                  <span className="dp-specialty-tag">{doctor.specialty}</span>
                  <h2>{doctor.name}</h2>

                  {profile?.designation && (
                    <span className="dp-designation">{profile.designation}</span>
                  )}

                  {profile?.experience && (
                    <div className="dp-exp-badge">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#088395" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {profile.experience} of Experience
                    </div>
                  )}

                  {profile?.bio1 && <p>{profile.bio1}</p>}
                  {profile?.bio2 && <p>{profile.bio2}</p>}

                  {!profile?.bio1 && !profile?.bio2 && (
                    <p className="dp-no-bio">Profile details coming soon.</p>
                  )}

                  <div className="dp-divider" />

                  <div className="dp-footer-row">
                    <Link to="/book-appointment" className="dp-book-btn">
                      Book Appointment
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>

                    <div className="dp-socials">
                      {profile?.email && (
                        <a href={'mailto:' + profile.email} className="dp-social-btn" title="Email">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                          </svg>
                        </a>
                      )}
                      {profile?.facebook && (
                        <a href={profile.facebook} target="_blank" rel="noreferrer" className="dp-social-btn" title="Facebook">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                          </svg>
                        </a>
                      )}
                      {profile?.instagram && (
                        <a href={profile.instagram} target="_blank" rel="noreferrer" className="dp-social-btn" title="Instagram">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
          })
        )}
      </div>

      <Footer />
    </div>
  );
}

export default DoctorProfile;