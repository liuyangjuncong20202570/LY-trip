import request from '../request'
import axios from 'axios'

// export const getCityAll = async () => {
//   const { data } = await request.get({
//     url: 'city/all'
//   })
//   return data
// }

export const getCityAll = () => {
  return request.get({
    url: 'city/all'
  })
}

// 获取城市IP地址
// export const getCityIp = () => {
//   return request.get({
//     url: '/sohu/cityjson'
//   })
// }

// 调用百度地图api获取地址信息
export const getLocation = () => {
  return axios.request({
    method: 'get',
    url: 'http://localhost:5173/baidu',
    params: {
      ak: '3eqvh3LVfGFPGD4NZ7ZhToGn0dn8IIGd'
    }
  })
}
// export const getLocation = () => {
//   return axios.get("/ip?ak='3eqvh3LVfGFPGD4NZ7ZhToGn0dn8IIGd'")
// }
