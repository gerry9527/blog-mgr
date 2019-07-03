import request from '@/utils/request'

export function login(username, password) {
    return request({
        url: '/users/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function register(username, password,confirmPassword,email) {
    return request({
        url: '/users/register',
        method: 'post',
        data: {
            username,
            password,
            confirmPassword,
            email
        }
    })
}

export function getInfo(token) {
    debugger
    return request({
        url: '/users/info',
        method: 'get',
        params: { token }
    })
}