<script setup lang="ts">
  import { computed, type Component } from 'vue'
  import { Groupbox, useTheme } from 'win7-vue'
  import CodePreview from '../components/CodePreview.vue'
  import { COMPONENTS, THEMES, scrollToAnchor, shownUnder, themeLabel, themeShort, type ComponentMeta } from '../catalog'

  // Each example is rendered live and shown as its own source, so the two can't drift.
  const demos = import.meta.glob<Component>('../examples/*.vue', { eager: true, import: 'default' })
  const sources = import.meta.glob<string>('../examples/*.vue', { eager: true, query: '?raw', import: 'default' })
  const file = (id: string) => `../examples/${id}.vue`

  const theme = useTheme()
  const shown = computed(() => COMPONENTS.filter(c => shownUnder(c, theme.name.value)))
  const hidden = computed(() => COMPONENTS.length - shown.value.length)

  function heading(c: ComponentMeta) {
    if (c.themes.length === THEMES.length) return c.name
    return `${c.name} (${c.themes.length ? `${c.themes.map(themeShort).join(' / ')} only` : 'styles coming soon'})`
  }
</script>

<template>
  <section>
    <h2>Components</h2>
    <p>
      Every component renders the verbatim upstream markup. A ✅ means that theme ships
      dedicated CSS for it; native controls &amp; behavior-only components look right
      everywhere. Cells without a ✅ simply fall back to the browser default under that theme.
    </p>

    <table class="support">
      <thead>
        <tr>
          <th>Component</th>
          <th
            v-for="t in THEMES"
            :key="t.key"
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
            <a
              v-if="shownUnder(c, theme.name.value)"
              :href="`#cmp-${c.id}`"
              @click.prevent="scrollToAnchor(`cmp-${c.id}`)"
            >{{ c.name }}</a>
            <template v-else>
              {{ c.name }}
            </template>
          </td>
          <td
            v-for="t in THEMES"
            :key="t.key"
          >
            {{ c.themes.includes(t.key) ? '✅' : c.themes.length ? '🟠' : '🚧' }}
          </td>
          <td>
            {{ c.desc }}
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      🚧 <strong>Work in progress.</strong> The TaskBar &amp; Start menu components are new:
      win7-vue defines their markup, but no stylesheet styles it yet. We're adding their styles
      to the vstyler96 forks (98.css, XP.css, 7.css, system.css and X.css). Until then they
      work but render unstyled.
    </p>

    <p v-if="hidden">
      Showing the components {{ themeLabel(theme.name.value) }} styles;
      {{ hidden }} unsupported {{ hidden === 1 ? 'one is' : 'ones are' }} hidden. Switch themes to see them.
    </p>

    <Groupbox
      v-for="c in shown"
      :id="`cmp-${c.id}`"
      :key="c.id"
      :title="heading(c)"
    >
      <component :is="demos[file(c.id)]" />
      <CodePreview :code="sources[file(c.id)]" />
      <CodePreview
        v-if="c.markup"
        :code="c.markup"
        language="html"
        title="Markup contract (for stylesheet authors)"
      />
      <table>
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
    </Groupbox>
  </section>
</template>


<style scoped>
  /* Readability only: tints derive from the theme's text color, so every theme keeps its look. */
  .support {
    border-collapse: collapse;
    width: 100%;
  }
  .support th,
  .support td {
    padding: 4px 8px;
    border-bottom: 1px solid color-mix(in srgb, currentColor 15%, transparent);
    text-align: left;
    vertical-align: top;
  }
  .support th:not(:first-child):not(:last-child),
  .support td:not(:first-child):not(:last-child) {
    text-align: center;
    white-space: nowrap;
  }
  .support tbody tr:nth-child(even) {
    background: color-mix(in srgb, currentColor 5%, transparent);
  }
  .support tbody tr:hover {
    background: color-mix(in srgb, currentColor 10%, transparent);
  }
</style>
