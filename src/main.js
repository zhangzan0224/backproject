import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入element ui
import ElementUI from 'element-ui'

// 导入element 的样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局的样式
import '@/style/index.scss'
// 注册使用element插件
Vue.use(ElementUI)
Vue.config.productionTip = false
const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this // 安装全局事件总线
  }
}).$mount('#app')
