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
      localStorage.setItem("isAuthenticated", value.toString())
    },
    setToken({ commit }, token) {
      commit("SET_TOKEN", token)
      localStorage.setItem("token", token)
    },
    logout({ commit }) {
      commit("SET_TOKEN", null)
      commit("SET_AUTHENTICATED", false)
      localStorage.removeItem("token")
      localStorage.removeItem("isAuthenticated")
    },
    initializeStore({ commit }) {
      if (localStorage.getItem("isAuthenticated")) {
        commit(
          "SET_AUTHENTICATED",
          JSON.parse(localStorage.getItem("isAuthenticated"))
        )
      }
      if (localStorage.getItem("token")) {
        commit("SET_TOKEN", localStorage.getItem("token"))
      }
    },
  },
})
