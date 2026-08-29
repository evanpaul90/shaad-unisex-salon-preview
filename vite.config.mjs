import { defineConfig } from "vite";

export default defineConfig({
  appType: "spa",
  base: process.env.GITHUB_PAGES === "true" ? "/shaad-unisex-salon-preview/" : "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
