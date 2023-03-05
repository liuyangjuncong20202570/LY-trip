import request from '../request'

export const getIteminfo = () => {
  return request.get({
    url: '/favor/list'
  })
}

export const getHistory = () => {
  return request.get({
    url: '/favor/history'
  })
}
