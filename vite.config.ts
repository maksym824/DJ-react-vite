import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from 'vite';

export default defineConfig(({mode}) =>{
  const outDir = (mode === "staging") ? "./dist/staging/" : "./dist/production/";
  return {
    build: { outDir },
    plugins: [react(),splitVendorChunkPlugin()],
    resolve: {
      alias: {
        "~": "/src",
      },
    },
  }
});
