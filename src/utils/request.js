import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

const timeout = 3600

function isCheckOut() {
  return (Date.now() - store.getters.HrsaasTime) / 1000 > timeout
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // request timeout
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    console.log(config)
    if (store.getters.token) {
      console.log('======', isCheckOut())
      if (isCheckOut()) {
        store.dispatch('user/logout')
        router.push('/login')
        Message.error('接口超时')
        return Promise.reject(new Error('接口超时'))
      }
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default service
