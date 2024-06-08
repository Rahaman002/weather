import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Define environment variables accessible in client-side code
    "process.env": JSON.stringify(import.meta.env),
  },
});
