import React from "react";

const Partners: React.FC = () => {
  return (
    <section className="partners-section">
      <div className="partners-container">
        <h2>Our Partners</h2>
        {/* <p className="partners-description">
          We work with industry leaders to provide you with the best fitness
          experience.
        </p> */}
        <div className="partners-grid">
          <div className="partner-card">
            <img
              src="/images/api_logo_cptblWith_strava_stack_orange.png"
              alt="Compatible with Strava"
              className="partner-logo"
            />
          </div>
          {/* Add more partner cards here as needed */}
        </div>
      </div>
    </section>
  );
};

export default Partners;
