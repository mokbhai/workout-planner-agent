import React, { useState, useEffect, useCallback, useRef } from "react";
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

const SLIDE_DURATION = 5000; // 5 seconds

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const touchStart = useRef<number>(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const slideTimeout = useRef<NodeJS.Timeout | null>(null);

  const goToNextSlide = useCallback(() => {
    resetAnimation();
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const goToPrevSlide = useCallback(() => {
    resetAnimation();
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  }, []);

  const resetAnimation = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 50);
  }, []);

  const startSlideTimer = useCallback(() => {
    // Clear any existing timers
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    if (slideTimeout.current) {
      clearTimeout(slideTimeout.current);
      slideTimeout.current = null;
    }

    // Reset progress
    setProgress(0);

    // Start progress animation
    const startTime = Date.now();
    progressInterval.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = (elapsedTime / SLIDE_DURATION) * 100;

      if (newProgress >= 100) {
        setProgress(100);
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
          progressInterval.current = null;
        }
      } else {
        setProgress(newProgress);
      }
    }, 16); // ~60fps

    // Set timeout for next slide
    slideTimeout.current = setTimeout(() => {
      goToNextSlide();
      resetAnimation();
    }, SLIDE_DURATION);
  }, [goToNextSlide, resetAnimation]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      resetAnimation();
      startSlideTimer();
    },
    [resetAnimation, startSlideTimer]
  );

  // Initialize slide show and handle slide changes
  useEffect(() => {
    startSlideTimer();
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
      if (slideTimeout.current) {
        clearTimeout(slideTimeout.current);
        slideTimeout.current = null;
      }
    };
  }, [currentSlide, startSlideTimer]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevSlide();
        resetAnimation();
        startSlideTimer();
      }
      if (e.key === "ArrowRight") {
        goToNextSlide();
        resetAnimation();
        startSlideTimer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, resetAnimation, startSlideTimer]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    touchStart.current = e.touches[0].clientX;
    // Pause timers while touching
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    if (slideTimeout.current) {
      clearTimeout(slideTimeout.current);
      slideTimeout.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return;

    const touchEnd = e.touches[0].clientX;
    const diff = touchStart.current - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
      setIsTouching(false);
      resetAnimation();
      startSlideTimer();
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    startSlideTimer();
  };

  const currentHeroSlide = heroSlides[currentSlide];

  return (
    <section
      className="hero-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="hero-background"
        style={{
          backgroundImage: `url(${currentHeroSlide.imagePath})`,
        }}
      >
        <div
          className={`hero-content ${currentHeroSlide.contentSide} ${
            isAnimating ? "animate" : ""
          }`}
        >
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
              <span>{currentHeroSlide.buttonText}</span>
            </a>
          </div>
        </div>
      </div>

      <button
        className="slider-nav prev"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button
        className="slider-nav next"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
        </svg>
      </button>

      <div className="slider-progress">
        {heroSlides.map((_, index) => (
          <div key={index} className="progress-item">
            <button
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
            {index === currentSlide && (
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
