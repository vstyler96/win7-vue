<script setup lang="ts">
  import { Groupbox } from 'win7-vue'
  import CodePreview from '../components/CodePreview.vue'

  const composables = [
    {
      name: 'createWinTheme',
      signature: 'createWinTheme({ themes, defaultTheme? })',
      returns: 'Vue plugin (also a ThemeInstance)',
      desc: 'Installs the theme engine: one managed <link> swapped between whole upstream stylesheets.',
      code: `app.use(createWinTheme({
  defaultTheme: 'win7',
  themes: {
    win7: css7,                                // stylesheet URL
    macos: { url: cssSystem, family: 'mac' }, // or a definition with a markup family
  },
}))`,
    },
    {
      name: 'useTheme',
      signature: 'useTheme()',
      returns: 'ThemeInstance: name, family, themes (readonly refs), change(name), add(name, url | { url, family })',
      desc: 'Read and switch the active theme. Throws if createWinTheme is not installed.',
      code: `const theme = useTheme()

theme.change('winxp')
theme.add('aero-cdn', { url: 'https://unpkg.com/7.css/dist/7.css' })
console.log(theme.name.value, theme.themes.value)`,
    },
    {
      name: 'useThemeFamily / useIsMac',
      signature: 'useThemeFamily() · useIsMac()',
      returns: "ComputedRef<'windows' | 'mac'> · ComputedRef<boolean>",
      desc: "Branch your own markup on the active theme's family. Falls back to 'windows' without the theme plugin.",
      code: `const isMac = useIsMac()

// <button :class="isMac ? 'btn' : undefined">OK</button>`,
    },
    {
      name: 'useDismiss',
      signature: 'useDismiss(open, { el?, ignore?, onDismiss? })',
      returns: 'nothing',
      desc: 'Closes a popup on Escape (only the top-most open one) and, with el, on pointerdown outside it. Powers StartMenu, MainMenuActions and Dialog.',
      code: `const open = ref(false)
const panel = ref<HTMLElement | null>(null)

// Escape + outside clicks close it; clicks on the toggle don't count as outside.
useDismiss(open, { el: panel, ignore: '.my-toggle' })`,
    },
    {
      name: 'useDraggable',
      signature: 'useDraggable(elRef, handleRef, options?, events?)',
      returns: 'x, y, dragging, zIndex (refs), setPosition(x, y), center(), focus()',
      desc: 'Makes a fixed-position element draggable by a handle: pointer events, viewport clamping, edge snapping, bring-to-front. Options (enabled, snapToEdges, snapThreshold, constrain) accept values, refs or getters.',
      code: `const el = ref<HTMLElement | null>(null)
const handle = ref<HTMLElement | null>(null)

const { x, y, zIndex } = useDraggable(el, handle, { snapToEdges: true }, {
  onDragEnd: (x, y) => console.log('dropped at', x, y),
})`,
    },
  ]

  const types = [
    'Win7VueOptions', 'Win7VueComponents', 'ThemeOptions', 'ThemeInstance', 'ThemeDefinition',
    'ThemeFamily', 'DismissOptions', 'DraggableOptions', 'DraggableEvents', 'CollapseChild',
    'MenuItemOption',
  ]
</script>

<template>
  <section>
    <h2>Composables</h2>
    <p>
      Everything the components use internally is exported, so your own markup can share the
      same theme and behavior. All of them are imported from <code>'win7-vue'</code>.
    </p>

    <Groupbox
      v-for="c in composables"
      :key="c.name"
      :title="c.name"
    >
      <p><code>{{ c.signature }}</code> → {{ c.returns }}</p>
      <p>{{ c.desc }}</p>
      <CodePreview
        :code="c.code"
        language="typescript"
        title="Example"
        open
      />
    </Groupbox>

    <h3>Exported types</h3>
    <p>
      <template
        v-for="(t, i) in types"
        :key="t"
      >
        <code>{{ t }}</code>{{ i < types.length - 1 ? ', ' : '' }}
      </template>
    </p>
  </section>
</template>
