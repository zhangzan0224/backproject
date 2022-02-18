import requests from '@/utils/requests'

// 获取验证码
export const reqAuthCode = () =>
  requests({
    url: '/auth/code'
  })
// 登录授权
export const reqAuthLogin = (data) =>
  requests({
    url: '/auth/login',
    data,
    method: 'post'
  })
export const reqGetUsersList = (params) =>
  requests({
    method: 'get',
    url: '/api/users',
    params
  })
// 修改用户
export const reqUpdateUser = (data) =>
  requests({
    url: '/api/users',
    method: 'put',
    data
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  })
