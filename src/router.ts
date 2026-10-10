import { createRouter, createWebHistory } from 'vue-router'
import { SECTIONS } from './catalog'
import Installation from './sections/Installation.vue'
import Requirements from './sections/Requirements.vue'
import Themes from './sections/Themes.vue'
import Components from './sections/Components.vue'
import Composables from './sections/Composables.vue'
import Preview from './sections/Preview.vue'

const views = { install: Installation, requirements: Requirements, themes: Themes, components: Components, preview: Preview, composables: Composables }

// Hash history keeps the demo hostable as static files (GitHub Pages etc.) with no
// server rewrites. Each section carries its title in meta for the window chrome.
export const router = createRouter({
  history: createWebHistory(),
  // Hash links (#cmp-button, "On this page") scroll to their heading; headings carry a
  // scroll-margin for the sticky navbar (docs.css).
  scrollBehavior: (to, _from, saved) => saved ?? (to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0 }),
  routes: [
    { path: '/', redirect: SECTIONS[0].path },
    ...SECTIONS.map(s => ({
      path: s.path,
      name: s.id,
      component: views[s.id],
      meta: { title: s.title },
    })),
  ],
})
