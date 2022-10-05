import {
    PURGE_AUTH,
    SET_AUTH
} from '../mutations.type'
import {destroyToken} from "@/services/local_storage.service";

const mutations = {
    [SET_AUTH](state, user) {
        state.isAuthenticated = true
        state.user = user
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false
        state.user = {}
        destroyToken()
    }
}

export default mutations