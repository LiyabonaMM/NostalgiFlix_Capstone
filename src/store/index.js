import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.isAuthenticated = value
    },
  },
  actions: {
    setAuthenticated({ commit }, value) {
      commit("SET_AUTHENTICATED", value)
    },
  },
})
