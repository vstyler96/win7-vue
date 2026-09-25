<script setup lang="ts">
  import CodePreview from '../components/CodePreview.vue'

  const install = `# pick your package manager
bun add win7-vue
npm install win7-vue
pnpm add win7-vue

# plus at least one upstream theme stylesheet (optional peers)
bun add 7.css 98.css xp.css @sakun/system.css @vstyler96/x.css`

  const mainTs = `// src/main.ts — wire the library into your app
import { createApp } from 'vue'
import App from './App.vue'
import win7vue, { createWinTheme } from 'win7-vue'

// Themes are whole upstream stylesheets, swapped at runtime.
// Import each as a URL so the theme plugin can hot-swap the <link>.
import css98 from '98.css/dist/98.css?url'
import cssXP from 'xp.css/dist/XP.css?url'
import css7 from '7.css/dist/7.css?url'
import cssSystem from '@sakun/system.css/dist/system.css?url'
import cssX from '@vstyler96/x.css/dist/x.css?url'

createApp(App)
  .use(win7vue) // registers <WinWindow>, <WinButton>, … globally
  // or .use(win7vue, { prefix: 'Xp' }) for <XpWindow>, <XpButton>, …
  .use(createWinTheme({
    defaultTheme: 'win7',
    themes: {
      win98: css98,
      winxp: cssXP,
      win7: css7,
      macos: { url: cssSystem, family: 'mac' },
      osx: { url: cssX, family: 'mac' }, // X.css reuses system.css markup
    },
  }))
  .mount('#app')`

  const globalTypes = `// tsconfig.json — typed <WinX> components in templates
{
  "compilerOptions": { "types": ["win7-vue/global"] }
}

// Custom prefix? Declare the map yourself instead:
// components.d.ts
import type { Win7VueComponents } from 'win7-vue'
declare module 'vue' {
  interface GlobalComponents extends Win7VueComponents<'Xp'> {}
}`

  /* eslint-disable no-useless-escape -- a literal close tag would end this SFC block */
  const localImport = `<script setup lang="ts">
  // Prefer explicit imports? Skip .use(win7vue) and import per component.
  import { Window, Button, useTheme } from 'win7-vue'

  const theme = useTheme()
<\/script>

<template>
  <Window title="Hello" active closable>
    <p>Real {{ theme.name.value }} chrome, zero shipped CSS.</p>
    <Button @click="theme.change('win98')">Switch to 98</Button>
  </Window>
</template>`
  /* eslint-enable no-useless-escape */
</script>

<template>
  <section>
    <h2>Installation</h2>
    <p>
      <strong>win7-vue</strong> is an agnostic Vue 3 component library that renders the
      <em>real</em> markup of the classic Windows CSS frameworks
      (<a href="https://github.com/vstyler96/98.css">98.css</a>,
      <a href="https://github.com/vstyler96/xp.css">XP.css</a>,
      <a href="https://github.com/vstyler96/7.css">7.css</a>) plus
      <a href="https://github.com/vstyler96/system.css">system.css</a> /
      <a href="https://github.com/vstyler96/X.css">X.css</a> for Mac OS. It ships
      <strong>zero CSS of its own</strong> — the look comes entirely from the active upstream
      stylesheet, which you swap at runtime.
    </p>
    <p>
      Those links are our forks, which will fully support every win7-vue component in the
      future. The official projects work too; see
      <RouterLink to="/requirements">
        Requirements → Theme providers
      </RouterLink>.
    </p>

    <h3>1. Install</h3>
    <CodePreview
      :code="install"
      language="bash"
      title="Install"
      open
    />

    <h3>2. Configure your app</h3>
    <p>Register the plugin and the theme engine in your entry file:</p>
    <CodePreview
      :code="mainTs"
      language="typescript"
      title="src/main.ts"
      open
    />

    <h3>3. Use the components</h3>
    <p>
      With <code>.use(win7vue)</code> every component is global under a <code>Win</code>
      prefix (<code>&lt;WinWindow&gt;</code>, <code>&lt;WinButton&gt;</code>…), so one-word
      names never clash with native elements like <code>&lt;dialog&gt;</code>. Pass
      <code>{ prefix: 'Xp' }</code> to pick your own. For TypeScript, enable the global
      component types:
    </p>
    <CodePreview
      :code="globalTypes"
      language="typescript"
      title="Global component types"
      open
    />

    <p>Or import only what you need — the library is tree-shakeable:</p>
    <CodePreview
      :code="localImport"
      language="vue"
      title="A component"
      open
    />
  </section>
</template>
