// 导入axios
import axios from 'axios'

// 导入token文件
import Store from '@/store'

const request = axios.create({
  baseURL: 'http://liufusong.top:8080'
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = Store.state.token

    // 注入token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    console.log(error)
  }
)

export default request
