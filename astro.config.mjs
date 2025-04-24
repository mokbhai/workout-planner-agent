// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get port from environment variables or use defaults
const PORT = parseInt(process.env.PORT || "4000", 10);

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),

  server: ({ command }) => ({
    port: command === "dev" ? 4321 : PORT,
  }),

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
