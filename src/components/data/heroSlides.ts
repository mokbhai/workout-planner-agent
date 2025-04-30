export interface HeroSlide {
  imagePath: string;
  titleStart: string;
  titleHighlight: string;
  titleEnd: string;
  buttonText: string;
  buttonLink: string;
}

export const heroSlides: HeroSlide[] = [
  {
    imagePath: "/images/hero-background/left-man.jpg",
    titleStart: "RUN LESS",
    titleHighlight: "ACHIEVE",
    titleEnd: "MORE",
    buttonText: "Get Your Plan",
    buttonLink: "/auth?tab=signup",
  },
  {
    imagePath: "/images/hero-background/center-man.jpg",
    titleStart: "AI-POWERED",
    titleHighlight: "FIRST",
    titleEnd: "TRAINING",
    buttonText: "Start Training",
    buttonLink: "/auth?tab=signup",
  },
  {
    imagePath: "/images/hero-background/right-man.jpg",
    titleStart: "SMART",
    titleHighlight: "EFFICIENT",
    titleEnd: "RUNNING",
    buttonText: "Join Now",
    buttonLink: "/auth?tab=signup",
  },
  {
    imagePath: "/images/hero-background/right-woman.jpg",
    titleStart: "SMART",
    titleHighlight: "EFFICIENT",
    titleEnd: "RUNNING",
    buttonText: "Join Now",
    buttonLink: "/auth?tab=signup",
  },
];
