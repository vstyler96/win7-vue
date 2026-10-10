<template>
  <!-- Docs shell (src/docs.css): looks the same under every theme. Only demos are themed. -->
  <div id="docs">
    <header class="docs-navbar">
      <button
        class="docs-btn docs-menu-toggle"
        aria-label="Toggle navigation"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        ☰
      </button>
      <RouterLink
        class="docs-brand"
        to="/"
      >
        win7-vue <span class="docs-badge">v{{ pkg.version }}</span>
      </RouterLink>
      <nav class="docs-navlinks">
        <RouterLink :to="SECTIONS[0].path">
          Docs
        </RouterLink>
        <RouterLink to="/components">
          Components
        </RouterLink>
        <RouterLink to="/preview">
          Preview
        </RouterLink>
      </nav>
      <span class="docs-spacer" />
      <button
        class="docs-btn docs-search"
        @click="paletteOpen = true"
      >
        <span class="docs-search-label">🔍 Search…</span>
        <kbd>{{ modKey }} K</kbd>
      </button>
      <label class="docs-theme">
        <span class="docs-theme-label">Theme</span>
        <select
          v-model="currentTheme"
          class="docs-select"
        >
          <option
            v-for="name in theme.themes.value"
            :key="name"
            :value="name"
          >{{ themeLabel(name) }}</option>
        </select>
      </label>
      <a
        class="docs-github"
        :href="pkg.homepage"
      >GitHub</a>
    </header>

    <div
      class="docs-layout"
      :class="{ 'has-toc': toc.length }"
    >
      <aside
        class="docs-sidebar"
        :class="{ 'is-open': menuOpen }"
        aria-label="Docs navigation"
      >
        <template
          v-for="group in groups"
          :key="group.title"
        >
          <strong class="docs-group">{{ group.title }}</strong>
          <ul>
            <li
              v-for="s in group.sections"
              :key="s.path"
            >
              <RouterLink :to="s.path">
                {{ s.title }}
              </RouterLink>
            </li>
          </ul>
        </template>
        <strong class="docs-group">Component list</strong>
        <ul>
          <li
            v-for="c in COMPONENTS"
            :key="c.id"
          >
            <!-- Hash links: the router scrolls to the matching <h2 id>. -->
            <RouterLink
              :to="{ path: '/components', hash: `#cmp-${c.id}` }"
              :class="{ 'is-muted': !shownUnder(c, theme.name.value) }"
              active-class=""
              exact-active-class=""
            >
              {{ c.name }}
            </RouterLink>
          </li>
        </ul>
      </aside>

      <main class="docs-main">
        <RouterView />
      </main>

      <nav
        v-if="toc.length"
        class="docs-toc"
        aria-label="On this page"
      >
        <p class="docs-toc-title">
          On this page
        </p>
        <ul>
          <li
            v-for="h in toc"
            :key="h.id"
          >
            <RouterLink :to="{ hash: `#${h.id}` }">
              {{ h.text }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <CommandPalette
      v-model="paletteOpen"
      :entries="entries"
      @select="onSelect"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useTheme } from 'win7-vue'
  import pkg from '../package.json'
  import CommandPalette, { type PaletteEntry } from './components/CommandPalette.vue'
  import { COMPONENTS, SECTIONS, shownUnder, themeLabel, themeShort } from './catalog'

  const route = useRoute()
  const router = useRouter()
  const theme = useTheme()

  const currentTheme = computed({
    get: () => theme.name.value,
    set: value => theme.change(value),
  })

  const groups = computed(() => [...new Set(SECTIONS.map(s => s.group))].map(title => ({
    title,
    sections: SECTIONS.filter(s => s.group === title),
  })))

  // "On this page": every <h2 id> the current page renders (re-read after route/theme changes,
  // since the component list depends on the theme).
  const toc = ref<{ id: string, text: string }[]>([])
  watch([() => route.path, theme.name], async () => {
    await nextTick()
    toc.value = [...document.querySelectorAll<HTMLElement>('.docs-main h2[id]')]
      .map(h => ({ id: h.id, text: h.textContent?.trim() ?? '' }))
  }, { immediate: true, flush: 'post' })

  const menuOpen = ref(false)
  watch(() => route.fullPath, () => { menuOpen.value = false })

  const paletteOpen = ref(false)
  const modKey = /mac/i.test(navigator.userAgent) ? '⌘' : 'Ctrl'

  const entries = computed<PaletteEntry[]>(() => [
    ...SECTIONS.map(s => ({ label: s.title, hint: s.group, path: s.path })),
    ...COMPONENTS.filter(c => shownUnder(c, theme.name.value)).map(c => ({
      label: c.name,
      hint: c.themes.map(themeShort).join(' '),
      path: '/components',
      hash: `#cmp-${c.id}`,
    })),
  ])

  function onSelect(entry: PaletteEntry) {
    router.push({ path: entry.path, hash: entry.hash })
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
