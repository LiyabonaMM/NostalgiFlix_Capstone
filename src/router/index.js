import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import store from "@/store" // Assuming this path correctly points to your Vuex store

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      requiresAuth: true, // Assuming you want to protect the about page
    },
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/movies",
    name: "movies",
    component: () =>
      import(/* webpackChunkName: "movies" */ "../views/Movies.vue"),
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if user is authenticated
    if (!store.state.isAuthenticated) {
      // Redirect to login if not authenticated
      next({ path: "/login" })
    } else {
      next()
    }
  } else {
    next() // If route doesn't require authentication, proceed
  }
})

export default router
