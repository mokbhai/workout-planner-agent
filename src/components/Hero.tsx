import React, { useState, useEffect } from "react";
import "../styles/Hero.css";

interface HeroSlide {
  imagePath: string;
  titleStart: string;
  titleHighlight: string;
  titleEnd: string;
  buttonText: string;
  buttonLink: string;
  contentSide: "left" | "right" | "center";
}

const heroSlides: HeroSlide[] = [
  {
    imagePath: "/images/hero-background/left-man.jpg",
    titleStart: "RUN LESS",
    titleHighlight: "ACHIEVE",
    titleEnd: "MORE",
    buttonText: "Get Your Plan",
    buttonLink: "/auth?tab=signup",
    contentSide: "right",
  },
  {
    imagePath: "/images/hero-background/center-man.jpg",
    titleStart: "AI-POWERED",
    titleHighlight: "FIRST",
    titleEnd: "TRAINING",
    buttonText: "Start Training",
    buttonLink: "/auth?tab=signup",
    contentSide: "right",
  },
  {
    imagePath: "/images/hero-background/right-man.jpg",
    titleStart: "SMART",
    titleHighlight: "EFFICIENT",
    titleEnd: "RUNNING",
    buttonText: "Join Now",
    buttonLink: "/auth?tab=signup",
    contentSide: "left",
  },
  {
    imagePath: "/images/hero-background/right-women.jpg",
    titleStart: "QUALITY",
    titleHighlight: "OVER",
    titleEnd: "QUANTITY",
    buttonText: "Transform Now",
    buttonLink: "/auth?tab=signup",
    contentSide: "left",
  },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsAnimating(true);
    }, 50);
  }, [currentSlide]);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const currentHeroSlide = heroSlides[currentSlide];

  return (
    <section className="hero-container">
      <div
        className="hero-background"
        style={{
          backgroundImage: `url(${currentHeroSlide.imagePath})`,
        }}
      >
        <div className={`hero-content ${currentHeroSlide.contentSide}`}>
          <h1>
            <span className={`title-part ${isAnimating ? "animate" : ""}`}>
              {currentHeroSlide.titleStart}{" "}
            </span>
            <span className={`title-part ${isAnimating ? "animate" : ""}`}>
              <span className="highlight">
                {currentHeroSlide.titleHighlight}
              </span>{" "}
            </span>
            <span className={`title-part ${isAnimating ? "animate" : ""}`}>
              {currentHeroSlide.titleEnd}
            </span>
          </h1>
          <div className={`cta-buttons ${currentHeroSlide.contentSide}`}>
            <a href={currentHeroSlide.buttonLink} className="primary-button">
              {currentHeroSlide.buttonText}
            </a>
          </div>
        </div>
      </div>
      <button className="slider-nav prev" onClick={goToPrevSlide}>
        <svg viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button className="slider-nav next" onClick={goToNextSlide}>
        <svg viewBox="0 0 24 24">
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
        </svg>
      </button>
      <div className="slider-dots">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
