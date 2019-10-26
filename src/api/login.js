import request from '../utils/request'

export function login(params) {
    return request({
        url: '/users/login',
        method: 'post',
        data: params
    })
}

export function register(params) {
    return request({
        url: '/users/register',
        method: 'post',
        data: params
    })
}

export function getInfo(token) {
    return request({
        url: '/users/info',
        method: 'get',
        params: { token }
    })
}
