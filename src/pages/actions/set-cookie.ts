import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.json();
  const authToken = formData.auth_token;
  const refreshToken = formData.refresh_token;
  
  cookies.set("auth_token", authToken as string, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
  cookies.set("refresh_token", refreshToken as string, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
  const user = JSON.stringify(formData.user);
  cookies.set("user", user, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return new Response(null, { status: 200 });
};

export const DELETE: APIRoute = async ({ cookies }) => {
  console.log(cookies.get("auth_token"));
  cookies.delete("auth_token");
  cookies.delete("user");
  console.log(cookies.get("auth_token"));

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    "auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict"
  );
  headers.append(
    "Set-Cookie",
    "user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict"
  );

  return new Response(null, {
    status: 200,
    headers,
  });
};
