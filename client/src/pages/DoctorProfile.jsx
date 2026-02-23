import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/DoctorProfile.css';

const providers = [
  {
    id: 'melvin-mathew',
    name: 'Dr. Melvin Mathew',
    specialty: 'Oral Surgery',
    designation: 'Founder & Senior Oral Surgeon',
    image: '/images/doctors/doc 1.png',
    experience: '25+ Years',
    bio1: 'Dr. Melvin Mathew is the founder of Sky Dental Hospital and one of the most experienced oral surgeons in Kasaragod district. With over 25 years of dedicated practice, he has transformed thousands of smiles and established Sky Dental as a benchmark for quality dental care in the region.',
    bio2: 'advanced training in oral and maxillofacial surgery and is committed to bringing world-class dental treatments to local patients without the need to travel to metropolitan cities.',
    email: 'melvin@skydentalclinics.com',
    facebook: '#',
    instagram: '#',
  },
  {
    id: 'james-patel',
    name: 'Dr. James Patel',
    specialty: 'Cosmetic Dentistry',
    designation: 'Lead Cosmetic Dentist',
    image: '/images/doctors/doc 2.png',
    experience: '15+ Years',
    bio1: 'Dr. James Patel is a highly skilled cosmetic dentist with a passion for aesthetic transformations. Over his 15-year career, he has helped hundreds of patients achieve their dream smiles through veneers, teeth whitening, smile makeovers, and composite bonding.',
    bio2: 'A perfectionist by nature, Dr. Patel combines artistry with clinical precision. He regularly attends international cosmetic dentistry conferences to stay at the forefront of the latest techniques and materials, ensuring his patients receive the finest cosmetic outcomes.',
    email: 'james@skydentalclinics.com',
    facebook: '#',
    instagram: '#',
  },
  {
    id: 'emily-nguyen',
    name: 'Dr. Emily Nguyen',
    specialty: 'Orthodontics',
    designation: 'Senior Orthodontist',
    image: '/images/doctors/doc 3.png',
    experience: '12+ Years',
    bio1: 'Dr. Emily Nguyen specialises in orthodontic treatments for both children and adults. With 12 years of experience, she has successfully treated complex malocclusion cases using traditional braces, clear aligners, and Invisalign, delivering beautifully aligned smiles.',
    bio2: "Dr. Nguyen believes orthodontic treatment goes beyond aesthetics — it improves oral health, function, and self-confidence. She is known for her gentle approach with younger patients and her ability to create personalised treatment plans that fit each patient's lifestyle.",
    email: 'emily@skydentalclinics.com',
    facebook: '#',
    instagram: '#',
  },
  {
    id: 'sarah-thomas',
    name: 'Dr. Sarah Thomas',
    specialty: 'Periodontics',
    designation: 'Periodontist & Implant Specialist',
    image: '/images/doctors/doc 4.png',
    experience: '10+ Years',
    bio1: 'Dr. Sarah Thomas is a dedicated periodontist with a focus on gum health and dental implant placement. Over her 10-year career, she has become the go-to specialist at Sky Dental for treating gum disease, bone loss, and providing long-lasting implant solutions.',
    bio2: 'She completed her postgraduate training in periodontics with distinction and is passionate about educating patients on preventive gum care. Dr. Thomas takes a holistic approach, understanding that gum health is deeply connected to overall systemic wellbeing.',
    email: 'sarah@skydentalclinics.com',
    facebook: '#',
    instagram: '#',
  },
  {
    id: 'arjun-menon',
    name: 'Dr. Arjun Menon',
    specialty: 'Endodontics',
    designation: 'Root Canal Specialist',
    image: '/images/doctors/doc 5.png',
    experience: '8+ Years',
    bio1: "Dr. Arjun Menon is Sky Dental's endodontic specialist, with expertise in root canal therapy and complex pulp treatments. In his 8 years of practice, he has performed thousands of pain-free root canal procedures, earning a reputation for gentle and efficient care.",
    bio2: 'Using the latest rotary endodontic techniques and digital imaging, Dr. Menon ensures every procedure is minimally invasive and maximally effective. He is committed to saving natural teeth whenever possible and helping patients overcome dental anxiety with compassion.',
    email: 'arjun@skydentalclinics.com',
    facebook: '#',
    instagram: '#',
  },
  {
    id: 'priya-sharma',
    name: 'Dr. Priya Sharma',
    specialty: 'Pediatric Dentistry',
    designation: 'Paediatric Dental Specialist',
    image: '/images/doctors/doc 6.png',
    experience: '9+ Years',
    bio1: "Dr. Priya Sharma is Sky Dental's beloved paediatric dentist, specialising in the oral health of infants, children, and adolescents. With 9 years of experience and a naturally warm personality, she makes every young patient feel safe, calm, and confident at the dentist.",
    bio2: "Dr. Sharma completed her postgraduate degree in paediatric dentistry and is trained in behaviour management techniques that help anxious children overcome their fears. She is a strong advocate for early dental education, believing that healthy habits formed in childhood last a lifetime.",
    email: 'priya@skydentalclinics.com',
    facebook: '#',
    instagram: '#',
  },
];

function DoctorProfile() {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 80;
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById('doc-' + id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 40;
          window.scrollTo({ top, behavior: 'instant' });
        } else if (attempts < 20) {
          setTimeout(() => tryScroll(attempts + 1), 100);
        }
      };
      tryScroll();
    }
  }, [id]);

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
        {providers.map((doctor, index) => (
          <section
            key={doctor.id}
            id={'doc-' + doctor.id}
            className={'dp-profile' + (index % 2 === 1 ? ' dp-profile-reverse' : '')}
          >
            <div className="dp-img-wrap">
              <img src={doctor.image} alt={doctor.name} />
            </div>

            <div className="dp-info">
              <span className="dp-specialty-tag">{doctor.specialty}</span>
              <h2>{doctor.name}</h2>
              <span className="dp-designation">{doctor.designation}</span>

              <div className="dp-exp-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#088395" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {doctor.experience} of Experience
              </div>

              <p>{doctor.bio1}</p>
              <p>{doctor.bio2}</p>

              <div className="dp-divider" />

              <div className="dp-footer-row">
                <Link to="/contact" className="dp-book-btn">
                  Book Appointment
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>

                <div className="dp-socials">
                  <a href={'mailto:' + doctor.email} className="dp-social-btn" title="Email">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </a>
                  <a href={doctor.facebook} className="dp-social-btn" title="Facebook">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a href={doctor.instagram} className="dp-social-btn" title="Instagram">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default DoctorProfile;