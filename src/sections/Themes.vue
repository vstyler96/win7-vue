<script setup lang="ts">
  import { ref } from 'vue'
  import { Button, Textbox, Dropdown, useTheme } from 'win7-vue'
  import DemoBox from '../components/DemoBox.vue'
  import CodePreview from '../components/CodePreview.vue'
  import { themeLabel } from '../catalog'

  const theme = useTheme()

  // Custom theme creator — registers a user-supplied stylesheet at runtime.
  const name = ref('')
  const url = ref('')
  const family = ref<string | number | null>('windows')
  const error = ref('')

  const familyOptions = [
    { id: 'windows', name: 'windows (every @vstyler96 fork)' },
    { id: 'mac', name: 'mac (legacy system.css 0.x / X.css 1.x markup)' },
  ]

  function addTheme() {
    const key = name.value.trim()
    if (!key) { error.value = 'Name is required.'; return }
    if (!/^https?:\/\/|^\/|\?url$|\.css/.test(url.value.trim())) {
      error.value = 'Enter a stylesheet URL (http(s), a path, or a bundler ?url import).'
      return
    }
    error.value = ''
    theme.add(key, { url: url.value.trim(), family: family.value === 'mac' ? 'mac' : 'windows' })
    theme.change(key)
    name.value = ''
    url.value = ''
  }

  const addCode = `const theme = useTheme()

// register any upstream (or your own) stylesheet at runtime
theme.add('win7-aero-cdn', {
  url: 'https://unpkg.com/@vstyler96/7.css/dist/7.css',
  family: 'windows', // 'mac' only for the legacy system.css 0.x / X.css 1.x markup
})
theme.change('win7-aero-cdn')`
</script>

<template>
  <section>
    <h1>Themes</h1>
    <p class="docs-lead">
      A theme is a whole upstream stylesheet. The engine keeps one managed
      <code>&lt;link&gt;</code> and swaps its <code>href</code>; the active name is mirrored
      to <code>&lt;html data-win-theme&gt;</code> so your own CSS can react.
    </p>

    <h2 id="registered">
      Registered themes
    </h2>
    <DemoBox title="Registered themes">
      <p>
        <Button
          v-for="key in theme.themes.value"
          :key="key"
          @click="theme.change(key)"
        >
          {{ themeLabel(key) }}<span v-if="key === theme.name.value"> ✓</span>
        </Button>
      </p>
      <p>Active: <strong>{{ themeLabel(theme.name.value) }}</strong> ({{ theme.family.value }})</p>
    </DemoBox>

    <h2 id="custom">
      Create a custom theme
    </h2>
    <p>Point at any Windows/Mac-family stylesheet URL and register it live:</p>
    <DemoBox title="Add a theme">
      <p>
        <label>Name:</label>
        <Textbox v-model="name" placeholder="my-theme" />
      </p>
      <p>
        <label>Stylesheet URL:</label>
        <Textbox v-model="url" placeholder="https://unpkg.com/@vstyler96/7.css/dist/7.css" />
      </p>
      <p>
        <label>Family:</label>
        <Dropdown v-model="family" :options="familyOptions" />
      </p>
      <p v-if="error" role="alert">
        ⚠️
        {{ error }}
      </p>
      <Button @click="addTheme">
        Add &amp; activate
      </Button>
    </DemoBox>

    <h2 id="code">
      Doing it in code
    </h2>
    <CodePreview
      :code="addCode"
      language="typescript"
      title="theme.add()"
    />
  </section>
</template>

