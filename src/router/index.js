import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/Layout.vue';

Vue.use(Router)
export const constantRoutes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path:'/login',
        component:() => import('../views/login/index')
    },
    {
        path:'/register',
        component:() => import('../views/register/index')
    },
    {
        path: '/home',
        component: Layout,
        redirect: '/home',
        name: 'home',
        children: [
            {
                path: '/',
                redirect: 'categoryManage'
            },
            {
                path: 'categoryManage',
                name: 'categoryManage',
                component: () => import('../views/system-manage/category/CategoryManage'),
                meta: {
                    title: '类别管理'
                }
            },{
                path: 'addArticle',
                name:'addArticle',
                component: () => import('../views/system-manage/article/AddArticle'),
                meta: {
                    title: '新增文章'
                }
            }
        ]
    }
]

const createRouter = () => new Router({
    mode: 'history',
    routes: constantRoutes
})

const router = createRouter()

export default router
