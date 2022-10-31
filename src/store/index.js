import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import users from './users'
import collections from './collections'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        users,
        collections
    }
})