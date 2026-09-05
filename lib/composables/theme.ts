import { computed, inject, readonly, ref } from "vue";
import type { App, ComputedRef, InjectionKey, Ref } from "vue";

/**
 * Markup family of an upstream framework. The Windows family (98.css, XP.css,
 * 7.css) shares one markup contract; 'mac' covers system.css (button.btn,
 * h1.title title bars, .window-pane, role="menu-bar"…).
 */
export type ThemeFamily = "windows" | "mac";

export interface ThemeDefinition {
  /** Stylesheet URL (e.g. `import url from '7.css/dist/7.css?url'`). */
  url: string;
  /** Markup family the stylesheet targets. Defaults to 'windows'. */
  family?: ThemeFamily;
}

export interface ThemeOptions {
  /** Theme activated on install. Defaults to the first registered theme. */
  defaultTheme?: string;
  /** Map of theme name -> stylesheet URL, or a definition with a markup family. */
  themes: Record<string, string | ThemeDefinition>;
}

export interface ThemeInstance {
  /** Active theme name. */
  name: Readonly<Ref<string>>;
  /** Active theme's markup family. */
  family: Readonly<Ref<ThemeFamily>>;
  /** Registered theme names (reactive — grows as themes are added at runtime). */
  themes: Readonly<Ref<readonly string[]>>;
  /** Register (or replace) a theme at runtime, e.g. a user-supplied stylesheet URL. */
  add(name: string, definition: string | ThemeDefinition): void;
  /** Activate a registered theme by swapping the managed stylesheet. */
  change(name: string): void;
}

export const ThemeSymbol: InjectionKey<ThemeInstance> = Symbol.for("win:theme");

const LINK_ATTR = "data-win-theme";

function applyTheme(name: string, url: string) {
  if (typeof document === "undefined") return;

  let link = document.head.querySelector<HTMLLinkElement>(`link[${LINK_ATTR}]`);
  if (!link) {
    link = document.createElement("link");
    link.rel = "stylesheet";
    link.setAttribute(LINK_ATTR, "");
    document.head.appendChild(link);
  }
  link.href = url;
  document.documentElement.dataset.winTheme = name;
}

/**
 * Theme plugin. Themes are whole upstream stylesheets (98.css, XP.css, 7.css,
 * system.css…); the active one is loaded through a single managed <link> tag,
 * and the active name is mirrored to `<html data-win-theme>` for consumer CSS
 * hooks. Components adapt their markup to the active theme's `family`.
 */
export function createWinTheme(options: ThemeOptions) {
  const normalize = (value: string | ThemeDefinition): Required<ThemeDefinition> =>
    typeof value === "string"
      ? { url: value, family: "windows" }
      : { family: "windows", ...value };

  const definitions: Record<string, Required<ThemeDefinition>> = Object.fromEntries(
    Object.entries(options.themes).map(([key, value]) => [key, normalize(value)]),
  );

  const names = ref(Object.keys(definitions));
  if (names.value.length === 0) throw new Error("[win7-vue] createWinTheme: no themes registered");

  const name = ref(options.defaultTheme ?? names.value[0]);
  const family = ref<ThemeFamily>(definitions[name.value]?.family ?? "windows");

  const instance: ThemeInstance = {
    name: readonly(name),
    family: readonly(family),
    themes: readonly(names),
    add(next: string, definition: string | ThemeDefinition) {
      definitions[next] = normalize(definition);
      if (!names.value.includes(next)) names.value = [...names.value, next];
    },
    change(next: string) {
      const definition = definitions[next];
      if (!definition) throw new Error(`[win7-vue] unknown theme "${next}" (registered: ${names.value.join(", ")})`);
      name.value = next;
      family.value = definition.family;
      applyTheme(next, definition.url);
    },
  };

  return {
    install(app: App) {
      app.provide(ThemeSymbol, instance);
      instance.change(name.value);
    },
    ...instance,
  };
}

export function useTheme(): ThemeInstance {
  const theme = inject(ThemeSymbol, null);
  if (!theme) throw new Error("[win7-vue] useTheme() requires app.use(createWinTheme(...))");
  return theme;
}

/**
 * Active markup family; 'windows' when no theme plugin is installed, so
 * components keep working with a plain stylesheet import.
 */
export function useThemeFamily(): ComputedRef<ThemeFamily> {
  const theme = inject(ThemeSymbol, null);
  return computed(() => theme?.family.value ?? "windows");
}
