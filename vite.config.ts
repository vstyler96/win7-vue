import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(import.meta.dirname, 'lib/main.ts'),
      formats: ['es'],
      fileName: 'win7-vue',
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
    },
  },
  plugins: [
    vue(),
    dts({ tsconfigPath: resolve(import.meta.dirname, 'tsconfig.lib.json') }),
  ],
})
