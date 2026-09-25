<script setup lang="ts">
  import { Groupbox } from 'win7-vue'
  import pkg from '../../package.json'
  import { PROVIDERS, THEMES } from '../catalog'

  const notes: Record<string, string> = {
    'vue': 'defineModel, generics, <script setup>',
    'vue-router': 'only for Button/Link `to` (falls back to <a>)',
    '7.css': 'Windows 7 (Aero) — also searchbox, balloons, glass',
    '98.css': 'Windows 98',
    'xp.css': 'Windows XP',
    '@sakun/system.css': 'Mac OS (family: "mac")',
    '@vstyler96/x.css': 'Mac OS X Lion / Aqua (family: "mac")',
  }

  const optional: Record<string, { optional?: boolean }> = pkg.peerDependenciesMeta
  const peers = Object.entries(pkg.peerDependencies).map(([name, range]) => ({
    name, range, required: !optional[name]?.optional, note: notes[name],
  }))
</script>

<template>
  <section>
    <h2>Requirements</h2>
    <p>
      The only hard requirement is <strong>Vue 3.5+</strong>. The CSS frameworks are
      <strong>optional peers</strong> — the library never imports them; you install and
      register only the themes you actually want to ship.
    </p>

    <Groupbox title="Peer dependencies">
      <table>
        <thead>
          <tr><th>Package</th><th>Version</th><th>Required</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr v-for="p in peers" :key="p.name">
            <td><code>{{ p.name }}</code></td>
            <td>{{ p.range }}</td>
            <td>{{ p.required ? 'yes' : 'optional' }}</td>
            <td>{{ p.note }}</td>
          </tr>
        </tbody>
      </table>
    </Groupbox>

    <h3>Build tooling</h3>
    <p>
      A bundler that understands <code>?url</code> asset imports (Vite, and most modern
      setups). That is how the theme engine loads each stylesheet into a single managed
      <code>&lt;link&gt;</code> and swaps it at runtime.
    </p>

    <h3>Theme providers</h3>
    <p>
      Any stylesheet that follows the upstream markup works. We maintain forks that will
      <strong>fully support every win7-vue component</strong> in the future. The official
      projects work too; the support table under Components shows which components they style.
    </p>
    <table>
      <thead>
        <tr><th>Theme</th><th>Our fork (recommended)</th><th>Official upstream</th></tr>
      </thead>
      <tbody>
        <tr
          v-for="p in PROVIDERS"
          :key="p.theme"
        >
          <td>{{ p.theme }}</td>
          <td><a :href="`https://github.com/${p.fork}`">{{ p.fork }}</a></td>
          <td><a :href="`https://github.com/${p.official}`">{{ p.official }}</a></td>
        </tr>
      </tbody>
    </table>

    <h3>Bundled themes here</h3>
    <p>This demo registers all of these themes:</p>
    <ul>
      <li
        v-for="t in THEMES"
        :key="t.key"
      >
        <strong>{{ t.label }}</strong>
      </li>
    </ul>
  </section>
</template>
