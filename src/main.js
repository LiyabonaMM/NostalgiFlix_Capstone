import { createApp } from "vue"
// import { createRouter, createWebHistory } from "vue-router"
import App from "@/App.vue"

import router from "@/router"

import store from "@/store" // Import the store

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"

const app = createApp(App)

app.use(store) // Use the store
app.use(router)

app.mount("#app")
