import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function CTA({
  title,
  badge,
  description,
  buttonText,
  buttonLink,
}: {
  title: string;
  badge: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col text-center bg-muted rounded-md p-4 lg:p-14 gap-8 items-center">
          <div>
            <Badge>{badge}</Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
              {title}
            </h3>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
              {description}
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button onClick={() => window.open(buttonLink, "_blank")} className="gap-4" variant="outline">
              {buttonText} <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CTA };
