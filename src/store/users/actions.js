import ApiService from "@/services/api.service"
import {CREATE_USER, DELETE_USER, FETCH_USERS} from "@/store/actions.type";
import {ADD_USER, SET_USERS} from "@/store/mutations.type";

const actions = {
    async [FETCH_USERS](context) {
        const { data } = await ApiService.get('users')
        context.commit(SET_USERS, data)
    },
    async [CREATE_USER](context, payload) {
        const { data } = await ApiService.post('users', payload)
        context.commit(ADD_USER, data)
    },
    async [DELETE_USER](context, userId) {
        await ApiService.delete(`users/${userId}`)
        await context.dispatch(FETCH_USERS)
    },
}

export default actions