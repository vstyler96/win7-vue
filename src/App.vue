<template>
  <div class="demo-app">
    <div class="demo-bg" aria-hidden="true" />

    <header class="demo-header">
      <div class="demo-brand">
        <h1>win7-vue</h1>
        <span>Classic Windows UI for Vue 3</span>
      </div>
      <div class="demo-actions">
        <button class="demo-search" @click="paletteOpen = true">
          🔍 Search <kbd>{{ modKey }}</kbd><kbd>K</kbd>
        </button>
        <label class="demo-themepick">
          Theme:
          <Dropdown v-model="currentTheme" :options="themeOptions" />
        </label>
      </div>
    </header>

    <div class="demo-body">
      <nav class="demo-nav">
        <RouterLink
          v-for="s in SECTIONS"
          :key="s.id"
          class="demo-nav-link"
          :to="s.path"
        >
          <span class="demo-nav-icon">{{ s.icon }}</span> {{ s.title }}
        </RouterLink>
      </nav>

      <main class="demo-content">
        <Window
          :title="windowTitle"
          active
          has-scrollbar
          class="demo-window"
          closable
          minimizable
          maximizable
          color="#8AFFFF"
          has-status
          :status-fields="['Welcome :3', 'Please leave a star in my GitHub']"
        >
          <RouterView />
        </Window>
      </main>
    </div>

    <CommandPalette v-model="paletteOpen" :entries="entries" @select="onSelect" />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, nextTick, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Dropdown, Window } from '../lib/components'
  import { useTheme } from '../lib/main'
  import CommandPalette, { type PaletteEntry } from './components/CommandPalette.vue'
  import { COMPONENTS, SECTIONS, THEMES, themeLabel } from './catalog'

  const route = useRoute()
  const router = useRouter()

  const theme = useTheme()
  const themeOptions = computed(() =>
    theme.themes.value.map(name => ({ id: name, name: themeLabel(name) })),
  )
  const currentTheme = computed<string | number | null>({
    get: () => theme.name.value,
    set: value => theme.change(String(value)),
  })

  const windowTitle = computed(() => (route.meta.title as string | undefined) ?? 'win7-vue')

  const paletteOpen = ref(false)
  const modKey = navigator.platform.toLowerCase().includes('mac') ? '⌘' : 'Ctrl'

  const entries = computed<PaletteEntry[]>(() => [
    ...SECTIONS.map(s => ({ label: s.title, hint: 'section', path: s.path })),
    ...COMPONENTS.map(c => ({
      label: c.name,
      hint: c.themes.map(k => THEMES.find(t => t.key === k)?.short).join(' '),
      path: '/components',
      anchor: `cmp-${c.id}`,
    })),
  ])

  async function onSelect(entry: PaletteEntry) {
    if (route.path !== entry.path) await router.push(entry.path)
    await nextTick()
    if (entry.anchor) document.getElementById(entry.anchor)?.scrollIntoView({ behavior: 'smooth' })
  }

  function onKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      paletteOpen.value = true
    }
  }
  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>
