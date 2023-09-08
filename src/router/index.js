import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"
import About from "@/views/About.vue"
import Movies from "@/views/Movies.vue"
import Contact from "@/views/Contact.vue"
import Admin from "@/views/Admin.vue"
import AdminDashboard from "@/views/AdminDashboard.vue"
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"
import store from "@/store"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/movies",
    name: "Movies",
    component: Movies,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/admin-dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    children: [
      {
        path: "movies",
        component: () => import("@/views/AdminManageMovies.vue"),
      },
      {
        path: "movies/create",
        component: () => import("@/views/AdminCreateMovie.vue"),
      },
      {
        path: "movies/edit",
        component: () => import("@/views/AdminEditMovie.vue"),
      },
      {
        path: "users",
        component: () => import("@/views/AdminUsers.vue"),
      },
    ],
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
      next() // Proceed if authenticated
    }
  } else {
    // For routes that don't require authentication:
    if (to.path === "/login" && store.state.isAuthenticated) {
      // If the user is trying to access the login page but is already authenticated
      next({ path: "/" }) // Redirect to the home page
    } else {
      next() // Proceed if the route doesn't require authentication
    }
  }
})

export default router
