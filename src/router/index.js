import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"
import About from "@/views/About.vue"
import Movies from "@/views/Movies.vue"
import MovieDetails from "@/views/MovieDetails.vue"
import Contact from "@/views/Contact.vue"
import Admin from "@/views/Admin.vue"
import Profile from "@/views/Profile.vue"
import AdminDashboard from "@/views/AdminDashboard.vue"
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"
import Checkout from "@/views/Checkout.vue"
import ThankYou from "@/views/ThankYou.vue"
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
    path: "/movie/:id", // Dynamic route for movie details
    name: "MovieDetails",
    component: MovieDetails,
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
    path: "/profile",
    name: "Profile",
    component: Profile,
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
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/thank-you",
    name: "ThankYou",
    component: ThankYou,
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
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.isAuthenticated) {
      next({ path: "/login" })
    } else {
      next()
    }
  } else {
    if (to.path === "/login" && store.state.isAuthenticated) {
      next({ path: "/" })
    } else {
      next()
    }
  }
})

export default router
