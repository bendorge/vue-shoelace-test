import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.config.isCustomElement = tag => tag.startsWith('^sl-');
app.mount('#app');