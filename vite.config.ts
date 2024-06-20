import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

const fileName = 'google-form-react-consumer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "postbuild-commands", // the name of your custom plugin. Could be anything.
      closeBundle: () => {
        fs.renameSync("./dist/index.js", `./dist/${fileName}.js`);
        fs.renameSync("./dist/index.css", `./dist/${fileName}.css`);
      },
    },
  ],
  build: {
    // outDir: "../../collection_tool_dist",
    assetsDir: "./",
    rollupOptions: {
      output: {
        dir: './dist',
        assetFileNames: "[name].[ext]",
        entryFileNames: "index.js",
      },
    },
  },
})
