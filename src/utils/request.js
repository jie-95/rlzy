import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // request timeout
})

service.interceptors.request.use()
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (!success) {
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
