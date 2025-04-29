import type { APIRoute } from "astro";
import {
  storeOTP,
  checkResendCooldown,
  setResendCooldown,
} from "../../../utils/redis";
import { sendWhatsAppMessage } from "../../../utils/message";

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via WhatsApp
const sendWhatsAppOTP = async (phoneNumber: string, otp: string) => {
  const url = `${import.meta.env.EVO_SERVER_URL}/message/sendText/${
    import.meta.env.EVO_INSTANCE
  }`;

  await sendWhatsAppMessage(
    phoneNumber,
    `Your AIRIA verification code is: *${otp}*. \nValid for 5 minutes.`
  );
  
  return true;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { phoneNumber } = body;

    if (!phoneNumber) {
      return new Response(
        JSON.stringify({ error: "Phone number is required" }),
        { status: 400 }
      );
    }

    // Format phone number (remove +91 prefix if present)
    const cleanNumber = phoneNumber.replace(/^\+?91/, "");
    const formattedNumber = `91${cleanNumber}`;

    // Check for rate limiting
    const isInCooldown = await checkResendCooldown(formattedNumber);
    if (isInCooldown) {
      return new Response(
        JSON.stringify({ error: "Please wait before requesting another OTP" }),
        { status: 429 }
      );
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP in Redis with 5-minute expiration
    await storeOTP(formattedNumber, otp);

    // Set cooldown for resend
    await setResendCooldown(formattedNumber);

    // Send OTP via WhatsApp
    await sendWhatsAppOTP(formattedNumber, otp);

    return new Response(
      JSON.stringify({
        success: true,
        message: "OTP sent successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send OTP",
      }),
      { status: 500 }
    );
  }
};
