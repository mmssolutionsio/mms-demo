import '../.nswow/app.scss'

import useConfig from '@/composables/config'
import { createApp } from 'vue'
import { initI18n } from './i18n'

import App from './App.vue'
import router from './router'

useConfig().then(async () => {
  const awi18n = await initI18n()

  const app = createApp(App)
  app.use(awi18n)
  app.use(router)

  const instance = app.mount('#app')

  window.app = app
  window.appInstance = instance
})
