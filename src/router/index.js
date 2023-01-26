import Vue from 'vue'
import VueRouter from 'vue-router'
import authGuard from './auth.guard'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: () => import('../layouts/LoginLayout'),
        children: [
            {
                path: '/',
                name: 'login',
                component: () => import('../pages/Login')
            }
        ]
    },
    {
        path: '/',
        component: () => import('../layouts/MainLayout'),
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('../pages/Home')
            },
            {
                path: '/watch',
                name: 'watch',
                component: () => import('../pages/Watch')
            },
            {
                path: '/upload',
                name: 'upload',
                component: () => import('../pages/Upload')
            },
            {
                path: '/edit/:id',
                name: 'edit',
                component: () => import('../pages/Edit')
            },
            {
                path: '/admin',
                name: 'admin',
                component: () => import('../pages/Admin')
            }
        ]
    },
    {
        path: '/cinema',
        component: () => import('../layouts/CinemaLayout'),
        children: [
            {
                path: '/cinema',
                name: 'cinema',
                component: () => import('../pages/Cinema'),
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

authGuard(router)

export default router