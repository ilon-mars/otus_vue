import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import '@/assets/styles/_main.sass';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router).mount('#app');
