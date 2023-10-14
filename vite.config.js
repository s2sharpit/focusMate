import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   copyPublicDir: {
  //     src: ["src/manifest.json", "src/contentScript.js"],
  //     dest: "./",
  //   },
  // },
});
