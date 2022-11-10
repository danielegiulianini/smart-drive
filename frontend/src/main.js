import { createApp } from 'vue'
import './style.css'
import './assets/style/global.scss'

import App from './App.vue'
import router from "./router/index"

createApp(App).use(router).mount('#app') 
