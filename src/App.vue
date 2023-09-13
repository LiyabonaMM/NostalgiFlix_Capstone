<template>
  <div id="app">
    <!-- Only show the navbar if the user is authenticated -->
    <Navbar v-if="isUserAuthenticated" />

    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  computed: {
    ...mapState(['isAuthenticated']),  // map isAuthenticated from store to local computed property

    isUserAuthenticated() {
      return this.isAuthenticated;
    }
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

Footer {
  margin-top: auto;
}

.content {
  margin-top: 80px;
}

.hidden {
  display: none;
}
body, h1, h2, h3, h4, h5, p, a, span {
   font-family: 'Montserrat', sans-serif !important;
}
</style>
