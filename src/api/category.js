import request from '../utils/request'

export function save(params) {
  return request({
    url: '/category/save',
    method: 'post',
    params
  })
}

export function query (params) {
  return request({
    url: '/category/query',
    method: 'post',
    params
  })
}
