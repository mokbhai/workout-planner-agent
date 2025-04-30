declare namespace App {
  interface Locals {
    user: User;
    alert: Alert;
  }
}

interface Alert {
  title: string;
  description: string;
  type: "info" | "warning" | "error";
  dismissible: boolean;
}
