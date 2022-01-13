import requests from '@/utils/requests'
// 获取验证码
export const reqAuthCode = (_) =>
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
