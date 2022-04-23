module.exports = {
  devServer: {
    port: 3200, // 启动端口号
    open: true  // 启动后是否自动打开网页
  },
  chainWebpack: config => { // 去掉v-i18n浏览器告警部分
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
  }
}
