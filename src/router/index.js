import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/Layout'
// 引入系统管理的路由
import system from '@/router/system'
// 引入系统监控的路由
import monitor from '@/router/monitor'
Vue.use(VueRouter)
// 需要重写VueRouter.prototype原型对象身上的push|replace方法
// 先把VueRouter.prototype身上的push|replace方法进行保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
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
  return originPush.call(this, location).catch((error) => error)
}
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
  return originReplace.call(this, location).catch((error) => error)
}
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login')
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
        component: () => import(/* webpackChunkName: "home" */ '../views/Home')
      }
    ]
  },
  {
    path: '/system',
    name: 'System',
    component: Layout,
    meta: {
      title: '系统管理'
    },
    children: [...system]
  },
  {
    path: '/monitor',
    name: 'Monitor',
    component: Layout,
    meta: {
      title: '系统监控'
    },
    children: [...monitor]
  }
]

const router = new VueRouter({
  routes
})

export default router
