import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  root: "./", // raíz relativa dentro de /renderer
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../render", // ← esto genera el build en la raíz del proyecto
    emptyOutDir: true, // limpia /dist antes de compilar
  },
  resolve: {
    alias: {
      "@models": path.resolve("./models"),
      "@json": path.resolve("./json"),
      "@": path.resolve("./src"),
    },
  },
});
