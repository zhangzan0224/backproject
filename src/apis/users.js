import requests from '@/utils/requests'
var qs = require('qs')
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
export const reqGetUsersList = (params) => {
  params = qs.stringify(params, { arrayFormat: 'repeat' })
  // console.log('@@@', params)
  return requests({
    method: 'get',
    url: '/api/users?' + params
  })
}

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
// 删除用户 DELETE api/users

export const reqDeleteUser = (data) =>
  requests({
    url: 'api/users',
    data,
    method: 'delete'
  })

// 新增用户/api/users
export const reqAddUser = (data) =>
  requests({
    url: 'api/users',
    data,
    method: 'post'
  })
