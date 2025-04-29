import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";
import { getOTP, deleteOTP } from "../../../utils/redis";

export const POST: APIRoute = async ({ request }) => {
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

    // Get stored OTP from Redis
    const storedOTP = await getOTP(formattedNumber);

    if (!storedOTP) {
      return new Response(
        JSON.stringify({ error: "OTP not found or expired" }),
        { status: 400 }
      );
    }

    // Verify OTP
    if (storedOTP !== otp) {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), {
        status: 400,
      });
    }

    // OTP verified successfully, clean up
    await deleteOTP(formattedNumber);

    // Check if JWT_SECRET is set
    const jwtSecret = import.meta.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        phoneNumber: formattedNumber,
        timestamp: Date.now(),
      },
      jwtSecret,
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "OTP verified successfully",
        token,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${
            7 * 24 * 60 * 60
          }`, // 7 days
        },
      }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to verify OTP",
      }),
      { status: 500 }
    );
  }
};
