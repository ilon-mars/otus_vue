import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/styles/_main.sass';

const app = createApp(App);

app.use(router).mount('#app');
