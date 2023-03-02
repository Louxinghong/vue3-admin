import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'https://api.bilibili.com'

const service = axios.create({
  baseURL,
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
    ElMessage.error(error)
    return Promise.reject(error)
  }
)

export default service
