import store from '@/store'
import { CHECK_AUTH } from '@/store/actions.type'

export default (router) => {
    router.beforeEach(async (to, from, next) => {
        await store.dispatch(CHECK_AUTH)

        if (!store.getters.isAuthenticated && !to.path.startsWith('/login')) {
            next({ name: 'login' })
        }

        if (store.getters.isAuthenticated && to.path === '/login') {
            next({ name: 'home' })
        }

        if((to.path === '/admin' || to.path === '/upload') && !store.getters.user.isAdmin) {
            next({ name: 'home' })
        }

        next()
    })
}