import type { APIRoute } from "astro";
import type { OnboardingData } from "../../types/onboarding";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = (await request.json()) as OnboardingData;

    // Here you would typically:
    // 1. Validate the data
    // 2. Save to your database
    // 3. Create a user session if needed
    console.log(data);

    // For now, we'll just return a success response
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing onboarding data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process onboarding data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
