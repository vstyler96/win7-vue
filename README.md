# Win7 Vue

[![npm](https://img.shields.io/npm/v/win7-vue)](http://npm.im/win7-vue)
[![npm](https://img.shields.io/npm/dt/win7-vue)](http://npm.im/win7-vue)

Agnostic Vue 3 component library for recreating classic Windows & Mac OS UI. Components render
the real markup of [98.css](https://github.com/vstyler96/98.css),
[XP.css](https://github.com/vstyler96/xp.css),
[7.css](https://github.com/vstyler96/7.css) and
[system.css](https://github.com/vstyler96/system.css) (Mac OS) and
[X.css](https://github.com/vstyler96/X.css) (Mac OS X Aqua). The library ships
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
| Mac OS X | [vstyler96/X.css](https://github.com/vstyler96/X.css) | — (original) |

## 🚀 Quick start

```sh
npm i win7-vue 7.css        # pick your upstream: 7.css, xp.css, 98.css, @sakun/system.css and/or @vstyler96/x.css
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
| `7.css` / `98.css` / `xp.css` / `@sakun/system.css` / `@vstyler96/x.css` | see `peerDependencies` | optional, install the themes you ship |
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
import cssX from "@vstyler96/x.css/dist/x.css?url";

app.use(createWinTheme({
  defaultTheme: "win7",
  themes: {
    win98: css98,
    winxp: cssXP,
    win7: css7,
    macos: { url: cssMac, family: "mac" }, // system.css uses different markup
    osx: { url: cssX, family: "mac" }, // X.css shares system.css markup
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
to browser defaults. Our forks are closing these gaps. `mac` is system.css and `X` is X.css;
both use the `mac` markup family.

> 🚧 **Work in progress:** the TaskBar & Start menu components are new and no stylesheet
> styles them yet. We're adding their styles to every vstyler96 fork (98.css, XP.css,
> 7.css, system.css and X.css). Until then they work but render unstyled. See
> [Taskbar & Start menu](#taskbar--start-menu) for the markup contract.

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
| `<WinListbox>` | `ul[role=listbox]` | `v-model`, `options`, `item-value`, `item-text` | — | 7 (X.css port TODO) |
| `<WinSlider>` | `<input type=range>` | `v-model`, native `min` / `max` / `step` | native | 98 · XP · 7 |
| `<WinProgress>` | `[role=progressbar]` | `progress` (0–100 or `"40%"`), `indeterminate`, `animate`, `variant` (`error`, `paused`), `transition` | — | 7 |
| `<WinGroupbox>` | `<fieldset>` + `<legend>` | `title` | — | 98 · XP · 7 |
| `<WinCollapse>` | `<details>` | `v-model:open`, `title`, `prepend-icon`, `children` (nested tree) · slots: `title`, default | — | 7 |
| `<WinIcon>` | inline SVG | `icon` (built-in name or raw 24×24 path), `size` | — | all |
| `<WinTabs>` | `menu[role=tablist]` + panels | `v-model` (active key), `tabs` (`{ key: title }`), `justified` · one slot per key | — | XP · 7 |
| `<WinTreeview>` | `ul.tree-view` | slot: `<li>` / `<details>` items | — | 98 · XP · 7 |
| `<WinMenuBar>` | `[role=menubar]` | `can-hover` | — | 7 · mac · X |
| `<WinMenu>` | `ul[role=menu]` | `can-hover` | — | 7 · mac · X |
| `<WinMenuItem>` | `[role=menuitem]` | `option` (`{ as: "checkbox" \| "radio", id, name? }`), `value`, `v-model` · slots: default, `submenu` | — | 7 · mac · X |
| `<WinSearchbox>` | `.searchbox` | `v-model`, `placeholder`, `instant` | `search` | 7 |
| `<WinBalloon>` | `[role=tooltip]` | `caption`, `top`, `bottom`, `left`, `right` | — | 7 |
| `<WinTaskBar>` | `.taskbar` | `clock`, `show-desktop` · slots: `start`, default (app buttons), `tray` | `show-desktop` | 🚧 in progress |
| `<WinStartButton>` | `button.start-button` | `v-model:open` (shared with StartMenu), `label` · slot: default | native | 🚧 in progress |
| `<WinStartMenu>` | `.start-menu` | `v-model:open` · slots: `items`, `starred-items`, `picture`, `main-action`, `actions-dropdown`, `actions-dropdown-items` · closes on Escape / outside click | `main-action` | 🚧 in progress |
| `<WinStartMenuItem>` | `li.start-menu-item` | `text`, `icon`, `image`, `href`, `to` · slots: default, `icon` · closes the menu when chosen | `click` | 🚧 in progress |
| `<WinStartMenuStarredItem>` | same as StartMenuItem, for `#starred-items` | same | `click` | 🚧 in progress |
| `<WinMainMenuActions>` | `.start-menu-actions` (split button) | `v-model:open` (dropdown) · slots: `main-action`, `actions-dropdown`, `actions-dropdown-items` | `main-action` | 🚧 in progress |
| `<WinStartMenuPicture>` | `img.start-menu-picture` | `src`, `alt` | — | 🚧 in progress |

### Taskbar & Start menu

No stylesheet styles a taskbar yet, so win7-vue defines this markup and the
[vstyler96 forks](#theme-providers) will style it. With the official stylesheets these
components work but render unstyled. Share one `open` ref between the button and the menu:

```vue
<WinStartMenu v-model:open="open">
  <template #items><WinStartMenuItem icon="monitor" text="Computer" /></template>
  <template #picture><WinStartMenuPicture src="/me.png" alt="User" /></template>
  <template #starred-items><WinStartMenuStarredItem text="Documents" /></template>
  <template #main-action>Shut down</template>
  <template #actions-dropdown-items>
    <WinStartMenuItem text="Switch user" />
    <WinStartMenuItem text="Log off" />
  </template>
</WinStartMenu>

<WinTaskBar clock show-desktop>
  <template #start><WinStartButton v-model:open="open" /></template>
  <WinButton text="Explorer" />
</WinTaskBar>
```

The markup contract for stylesheet authors:

```html
<div class="taskbar" role="toolbar" aria-label="Taskbar">
  <button class="start-button" aria-haspopup="menu" aria-expanded="false" aria-label="Start">…</button>
  <div class="taskbar-items">…app buttons…</div>
  <div class="taskbar-tray">…tray… <time class="taskbar-clock">10:42</time></div>
  <button class="taskbar-show-desktop" aria-label="Show desktop"></button>
</div>

<div class="start-menu" hidden>
  <ul class="start-menu-items" role="menu">
    <li class="start-menu-item" role="menuitem"><button><img alt=""> <span>Computer</span></button></li>
  </ul>
  <div class="start-menu-side">
    <img class="start-menu-picture" alt="…">
    <ul class="start-menu-starred" role="menu">…start-menu-item…</ul>
    <div class="start-menu-actions">
      <button class="start-menu-main-action">Shut down</button>
      <button class="start-menu-actions-toggle" aria-haspopup="menu" aria-expanded="false">▸</button>
      <ul class="start-menu-actions-dropdown" role="menu" hidden>…start-menu-item…</ul>
    </div>
  </div>
</div>
```

The item's inner element is a `<button>`, an `<a>` (`href`) or a RouterLink (`to`).

## 🪝 Composables

| Composable | Returns | Use it for |
|---|---|---|
| `createWinTheme({ themes, defaultTheme? })` | Vue plugin (also a `ThemeInstance`) | Install the theme engine: `app.use(createWinTheme(…))`. |
| `useTheme()` | `ThemeInstance`: `name`, `family`, `themes` (readonly refs), `change(name)`, `add(name, url \| { url, family })` | Read and switch the active theme. Throws if `createWinTheme` isn't installed. |
| `useThemeFamily()` | `ComputedRef<"windows" \| "mac">` | Branch your own markup on the active theme's family. Returns `"windows"` without the plugin. |
| `useIsMac()` | `ComputedRef<boolean>` | Shorthand for `useThemeFamily().value === "mac"`. |
| `useDismiss(open, { el?, ignore?, onDismiss? })` | — | Close a popup on Escape (only the top-most open one) and, with `el`, on pointerdown outside it. Powers StartMenu, MainMenuActions and Dialog. |
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

**Exported types:** `Win7VueOptions`, `Win7VueComponents`, `DismissOptions`, `ThemeOptions`,
`ThemeInstance`, `ThemeDefinition`, `ThemeFamily`, `DraggableOptions`, `DraggableEvents`,
`CollapseChild`, `MenuItemOption`.

## 🚚 Roadmap
1. [x] Improve Typescript implementation.
2. [x] Clean-up code.
3. [x] Agnostic core: verbatim upstream markup, zero shipped CSS.
4. [x] Runtime theme switching across 98.css / XP.css / 7.css / system.css / X.css.
5. [x] Add RouterLink support.
6. [x] Configurable global prefix and typed global components.
7. [x] TaskBar & Start menu components (markup contract).
8. [ ] TaskBar & Start menu styles in the vstyler96 forks.
9. [ ] Add custom Icons (Icons in progress).

## 📚 Documentation

_Refer to the [official site](https://win7-vue.kingbeencent.dev)_ (Now online!!)

Run the demo page locally:

```sh
make dev       # hot-reload dev server
make preview   # production build of the demo, served locally
```
