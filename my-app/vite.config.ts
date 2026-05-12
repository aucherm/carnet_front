import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
       "/api": process.env.VITE_API_URL || "http://localhost:8081",
    },
  },
  build: { outDir: "build", sourcemap: true, minify: "terser" },
});
