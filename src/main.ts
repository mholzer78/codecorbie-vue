import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import MultiButton from './components/UI/MultiButton.vue';

const app = createApp(App)
.use(router)
.component('multi-button', MultiButton)
.mount('#app')
