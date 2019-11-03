import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例

const service = axios.create({
    baseURL: "http://192.168.159.1:3000", // api的base_url
    timeout: 50000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    if (store.state.user.token) {
        config.headers.Authorization = store.state.user.token;
    }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
        /**
        * code为非0是抛错
        */
        const res = response.data
        if (response.data.code !== 0) {
            Message({
                message: res.content,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject('error')
        } else {
            return response.data
        }
    }, error => {
        const response = error.response
        // 401:非法的token; 402:其他客户端登录了;  403:Token 过期了;
        if (response.status === 401 || response.status === 402 || response.status === 403) {
            MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.dispatch('FedLogOut').then(() => {
                    location.reload()// 为了重新实例化vue-router对象 避免bug
                })
            })
        }
        return Promise.reject(error)
    })

export default service
