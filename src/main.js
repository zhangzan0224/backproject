import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 导入element ui
import ElementUI from 'element-ui';
// cross
// 导入element 的样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入全局的样式
import '@/style/index.scss';
// 导入所有的api
import API from '@/apis';
import permission from '@/utils/permission';
// 引入loading插件
import loading from '@/views/loading/loading';
import '@/assets/iconfont/iconfont.css' // permission control
// import 'vue-city-bspicker'

Vue.use(loading);
Vue.directive('permission', permission);
// 注册使用element插件
Vue.use(ElementUI, {
  size: 'mini'
});
Vue.config.productionTip = false;
Vue.prototype.$api = API;
new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this; // 安装全局事件总线
  }
}).$mount('#app');
