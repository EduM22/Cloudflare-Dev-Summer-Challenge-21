import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { store } from './store/store'
import { createMetaManager } from 'vue-meta'
import { router } from './router/router'

createApp(App).use(createMetaManager()).use(store).use(router).mount('#app')
