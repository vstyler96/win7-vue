import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { SECTIONS } from './catalog'
import Installation from './sections/Installation.vue'
import Requirements from './sections/Requirements.vue'
import Themes from './sections/Themes.vue'
import Components from './sections/Components.vue'

const views = { install: Installation, requirements: Requirements, themes: Themes, components: Components }

// Hash history keeps the demo hostable as static files (GitHub Pages etc.) with no
// server rewrites. Each section carries its title in meta for the window chrome.
export const router = createRouter({
  history: createWebHistory(),
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
