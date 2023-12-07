import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
library.add(faMagnifyingGlass)


const app = createApp(App)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')