import type { APIRoute } from "astro";
import { getSession } from "@/lib/auth/server";
import prisma from "@/utils/prisma";
import type { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export const POST: APIRoute = async ({ request, cookies }) => {
  const session = await getSession(cookies);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const { authToken } = generateTokens(user, cookies);

  return new Response(null, { status: 200 });
};

export const generateTokens = (
  user: User,
  cookies: any,
  refresh_token: boolean = false
): { authToken: string; refreshToken: string } => {
  const jwtSecret = import.meta.env.JWT_SECRET || "your-secret-key";

  const authToken = jwt.sign(
    {
      userId: user?.id,
      phoneNumber: user?.phoneNumber,
      isVerified: user?.isVerified,
      timestamp: Date.now(),
    },
    jwtSecret,
    {
      expiresIn: "1d",
      algorithm: "HS256",
    }
  );
  cookies.set("auth_token", authToken, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  let refreshToken = "";
  if (refresh_token) {
    refreshToken = jwt.sign(
      {
        userId: user?.id,
        phoneNumber: user?.phoneNumber,
        isVerified: user?.isVerified,
        timestamp: Date.now(),
      },
      jwtSecret,
      {
        expiresIn: "30d",
        algorithm: "HS256",
      }
    );

    cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
  }

  return { authToken, refreshToken };
};
