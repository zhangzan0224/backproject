import requests from '@/utils/requests'
export const reqGetUsers = (params) =>
  requests({
    method: 'get',
    url: '/api/users',
    params
  })
