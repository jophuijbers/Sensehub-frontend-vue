import ApiService from "@/services/api.service"
import {SET_COLLECTION, SET_COLLECTIONS} from "@/store/mutations.type";
import {FETCH_COLLECTION, FETCH_COLLECTIONS_WITH_TAG, FETCH_COLLECTIONS, CREATE_COLLECTION, UPDATE_COLLECTION, DELETE_COLLECTION} from "../actions.type";

const actions = {
    async [FETCH_COLLECTIONS](context, search) {
        let query = 'collections'
        if(search) query += `?search=${search}`

        const {data} = await ApiService.get(query)
        context.commit(SET_COLLECTIONS, data)
        return data
    },
    async [FETCH_COLLECTIONS_WITH_TAG](context, tag) {
        const {data} = await ApiService.get(`collections/?tag=${tag}`)
        return data
    },
    async [FETCH_COLLECTION](context, id) {
        const {data} = await ApiService.get(`collections/${id}`)
        context.commit(SET_COLLECTION, data)
    },
    async [CREATE_COLLECTION](context, payload) {
        const {data} = await ApiService.post('collections', payload)
        return data
    },
    async [UPDATE_COLLECTION](context, {id, payload}) {
        const {data} = await ApiService.patch(`collections/${id}`, payload)
        context.commit(SET_COLLECTION, data)
        return data
    },
    async [DELETE_COLLECTION](context, id) {
        await ApiService.delete(`collections/${id}`)
    }
}

export default actions