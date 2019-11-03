import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const whiteList = [ '/login','/register' ] // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    // token存在store中即可
    if (store.state.user.token) {
        if (to.path === '/login') {
            next()
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            // 设置面包屑文本信息
            let arr = to.meta.title ? to.meta.title.split(',') : []
            store.commit('SET_TITLE', arr)
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
