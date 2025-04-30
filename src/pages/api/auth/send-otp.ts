import type { APIRoute } from "astro";
import {
  setRedisCache,
  getRedisCache,
  delRedisCache,
} from "@/utils/redis";
import { sendWhatsAppMessage } from "@/utils/message";
import { logAttempt } from "./verify-otp";

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { phoneNumber } = body;

  if (!phoneNumber) {
    return new Response(JSON.stringify({ error: "Phone number is required" }), {
      status: 400,
    });
  }

  // Format phone number (remove +91 prefix if present)
  const cleanNumber = phoneNumber.replace(/^\+?91/, "");
  const formattedNumber = `91${cleanNumber}`;

  try {
    // Check for rate limiting
    const isInCooldown = await getRedisCache(`cooldown:${formattedNumber}`);
    if (isInCooldown) {
      return new Response(
        JSON.stringify({ error: "Please wait before requesting another OTP" }),
        { status: 429 }
      );
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP in Redis with expiration
    const OTP_TIMEOUT = import.meta.env.OTP_TIMEOUT || 300;
    await setRedisCache(`otp:${formattedNumber}`, otp, OTP_TIMEOUT);

    // Set cooldown for resend
    const COOLDOWN_TIMEOUT = import.meta.env.COOLDOWN_TIMEOUT || 30;
    await setRedisCache(
      `cooldown:${formattedNumber}`,
      "true",
      COOLDOWN_TIMEOUT
    );

    // Send OTP via WhatsApp
    await sendWhatsAppMessage(
      formattedNumber,
      `Your AIRIA verification code is: *${otp}*. \nValid for 5 minutes.`
    );

    logAttempt(
      formattedNumber,
      "SEND_OTP",
      "SUCCESS",
      {
        reason: "SUCCESS_TO_SEND_OTP",
      },
      request
    );
    return new Response(
      JSON.stringify({
        success: true,
        message: "OTP sent successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    await logAttempt(
      formattedNumber,
      "SEND_OTP",
      "FAILED",
      {
        reason: "FAILED_TO_SEND_OTP",
        error: error instanceof Error ? error.message : "Failed to send OTP",
      },
      request
    );
    await delRedisCache(`cooldown:${formattedNumber}`);
    return new Response(
      JSON.stringify({
        error: "Failed to send OTP",
      }),
      { status: 500 }
    );
  }
};
