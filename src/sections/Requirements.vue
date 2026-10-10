<script setup lang="ts">
    import pkg from '../../package.json'
  import { PROVIDERS, THEMES } from '../catalog'

  const notes: Record<string, string> = {
    'vue': 'defineModel, generics, <script setup>',
    'vue-router': 'only for Button/Link `to` (falls back to <a>)',
    '@vstyler96/7.css': 'Windows 7 (Aero)',
    '@vstyler96/98.css': 'Windows 98',
    '@vstyler96/xp.css': 'Windows XP',
    '@vstyler96/system.css': 'Mac OS (System 6)',
    '@vstyler96/x.css': 'Mac OS X Lion / Aqua',
  }

  const optional: Record<string, { optional?: boolean }> = pkg.peerDependenciesMeta
  const peers = Object.entries(pkg.peerDependencies).map(([name, range]) => ({
    name, range, required: !optional[name]?.optional, note: notes[name],
  }))
</script>

<template>
  <section>
    <h1>Requirements</h1>
    <p class="docs-lead">
      The only hard requirement is <strong>Vue 3.5+</strong>. The CSS frameworks are
      <strong>optional peers</strong>: the library never imports them, so you install and
      register only the themes you actually want to ship.
    </p>

    <h2 id="peers">
      Peer dependencies
    </h2>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr>
            <th>Package</th>
            <th>Version</th>
            <th class="is-center">
              Required
            </th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in peers"
            :key="p.name"
          >
            <td><code>{{ p.name }}</code></td>
            <td>{{ p.range }}</td>
            <td class="is-center">
              {{ p.required ? 'yes' : 'optional' }}
            </td>
            <td>{{ p.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="tooling">
      Build tooling
    </h2>
    <p>
      A bundler that understands <code>?url</code> asset imports (Vite, and most modern
      setups). That is how the theme engine loads each stylesheet into a single managed
      <code>&lt;link&gt;</code> and swaps it at runtime.
    </p>

    <h2 id="providers">
      Theme providers
    </h2>
    <p>
      Any stylesheet that follows the upstream markup works. Our forks are published on npm as
      <code>@vstyler96/*</code> and <strong>style every win7-vue component</strong>. The
      official projects work too, with fewer components styled.
    </p>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr>
            <th>Theme</th>
            <th>Our fork (recommended)</th>
            <th>Official upstream</th>
          </tr>
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
    </div>

    <h2 id="bundled">
      Bundled themes here
    </h2>
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
