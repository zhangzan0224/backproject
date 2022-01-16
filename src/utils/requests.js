import axios from 'axios'
// 导入elemntui 中的通知模块
import { Notification } from 'element-ui'
// 引入router
import router from '@/router'
// 引入请求根路径
const baseURL = process.env.VUE_APP_BASE_URL
// 创建一个axios实例
const requests = axios.create({
  timeout: 3000,
  baseURL
})
// 添加请求拦截器
requests.interceptors.request.use(
  function (config) {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = window.localStorage.getItem('token')
    }
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
requests.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // console.dir(error) // 可以类似于对象的打开
    const { data, status } = error.response
    if (status === 400) {
      Notification({
        title: '错误',
        message: data.message,
        type: 'error'
      })
    }
    //  Unauthorized 状态码401,未认证
    // 如果状态码是500,系统内部错误 ,可能是token错误了
    if (status === 500 || status === 401) {
      // console.log('500')
      // 清空localstote的值
      localStorage.clear()
      router.push('/login')
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default requests
