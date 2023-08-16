import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import MultiButton from './components/UI/MultiButton.vue';
import RadioInput from './components/UI/RadioInput.vue';

const app = createApp(App)
.use(router)
.component('multi-button', MultiButton)
.component('radio-input', RadioInput)
.mount('#app')
