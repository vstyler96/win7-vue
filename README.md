# Win7 Vue

[![npm](https://img.shields.io/npm/v/win7-vue)](http://npm.im/win7-vue)
[![npm](https://img.shields.io/npm/dt/win7-vue)](http://npm.im/win7-vue)

Agnostic Vue 3 component library for recreating classic Windows UI. Components render
the real markup of [98.css](https://github.com/jdan/98.css),
[XP.css](https://github.com/botoxparty/XP.css) and
[7.css](https://github.com/vstyler96/7.css) — the library ships **zero CSS of its own**
and supplies only behavior, state, and accessibility (see [SPEC.md](./SPEC.md)).

## 🚀 Quick start

```sh
npm i win7-vue 7.css        # pick your upstream: 7.css, xp.css and/or 98.css
```

```js
// main.js
import { createApp } from "vue";
import Win from "win7-vue";

const app = createApp(...);
app.use(Win);
app.mount("#app");
```

## 🎨 Theme switching

Themes are whole upstream stylesheets, swapped at runtime:

```js
import { createWinTheme } from "win7-vue";
import css98 from "98.css/dist/98.css?url";
import cssXP from "xp.css/dist/XP.css?url";
import css7 from "7.css/dist/7.css?url";

app.use(createWinTheme({
  defaultTheme: "win7",
  themes: { win98: css98, winxp: cssXP, win7: css7 },
}));
```

```js
// Anywhere in the app
import { useTheme } from "win7-vue";

const theme = useTheme();
theme.change("winxp");   // theme.name, theme.themes
```

The active theme name is mirrored to `<html data-win-theme="...">` for your own CSS hooks.
Register extra stylesheets at runtime with `theme.add(name, { url, family })`.

## 🚚 Roadmap
1. [x] Improve Typescript implementation.
2. [x] Clean-up code.
3. [x] Agnostic core: verbatim upstream markup, zero shipped CSS.
4. [x] Runtime theme switching across 98.css / XP.css / 7.css.
5. [x] Add RouterLink support.
6. [ ] Add custom Icons (Icons in progress).

## 📚 Documentation

_Refer to the [official site](https://win7-vue.kingbeencent.dev)_ (Now online!!)
