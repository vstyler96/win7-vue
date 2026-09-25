// Single source of truth for the demo: registered themes, navigation sections,
// the component list and which upstream stylesheet actually styles each one.
// Drives the theme plugin, the sidebar, the Ctrl+K palette and the support badges.

import type { ThemeDefinition } from 'win7-vue'
import css98 from '98.css/dist/98.css?url'
import cssXP from 'xp.css/dist/XP.css?url'
import css7 from '7.css/dist/7.css?url'
import cssSystem from '@sakun/system.css/dist/system.css?url'
import cssX from '@vstyler96/x.css/dist/x.css?url'

export const THEMES = [
  { key: 'win98', label: 'Windows 98', short: '98', theme: { url: css98 }, background: '#008080' },
  { key: 'winxp', label: 'Windows XP', short: 'XP', theme: { url: cssXP }, background: '#3a6ea5' },
  { key: 'win7', label: 'Windows 7', short: '7', theme: { url: css7 }, background: 'radial-gradient(circle at 50% 40%, #3aa0e0, #0b3a70) fixed' },
  { key: 'macos', label: 'Mac OS (system.css)', short: 'mac', theme: { url: cssSystem, family: 'mac' } },
  { key: 'osx', label: 'Mac OS X (X.css)', short: 'X', theme: { url: cssX, family: 'mac' } },
] as const satisfies readonly { key: string, label: string, short: string, theme: ThemeDefinition, background?: string }[]

export type ThemeKey = typeof THEMES[number]['key']

const find = (key: string) => THEMES.find(t => t.key === key)
export const themeLabel = (key: string): string => find(key)?.label ?? key
export const themeShort = (key: string): string => find(key)?.short ?? key
/** Whether a component's demo is shown under a theme. Work-in-progress entries (no theme yet) always show. */
export const shownUnder = (c: ComponentMeta, key: string): boolean =>
  !c.themes.length || (c.themes as string[]).includes(key)
/** Desktop background for Windows themes; Mac stylesheets set their own on body. */
export const themeBackground = (key: string): string => {
  const t = find(key)
  return t && 'background' in t ? t.background : ''
}

export type SectionId = 'install' | 'requirements' | 'themes' | 'components' | 'composables'

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
  { id: 'composables', title: 'Composables', icon: '🪝', path: '/composables' },
]

/** Stylesheet sources per theme: our forks (full component support coming) and the originals. */
export const PROVIDERS: { theme: string, fork: string, official: string }[] = [
  { theme: 'Windows 98', fork: 'vstyler96/98.css', official: 'jdan/98.css' },
  { theme: 'Windows XP', fork: 'vstyler96/xp.css', official: 'botoxparty/XP.css' },
  { theme: 'Windows 7', fork: 'vstyler96/7.css', official: 'khang-nd/7.css' },
  { theme: 'Mac OS', fork: 'vstyler96/system.css', official: 'sakofchit/system.css' },
  { theme: 'Mac OS X', fork: 'vstyler96/X.css', official: 'vstyler96/X.css' },
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
  /** API reference rows, one per component documented in this entry. */
  api: ApiRow[]
  /** Markup contract, for entries no upstream stylesheet styles yet. */
  markup?: string
}

export interface ApiRow {
  /** Global tag with the default `Win` prefix. */
  tag: string
  props: string
  slots?: string
  events?: string
}

