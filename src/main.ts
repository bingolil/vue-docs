import { createApp } from 'vue';
import antd from 'ant-design-vue';
import 'normalize.css';
import 'ant-design-vue/dist/antd.css';

import App from '@/App.vue';
import router from '@/router';
import { store } from '@/store';
import { i18n } from '@/i18n';

const app = createApp(App);
app.use(store);
app.use(antd);
app.use(router);
app.use(i18n);
app.mount('#app')
