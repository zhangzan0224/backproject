import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入element ui
import ElementUI from 'element-ui'

// 导入全局样式
import '../public/css/global.css'
// 导入element 的样式
import 'element-ui/lib/theme-chalk/index.css'
// 注册使用element插件
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
