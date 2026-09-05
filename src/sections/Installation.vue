<script setup lang="ts">
  import CodePreview from '../components/CodePreview.vue'

  const install = `# pick your package manager
bun add win7-vue
npm install win7-vue
pnpm add win7-vue

# plus at least one upstream theme stylesheet (optional peers)
bun add 7.css 98.css xp.css @sakun/system.css`

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

createApp(App)
  .use(win7vue) // registers <Window>, <Button>, … globally
  .use(createWinTheme({
    defaultTheme: 'win7',
    themes: {
      win98: css98,
      winxp: cssXP,
      win7: css7,
      macos: { url: cssSystem, family: 'mac' },
    },
  }))
  .mount('#app')`

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
</script>

<template>
  <section>
    <h2>Installation</h2>
    <p>
      <strong>win7-vue</strong> is an agnostic Vue 3 component library that renders the
      <em>real</em> markup of the classic Windows CSS frameworks
      (<a href="https://github.com/jdan/98.css">98.css</a>,
      <a href="https://github.com/botoxparty/XP.css">XP.css</a>,
      <a href="https://github.com/khang-nd/7.css">7.css</a>) plus
      <a href="https://github.com/sakofchit/system.css">system.css</a> for Mac OS. It ships
      <strong>zero CSS of its own</strong> — the look comes entirely from the active upstream
      stylesheet, which you swap at runtime.
    </p>

    <h3>1. Install</h3>
    <CodePreview :code="install" language="bash" title="Install" open />

    <h3>2. Configure your app</h3>
    <p>Register the plugin and the theme engine in your entry file:</p>
    <CodePreview :code="mainTs" language="typescript" title="src/main.ts" open />

    <h3>3. Use the components</h3>
    <p>
      With <code>.use(win7vue)</code> every component is global. Or import only what you
      need — the library is tree-shakeable:
    </p>
    <CodePreview :code="localImport" language="vue" title="A component" open />
  </section>
</template>
