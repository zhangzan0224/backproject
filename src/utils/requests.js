import axios from 'axios'
// 导入elemntui 中的通知模块
import { Notification } from 'element-ui'
// 创建一个axios实例
const requests = axios.create({
  timeout: 3000
})
// 添加请求拦截器
requests.interceptors.request.use(
  function (config) {
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
    const { message, status } = error.response.data
    if (status === 400) {
      Notification({
        title: '错误',
        message,
        type: 'error'
      })
      return
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default requests
