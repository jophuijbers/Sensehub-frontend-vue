import ApiService from "@/services/api.service";
import {
    ADD_TO_WATCH_LIST,
    FETCH_WATCH_LIST,
    REMOVE_FROM_WATCH_LIST,
} from "@/store/actions.type";
import {SET_WATCH_LIST} from "@/store/mutations.type";

const actions = {
    async [FETCH_WATCH_LIST](context) {
        const { data } = await ApiService.get('watchlist')
        await context.commit(SET_WATCH_LIST, data)
    },

    async [ADD_TO_WATCH_LIST](context, collectionId) {
        const { data } = await ApiService.post(`watchlist/${collectionId}`)
        await context.commit(SET_WATCH_LIST, data)
    },

    async [REMOVE_FROM_WATCH_LIST](context, collectionId) {
        const { data } = await ApiService.delete(`watchlist/${collectionId}`)
        await context.commit(SET_WATCH_LIST, data)
    }
}

export default actions