import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/BookAppointment.css';

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

        <div className="book-row">

          <div className="book-card book-card--primary">
            <div className="book-card__icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
              </svg>
            </div>
            <p className="book-card__label">Call us directly</p>
            <a href="tel:+917356734344" className="book-card__number">+91 73567 34344</a>
            <p className="book-card__hint">Tap to call instantly from your phone</p>
          </div>

          <div className="book-divider" />

          <div className="book-card book-card--hours">
            <div className="book-card__icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <p className="book-card__label">Clinic Hours</p>
            <ul className="book-hours-list">
              <li><span>Mon – Sat</span><span>9:00 AM – 7:00 PM</span></li>
              <li><span>Sunday</span><span>10:00 AM – 2:00 PM</span></li>
            </ul>
          </div>

        </div>

      </section>

      <Footer />
    </div>
  );
}

export default BookAppointment;