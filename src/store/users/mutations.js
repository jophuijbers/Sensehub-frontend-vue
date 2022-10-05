import {ADD_USER, SET_USERS} from "@/store/mutations.type";

const mutations = {
    [SET_USERS](state, users) {
        state.users = users
    },
    [ADD_USER](state, user) {
        state.users.push(user)
    }
}

export default mutations