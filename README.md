# Win7 Vue

[![npm](https://img.shields.io/npm/v/win7-vue)](http://npm.im/win7-vue)
[![npm](https://img.shields.io/npm/dt/win7-vue)](http://npm.im/win7-vue)

Agnostic Vue 3 component library for recreating classic Windows UI. Components render
the real markup of [98.css](https://github.com/vstyler96/98.css),
[XP.css](https://github.com/vstyler96/xp.css),
[7.css](https://github.com/vstyler96/7.css) and
[system.css](https://github.com/vstyler96/system.css) (Mac OS). The library ships
**zero CSS of its own** and supplies only behavior, state, and accessibility.

### Theme providers

Any stylesheet that follows the upstream markup works. We maintain our own forks, which
will **fully support every win7-vue component** in the future. The official projects work
too. The [support column](#-components) shows which components they style.

| Theme | Our fork (recommended) | Official upstream |
|---|---|---|
| Windows 98 | [vstyler96/98.css](https://github.com/vstyler96/98.css) | [jdan/98.css](https://github.com/jdan/98.css) |
| Windows XP | [vstyler96/xp.css](https://github.com/vstyler96/xp.css) | [botoxparty/XP.css](https://github.com/botoxparty/XP.css) |
| Windows 7 | [vstyler96/7.css](https://github.com/vstyler96/7.css) | [khang-nd/7.css](https://github.com/khang-nd/7.css) |
| Mac OS | [vstyler96/system.css](https://github.com/vstyler96/system.css) | [sakofchit/system.css](https://github.com/sakofchit/system.css) |

## 🚀 Quick start

```sh
npm i win7-vue 7.css        # pick your upstream: 7.css, xp.css, 98.css and/or @sakun/system.css
```

```js
// main.js
import { createApp } from "vue";
import win7vue from "win7-vue";

createApp(App)
  .use(win7vue) // registers <WinButton>, <WinDialog>, <WinWindow>…
  .mount("#app");
```

Components are registered globally with a `Win` prefix so one-word names never clash with
native elements (`<dialog>`, `<button>`…). Choose your own with
`app.use(win7vue, { prefix: "Xp" })` → `<XpButton>`, or import components locally instead
(`import { Button } from "win7-vue"`).

**TypeScript:** for typed global components, add `"win7-vue/global"` to
`compilerOptions.types` in your tsconfig. With a custom prefix, augment Vue yourself:

```ts
// components.d.ts
import type { Win7VueComponents } from "win7-vue";
declare module "vue" {
  interface GlobalComponents extends Win7VueComponents<"Xp"> {}
}
```

### Requirements

| Package | Version | |
|---|---|---|
| `vue` | `^3.5` | required |
| `7.css` / `98.css` / `xp.css` / `@sakun/system.css` | see `peerDependencies` | optional, install the themes you ship |
| `vue-router` | `>=4` | optional, only for the `to` prop on Button / Link |

Theme stylesheets are loaded with `?url` imports, so you need a bundler that supports them
(Vite does).

## 🎨 Theme switching

Themes are whole upstream stylesheets, swapped at runtime:

```js
import { createWinTheme } from "win7-vue";
import css98 from "98.css/dist/98.css?url";
import cssXP from "xp.css/dist/XP.css?url";
import css7 from "7.css/dist/7.css?url";
import cssMac from "@sakun/system.css/dist/system.css?url";

app.use(createWinTheme({
  defaultTheme: "win7",
  themes: {
    win98: css98,
    winxp: cssXP,
    win7: css7,
    macos: { url: cssMac, family: "mac" }, // system.css uses different markup
  },
}));
```

```js
// Anywhere in the app
import { useTheme } from "win7-vue";

const theme = useTheme();
theme.change("winxp");   // theme.name, theme.family, theme.themes
```

The active theme name is mirrored to `<html data-win-theme="...">` for your own CSS hooks.
Register extra stylesheets at runtime with `theme.add(name, { url, family })`.

## 🧩 Components

Global names are shown with the default `Win` prefix; local imports drop it
(`import { Window } from "win7-vue"`). Support shows which themes ship dedicated CSS for
the markup in the official stylesheets. Elsewhere the component still works and falls back
to browser defaults. Our forks are closing these gaps.

| Component | Renders | Key props / `v-model` | Events | Support |
|---|---|---|---|---|
| `<WinWindow>` | `.window` + title bar | `title`, `active`, `glass`, `width`, `closable`, `minimizable`, `maximizable`, `has-status`, `status-fields`, `has-scrollbar`, `draggable`, `default-x/y`, `snap-to-edges`, `snap-threshold`, `constrain-to-viewport` · slots: default, `status` · exposes `setPosition`, `center`, `focus`, `getPosition` | `close`, `minimize`, `maximize`, `focus`, `drag-start`, `drag-end`, `position-change` | all |
| `<WinDialog>` | modal `Window` + backdrop | `v-model` (open), `title`, `message`, `width`, `persistent`, `cancelable`, `close-on-backdrop`, `close-on-escape`, `show-actions` · other props go to the Window | `accept`, `cancel`, `close` | all |
| `<WinButton>` | `<button>`, `<a>` or `RouterLink` | `text`, `href`, `to`, `target` · slots: `prepend`, default, `append` | native | all |
| `<WinLink>` | `<a>`, `RouterLink` or `<button>` | `text`, `href`, `to`, `target`, `prepend-icon` | native | all |
| `<WinTextbox>` | `<input>` / `<textarea>` | `v-model`, `type` (`"textarea"` for multiline), `readonly` | native | all |
| `<WinCheckbox>` | checkbox + label | `v-model` (boolean or array), `label`, `value`, `true-value`, `false-value`, `name`, `disabled` | — | all |
| `<WinRadio>` | radio + label | `v-model`, `value`, `name`, `label`, `disabled` | — | all |
| `<WinDropdown>` | `<select>` | `v-model`, `options`, `item-value`, `item-title`, `placeholder` · slots: `placeholder`, `options` | — | all |
| `<WinListbox>` | `ul[role=listbox]` | `v-model`, `options`, `item-value`, `item-text` | — | all |
| `<WinSlider>` | `<input type=range>` | `v-model`, native `min` / `max` / `step` | native | all |
| `<WinProgress>` | `[role=progressbar]` | `progress` (0–100 or `"40%"`), `indeterminate`, `animate`, `variant` (`error`, `paused`), `transition` | — | all |
| `<WinGroupbox>` | `<fieldset>` + `<legend>` | `title` | — | all |
| `<WinCollapse>` | `<details>` | `v-model:open`, `title`, `prepend-icon`, `children` (nested tree) · slots: `title`, default | — | all |
| `<WinIcon>` | inline SVG | `icon` (built-in name or raw 24×24 path), `size` | — | all |
| `<WinTabs>` | `menu[role=tablist]` + panels | `v-model` (active key), `tabs` (`{ key: title }`), `justified` · one slot per key | — | 98 · XP · 7 |
| `<WinTreeview>` | `ul.tree-view` | slot: `<li>` / `<details>` items | — | 98 · XP · 7 |
| `<WinMenuBar>` | `[role=menubar]` | `can-hover` | — | 7 · mac |
| `<WinMenu>` | `ul[role=menu]` | `can-hover` | — | 7 · mac |
| `<WinMenuItem>` | `[role=menuitem]` | `option` (`{ as: "checkbox" \| "radio", id, name? }`), `value`, `v-model` · slots: default, `submenu` | — | 7 · mac |
| `<WinSearchbox>` | `.searchbox` | `v-model`, `placeholder`, `instant` | `search` | 7 |
| `<WinBalloon>` | `[role=tooltip]` | `caption`, `top`, `bottom`, `left`, `right` | — | 7 |

## 🪝 Composables

| Composable | Returns | Use it for |
|---|---|---|
| `createWinTheme({ themes, defaultTheme? })` | Vue plugin (also a `ThemeInstance`) | Install the theme engine: `app.use(createWinTheme(…))`. |
| `useTheme()` | `ThemeInstance`: `name`, `family`, `themes` (readonly refs), `change(name)`, `add(name, url \| { url, family })` | Read and switch the active theme. Throws if `createWinTheme` isn't installed. |
| `useThemeFamily()` | `ComputedRef<"windows" \| "mac">` | Branch your own markup on the active theme's family. Returns `"windows"` without the plugin. |
| `useIsMac()` | `ComputedRef<boolean>` | Shorthand for `useThemeFamily().value === "mac"`. |
| `useDraggable(elRef, handleRef, options?, events?)` | `x`, `y`, `dragging`, `zIndex` (refs), `setPosition(x, y)`, `center()`, `focus()` | Make any fixed-position element draggable by a handle (pointer events, viewport clamping, edge snapping, bring-to-front). |

`useDraggable` options: `enabled`, `snapToEdges`, `snapThreshold` and `constrain`, each a
value, ref or getter, plus the initial `defaultX` / `defaultY`. Events: `onDragStart`,
`onDragEnd`, `onPositionChange`.

```ts
import { ref } from "vue";
import { useDraggable } from "win7-vue";

const el = ref<HTMLElement | null>(null);
const handle = ref<HTMLElement | null>(null);
const { x, y, zIndex } = useDraggable(el, handle, { snapToEdges: true });
```

**Exported types:** `Win7VueOptions`, `Win7VueComponents`, `ThemeOptions`,
`ThemeInstance`, `ThemeDefinition`, `ThemeFamily`, `DraggableOptions`, `DraggableEvents`,
`CollapseChild`, `MenuItemOption`.

## 🚚 Roadmap
1. [x] Improve Typescript implementation.
2. [x] Clean-up code.
3. [x] Agnostic core: verbatim upstream markup, zero shipped CSS.
4. [x] Runtime theme switching across 98.css / XP.css / 7.css / system.css.
5. [x] Add RouterLink support.
6. [x] Configurable global prefix and typed global components.
7. [ ] Add custom Icons (Icons in progress).

## 📚 Documentation

_Refer to the [official site](https://win7-vue.kingbeencent.dev)_ (Now online!!)
