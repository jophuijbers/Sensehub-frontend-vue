import {SET_WATCH_LIST} from "@/store/mutations.type";

const mutations = {
    [SET_WATCH_LIST](state, watchList) {
        state.watchList = watchList
    }
}

export default mutations