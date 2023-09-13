import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router"
import store from "@/store" // Import the store
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import "./store/global.css"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faFilm,
  faPlusCircle,
  faUsers,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faFilm, faPlusCircle, faUsers, faSignOutAlt)

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon) // Register the FontAwesomeIcon globally

app.use(store) // Use the store

// Initialize the store's state based on localStorage
store.dispatch("initializeStore")

app.use(router)

app.mount("#app")
