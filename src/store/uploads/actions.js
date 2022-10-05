import ApiService from "@/services/api.service"
import {SET_UPLOAD, SET_UPLOADS} from "@/store/mutations.type";
import {FETCH_UPLOAD, FETCH_UPLOADS_WITH_TAG, FETCH_UPLOADS, UPLOAD, DELETE_UPLOAD, PATCH_UPLOAD} from "../actions.type";

const actions = {
    async [FETCH_UPLOADS](context, search) {
        let query = 'uploads'
        if(search) query += `?search=${search}`

        const {data} = await ApiService.get(query)
        context.commit(SET_UPLOADS, data)
        return data
    },
    async [FETCH_UPLOADS_WITH_TAG](context, tag) {
        const {data} = await ApiService.get(`uploads/?tag=${tag}`)
        return data
    },
    async [FETCH_UPLOAD](context, id) {
        const {data} = await ApiService.get(`uploads/${id}`)
        context.commit(SET_UPLOAD, data)
    },
    async [UPLOAD](context, payload) {
        const {data} = await ApiService.post('uploads', payload)
        return data
    },
    async [PATCH_UPLOAD](context, {id, payload}) {
        const {data} = await ApiService.patch(`uploads/${id}`, payload)
        context.commit(SET_UPLOAD, data)
        return data
    },
    async [DELETE_UPLOAD](context, id) {
        await ApiService.delete(`uploads/${id}`)
    }
}

export default actions