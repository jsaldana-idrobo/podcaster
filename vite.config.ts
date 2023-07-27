import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig({
  build: { rollupOptions: { plugins: [visualizer()] } },
  plugins: [react()],
});
