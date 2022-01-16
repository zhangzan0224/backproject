import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
