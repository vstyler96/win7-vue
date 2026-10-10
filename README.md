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

Any stylesheet that follows the upstream markup works. We maintain our own forks, published
on npm under `@vstyler96/*`: they share one markup and **style every win7-vue component**.
The official projects work too, with fewer components styled.

| Package | Status |
|---|---|
| [`@vstyler96/xp.css`](https://www.npmjs.com/package/@vstyler96/xp.css) | ✅ 2.x |
| [`@vstyler96/7.css`](https://www.npmjs.com/package/@vstyler96/7.css) | ✅ 2.x |
| [`@vstyler96/system.css`](https://www.npmjs.com/package/@vstyler96/system.css) | ✅ 2.x |
| [`@vstyler96/x.css`](https://www.npmjs.com/package/@vstyler96/x.css) | ✅ 2.x |
| [`@vstyler96/98.css`](https://www.npmjs.com/package/@vstyler96/98.css) | ✅ 2.x |

| Theme | Our fork (recommended) | Official upstream |
|---|---|---|
| Windows 98 | [vstyler96/98.css](https://github.com/vstyler96/98.css) | [jdan/98.css](https://github.com/jdan/98.css) |
| Windows XP | [vstyler96/xp.css](https://github.com/vstyler96/xp.css) | [botoxparty/XP.css](https://github.com/botoxparty/XP.css) |
| Windows 7 | [vstyler96/7.css](https://github.com/vstyler96/7.css) | [khang-nd/7.css](https://github.com/khang-nd/7.css) |
| Mac OS | [vstyler96/system.css](https://github.com/vstyler96/system.css) | [sakofchit/system.css](https://github.com/sakofchit/system.css) |
| Mac OS X | [vstyler96/X.css](https://github.com/vstyler96/X.css) | — (original) |

## 🚀 Quick start

```sh
npm i win7-vue @vstyler96/7.css   # pick your themes: @vstyler96/98.css, @vstyler96/xp.css, @vstyler96/7.css, @vstyler96/system.css, @vstyler96/x.css
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
| `@vstyler96/98.css` / `@vstyler96/xp.css` / `@vstyler96/7.css` / `@vstyler96/system.css` / `@vstyler96/x.css` | see `peerDependencies` | optional, install the themes you ship |
| `vue-router` | `>=4` | optional, only for the `to` prop on Button / Link |

Theme stylesheets are loaded with `?url` imports, so you need a bundler that supports them
(Vite does).

## 🎨 Theme switching

Themes are whole upstream stylesheets, swapped at runtime:

```js
import { createWinTheme } from "win7-vue";
import css98 from "@vstyler96/98.css/dist/98.css?url";
import cssXP from "@vstyler96/xp.css/dist/XP.css?url";
import css7 from "@vstyler96/7.css/dist/7.css?url";
import cssMac from "@vstyler96/system.css/dist/system.css?url";
import cssX from "@vstyler96/x.css/dist/x.css?url";

app.use(createWinTheme({
  defaultTheme: "win7",
  themes: {
    win98: css98,
    winxp: cssXP,
    win7: css7,
    macos: cssMac, // the @vstyler96 forks all share one markup
    osx: cssX,
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
Register extra stylesheets at runtime with `theme.add(name, { url, family })`. `family: "mac"`
is only for the legacy `@sakun/system.css` 0.x / `@vstyler96/x.css` 1.x markup; every 2.x
fork uses the default `"windows"` markup.

## 🧩 Components

Global names are shown with the default `Win` prefix; local imports drop it
(`import { Window } from "win7-vue"`). Support shows which themes ship dedicated CSS for the
markup with the packages above (`@vstyler96/*` 2.x). Elsewhere the
component still works and falls back to browser defaults. `mac` is system.css and `X` is X.css.

> 🚧 **Work in progress:** the forks style the taskbar row and the start button so far; the
> taskbar chrome and the Start menu are still being styled. Until then those parts work but
> render unstyled. See
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
| `<WinListbox>` | `ul[role=listbox]` | `v-model`, `options`, `item-value`, `item-text` | — | all |
| `<WinSlider>` | `<input type=range>` | `v-model`, native `min` / `max` / `step` | native | all |
| `<WinProgress>` | `[role=progressbar]` | `progress` (0–100 or `"40%"`), `indeterminate`, `animate`, `variant` (`error`, `paused`), `transition` | — | all |
| `<WinGroupbox>` | `<fieldset>` + `<legend>` | `title` | — | all |
| `<WinCircularProgress>` | `span.spinner` (`.animate`) | `animate` (default true), `label` | — | all |
| `<WinCollapse>` | `<details>` | `v-model:open`, `title`, `prepend-icon`, `children` (nested tree) · slots: `title`, default | — | all |
| `<WinIcon>` | inline SVG | `icon` (built-in name or raw 24×24 path), `size` | — | all |
| `<WinTable>` | `table` (listview) | `headers` (`{ key, title, center? }[]`), `items`, `item-key`, `striped`, `hover`, `full`, `shadow` · `#cell-<key>` slots | — | all |
| `<WinTabs>` | `menu[role=tablist]` + panels | `v-model` (active key), `tabs` (`{ key: title }`), `justified` · one slot per key | — | all |
| `<WinTreeview>` | `ul.tree-view` | slot: `<li>` / `<details>` items | — | all |
| `<WinMenuBar>` | `[role=menubar]` | `can-hover` | — | all |
| `<WinMenu>` | `ul[role=menu]` | `can-hover` | — | all |
| `<WinMenuItem>` | `[role=menuitem]` | `option` (`{ as: "checkbox" \| "radio", id, name? }`), `value`, `v-model` · slots: default, `submenu` | — | all |
| `<WinSearchbox>` | `.searchbox` | `v-model`, `placeholder`, `instant` | `search` | all |
| `<WinBalloon>` | `[role=tooltip]` | `caption`, `top`, `bottom`, `left`, `right` | — | all |
| `<WinTaskBar>` | `.taskbar` | `clock`, `show-desktop` · slots: `start`, default (app buttons), `tray` | `show-desktop` | 🚧 layout only (all) |
| `<WinStartButton>` | `button.start-button` (`.is-<variant>`) | `v-model:open` (shared with StartMenu), `label`, `variant` (`'vista'` on 7.css) · slot: default | native | all (sprite per OS) |
| `<WinStartMenu>` | `.start-menu` | `v-model:open` · slots: `items`, `starred-items`, `picture`, `main-action`, `actions-dropdown`, `actions-dropdown-items` · closes on Escape / outside click | `main-action` | 🚧 in progress |
| `<WinStartMenuItem>` | `li.start-menu-item` | `text`, `icon`, `image`, `href`, `to` · slots: default, `icon` · closes the menu when chosen | `click` | 🚧 in progress |
| `<WinStartMenuStarredItem>` | same as StartMenuItem, for `#starred-items` | same | `click` | 🚧 in progress |
| `<WinMainMenuActions>` | `.start-menu-actions` (split button) | `v-model:open` (dropdown) · slots: `main-action`, `actions-dropdown`, `actions-dropdown-items` | `main-action` | 🚧 in progress |
| `<WinStartMenuPicture>` | `img.start-menu-picture` | `src`, `alt` | — | 🚧 in progress |

### Taskbar & Start menu

win7-vue defines this markup and the [vstyler96 forks](#theme-providers) style it: the
taskbar row and the start button today, the rest is in progress. With the official
stylesheets these components work but render unstyled. Share one `open` ref between the button and the menu:

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
`CollapseChild`, `MenuItemOption`, `TableHeader`.

## 🔁 Migrating from 2.x

**3.0.0** moves win7-vue to the [`@vstyler96/*` forks](#theme-providers). The component API is
unchanged (only additions); the breaking part is the theme packages:

- **New theme packages.** The optional peers are now `@vstyler96/98.css`, `@vstyler96/xp.css`,
  `@vstyler96/7.css`, `@vstyler96/system.css` and `@vstyler96/x.css` (all `^2.0.0`), replacing
  `98.css`, `xp.css`, `7.css` and `@sakun/system.css`.
  ```sh
  npm rm 98.css 7.css xp.css @sakun/system.css
  npm i @vstyler96/98.css @vstyler96/xp.css @vstyler96/7.css @vstyler96/system.css @vstyler96/x.css
  ```
  Then update your `?url` imports, e.g. `"7.css/dist/7.css?url"` →
  `"@vstyler96/7.css/dist/7.css?url"`.
- **`@vstyler96/x.css` 1.x is no longer accepted** (`^2.0.0`): with npm 7+ an old copy makes the
  install fail with a peer conflict, so upgrade it alongside win7-vue.
- **Drop `family: "mac"`** for system.css and X.css 2.x: every fork now shares one markup, so
  register them as plain URLs (`macos: cssMac`). Keep `family: "mac"` only if you stay on the
  legacy `@sakun/system.css` 0.x or `@vstyler96/x.css` 1.x stylesheets.

**New in 3.0.0:** `<WinTable>` (listview table with striped / hover / full-width / centered
columns), `<WinCircularProgress>` (spinner), the `variant` prop on `<WinStartButton>`
(`"vista"` on 7.css), and taskbar + start button styles in every published fork.

## 🚚 Roadmap
1. [x] Improve Typescript implementation.
2. [x] Clean-up code.
3. [x] Agnostic core: verbatim upstream markup, zero shipped CSS.
4. [x] Runtime theme switching across 98.css / XP.css / 7.css / system.css / X.css.
5. [x] Add RouterLink support.
6. [x] Configurable global prefix and typed global components.
7. [x] TaskBar & Start menu components (markup contract).
8. [x] One shared markup across the forks, published on npm as `@vstyler96/*` 2.x.
9. [x] Table and CircularProgress components.
10. [ ] TaskBar & Start menu styles in the vstyler96 forks (taskbar row and start button done).
11. [ ] Add custom Icons (Icons in progress).

## 📚 Documentation

_Refer to the [official site](https://win7-vue.kingbeencent.dev)_ (Now online!!)

Run the demo page locally:

```sh
make dev       # hot-reload dev server
make preview   # production build of the demo, served locally
```
