import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import prism from "vite-plugin-prismjs";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prism({
      languages: ["sql"], 
      plugins: ["line-numbers"],
      theme: "tomorrow",
      css: true,
    }),
  ],
});
