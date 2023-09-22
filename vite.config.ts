import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tsconfigPaths()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/main.scss";',
      },
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }]
  }
})
