import { createApp } from 'vue'
import 'highlight.js/styles/vs.css'
import './style.css'
import App from './App.vue'
import { createWinTheme } from '../lib/main'

// Themes are whole upstream stylesheets, swapped at runtime by the theme plugin.
import css98 from '98.css/dist/98.css?url'
import cssXP from 'xp.css/dist/XP.css?url'
import css7 from '7.css/dist/7.css?url'
import cssSystem from '@sakun/system.css/dist/system.css?url'

createApp(App)
  .use(createWinTheme({
    defaultTheme: 'win7',
    themes: {
      win98: css98,
      winxp: cssXP,
      win7: css7,
      macos: { url: cssSystem, family: 'mac' },
    },
  }))
  .mount('#app')
