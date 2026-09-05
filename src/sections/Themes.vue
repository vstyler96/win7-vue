<script setup lang="ts">
  import { ref } from 'vue'
  import { Button, Groupbox, Textbox, Dropdown } from '../../lib/components'
  import { useTheme } from '../../lib/main'
  import CodePreview from '../components/CodePreview.vue'
  import { themeLabel } from '../catalog'

  const theme = useTheme()

  // Custom theme creator — registers a user-supplied stylesheet at runtime.
  const name = ref('')
  const url = ref('')
  const family = ref<string | number | null>('windows')
  const error = ref('')

  const familyOptions = [
    { id: 'windows', name: 'windows (98 / XP / 7 markup)' },
    { id: 'mac', name: 'mac (system.css markup)' },
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
  url: 'https://unpkg.com/7.css/dist/7.css',
  family: 'windows', // or 'mac' for system.css-style markup
})
theme.change('win7-aero-cdn')`
</script>

<template>
  <section>
    <h2>Themes</h2>
    <p>
      A theme is a whole upstream stylesheet. The engine keeps one managed
      <code>&lt;link&gt;</code> and swaps its <code>href</code>; the active name is mirrored
      to <code>&lt;html data-win-theme&gt;</code> so your own CSS can react.
    </p>

    <Groupbox title="Registered themes">
      <div class="theme-grid">
        <Button
          v-for="key in theme.themes.value"
          :key="key"
          :class="{ 'is-active': key === theme.name.value }"
          @click="theme.change(key)"
        >
          {{ themeLabel(key) }}<span v-if="key === theme.name.value"> ✓</span>
        </Button>
      </div>
      <p>Active: <strong>{{ themeLabel(theme.name.value) }}</strong> ({{ theme.family.value }})</p>
    </Groupbox>

    <h3>Create a custom theme</h3>
    <p>Point at any Windows/Mac-family stylesheet URL and register it live:</p>
    <Groupbox title="Add a theme">
      <div class="form-row">
        <label>Name:</label>
        <Textbox v-model="name" placeholder="my-theme" />
      </div>
      <div class="form-row">
        <label>Stylesheet URL:</label>
        <Textbox v-model="url" placeholder="https://unpkg.com/7.css/dist/7.css" />
      </div>
      <div class="form-row">
        <label>Family:</label>
        <Dropdown v-model="family" :options="familyOptions" />
      </div>
      <p v-if="error" class="theme-error">{{ error }}</p>
      <Button @click="addTheme">Add &amp; activate</Button>
    </Groupbox>

    <h3>Doing it in code</h3>
    <CodePreview :code="addCode" language="typescript" title="theme.add()" open />
  </section>
</template>

<style scoped>
  .theme-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 8px;
  }
  .theme-grid .is-active { font-weight: 700; }
  .form-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .form-row > label { min-width: 110px; }
  .theme-error { color: #b00020; }
</style>
