export default [
  {
    path: 'user',
    name: 'User',
    meta: {
      title: '用户管理'
    },
    component: () =>
      import(/* webpackChunkName: "system" */ '../views/Sytem/User')
  },
  {
    path: 'role',
    name: 'Role',
    meta: {
      title: '角色管理'
    },
    component: () =>
      import(/* webpackChunkName: "system" */ '../views/Sytem/Role')
  },
  {
    path: 'menu',
    name: 'Menu',
    meta: {
      title: '菜单管理'
    },
    component: () =>
      import(/* webpackChunkName: "system" */ '../views/Sytem/Menu')
  },
  {
    path: 'dept',
    name: 'Dept',
    meta: {
      title: '部门管理'
    },
    component: () =>
      import(/* webpackChunkName: "system" */ '../views/Sytem/Dept')
  }
]
