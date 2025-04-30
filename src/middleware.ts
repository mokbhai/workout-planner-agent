import { defineMiddleware } from "astro/middleware";
import { type User } from "@prisma/client";

// Define protected routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/workouts",
  "/progress",
  "/settings",
  "/user",
];

// Define public routes that don't require authentication
const publicRoutes = [
  "/auth",
  "/auth/login",
  "/auth/register",
  "/auth/verify-otp",
  "/",
];

/**
 * @type {import("astro").MiddlewareHandler}
 */
export const onRequest = defineMiddleware(async (context, next) => {
  // Get the user cookie
  const request = context.request;
  const url = new URL(request.url);

  if (url.pathname.includes("/api")) {
    return next();
  }

  const userCookie = request.headers
    .get("cookie")
    ?.split(";")
    .find((c) => c.trim().startsWith("user="));
  let user: User | null = null;

  // Parse user data if cookie exists
  if (userCookie) {
    try {
      const userValue = userCookie.split("=")[1];
      user = JSON.parse(decodeURIComponent(userValue));
    } catch (e) {
      console.error("Error parsing user cookie:", e);
    }
  }

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    url.pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  // Handle authentication
  if (isProtectedRoute && !user) {
    // Redirect to login if trying to access protected route without authentication
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/auth",
      },
    });
  }

  // Redirect authenticated users away from auth pages
  if (isPublicRoute && user && url.pathname.startsWith("/auth") && url.pathname !== "/auth/logout") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/dashboard",
      },
    });
  }

  if (user) {
    context.locals.user = user;
  }

  // Add user data to locals for use in pages
  const response = await next();

  // Add security headers
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-XSS-Protection", "1; mode=block");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
