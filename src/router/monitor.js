export default [
  {
    path: 'online',
    name: 'Online',
    meta: {
      title: '在线用户'
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Monitor/Online')
  },

  {
    path: 'logs',
    name: 'Logs',
    meta: {
      title: '操作日志'
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Monitor/Logs')
  }
]
