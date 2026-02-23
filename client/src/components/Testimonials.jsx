import React, { useState, useEffect } from 'react';
import '../styles/Testimonials.css';

const reviews = [
  {
    text: "From the moment I walked in, I felt welcomed and cared for. He is not only a great dentist but also a wonderful listener. My dental health has never been better!",
    name: "Jithin P Joji",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&h=100&fit=crop"
  },
  {
    text: "I was always nervous about dental visits, but the team here made me feel completely at ease. The procedure was painless and the results are amazing!",
    name: "Sarah Miller",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&fit=crop"
  },
  {
    text: "Incredible attention to detail. My smile has never looked this good. Professional service and a very clean environment. Highly recommended!",
    name: "Mark Thompson",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop"
  }
];

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      switchReview((current + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const switchReview = (index) => {
    setFade(false);
    setTimeout(() => {
      setCurrent(index);
      setFade(true);
    }, 200);
  };

  const r = reviews[current];

  return (
    <section className="review-section" id="reviews">
      <div className="review-section-inner">

        <div className="review-section-header">
          <h2>Reviews</h2>
        </div>

        <div className="review-image-container">
          <div className="review-main-image-wrapper">
            <img
              src="/images/review/review_image.png"
              alt="Dental Care Session"
            />
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
              <img
                src={r.image}
                alt={r.name}
                className="review-user-avatar"
              />
              <div className="review-user-details">
                <h4>{r.name}</h4>
                <div className="review-stars">★★★★★</div>
              </div>
            </div>
          </div>

          <div className="review-dots-container">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`review-dot ${i === current ? 'active' : ''}`}
                onClick={() => switchReview(i)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;