import React, { useState, useEffect } from 'react';
import '../styles/Testimonials.css';

function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);
  const [fade,    setFade]    = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/reviews/approved')
      .then(res => res.ok ? res.json() : [])
      .then(data => setReviews(Array.isArray(data) && data.length > 0 ? data : []))
      .catch(() => setReviews([]));
  }, []);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      switchReview((current + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, reviews.length]);

  const switchReview = (index) => {
    setFade(false);
    setTimeout(() => { setCurrent(index); setFade(true); }, 200);
  };

  const renderStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

  if (reviews.length === 0) return null; // hide section if no approved reviews yet

  const r = reviews[current];

  return (
    <section className="review-section" id="reviews">
      <div className="review-section-inner">

        <div className="review-section-header">
          <h2>Reviews</h2>
        </div>

        <div className="review-image-container">
          <div className="review-main-image-wrapper">
            <img src="/images/review/review_image.png" alt="Dental Care Session" />
          </div>
        </div>

        <div className="review-content-container">
          <h1 className="review-headline">
            What Our <span className="review-highlight">Clients</span> Say<br />About Us
          </h1>
          <p className="review-description">
            We are committed to providing trusted, comfortable dental care for every patient.
            Our focus is on quality treatment and healthy, confident smiles.
          </p>

          <div className="testimonial-card">
            <p className={`testimonial-text ${fade ? 'fade-in' : 'fade-out'}`}>
              {r.text}
            </p>
            <div className="review-user-info">
              <div className="review-user-initial">
                {r.name.charAt(0).toUpperCase()}
              </div>
              <div className="review-user-details">
                <h4>{r.name}</h4>
                <div className="review-stars">{renderStars(r.rating)}</div>
              </div>
            </div>
          </div>

          {reviews.length > 1 && (
            <div className="review-dots-container">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  className={`review-dot ${i === current ? 'active' : ''}`}
                  onClick={() => switchReview(i)}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;