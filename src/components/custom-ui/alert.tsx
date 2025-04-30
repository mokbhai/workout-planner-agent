import {
  Alert,
  AlertContent,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

function AlertCustom({ title, description, type, dismissible }: Alert) {
  return (
    <Alert
      className="min-w-[400px]"
      layout="complex"
      isNotification
      size="lg"
      action={
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 p-0 hover:bg-transparent"
          aria-label="Close notification"
        >
          <X
            size={16}
            strokeWidth={2}
            className="opacity-60 transition-opacity group-hover:opacity-100"
          />
        </Button>
      }
    >
      <AlertContent>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        <div className="flex gap-2 pt-3">
          <Button size="sm">Accept</Button>
          <Button size="sm" variant="outline">
            Decline
          </Button>
        </div>
      </AlertContent>
    </Alert>
  );
}

export { AlertCustom };
