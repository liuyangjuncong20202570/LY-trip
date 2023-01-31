import request from '../request'

export const gethotSuggests = () => {
  return request.get({
    url: 'home/hotSuggests'
  })
}

export const getCatagorise = () => {
  return request.get({
    url: 'home/categories'
  })
}

export const getList = (currentPage) => {
  return request.get({
    url: 'home/houselist',
    params: {
      page: currentPage
    }
  })
}
