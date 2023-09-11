import { createStore } from "vuex"
import jwtDecode from "jwt-decode"

export default createStore({
  state: {
    isAuthenticated: false,
    token: null,
    cart: [],
    userId: null, // Added the userId state.
  },

  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.isAuthenticated = value
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    ADD_TO_CART(state, item) {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      )
      if (existingItem) {
        existingItem.quantity++
      } else {
        item.quantity = 1
        state.cart.push(item)
      }
    },
    CLEAR_CART(state) {
      state.cart = []
    },
    INCREASE_ITEM_QUANTITY(state, item) {
      const foundItem = state.cart.find((cartItem) => cartItem.id === item.id)
      if (foundItem) {
        foundItem.quantity++
      }
    },
    DECREASE_ITEM_QUANTITY(state, item) {
      const foundItem = state.cart.find((cartItem) => cartItem.id === item.id)
      if (foundItem && foundItem.quantity > 1) {
        foundItem.quantity--
      } else if (foundItem && foundItem.quantity <= 1) {
        state.cart = state.cart.filter((cartItem) => cartItem.id !== item.id)
      }
    },
    REMOVE_FROM_CART(state, item) {
      state.cart = state.cart.filter((cartItem) => cartItem.id !== item.id)
    },
    SET_USER_ID(state, userId) {
      state.userId = userId
    },
  },

  actions: {
    setAuthenticated({ commit }, value) {
      commit("SET_AUTHENTICATED", value)
      localStorage.setItem("isAuthenticated", value.toString())
    },
    setToken({ commit }, token) {
      commit("SET_TOKEN", token)

      if (token) {
        const decoded = jwtDecode(token)
        commit("SET_USER_ID", decoded.userId) // Assuming your token payload has a userId field.
      } else {
        commit("SET_USER_ID", null)
      }

      localStorage.setItem("token", token)
    },
    addToCart({ commit }, item) {
      commit("ADD_TO_CART", item)
    },
    increaseItemQuantity({ commit }, item) {
      commit("INCREASE_ITEM_QUANTITY", item)
    },
    decreaseItemQuantity({ commit }, item) {
      commit("DECREASE_ITEM_QUANTITY", item)
    },
    removeFromCart({ commit }, item) {
      commit("REMOVE_FROM_CART", item)
    },
    clearCart({ commit }) {
      commit("CLEAR_CART")
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
        const decoded = jwtDecode(localStorage.getItem("token"))
        commit("SET_USER_ID", decoded.userId) // Decode user ID when initializing the store.
      }
    },
  },

  getters: {
    cartItemCount: (state) => state.cart.length,
    cartTotalPrice: (state) =>
      state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    userId: (state) => state.userId,
  },
})
