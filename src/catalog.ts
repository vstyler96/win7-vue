// Single source of truth for the demo: registered themes, navigation sections,
// the component list and which upstream stylesheet actually styles each one.
// Drives the theme plugin, the sidebar, the Ctrl+K palette and the support badges.

import type { ThemeDefinition } from 'win7-vue'
import css98 from '98.css/dist/98.css?url'
import cssXP from 'xp.css/dist/XP.css?url'
import css7 from '7.css/dist/7.css?url'
import cssSystem from '@sakun/system.css/dist/system.css?url'

export const THEMES = [
  { key: 'win98', label: 'Windows 98', short: '98', theme: { url: css98 } },
  { key: 'winxp', label: 'Windows XP', short: 'XP', theme: { url: cssXP } },
  { key: 'win7', label: 'Windows 7', short: '7', theme: { url: css7 } },
  { key: 'macos', label: 'Mac OS (system.css)', short: 'mac', theme: { url: cssSystem, family: 'mac' } },
] as const satisfies readonly { key: string, label: string, short: string, theme: ThemeDefinition }[]

export type ThemeKey = typeof THEMES[number]['key']

const find = (key: string) => THEMES.find(t => t.key === key)
export const themeLabel = (key: string): string => find(key)?.label ?? key
export const themeShort = (key: string): string => find(key)?.short ?? key

export type SectionId = 'install' | 'requirements' | 'themes' | 'components'

export interface Section {
  id: SectionId
  title: string
  icon: string
  /** Router path for this section. */
  path: string
}

export const SECTIONS: Section[] = [
  { id: 'install', title: 'Installation', icon: '📦', path: '/installation' },
  { id: 'requirements', title: 'Requirements', icon: '✅', path: '/requirements' },
  { id: 'themes', title: 'Themes', icon: '🎨', path: '/themes' },
  { id: 'components', title: 'Components', icon: '🧩', path: '/components' },
]

const ALL: ThemeKey[] = THEMES.map(t => t.key)
const WINDOWS: ThemeKey[] = ['win98', 'winxp', 'win7']

export interface ComponentMeta {
  /** anchor id (`cmp-<id>`) and example file name (`src/examples/<id>.vue`) */
  id: string
  name: string
  /** upstream stylesheets that carry dedicated styling for this markup */
  themes: ThemeKey[]
  desc: string
}

// Support = which upstream package ships dedicated CSS for the markup. Native
// controls & behavior-only components (Collapse, Icon, Link, Dialog) render the
// same everywhere. Verified against each package's shipped stylesheet.
export const COMPONENTS: ComponentMeta[] = [
  { id: 'window', name: 'Window', themes: ALL, desc: '.window / .title-bar chrome, draggable, min/max/close' },
  { id: 'button', name: 'Button', themes: ALL, desc: 'native button (.btn on mac)' },
  { id: 'dialog', name: 'Dialog', themes: ALL, desc: 'modal window (behavior)' },
  { id: 'textbox', name: 'Textbox', themes: ALL, desc: 'native input / textarea' },
  { id: 'checkbox', name: 'Checkbox', themes: ALL, desc: 'native checkbox, array v-model' },
  { id: 'radio', name: 'Radio', themes: ALL, desc: 'native radio group' },
  { id: 'dropdown', name: 'Dropdown', themes: ALL, desc: 'native select, keeps option value types' },
  { id: 'listbox', name: 'Listbox', themes: ALL, desc: 'ul[role=listbox] single selection' },
  { id: 'slider', name: 'Slider', themes: ALL, desc: 'native range input' },
  { id: 'progress', name: 'Progress', themes: ALL, desc: 'determinate & indeterminate bar' },
  { id: 'searchbox', name: 'Searchbox', themes: ['win7'], desc: '.searchbox — 7.css only' },
  { id: 'tabs', name: 'Tabs', themes: WINDOWS, desc: 'role="tablist" tabs' },
  { id: 'collapse', name: 'Collapse', themes: ALL, desc: '<details> disclosure (behavior)' },
  { id: 'groupbox', name: 'Groupbox', themes: ALL, desc: 'fieldset + legend' },
  { id: 'link', name: 'Link', themes: ALL, desc: 'anchor / RouterLink / button link' },
  { id: 'icon', name: 'Icon', themes: ALL, desc: 'inline SVG icon (name or raw path)' },
  { id: 'balloon', name: 'Balloon', themes: ['win7'], desc: 'glass tooltip — 7.css only' },
  { id: 'menu', name: 'Menu & MenuBar', themes: ['win7', 'macos'], desc: 'can-hover menus / .menu-items' },
  { id: 'treeview', name: 'Treeview', themes: WINDOWS, desc: 'ul.tree-view with <details>' },
]

/** Smooth-scroll to an in-page anchor. */
export function scrollToAnchor(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
