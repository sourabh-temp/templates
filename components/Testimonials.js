import React from 'react';
import '@/styles/Testimonials.css'

const Testimonials = () => {
  return (
    <div className="testimonials">
      <div className="testimonial-card">
        <p>&quot;This platform has helped me ace several interviews! The templates are a lifesaver!&quot;</p>
        <p>- John Doe, Software Engineer</p>
      </div>
      <div className="testimonial-card">
        <p>&quot;The templates are clean and easy to customize. Highly recommend it!&quot;</p>
        <p>- Jane Smith, Web Developer</p>
      </div>
      <div className="testimonial-card">
        <p>&quot;The interview tips and templates gave me the confidence I needed for my tech interviews.&quot;</p>
        <p>- Mark Johnson, Full-Stack Developer</p>
      </div>
    </div>
  );
};

export default Testimonials;
