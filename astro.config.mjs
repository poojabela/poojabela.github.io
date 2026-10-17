import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";
import { codeTitle } from "./src/lib/code-title.js";

export default defineConfig({
  site: "https://poojabela.github.io",
  integrations: [react(), mdx()],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
      transformers: [codeTitle()],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["cmdk", "rough-notation"],
    },
  },
});