import requests from '@/utils/requests'
/* /api/roles/all
返回全部的角色 */
export const reqAllRoles = () =>
  requests({
    url: '/api/roles/all',
    method: 'get'
  })
