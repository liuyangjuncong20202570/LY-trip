import axios from 'axios'
import useMain from '../../stores/modules/main'
const mainStore = useMain()
import { baseURL, timeout } from './config'
class LyRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
    // 给axios实例设定请求、拦截器用于设定是否显示加载动画
    this.instance.interceptors.request.use(
      (config) => {
        mainStore.isLoading = true
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        mainStore.isLoading = false
        return config
      },
      (err) => {
        mainStore.isLoading = false
        return err
      }
    )
  }
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get(config) {
    return this.request({ ...config, method: 'get' })
  }
  post(config) {
    return this.request({ ...config, method: 'post' })
  }
}

export default new LyRequest(baseURL, timeout)
