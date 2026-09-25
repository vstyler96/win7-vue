import type { App } from 'vue'
import * as components from './components'

export interface Win7VueOptions {
  /**
   * Prepended to every component's global name. Defaults to `'Win'`
   * (`<WinButton>`, `<WinDialog>`…), which keeps one-word components from
   * clashing with native elements like `<dialog>` or `<button>`.
   */
  prefix?: string
}

/**
 * Global component map for a given prefix, for `GlobalComponents` augmentation:
 * `declare module 'vue' { interface GlobalComponents extends Win7VueComponents<'Xp'> {} }`
 */
export type Win7VueComponents<P extends string = 'Win'> = {
  [K in keyof typeof components as `${P}${K}`]: typeof components[K]
}

export default {
  install(app: App, { prefix = 'Win' }: Win7VueOptions = {}) {
    for (const [name, cmp] of Object.entries(components)) app.component(prefix + name, cmp)
  },
}

export * from './components'
export { default as useDraggable } from './composables/draggable'
export type { DraggableOptions, DraggableEvents } from './composables/draggable'
export { createWinTheme, useTheme, useThemeFamily, useIsMac, ThemeSymbol } from './composables/theme'
export type { ThemeOptions, ThemeInstance, ThemeDefinition, ThemeFamily } from './composables/theme'
export type { CollapseChild } from './components/Collapse/index.vue'
export type { MenuItemOption } from './components/MenuItem/index.vue'
