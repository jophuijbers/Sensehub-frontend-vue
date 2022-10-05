import ApiService from "@/services/api.service";
import {CHECK_AUTH, LOGIN, LOGOUT} from "@/store/actions.type";
import {PURGE_AUTH, SET_AUTH} from "@/store/mutations.type";
import {getToken, saveToken} from "@/services/local_storage.service";

const actions = {
    async [LOGIN](context, payload) {
        const { data } = await ApiService.post('auth/login', payload)
        context.commit(SET_AUTH, data.user)

        saveToken(data.token)
        await ApiService.setHeader()
    },
    async [CHECK_AUTH](context) {
        if (!getToken()) return context.commit(PURGE_AUTH)
        if (!context.getters.isAuthenticated) {
            await ApiService.setHeader()
            await ApiService.get('users/me')
                .then(({ data }) => {
                    context.commit(SET_AUTH, data.user)
                })
                .catch(() => {
                    context.commit(PURGE_AUTH)
                })
        }
    },
    [LOGOUT](context) {
        context.commit(PURGE_AUTH)
    }
}

export default actions