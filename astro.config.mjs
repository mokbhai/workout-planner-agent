// @ts-check
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),

  server: ({ command }) => ({ port: command === "dev" ? 4321 : 4000 }),

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
