<script setup lang="ts">
  import { computed, type Component } from 'vue'
  import { useTheme } from 'win7-vue'
  import CodePreview from '../components/CodePreview.vue'
  import DemoBox from '../components/DemoBox.vue'
  import { COMPONENTS, THEMES, shownUnder, themeLabel, themeShort, type ComponentMeta } from '../catalog'

  // Each example is rendered live and shown as its own source, so the two can't drift.
  const demos = import.meta.glob<Component>('../examples/*.vue', { eager: true, import: 'default' })
  const sources = import.meta.glob<string>('../examples/*.vue', { eager: true, query: '?raw', import: 'default' })
  const file = (id: string) => `../examples/${id}.vue`

  const theme = useTheme()
  const shown = computed(() => COMPONENTS.filter(c => shownUnder(c, theme.name.value)))
  const hidden = computed(() => COMPONENTS.length - shown.value.length)

  /** ✅ styled · 🟠 unstyled under that theme · 🚧 no stylesheet yet. */
  const mark = (c: ComponentMeta, key: string) =>
    (c.themes as string[]).includes(key) ? '✅' : c.themes.length ? '🟠' : '🚧'

  function heading(c: ComponentMeta) {
    if (c.themes.length === THEMES.length) return c.name
    return `${c.name} (${c.themes.length ? `${c.themes.map(themeShort).join(' / ')} only` : 'styles coming soon'})`
  }
</script>

<template>
  <section>
    <h1>Components</h1>
    <p class="docs-lead">
      Every component renders the verbatim upstream markup. Pick a theme in the navbar: the
      examples below switch to it, while these docs stay the same.
    </p>

    <h2 id="support">
      Theme support
    </h2>
    <p>
      A ✅ means that theme ships dedicated CSS for the component; native controls and
      behavior-only components look right everywhere. Without a ✅ the component falls back to
      the browser default under that theme.
    </p>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr>
            <th>Component</th>
            <th
              v-for="t in THEMES"
              :key="t.key"
              class="is-center"
            >
              {{ t.short }}
            </th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="c in COMPONENTS"
            :key="c.id"
          >
            <td>
              <RouterLink
                v-if="shownUnder(c, theme.name.value)"
                :to="{ hash: `#cmp-${c.id}` }"
              >
                {{ c.name }}
              </RouterLink>
              <template v-else>
                {{ c.name }}
              </template>
            </td>
            <td
              v-for="t in THEMES"
              :key="t.key"
              class="is-center"
            >
              {{ mark(c, t.key) }}
            </td>
            <td>{{ c.desc }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="docs-callout">
      <p>
        🚧 <strong>Work in progress.</strong> win7-vue defines the TaskBar &amp; Start menu markup
        and the vstyler96 forks style it: the taskbar row and the start button so far, while the
        taskbar chrome and the Start menu are still being styled. Until then those parts work but
        render unstyled.
      </p>
    </div>
    <p v-if="hidden">
      Showing the components {{ themeLabel(theme.name.value) }} styles;
      {{ hidden }} unsupported {{ hidden === 1 ? 'one is' : 'ones are' }} hidden. Switch themes to see them.
    </p>

    <template
      v-for="c in shown"
      :key="c.id"
    >
      <h2 :id="`cmp-${c.id}`">
        {{ heading(c) }}
      </h2>
      <p>{{ c.desc }}</p>
      <DemoBox :title="c.name">
        <component :is="demos[file(c.id)]" />
      </DemoBox>
      <CodePreview
        :code="sources[file(c.id)]"
        :title="`examples/${c.id}.vue`"
      />
      <template v-if="c.markup">
        <h3>Markup contract</h3>
        <p>For stylesheet authors: the markup these components render.</p>
        <CodePreview
          :code="c.markup"
          language="html"
        />
      </template>
      <h3>API</h3>
      <div class="docs-table-wrap">
        <table class="docs-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Props / v-model</th>
              <th>Slots</th>
              <th>Events</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in c.api"
              :key="row.tag"
            >
              <td><code>&lt;{{ row.tag }}&gt;</code></td>
              <td>{{ row.props || '—' }}</td>
              <td>{{ row.slots ?? '—' }}</td>
              <td>{{ row.events ?? '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </section>
</template>
