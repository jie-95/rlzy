import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // request timeout
})

service.interceptors.request.use()
service.interceptors.response.use()

export default service
