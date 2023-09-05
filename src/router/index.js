import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import store from "@/store" // Update this path to point to your Vuex store

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/movies",
    name: "movies",
    component: () =>
      import(/* webpackChunkName: "movies" */ "../views/Movies.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.state.isAuthenticated) {
        next("/login")
      } else {
        next()
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
