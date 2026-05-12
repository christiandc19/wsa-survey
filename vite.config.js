import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  define: {
    "process.env": {},
  },

  build: {
    emptyOutDir: true,

    // Forces a single CSS file output
    cssCodeSplit: false,

    lib: {
      entry: "src/widget.jsx",

      // Global window object name
      name: "WebSmartAssistant",

      // Final JS filename
      fileName: () => "survey-widget.js",

      formats: ["iife"],
    },

    rollupOptions: {
      output: {
        /*
          Automatically rename the generated CSS file
          so we no longer need to manually rename it.
        */
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "survey-widget.css";
          }

          return assetInfo.name;
        },
      },
    },
  },
});