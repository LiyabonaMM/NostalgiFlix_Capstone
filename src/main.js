import { createApp } from "vue"
// import { createRouter, createWebHistory } from "vue-router"
import App from "@/App.vue"

import router from "@/router"

import store from "@/store" // Import the store

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"

// const routes = [
//   {
//     path: "/",
//     name: "Home",
//     component: Home,
//   },
//   {
//     path: "/about",
//     name: "About",
//     component: About,
//   },
//   {
//     path: "/movies",
//     name: "Movies",
//     component: Movies,
//   },
//   {
//     path: "/contact",
//     name: "Contact",
//     component: Contact,
//   },
//   {
//     path: "/admin",
//     name: "Admin",
//     component: Admin,
//     // Optionally add meta field if you want to mark this route for authentication or admin checks.
//     meta: { requiresAuth: true, isAdmin: true },
//   },
//   {
//     path: "/login",
//     name: "Login",
//     component: Login,
//   },
//   {
//     path: "/register",
//     name: "Register",
//     component: Register,
//   },
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// })

const app = createApp(App)

app.use(store) // Use the store
app.use(router)

app.mount("#app")
