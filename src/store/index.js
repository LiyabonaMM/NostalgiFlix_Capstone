import { createStore } from "vuex"

export default createStore({
  state: {
    isAuthenticated: false,
    token: null,
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.isAuthenticated = value
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
  },
  actions: {
    setAuthenticated({ commit }, value) {
      commit("SET_AUTHENTICATED", value)
    },
    setToken({ commit }, token) {
      commit("SET_TOKEN", token)
    },
  },
})
