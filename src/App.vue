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
</style>
