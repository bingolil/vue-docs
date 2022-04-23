import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta { // 定义路由元数据接口
    // 全局路由
    globalAuth: boolean;
  }
}
