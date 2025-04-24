import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Your Personal AI Workout Coach</h1>
        <p className="subtitle">
          Experience personalized workout plans powered by your fitness data
          from smart watches, Strava, and more.
        </p>
        <div className="cta-buttons">
          <a href="#get-started" className="primary-button">
            Get Started
          </a>
          <a href="#how-it-works" className="secondary-button">
            Learn More
          </a>
        </div>
      </div>
      <div className="hero-image">
        <img src="/images/hero-image.png" alt="AI Workout Planning" />
      </div>
    </div>
  );
};

export default Hero;
