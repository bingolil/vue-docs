import { createApp } from 'vue';
import antd from 'ant-design-vue';
import * as Icons from '@ant-design/icons-vue'
import 'normalize.css'; // 重置各个浏览器基础样式
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

// 全局引入icon图标
const icons: any = Icons;
for (const i in icons) {
  app.component(i, icons[i]);
}
app.mount('#app')
