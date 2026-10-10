import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// `--mode forks` swaps the npm stylesheets for the local vstyler96 fork checkouts
// (siblings of this repo).
const FORKS: Record<string, string> = {
  '@vstyler96/98.css': '../98.css',
  '@vstyler96/xp.css': '../xp.css',
  '@vstyler96/7.css': '../7.css',
  '@vstyler96/system.css': '../system.css',
  '@vstyler96/x.css': '../x.css',
}

export default defineConfig(({ mode }) => ({
  build: {
    outDir: 'demo',
    emptyOutDir: true,
  },
  // Keep whitespace between inline elements so buttons/links space out like plain HTML (no CSS).
  plugins: [vue({ template: { compilerOptions: { whitespace: 'preserve' } } })],
  // Examples import 'win7-vue' exactly like user code; resolve it to the local source.
  resolve: {
    alias: [
      { find: 'win7-vue', replacement: fileURLToPath(new URL('lib/main.ts', import.meta.url)) },
      ...mode === 'forks'
        ? Object.entries(FORKS).map(([pkg, dir]) => ({
            find: new RegExp(`^${pkg.replace(/[.]/g, '\\.')}/`),
            replacement: fileURLToPath(new URL(`${dir}/`, import.meta.url)),
          }))
        : [],
    ],
  },
  // The fork checkouts live outside this repo; let the dev server read them (CSS + fonts).
  server: mode === 'forks' ? { port: 5174, fs: { allow: ['..'] } } : undefined,
}))
