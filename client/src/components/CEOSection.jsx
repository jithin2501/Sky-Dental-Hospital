import React from 'react';
import '../styles/Ceo.css';

function CEOSection() {
  return (
    <section className="ceo-section">
      <h2 className="ceo-heading">MEET OUR CEO</h2>

      <div className="ceo-inner">

        {/* Photo */}
        <div className="ceo-photo-wrapper">
          <img
            src="/images/Ceo/Dr Melvin mathew.png"
            alt="Dr. Melvin Mathew"
            className="ceo-photo"
          />
        </div>

        {/* Content */}
        <div className="ceo-left">
          <h2 className="ceo-name">
            Dr. <span className="ceo-highlight">Melvin</span> Mathew
          </h2>

          <p className="ceo-title-tag">
            Founder &amp; Chief Dentist | BDS, MDS (Oral Surgery)
          </p>

          <p className="ceo-desc">
            Dr. Melvin Mathew, the visionary founder of Sky Dental Hospital, Kanhangad, is a
            highly skilled and compassionate dental professional dedicated to delivering
            world-class oral healthcare. With years of expertise in advanced dentistry, he
            leads his team with a commitment to innovation, patient comfort, and excellence
            in community dental care.
          </p>

          <div className="ceo-quote">
            <svg
              className="ceo-quote-icon"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="#088395"
              opacity="0.6"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="ceo-quote-text">
              Our mission is simple — give every patient the smile they deserve, with care they can trust.
            </p>
          </div>

          <a href="#team" className="ceo-btn">
            Meet Our Team
            <span className="ceo-btn-arrow">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}

export default CEOSection;