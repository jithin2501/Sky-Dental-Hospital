import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="form-side">
      <h2>CONTACT US</h2>
      <p>Contact our office and we will get back to you regarding the intervention you require. We're here to make your smile brighter every day.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your Name *"
            required
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your Email Address *"
            required
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Enter your Message *"
            required
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
        <div className="btn-wrapper">
          <button type="submit" className="submit-btn">Submit Your Message</button>
        </div>
        {success && (
          <div className="success-msg show">✓ Message sent! We'll contact you shortly.</div>
        )}
      </form>
    </div>
  );
}

export default ContactForm;
