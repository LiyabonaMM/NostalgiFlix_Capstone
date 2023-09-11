<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      <img
        src="https://i.ibb.co/WvgnfNL/Picsart-23-08-28-12-24-33-154.png"
        alt="logo"
        width="30"
        height="30"
        class="d-inline-block align-top"
      />
    </a>
    <!-- Corrected data attributes here -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/movies" class="nav-link">Movies</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin" class="nav-link">Admin</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item" v-if="isAuthenticated">
          <a class="nav-link" @click="performLogout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['logout']),
    async performLogout() {
      await this.logout();
      this.$router.push('/').then(() => location.reload());
    }
  }
};
</script>

<style scoped>
.navbar {
    font-family: 'Arial', sans-serif;
}
</style>
