import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/Layout.vue';

Vue.use(Router)
export const constantRoutes = [
    {
        path:'/login',
        component:() => import('@/views/login/index')
    },
    {
        path:'/register',
        component:() => import('@/views/register/index')
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        name: 'home',
        hidden: true,
        children: [{
            path: '/projectsManage',
            name:'projectsManage',
            component: () => import('@/views/projectsManage/index')
        },{
            path: '/APIManage',
            name:'APIManage',
            component: () => import('@/views/APIManage/index')
        }]
    }
]

const createRouter = () => new Router({
    routes:constantRoutes
})

const router = createRouter()

export default router