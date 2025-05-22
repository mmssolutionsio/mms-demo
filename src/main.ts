import '../.nswow/app.scss'

import useConfig from '@/composables/config'
import { createApp } from 'vue'
import { initI18n } from './i18n'

import App from './App.vue'
import router from './router'

useConfig().then(async () => {
  const awi18n = await initI18n()
  window.app = createApp(App)
  window.app.use(awi18n)
  window.app.use(router)
  window.app.mount('#app')
})
