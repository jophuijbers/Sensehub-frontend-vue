import {SET_UPLOAD, SET_UPLOADS} from "@/store/mutations.type";
import {MARK_AS_WATCHED} from "../mutations.type";

const mutations = {
    [SET_UPLOADS](state, uploads) {
        state.uploads = uploads
    },
    [SET_UPLOAD](state, upload) {
        state.upload = upload
    },
    [MARK_AS_WATCHED](state, id) {
        let video = state.upload.videos.find(video => video.id === id)
        video.hasWatched = true
    }
}

export default mutations