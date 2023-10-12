import axios from 'axios'
import { Message } from '@arco-design/web-vue'

const service = axios.create({
  timeout: 30000
})

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (data) => {
    return data
  },
  (error) => {
    Message.error(error)
    return Promise.reject(error)
  }
)

export default service
