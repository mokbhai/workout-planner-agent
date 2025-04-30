import { MoveRight, PhoneCall, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAProps {
  title: string;
  badge: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant?: "default" | "gradient" | "dark";
  className?: string;
}

function CTA({
  title,
  badge,
  description,
  buttonText,
  buttonLink,
  variant = "default",
  className,
}: CTAProps) {
  return (
    <div
      className={cn(
        "w-full py-20 relative overflow-hidden",
        variant === "gradient" &&
          "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
        variant === "dark" && "bg-gray-900",
        variant === "default" && "bg-gray-50",
        className
      )}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div
          className={cn(
            "flex flex-col text-center rounded-2xl p-8 lg:p-16 gap-8 items-center",
            variant === "gradient" && "bg-white/10 backdrop-blur-sm",
            variant === "dark" && "bg-gray-800/50",
            variant === "default" && "bg-white shadow-xl"
          )}
        >
          <div className="animate-fade-in">
            <Badge
              variant={variant === "default" ? "default" : "secondary"}
              className={cn(
                "px-4 py-1.5 text-sm font-medium",
                variant === "gradient" && "bg-white/20 text-white",
                variant === "dark" && "bg-gray-700 text-gray-200"
              )}
            >
              {badge}
            </Badge>
          </div>

          <div className="flex flex-col gap-4 max-w-2xl">
            <h3
              className={cn(
                "text-3xl md:text-5xl font-bold tracking-tight",
                variant === "gradient" && "text-white",
                variant === "dark" && "text-white",
                variant === "default" && "text-gray-900"
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "text-lg leading-relaxed tracking-tight",
                variant === "gradient" && "text-white/90",
                variant === "dark" && "text-gray-300",
                variant === "default" && "text-gray-600"
              )}
            >
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button
              onClick={() => window.open(buttonLink, "_blank")}
              className={cn(
                "gap-3 px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105",
                variant === "gradient" &&
                  "bg-white text-indigo-600 hover:bg-white/90",
                variant === "dark" &&
                  "bg-indigo-600 text-white hover:bg-indigo-700",
                variant === "default" &&
                  "bg-indigo-600 text-white hover:bg-indigo-700"
              )}
            >
              {buttonText}
              <ArrowRight className="w-5 h-5" />
            </Button>
            {/* {variant === "default" && (
              <Button
                variant="outline"
                className="gap-3 px-8 py-6 text-lg font-medium"
                onClick={() => window.open("tel:+1234567890", "_blank")}
              >
                <PhoneCall className="w-5 h-5" />
                Contact Us
              </Button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export { CTA };
