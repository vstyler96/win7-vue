import type { App } from "vue";
import * as components from "./components/index.ts";

const vueApp = {
  install(app: App) {
    Object.values(components).forEach(cmp => {
      app.component(cmp.name!, cmp);
    });
  },
};

export default vueApp;
export * from "./components/index.ts";
export { default as useDraggable } from "./composables/draggable.ts";
export { createWinTheme, useTheme, useThemeFamily } from "./composables/theme.ts";
export type { ThemeOptions, ThemeInstance, ThemeDefinition, ThemeFamily } from "./composables/theme.ts";
