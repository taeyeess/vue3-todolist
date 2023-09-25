// import './assets/main.css'
// import '@/styles/main.scss'


import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { createRouter } from './router'


export function createApp() {
    
    const app = createSSRApp(App)
    const pinia = createPinia()

    const isSSR = import.meta.env.SSR;
    // csr일 경우 pinia state hydrate
    if (!isSSR) {
      pinia.state.value = JSON.parse(window.__pinia);
    }
    console.log(pinia.state.value);

    app.use(pinia)
    const router = createRouter()
    app.use(router)

    return { app, router, pinia }
}
