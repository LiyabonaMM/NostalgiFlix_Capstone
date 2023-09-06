// store/index.js
import { createStore } from "vuex"

export default createStore({
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
