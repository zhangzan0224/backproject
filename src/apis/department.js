// 部门管理对应的api
// 查询部门 /api/dept
import requests from '@/utils/requests'

export const reqGetDept = (params) =>
  requests({
    url: '/api/dept',
    params
  })
