// Allow async without adding more babel overhead
import 'regenerator-runtime/runtime'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App'
import routes from './routes'
import VueNear from './plugins/VueNear'
import { getContractIds } from './utils/config'

import './index.css'

// Create our application
const env = process.env.NODE_ENV || 'development'
const contractIds = getContractIds(env)
const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

// Use plugins
app.use(router)
app.use(VueNear, {
  env,
  config: {
    appTitle: 'Alias.cat',
    contractName: contractIds.alias
  }
})

app.mount('#app')
