<script setup lang="ts">
  import type { Component } from 'vue'
  import CodePreview from '../components/CodePreview.vue'
  import { COMPONENTS, THEMES, scrollToAnchor, themeShort } from '../catalog'

  // Each example is rendered live and shown as its own source, so the two can't drift.
  const demos = import.meta.glob<Component>('../examples/*.vue', { eager: true, import: 'default' })
  const sources = import.meta.glob<string>('../examples/*.vue', { eager: true, query: '?raw', import: 'default' })
  const file = (id: string) => `../examples/${id}.vue`
</script>

<template>
  <section>
    <h2>Components</h2>
    <p>
      Every component renders the verbatim upstream markup. A ✅ means that theme ships
      dedicated CSS for it; native controls &amp; behavior-only components look right
      everywhere. Cells without a ✅ simply fall back to the browser default under that theme.
    </p>

    <div class="matrix-wrap">
      <table class="matrix">
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
                :href="`#cmp-${c.id}`"
                @click.prevent="scrollToAnchor(`cmp-${c.id}`)"
              >{{ c.name }}</a>
            </td>
            <td
              v-for="t in THEMES"
              :key="t.key"
              class="cell"
            >
              {{ c.themes.includes(t.key) ? '✅' : '🟠' }}
            </td>
            <td class="matrix-note">
              {{ c.desc }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <fieldset
      v-for="c in COMPONENTS"
      :id="`cmp-${c.id}`"
      :key="c.id"
      class="component-section"
    >
      <legend>
        {{ c.name }}
        <span
          v-if="c.themes.length < THEMES.length"
          class="only"
        >{{ c.themes.map(themeShort).join(' / ') }} only</span>
      </legend>
      <component :is="demos[file(c.id)]" />
      <CodePreview :code="sources[file(c.id)]" />
    </fieldset>
  </section>
</template>

<style>
  /* Unscoped: shared layout for the example components rendered inside. */
  .matrix-wrap { overflow-x: auto; margin-bottom: 20px; }
  .matrix { border-collapse: collapse; width: 100%; font-size: 13px; }
  .matrix th, .matrix td {
    padding: 3px 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    text-align: left;
  }
  .matrix .cell { text-align: center; }
  .matrix-note { color: #555; }
  .component-section { margin-bottom: 16px; scroll-margin-top: 12px; }
  .component-section .only { font-size: 11px; font-weight: normal; opacity: 0.7; }
  .component-section .component-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
  .component-section .form-group { margin-bottom: 12px; }
  .component-section .form-group > label { display: block; margin-bottom: 4px; }
  .component-section .balloon-demos { gap: 20px; padding: 40px 20px; }
  .component-section hr { margin: 16px 0; }
  .component-section p { margin: 8px 0; }
  .component-section [role='progressbar'] { margin: 4px 0 16px; }
  .component-section .demo-menu { width: 200px; }
</style>
