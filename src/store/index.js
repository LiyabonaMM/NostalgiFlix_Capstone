import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthenticated: false,
    token: null,
  },
  
  mutations: {
    // Sets the authentication status in the state
    SET_AUTHENTICATED(state, value) {
      state.isAuthenticated = value;
    },
    // Sets the user's token in the state
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  
  actions: {
    // Sets the authentication status both in the state and in localStorage
    setAuthenticated({ commit }, value) {
      commit("SET_AUTHENTICATED", value);
      localStorage.setItem("isAuthenticated", value.toString()); // Convert boolean to string for localStorage
    },
    // Sets the user's token both in the state and in localStorage
    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
      localStorage.setItem("token", token);
    },
    // Logs the user out, removes token and authentication status from state and localStorage
    logout({ commit }) {
      commit("SET_TOKEN", null);
      commit("SET_AUTHENTICATED", false);
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
    },
    // Initializes the store from values in localStorage when the app starts/reloads
    initializeStore({ commit }) {
      if (localStorage.getItem("isAuthenticated")) {
        commit(
          "SET_AUTHENTICATED",
          JSON.parse(localStorage.getItem("isAuthenticated")) // Parse string back to boolean
        );
      }
      if (localStorage.getItem("token")) {
        commit("SET_TOKEN", localStorage.getItem("token"));
      }
    },
  },
});
