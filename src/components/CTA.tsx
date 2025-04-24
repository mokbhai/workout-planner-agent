import React from "react";

const CTA: React.FC = () => {
  return (
    <section id="get-started" className="cta">
      <div className="cta-content">
        <h2>Ready to Transform Your Fitness Journey?</h2>
        <p>
          Join and discover the power of
          AI-driven workout planning.
        </p>
        <div className="cta-buttons">
          <a href="/signup" className="primary-button">
            Start Free Trial
          </a>
          <a href="/demo" className="secondary-button">
            Request Demo
          </a>
        </div>
        <p className="cta-note">No credit card required • 14-day free trial</p>
      </div>
    </section>
  );
};

export default CTA;
