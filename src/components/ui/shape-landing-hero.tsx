"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Circle } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/components/data/heroSlides";


const SLIDE_DURATION = 5000;

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export function HeroGeometric({ heroSlides }: { heroSlides: HeroSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const touchStart = useRef<number>(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const slideTimeout = useRef<NodeJS.Timeout | null>(null);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  }, []);

  const startSlideTimer = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    if (slideTimeout.current) {
      clearTimeout(slideTimeout.current);
      slideTimeout.current = null;
    }

    setProgress(0);
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
    }, 16);

    slideTimeout.current = setTimeout(() => {
      goToNextSlide();
    }, SLIDE_DURATION);
  }, [goToNextSlide]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      startSlideTimer();
    },
    [startSlideTimer]
  );

  useEffect(() => {
    startSlideTimer();
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (slideTimeout.current) clearTimeout(slideTimeout.current);
    };
  }, [currentSlide, startSlideTimer]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    touchStart.current = e.touches[0].clientX;
    if (progressInterval.current) clearInterval(progressInterval.current);
    if (slideTimeout.current) clearTimeout(slideTimeout.current);
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
      startSlideTimer();
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    startSlideTimer();
  };

  const currentHeroSlide = heroSlides[currentSlide];

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${currentHeroSlide.imagePath})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>


      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                {currentHeroSlide.titleStart}{" "}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                {currentHeroSlide.titleHighlight}{" "}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                {currentHeroSlide.titleEnd}
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <a
              href={currentHeroSlide.buttonLink}
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-rose-600 rounded-full hover:from-indigo-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {currentHeroSlide.buttonText}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white/70 hover:bg-black/50 hover:text-white transition-all z-20"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white/70 hover:bg-black/50 hover:text-white transition-all z-20"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Progress indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative h-2 w-12 rounded-full overflow-hidden bg-white/20"
          >
            <div
              className={cn(
                "absolute inset-0 bg-white transition-all duration-300",
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-50"
              )}
              style={{
                width: index === currentSlide ? `${progress}%` : "0%",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
