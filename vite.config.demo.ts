import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    outDir: 'demo',
    emptyOutDir: true,
  },
  plugins: [vue()],
  // Examples import 'win7-vue' exactly like user code; resolve it to the local source.
  resolve: {
    alias: { 'win7-vue': fileURLToPath(new URL('lib/main.ts', import.meta.url)) },
  },
})
