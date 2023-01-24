import { createPinia } from 'pinia'
import { createSSRApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.use(router)
  return { app, router }
}