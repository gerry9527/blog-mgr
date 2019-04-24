import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRoutes = [
    {
        path:'/',
        component:() => import('@/views/login/index')
    },
    {
        path:'/register',
        component:() => import('@/views/register/index')
    }
]

const createRouter = () => new Router({
    routes:constantRoutes
})

const router = createRouter()

export default router