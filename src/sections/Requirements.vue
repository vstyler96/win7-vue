<script setup lang="ts">
  import { Groupbox } from '../../lib/components'
  import { THEMES } from '../catalog'

  const peers = [
    { name: 'vue', range: '^3.5', required: true, note: 'defineModel, generics, <script setup>' },
    { name: '7.css', range: '^0.17', required: false, note: 'Windows 7 (Aero) — also searchbox, balloons, glass' },
    { name: '98.css', range: '>=0.1', required: false, note: 'Windows 98' },
    { name: 'xp.css', range: '>=0.2', required: false, note: 'Windows XP' },
    { name: '@sakun/system.css', range: '>=0.1', required: false, note: 'Mac OS (family: "mac")' },
  ]
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
      <table class="req-table">
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

    <h3>Bundled themes here</h3>
    <p>This demo registers all four families:</p>
    <ul>
      <li v-for="t in THEMES" :key="t.key"><strong>{{ t.label }}</strong></li>
    </ul>
  </section>
</template>

<style scoped>
  .req-table {
    border-collapse: collapse;
    width: 100%;
  }
  .req-table th,
  .req-table td {
    text-align: left;
    padding: 4px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
  .req-table th { font-weight: 700; }
</style>
