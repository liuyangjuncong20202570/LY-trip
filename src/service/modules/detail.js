import request from '../request'

export const getDetailinfos = (houseId) => {
  return request.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}
