import type { APIRoute } from "astro";
import { getSession } from "@/lib/auth/server";
import prisma from "@/utils/prisma";

// Pending Completion
export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Check if user is authenticated
    const session = await getSession(cookies);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Get user data from request body
    const body = await request.json();
    const { name, runningLevel } = body;

    // Validate input
    if (!name || !runningLevel) {
      return new Response(
        JSON.stringify({ error: "Name and running level are required" }),
        { status: 400 }
      );
    }

    // Validate running level
    const validLevels = ["novice", "beginner", "intermediate", "professional"];
    if (!validLevels.includes(runningLevel)) {
      return new Response(JSON.stringify({ error: "Invalid running level" }), {
        status: 400,
      });
    }

    // // Update user in database
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Onboarding error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save onboarding data" }),
      { status: 500 }
    );
  }
};
