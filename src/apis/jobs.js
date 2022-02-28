// 查询岗位  GET /api/job
import requests from '@/utils/requests'
export const reqGetJobs = () =>
  requests({
    url: '/api/job',
    method: 'get'
  })
