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

export function update (params) {
  return request({
    url: '/category/update',
    method: 'post',
    params
  })
}

export function remove (params) {
  return request({
    url: '/category/delete',
    method: 'post',
    params
  })
}