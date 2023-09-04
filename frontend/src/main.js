import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import App from "@/App.vue"

import Home from "@/views/Home.vue"
import About from "@/views/About.vue"
import Movies from "@/views/Movies.vue"
import Contact from "@/views/Contact.vue"
import Admin from "@/views/Admin.vue"
import Login from "@/views/Login.vue"
import "bootstrap/dist/css/bootstrap.css"
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"

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
    // Optionally add meta field if you want to mark this route for authentication or admin checks.
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount("#app")
