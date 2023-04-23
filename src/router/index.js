import Vue from 'vue';
import VueRouter from 'vue-router';
//  引入store
import store from '@/store';
import Layout from '@/views/Layout';
// 重新修改路由数据
import { rebulidMenu } from '@/utils/rebulidMenu';
Vue.use(VueRouter);
// 需要重写VueRouter.prototype原型对象身上的push|replace方法
// 先把VueRouter.prototype身上的push|replace方法进行保存一份
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
// !1重写VueRouter.prototype身上的push方法了
// VueRouter.prototype.push = function (location, resolve, reject) {
//   // 第一个形参：路由跳转的配置对象（query|params））
//   // 第二个参数：undefined|箭头函数（成功的回调）
//   // 第三个参数:undefined|箭头函数（失败的回调）
//   if (resolve && reject) {
//     // push方法传递第二个参数|第三个参数（箭头函数）
//     // originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
//     originPush.call(this, location, resolve, reject)
//   } else {
//     // push方法没有产生第二个参数|第三个参数
//     originPush.call(
//       this,
//       location,
//       () => {},
//       () => {}
//     )
//   }
// }
Vue.prototype.push = function (location) {
  return originPush.call(this, location).catch((error) => error);
};
// 重写VueRouter.prototype身上的replace方法了
// VueRouter.prototype.replace = function (location, resolve, reject) {
//   if (resolve && reject) {
//     originReplace.call(this, location, resolve, reject)
//   } else {
//     originReplace.call(
//       this,
//       location,
//       () => {},
//       () => {}
//     )
//   }
// }
Vue.prototype.replace = function (location) {
  return originReplace.call(this, location).catch((error) => error);
};
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login')
  },

  {
    path: '/test',
    name: 'Test',
    component: () =>
      import(/* webpackChunkName: "test" */ '@/views/test/88.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login')
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '主页'
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});
// 设置未登录可以去的页面白名单
const whiteList = ['/login', '/register', '/test'];
// 设置路由导航守卫
router.beforeEach((to, from, next) => {
  // to要去的页面 from从哪里来 next放行
  const token = localStorage.getItem('token');
  if (token) {
    if (to.path === '/login') {
      next({ path: '/home' });
    } else {
      // 需判断是否存在菜单,没有就去加载菜单
      if (!store.state.menu.length) {
        loadMenus(to, next);
      } else {
        next();
      }
    }
  } else {
    // 不在白名单中
    if (!whiteList.includes(to.path)) {
      next('/login');
    } else {
      next();
    }
  }
});
// 动态加载路由
/**
 * 1 转换菜单
 * 2 重置路由,要不会出现重复的
 * 3 转换菜单插入到路由表
 * 4 将404加入到路由表中
 */
function loadMenus (to, next) {
  // 1 转换菜单
  const myRoutes = rebulidMenu(JSON.parse(localStorage.getItem('menu')) || []);
  // 将路由信息存到store中
  store.commit('SET_MENU', myRoutes);
  // 添加新的路由
  routes.push(...myRoutes);
  // !重置路由
  router.matcher = new VueRouter().matcher;
  // 添加
  routes.forEach((item) => {
    router.addRoute(item);
  });
  // 添加404页面
  router.addRoute({
    path: '*',
    name: '404',
    component: (resolve) => require(['@/views/404'], resolve)
  });
  // console.log('to.path', to.path);
  next({ path: to.path });
}
export default router;
