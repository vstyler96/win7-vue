// Opt-in template types for `app.use(win7vue)` with the default 'Win' prefix.
// Add "win7-vue/global" to compilerOptions.types in your tsconfig.
// Custom prefix? Augment with Win7VueComponents<'YourPrefix'> instead.
import type { Win7VueComponents } from './main'

declare module 'vue' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface GlobalComponents extends Win7VueComponents {}
}

export {}
