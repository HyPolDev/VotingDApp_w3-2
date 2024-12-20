import { defineConfig, type PluginOption } from 'vite'
import { visualizer } from "rollup-plugin-visualizer";
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer() as PluginOption],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
