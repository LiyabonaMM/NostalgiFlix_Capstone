import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router"
import store from "@/store" // Import the store
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import "./store/global.css"

const app = createApp(App)

app.use(store) // Use the store

// Initialize the store's state based on localStorage
store.dispatch("initializeStore")

app.use(router)

app.mount("#app")
