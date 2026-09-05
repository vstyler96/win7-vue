<template>
  <div class="app">
    <header class="app-header">
      <div class="brand">
        <h1>win7-vue</h1>
        <span>Classic Windows UI for Vue 3</span>
      </div>
      <div class="header-actions">
        <button class="search-trigger" @click="paletteOpen = true">
          🔍 Search <kbd>{{ modKey }}</kbd><kbd>K</kbd>
        </button>
        <label class="theme-pick">
          Theme:
          <Dropdown v-model="currentTheme" :options="themeOptions" />
        </label>
      </div>
    </header>

    <div class="app-body">
      <nav class="sidebar">
        <button
          v-for="s in SECTIONS"
          :key="s.id"
          class="nav-item"
          :class="{ active: s.id === activeSection }"
          @click="go(s.id)"
        >
          <span class="nav-icon">{{ s.icon }}</span> {{ s.title }}
        </button>
      </nav>

      <main class="content">
        <Window :title="activeTitle" active has-scrollbar class="content-window">
          <Installation v-if="activeSection === 'install'" />
          <Requirements v-else-if="activeSection === 'requirements'" />
          <Themes v-else-if="activeSection === 'themes'" />
          <Components v-else />
        </Window>
      </main>
    </div>

    <CommandPalette v-model="paletteOpen" :entries="entries" @select="onSelect" />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, nextTick, ref } from 'vue'
  import { Dropdown, Window } from '../lib/components'
  import { useTheme } from '../lib/main'
  import CommandPalette, { type PaletteEntry } from './components/CommandPalette.vue'
  import Installation from './sections/Installation.vue'
  import Requirements from './sections/Requirements.vue'
  import Themes from './sections/Themes.vue'
  import Components from './sections/Components.vue'
  import { COMPONENTS, SECTIONS, THEMES, themeLabel, type SectionId } from './catalog'

  const theme = useTheme()
  const themeOptions = computed(() =>
    theme.themes.value.map(name => ({ id: name, name: themeLabel(name) })),
  )
  const currentTheme = computed<string | number | null>({
    get: () => theme.name.value,
    set: value => theme.change(String(value)),
  })

  const activeSection = ref<SectionId>('install')
  const activeTitle = computed(() => SECTIONS.find(s => s.id === activeSection.value)?.title ?? '')

  const paletteOpen = ref(false)
  const modKey = navigator.platform.toLowerCase().includes('mac') ? '⌘' : 'Ctrl'

  const entries = computed<PaletteEntry[]>(() => [
    ...SECTIONS.map(s => ({ label: s.title, hint: 'section', section: s.id })),
    ...COMPONENTS.map(c => ({
      label: c.name,
      hint: c.themes.map(k => THEMES.find(t => t.key === k)?.short).join(' '),
      section: 'components',
      anchor: `cmp-${c.id}`,
    })),
  ])

  function go(section: SectionId, anchor?: string) {
    activeSection.value = section
    if (anchor) nextTick(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }))
  }

  function onSelect(entry: PaletteEntry) {
    go(entry.section as SectionId, entry.anchor)
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

<style scoped>
  .app {
    max-width: 1100px;
    margin: 0 auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-height: 100vh;
    box-sizing: border-box;
  }

  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 12px;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  .brand h1 { margin: 0; }
  .brand span { opacity: 0.9; }
  .header-actions { display: flex; align-items: center; gap: 12px; }
  .theme-pick { display: flex; align-items: center; gap: 6px; }

  .search-trigger {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border: 0;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    font-size: 13px;
  }
  .search-trigger kbd {
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 4px;
    font-size: 11px;
  }

  .app-body { display: flex; gap: 16px; align-items: flex-start; }

  .sidebar {
    flex: 0 0 190px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: sticky;
    top: 16px;
  }
  .nav-item {
    text-align: left;
    padding: 8px 12px;
    border: 0;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    cursor: pointer;
    font-size: 14px;
  }
  .nav-item:hover { background: rgba(255, 255, 255, 0.3); }
  .nav-item.active { background: #fff; color: #245dab; font-weight: 600; }
  .nav-icon { margin-right: 6px; }

  .content { flex: 1; min-width: 0; }
  .content-window { width: 100%; }
  .content-window :deep(.window-body) { max-height: 78vh; overflow-y: auto; }

  @media (max-width: 720px) {
    .app-body { flex-direction: column; }
    .sidebar { flex-direction: row; flex-wrap: wrap; position: static; width: 100%; }
  }
</style>