const TASKBAR_MARKUP = `<div class="taskbar" role="toolbar" aria-label="Taskbar">
  <button class="start-button" aria-haspopup="menu" aria-expanded="false" aria-label="Start">…</button>
  <div class="taskbar-items">…app buttons…</div>
  <div class="taskbar-tray">…tray… <time class="taskbar-clock">10:42</time></div>
  <button class="taskbar-show-desktop" aria-label="Show desktop"></button>
</div>

<div class="start-menu" hidden>
  <ul class="start-menu-items" role="menu">
    <li class="start-menu-item" role="menuitem"><button><img alt=""> <span>Computer</span></button></li>
  </ul>
  <div class="start-menu-side">
    <img class="start-menu-picture" alt="…">
    <ul class="start-menu-starred" role="menu">…start-menu-item…</ul>
    <div class="start-menu-actions">
      <button class="start-menu-main-action">Shut down</button>
      <button class="start-menu-actions-toggle" aria-haspopup="menu" aria-expanded="false">▸</button>
      <ul class="start-menu-actions-dropdown" role="menu" hidden>…start-menu-item…</ul>
    </div>
  </div>
</div>`

// Support = which upstream package ships dedicated CSS for the markup. Native
// controls & behavior-only components (Collapse, Icon, Link, Dialog) render the
// same everywhere. Verified against each package's shipped stylesheet.
export const COMPONENTS: ComponentMeta[] = [
  { id: 'window', name: 'Window', themes: ALL, desc: '.window / .title-bar chrome, draggable, min/max/close', api: [
    { tag: 'WinWindow', props: 'title, active, glass, width, color, closable, minimizable, maximizable, has-status, status-fields, has-scrollbar, draggable, default-x, default-y, snap-to-edges, snap-threshold, constrain-to-viewport · exposes setPosition(), center(), focus(), getPosition()', slots: 'default, status', events: 'close, minimize, maximize, focus, drag-start, drag-end, position-change' },
  ] },
  { id: 'button', name: 'Button', themes: ALL, desc: 'native button (.btn on mac)', api: [
    { tag: 'WinButton', props: 'text, href, to, target', slots: 'prepend, default, append', events: 'native' },
  ] },
  { id: 'dialog', name: 'Dialog', themes: ALL, desc: 'modal window (behavior)', api: [
    { tag: 'WinDialog', props: 'v-model (open), title, message, width, persistent, cancelable, close-on-backdrop, close-on-escape, show-actions · other props go to the Window', slots: 'default, status', events: 'accept, cancel, close' },
  ] },
  { id: 'textbox', name: 'Textbox', themes: ALL, desc: 'native input / textarea', api: [
    { tag: 'WinTextbox', props: "v-model, type ('textarea' for multiline), readonly", events: 'native' },
  ] },
  { id: 'checkbox', name: 'Checkbox', themes: ALL, desc: 'native checkbox, array v-model', api: [
    { tag: 'WinCheckbox', props: 'v-model (boolean or array), label, value, true-value, false-value, name, disabled', slots: 'default (label)' },
  ] },
  { id: 'radio', name: 'Radio', themes: ALL, desc: 'native radio group', api: [
    { tag: 'WinRadio', props: 'v-model, value, name, label, disabled', slots: 'default (label)' },
  ] },
  { id: 'dropdown', name: 'Dropdown', themes: ALL, desc: 'native select, keeps option value types', api: [
    { tag: 'WinDropdown', props: 'v-model, options, item-value, item-title, placeholder', slots: 'placeholder, options' },
  ] },
  { id: 'listbox', name: 'Listbox', themes: ['win7'], desc: 'ul[role=listbox] single selection — 7.css only (X.css port TODO)', api: [
    { tag: 'WinListbox', props: 'v-model, options, item-value, item-text' },
  ] },
  { id: 'slider', name: 'Slider', themes: WINDOWS, desc: 'native range input — no Mac stylesheet styles it', api: [
    { tag: 'WinSlider', props: 'v-model, native min / max / step', events: 'native' },
  ] },
  { id: 'progress', name: 'Progress', themes: ['win7'], desc: 'determinate & indeterminate bar — 7.css only (TODO: 98.css .progress-indicator, XP.css native <progress>)', api: [
    { tag: 'WinProgress', props: "progress (0–100 or '40%'), indeterminate, animate, variant ('error', 'paused'), transition" },
  ] },
  { id: 'searchbox', name: 'Searchbox', themes: ['win7'], desc: '.searchbox — 7.css only', api: [
    { tag: 'WinSearchbox', props: 'v-model, placeholder, instant', events: 'search' },
  ] },
  { id: 'tabs', name: 'Tabs', themes: ['winxp', 'win7'], desc: 'role="tablist" tabs — 98.css expects li[role=tab] > a, not button[role=tab]', api: [
    { tag: 'WinTabs', props: 'v-model (active key), tabs ({ key: title }), justified', slots: 'one per tab key' },
  ] },
  { id: 'collapse', name: 'Collapse', themes: ['win7'], desc: '<details> disclosure — 7.css only (98/XP style it only inside .tree-view)', api: [
    { tag: 'WinCollapse', props: 'v-model:open, title, prepend-icon, children (nested tree)', slots: 'title, default' },
  ] },
  { id: 'groupbox', name: 'Groupbox', themes: WINDOWS, desc: 'fieldset + legend — no Mac stylesheet styles it', api: [
    { tag: 'WinGroupbox', props: 'title', slots: 'default' },
  ] },
  { id: 'link', name: 'Link', themes: ALL, desc: 'anchor / RouterLink / button link', api: [
    { tag: 'WinLink', props: 'text, href, to, target, prepend-icon', slots: 'default', events: 'native' },
  ] },
  { id: 'icon', name: 'Icon', themes: ALL, desc: 'inline SVG icon (name or raw path)', api: [
    { tag: 'WinIcon', props: 'icon (built-in name or raw 24×24 path), size' },
  ] },
  { id: 'balloon', name: 'Balloon', themes: ['win7'], desc: 'glass tooltip — 7.css only', api: [
    { tag: 'WinBalloon', props: 'caption, top, bottom, left, right', slots: 'default' },
  ] },
  { id: 'menu', name: 'Menu & MenuBar', themes: ['win7', 'macos', 'osx'], desc: 'can-hover menus / .menu-items', api: [
    { tag: 'WinMenuBar', props: 'can-hover', slots: 'default' },
    { tag: 'WinMenu', props: 'can-hover', slots: 'default' },
    { tag: 'WinMenuItem', props: "option ({ as: 'checkbox' | 'radio', id, name? }), value, v-model", slots: 'default, submenu' },
  ] },
  { id: 'treeview', name: 'Treeview', themes: WINDOWS, desc: 'ul.tree-view with <details>', api: [
    { tag: 'WinTreeview', props: '', slots: 'default (<li> / <details> items)' },
  ] },
  { id: 'taskbar', name: 'TaskBar & Start menu', themes: [], desc: '🚧 work in progress: markup contract, styles in progress in the vstyler96 forks', api: [
    { tag: 'WinTaskBar', props: 'clock, show-desktop', slots: 'start, default (app buttons), tray', events: 'show-desktop' },
    { tag: 'WinStartButton', props: 'v-model:open (shared with StartMenu), label', slots: 'default' },
    { tag: 'WinStartMenu', props: 'v-model:open · closes on Escape / outside click', slots: 'items, starred-items, picture, main-action, actions-dropdown, actions-dropdown-items', events: 'main-action' },
    { tag: 'WinStartMenuItem', props: 'text, icon, image, href, to · closes the menu when chosen', slots: 'default, icon', events: 'click' },
    { tag: 'WinStartMenuStarredItem', props: 'same as StartMenuItem, for #starred-items', slots: 'default, icon', events: 'click' },
    { tag: 'WinMainMenuActions', props: 'v-model:open (dropdown)', slots: 'main-action, actions-dropdown, actions-dropdown-items', events: 'main-action' },
    { tag: 'WinStartMenuPicture', props: 'src, alt' },
  ], markup: TASKBAR_MARKUP },
]

/** Smooth-scroll to an in-page anchor. */
export function scrollToAnchor(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
