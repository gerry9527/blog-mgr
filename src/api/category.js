import request from '../utils/request'

export function save(params) {
  return request({
    url: '/category/save',
    method: 'post',
    params: params
  })
}
