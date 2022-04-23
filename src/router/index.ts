import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/user/Login.vue';
import Register from '@/views/user/Register.vue';
import { store } from '@/store';

// 路由对象信息
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home, }, // 主页
  { path: '/login', name: 'Login', component: Login }, // 登录
  { path: '/register', name: 'Register', component: Register }, // 注册
]

// 创建路由
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  console.log('router beforEach...')
  if (to.meta.requireAuth && !!store.state.token) { // 存在路由守卫且存在令牌
    next();
  } else if (to.meta.requireAuth && !store.state.token) { // 存在路由守卫且无令牌
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
})

export default router;
