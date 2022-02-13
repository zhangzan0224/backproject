// 获取前端所需的菜单
// /api/menus/build
import requests from '@/utils/requests'
export const reqBuildMemu = () =>
  requests({
    url: '/api/menus/build'
  })
