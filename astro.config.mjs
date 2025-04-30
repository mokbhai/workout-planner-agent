// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";
import dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.PORT || "4000", 10);
// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
  adapter: node({
    mode: "standalone",
  }),

  output: "server",
  publicDir: "public",
  server: ({ command }) => ({
    host: "0.0.0.0",
    port: command === "dev" ? 4321 : PORT,
  }),
  redirects: {
    "/api/auth/strava":
      "https://strava-integration.jainparichay.online/api/auth/strava",
  },
});
