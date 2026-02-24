import React, { useState } from 'react';
import '../styles/ReviewPage.css';

function ReviewPage() {
  const [name,     setName]     = useState('');
  const [rating,   setRating]   = useState(0);
  const [hovered,  setHovered]  = useState(0);
  const [text,     setText]     = useState('');
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return setError('Please select a star rating.');
    if (!name.trim()) return setError('Please enter your name.');
    if (!text.trim()) return setError('Please write a short review.');

    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, text }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rp-page">
        <div className="rp-card">
          <div className="rp-success">
            <div className="rp-success-icon">✓</div>
            <h2>Thank You!</h2>
            <p>Your review has been submitted successfully.<br />We truly appreciate your feedback.</p>
            <div className="rp-success-stars">★★★★★</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rp-page">
      <div className="rp-card">

        {/* Header */}
        <div className="rp-header">
          <div className="rp-logo">
            <img src="/images/logo.png" alt="Sky Dental" className="rp-logo-img" />
          </div>
          <h1 className="rp-title">Share Your Experience</h1>
          <p className="rp-subtitle">Your feedback helps us serve you better</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rp-form">

          {/* Star Rating */}
          <div className="rp-field">
            <label className="rp-label">How would you rate us?</label>
            <div className="rp-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`rp-star ${star <= (hovered || rating) ? 'active' : ''}`}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="rp-rating-label">
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
              </p>
            )}
          </div>

          {/* Name */}
          <div className="rp-field">
            <label className="rp-label">Your Name</label>
            <input
              type="text"
              className="rp-input"
              placeholder="e.g. John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Review text */}
          <div className="rp-field">
            <label className="rp-label">Your Review</label>
            <textarea
              className="rp-input rp-textarea"
              placeholder="Tell us about your experience at Sky Dental Clinics..."
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          {error && <p className="rp-error">{error}</p>}

          <button type="submit" className="rp-submit" disabled={loading}>
            {loading ? (
              <span className="rp-submit-loading">
                <span className="rp-submit-spinner" /> Submitting…
              </span>
            ) : (
              'Submit Review'
            )}
          </button>
        </form>

        <p className="rp-footer-note">
          Sky Dental Clinics · Kasaragod
        </p>
      </div>
    </div>
  );
}

export default ReviewPage;