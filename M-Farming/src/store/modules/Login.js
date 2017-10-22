import { fetchLogin } from './../../fetch/api'

const state = {
    loginInfo: {}
};
const actions = {
    LOGIN: ({ commit, state }, opts) => {
        return fetchLogin(opts).then(login => commit('GET_LOGIN_INFO', { login }))
    }
}
const mutations = {
    GET_LOGIN_INFO: (state, { login }) => {
        state.loginInfo = login.data;
    }
}

const getters = {
    getLoginInfo(state) {
        return state.loginInfo;
    }
}

export default {
    state, 
    actions,
    mutations,
    getters
}