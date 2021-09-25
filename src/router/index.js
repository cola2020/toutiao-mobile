import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login')
    },
    {
        path: '/',
        // name: 'layout', // 如果有默认的子路由,那么它的 name 没有意义
        component: () => import('@/views/layout'),
        children: [
            {
                // 默认子路由,只能有一个
                path: '',
                name: '/home',
                // 路由懒加载
                component: () => import('@/views/home')
            },
            {
                path: 'qa',
                name: 'qa',
                component: () => import('@/views/qa')
            },
            {
                path: '/video',
                name: 'video',
                component: () => import('@/views/video')
            },
            {
                path: '/my',
                name: 'my',
                component: () => import('@/views/my')
            }
        ]
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search')
    },
    // 动态路由
    {
        path: '/article/:articleId',
        name: 'article',
        component: () => import('@/views/article'),
        // props: true 开启 props 传参,可以把路由参数映射到组件上,注意组件中 props 接收使用的name是参数
        props: true
    },
    {
        name: 'user-profile',
        path: '/user/profile',
        component: () => import('@/views/user-profile')
    }

]

const router = new VueRouter({
    routes
})

export default router
