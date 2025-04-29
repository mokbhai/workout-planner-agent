import React, { useState, useEffect } from "react";
import "../styles/FloatingCTA.css";

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section height (assuming it's the first section)
      const heroSection = document.querySelector("section");
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;

        // Show button when scrolled past hero section
        setIsVisible(scrollPosition > heroHeight - 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    // Smooth scroll to top where the main CTA likely is
    // window.scrollTo({ top: 0, behavior: "smooth" });
    window.location.href = "/auth?tab=signup";
  };

  return (
    <button
      className={`floating-cta ${isVisible ? "visible" : ""}`}
      onClick={handleClick}
    >
      <span className="icon">🚀</span>
      <span className="text">Join Now</span>
    </button>
  );
};

export default FloatingCTA;
