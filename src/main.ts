import { createApp } from 'vue'
import 'highlight.js/styles/vs2015.css'
import App from './App.vue'
import { router } from './router'
import { createWinTheme } from 'win7-vue'
import { THEMES } from './catalog'

// Themes are whole upstream stylesheets, swapped at runtime by the theme plugin.
createApp(App)
  .use(router)
  .use(createWinTheme({
    defaultTheme: 'win7',
    themes: Object.fromEntries(THEMES.map(t => [t.key, t.theme])),
  }))
  .mount('#app')
