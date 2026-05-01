import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Appointment/BookAppointment.css';

function BookAppointment() {
  return (
    <div className="book-page">
      <Header />

      <div className="banner-wrap">
        <div className="banner">
          <img
            className="banner-bg-img"
            src="/images/banner/appointment.webp"
            alt="Book Appointment Banner"
          />
          <div className="banner-overlay" />
          <div className="banner-content">
            <h1>Book an Appointment</h1>
          </div>
        </div>
      </div>

      <section className="book-section">

        <div className="book-intro">
          <span className="book-tag">Get in Touch</span>
          <h2>Ready for a Brighter Smile?</h2>
          <p>
            Scheduling your visit is just one call away. Our front desk team is
            available during clinic hours to find a time that works perfectly
            for you.
          </p>
        </div>

        <div className="appointment-cards-container">
          
          {/* Sky Dental Hospital Card */}
          <div className="appointment-card contact-card hospital">
            <div className="card-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
              </svg>
            </div>
            <h3 className="card-title">Sky Dental Hospital</h3>
            <div className="card-content">
              <a href="tel:04672080055" className="phone-link">
                <span className="phone-label">Landline</span>
                <span className="phone-value">0467 2080055</span>
              </a>
              <a href="tel:7356977001" className="phone-link primary">
                <span className="phone-label">Mobile</span>
                <span className="phone-value">73569 77001</span>
              </a>
            </div>
          </div>

          {/* Sky Dental Clinic Card */}
          <div className="appointment-card contact-card clinic">
            <div className="card-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
              </svg>
            </div>
            <h3 className="card-title">Sky Dental Clinic</h3>
            <div className="card-content">
              <a href="tel:9496410344" className="phone-link primary">
                <span className="phone-label">Direct Line</span>
                <span className="phone-value">94964 10344</span>
              </a>
            </div>
          </div>

          {/* Clinic Hours Card */}
          <div className="appointment-card hours-card">
            <div className="card-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h3 className="card-title">Clinic Hours</h3>
            <div className="card-content">
              <div className="hours-row">
                <span className="hours-tag">Morning</span>
                <span className="hours-time">10:00 AM – 1:00 PM</span>
              </div>
              <div className="hours-row">
                <span className="hours-tag">Evening</span>
                <span className="hours-time">2:00 PM – 6:00 PM</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      <Footer />
    </div>
  );
}

export default BookAppointment;