import {SET_COLLECTION, SET_COLLECTIONS} from "@/store/mutations.type";
import {SET_VIDEO_AS_WATCHED} from "../mutations.type";

const mutations = {
    [SET_COLLECTIONS](state, collections) {
        state.collections = collections
    },
    [SET_COLLECTION](state, collection) {
        state.collection = collection
    },
    [SET_VIDEO_AS_WATCHED](state, id) {
        let video = state.collection.videos.find(video => video.id === id)
        video.hasWatched = true
    }
}

export default mutations