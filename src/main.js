import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import pinia from './store/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

createApp(App).use(pinia).use(router).mount('#app');
