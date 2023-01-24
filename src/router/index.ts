import { createRouter, createMemoryHistory } from 'vue-router'
import App from '../App.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App,
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
