import jwt from "jsonwebtoken";

// JWT secret from environment variables
const JWT_SECRET = import.meta.env.JWT_SECRET || "your-secret-key";

/**
 * Get the current session from the request
 * @param request The request object
 * @returns The session object or null if not authenticated
 */
export const getSession = async (cookies: any) => {
  try {
    // Get the auth token from cookies
    const authToken = cookies.get("auth_token")?.value;
    const refreshToken = cookies.get("refresh_token")?.value;

    if (!authToken && !refreshToken) {
      return null;
    }

    // Verify the JWT token
    const payload: any = jwt.verify(authToken, JWT_SECRET);
    if (!payload) {
      const refreshPayload: any = jwt.verify(refreshToken, JWT_SECRET);
      if (!refreshPayload) {
        return null;
      }
    }

    // Return the session with user data
    return {
      user: {
        id: payload.userId,
        phoneNumber: payload.phoneNumber,
        name: payload?.name,
        profileImageUrl: payload?.profileImageUrl,
      },
      expires: payload?.exp,
    };
  } catch (error) {
    console.error("Session error:", error);
    return null;
  }
};

/**
 * Check if the user is authenticated
 * @param request The request object
 * @returns True if the user is authenticated, false otherwise
 */
export const isAuthenticated = async (request: Request): Promise<boolean> => {
  const session = await getSession(request);
  return !!session;
};

/**
 * Get the current user from the session
 * @param request The request object
 * @returns The user object or null if not authenticated
 */
export const getCurrentUser = async (request: Request) => {
  const session = await getSession(request);
  return session?.user || null;
};
