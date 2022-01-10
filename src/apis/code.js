import requests from '@/utils/requests'

export const reqAuthCode = (_) =>
  requests({
    url: '/auth/code'
  })
