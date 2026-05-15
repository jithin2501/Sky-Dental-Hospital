import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Contact Page/Contact.css';

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setForm({ ...form, name: value });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm({ ...form, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', phone: '', email: '', message: '' });
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
            src="/images/Contact/banner.png"
            alt="Contact Banner"
          />
          <div className="banner-overlay" />
          <div className="banner-content-wrapper">
            <div className="banner-quote">
              <p className="quote-main">
                A <span className="highlight">smile</span> is an<br />
                inexpensive way<br />
                to change<br />
                <span className="highlight">your looks</span>
              </p>
              <div className="quote-author">
                <span className="line"></span>
                <span className="author-text">SKY DENTAL CENTRE</span>
                <span className="line"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <section className="contact-section">

        {/* LEFT — General Inquiries */}
        <div className="left-col">
          <div className="inquiries-card">
            <h2 className="inquiries-title">General Inquiries:</h2>
            <p className="inquiries-desc">
              For any questions regarding our dental services, treatments, or hospital information, please reach out to us.
              Our team is here to assist you and ensure you receive the best care for your smile.
            </p>
            <div className="inquiries-info">
              <div className="info-row">
                <span className="info-icon location-icon">
                  <img src="/images/social/location-icon.png" alt="Location" className="contact-icon-img" />
                </span>
                <span>Kanhangad–Rajapuram–Malom Rd, Pullur, Odayanchal–Cherupuzha Rd, Odayanchal, Kodom, Kerala 671531</span>
              </div>
              <div className="info-row">
                <span className="info-icon phone-icon">
                  <img src="/images/social/phone-icon.png" alt="Phone" className="contact-icon-img" />
                </span>
                <span>+91 94964 10344, +91 73569 77001</span>
              </div>
              <div className="info-row">
                <span className="info-icon email-icon">
                  <img src="/images/social/email-icon.png" alt="Email" className="contact-icon-img" />
                </span>
                <span>ad.skydentalhospital@gmail.com</span>
              </div>
            </div>

            <div className="inquiries-map-static">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243.564577912553!2d75.13940482455091!3d12.380705227164801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba47d0048039cf3%3A0x7e7bd08ff63cdfe3!2sSky%20dental%20hospital%20parapally!5e0!3m2!1sen!2sin!4v1777618747979!5m2!1sen!2sin"
                loading="lazy"
                allowFullScreen
                title="Hospital Location Map"
                className="static-map-iframe"
              />
            </div>
          </div>
        </div>

        {/* RIGHT — Send a Message */}
        <div className="right-col">
          {submitted ? (
            <div className="success-container">
              <div className="success-msg-full">
                <div className="success-icon">✓</div>
                <h3>Message sent!</h3>
                <p>We'll contact you shortly.</p>
              </div>
            </div>
          ) : (
            <div className="send-msg-card">
              <h2 className="send-msg-title">Send a Message</h2>

              <form onSubmit={handleSubmit} className="send-msg-form">
                <div className="form-group full-width">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={form.name}
                    onChange={handleNameChange}
                  />
                </div>

                <div className="form-group full-width">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    value={form.phone}
                    onChange={handlePhoneChange}
                  />
                </div>

                <div className="form-group full-width">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="form-group full-width">
                  <textarea
                    placeholder="Message"
                    required
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <div className="btn-wrapper">
                  <button type="submit" className="submit-btn">SUBMIT</button>
                </div>
              </form>
            </div>
          )}
        </div>

      </section>

      <Footer />
    </div>
  );
}

export default Contact;