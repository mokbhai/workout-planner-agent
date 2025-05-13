import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";
import {
  getRedisCache,
  delRedisCache,
  setRedisCache,
} from "../../../utils/redis";
import prisma from "../../../utils/prisma";
import { generateTokens } from "./refresh-token";

export const logAttempt = async (
  phoneNumber: string,
  type: string,
  status: string,
  metadata: Record<string, any>,
  request: Request
) => {
  // await prisma.authAttempt.create({
  //   data: {
  //     phoneNumber: phoneNumber,
  //     type: type,
  //     status: status,
  //     ipAddress:
  //       request.headers.get("x-forwarded-for") ||
  //       request.headers.get("x-real-ip"),
  //     userAgent: request.headers.get("user-agent"),
  //     metadata: metadata,
  //   },
  // });
  await setRedisCache(
    `auth_attempt:${phoneNumber}`,
    JSON.stringify({
      type,
      status,
      metadata,
      ipAddress:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip"),
      userAgent: request.headers.get("user-agent"),
      timestamp: Date.now(),
    }),
    3600
  );
};

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { phoneNumber, otp } = body;

    if (!phoneNumber || !otp) {
      return new Response(
        JSON.stringify({ error: "Phone number and OTP are required" }),
        { status: 400 }
      );
    }

    // Format phone number (remove +91 prefix if present)
    const cleanNumber = phoneNumber.replace(/^\+?91/, "");
    const formattedNumber = `91${cleanNumber}`;

    // Find user
    let user = await prisma.user.findUnique({
      where: { phoneNumber: formattedNumber },
    });

    // Get stored OTP from Redis
    const storedOTP = await getRedisCache(`otp:${formattedNumber}`);

    if (!storedOTP) {
      // Log failed attempt
      logAttempt(
        formattedNumber,
        "VERIFY_OTP",
        "FAILED",
        {
          reason: "OTP_EXPIRED",
        },
        request
      );

      return new Response(
        JSON.stringify({ error: "OTP not found or expired" }),
        { status: 400 }
      );
    }

    // Verify OTP
    if (storedOTP !== otp) {
      // Log failed attempt
      logAttempt(
        formattedNumber,
        "VERIFY_OTP",
        "FAILED",
        {
          reason: "INVALID_OTP",
        },
        request
      );

      return new Response(JSON.stringify({ error: "Invalid OTP" }), {
        status: 400,
      });
    }

    // OTP verified successfully, clean up
    await delRedisCache(`otp:${formattedNumber}`);

    // Update user status
    user = await prisma.user.upsert({
      where: { phoneNumber: formattedNumber },
      update: {
        lastLoginAt: new Date(),
      },
      create: {
        phoneNumber: formattedNumber,
        lastLoginAt: new Date(),
      },
    });

    // Log successful attempt
    await logAttempt(formattedNumber, "VERIFY_OTP", "SUCCESS", {}, request);

    const { authToken, refreshToken } = generateTokens(user, cookies, true);

    cookies.set("user", JSON.stringify(user), {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    if (!user?.name) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "User created! Complete your profile to continue",
          token: authToken
        }),
        { status: 201 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "OTP verified successfully",
        token: authToken,
        user: {
          id: user.id,
          phoneNumber: user.phoneNumber,
          name: user?.name,
          profileImageUrl: user?.profileImageUrl,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to verify OTP",
      }),
      { status: 500 }
    );
  }
};
