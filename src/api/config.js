import axios from 'axios'

export const BASEURL = 'http://localhost:3000' //本地api

//axios 的实例及拦截器配置
const axiosInstance = axios.create({
  baseURL: BASEURL
})

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err,'接口错误')
  }
)

export {
  axiosInstance
};