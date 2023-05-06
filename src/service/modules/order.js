import request from '../request'

// 获得所有订单
export const getOrderList = (type) => {
  return request.get({
    url: `order/list?type=${type}`
  })
}
