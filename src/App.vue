<template>
  <!-- ponytail: the one inline layout rule the demo needs; themes don't lay out windows -->
  <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 8px">
    <Window
      title="win7-vue"
      active
      width="240px"
      color="#8AFFFF"
      closable
    >
      <p>
        <strong>Classic Windows &amp; Mac OS UI for Vue 3.</strong>
        This page is built with win7-vue components and styled only by the active theme.
      </p>
      <p>
        <Button @click="paletteOpen = true">
          🔍 Search ({{ modKey }}+K)
        </Button>
        <label>
          Theme:
          <Dropdown v-model="currentTheme" :options="themeOptions" />
        </label>
      </p>

      <!-- TODO: back to <Listbox> once every theme styles it; only 7.css does today.
           X.css has an equivalent list that isn't ported to win7-vue's markup yet. -->
      <div>
        <Button
          v-for="s in SECTIONS"
          :key="s.path"
          :disabled="route.path === s.path"
          style="display: block; width: 100%; margin: 1em auto;"
          @click="router.push(s.path)"
        >
          {{ s.icon }} {{ s.title }}
        </Button>
      </div>
    </Window>

    <Window
      :title="windowTitle"
      active
      style="max-width: 1200px; margin: 0 auto;"
      has-scrollbar
      closable
      minimizable
      maximizable
      color="#8AFFFF"
      has-status
      :status-fields="['Welcome :3', 'Please leave a star in my GitHub']"
    >
      <RouterView />
    </Window>
  </div>

  <CommandPalette
    v-model="paletteOpen"
    :entries="entries"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, nextTick, ref, watchEffect } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Button, Dropdown, Window, useTheme } from 'win7-vue'
  import CommandPalette, { type PaletteEntry } from './components/CommandPalette.vue'
  import { COMPONENTS, SECTIONS, scrollToAnchor, shownUnder, themeBackground, themeLabel, themeShort } from './catalog'

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
  // '' clears the inline value so Mac stylesheets' own body background shows.
  watchEffect(() => { document.body.style.background = themeBackground(theme.name.value) })

  const windowTitle = computed(() => (route.meta.title as string | undefined) ?? 'win7-vue')

  const paletteOpen = ref(false)
  const modKey = /mac/i.test(navigator.userAgent) ? '⌘' : 'Ctrl'

  const entries = computed<PaletteEntry[]>(() => [
    ...SECTIONS.map(s => ({ label: s.title, hint: 'section', path: s.path })),
    ...COMPONENTS.filter(c => shownUnder(c, theme.name.value)).map(c => ({
      label: c.name,
      hint: c.themes.map(themeShort).join(' '),
      path: '/components',
      anchor: `cmp-${c.id}`,
    })),
  ])

  async function onSelect(entry: PaletteEntry) {
    if (route.path !== entry.path) await router.push(entry.path)
    await nextTick()
    if (entry.anchor) scrollToAnchor(entry.anchor)
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
