import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    outDir: 'demo',
    emptyOutDir: true,
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      "@": `${__dirname}/lib`,
    },
  },
})
