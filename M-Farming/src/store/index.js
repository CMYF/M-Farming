import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import Login from './modules/Login'
import Home from './modules/Home'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
    },
    actions,
    mutations,
    getters,
    modules: {
        Login,
        Home
    }
})
