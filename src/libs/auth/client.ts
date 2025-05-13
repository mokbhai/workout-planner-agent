export const signIn = () => {
  // Log the current URL without parameters
  const currentUrl = window.location.href;
  localStorage.setItem("nextUrl", currentUrl);
  window.location.href = "/auth";
};

export const signInWithNextUrl = (Astro: any) => {
  const currentUrl = Astro.url.href;
  return Astro.redirect("/auth?next=" + currentUrl);
};

/**
 * Sign out the current user
 * This function clears the auth token cookie and redirects to the auth page
 */
export const signOut = async (): Promise<void> => {
  try {
    // Call the sign-out API endpoint
    const response = await fetch("/api/actions/cookies", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to sign out");
    }

    // Redirect to the auth page
    window.location.href = "/auth";
  } catch (error) {
    console.error("Sign out error:", error);
    // Still redirect to auth page even if the API call fails
    window.location.href = "/auth";
  }
};

/**
 * Check if the user is authenticated
 * @returns True if the user is authenticated, false otherwise
 */
export const isAuthenticated = (): boolean => {
  // Check if the auth token cookie exists
  return document.cookie.includes("auth_token=");
};

/**
 * Get the current user from the session
 * This is a client-side version that doesn't verify the token
 * For secure operations, use the server-side version
 * @returns The user object or null if not authenticated
 */
export const getCurrentUser = async (): Promise<any> => {
  try {
    const response = await fetch("/api/auth/me");

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
};
