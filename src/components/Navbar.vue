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
          <router-link to="/" class="nav-link"
            ><i class="fas fa-home"></i> Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link"
            ><i class="fas fa-info-circle"></i> About</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/movies" class="nav-link"
            ><i class="fas fa-film"></i> Movies</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/contact" class="nav-link"
            ><i class="fas fa-envelope"></i> Contact</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/admin" class="nav-link"
            ><i class="fas fa-user-shield"></i> Admin</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/profile" class="nav-link"
            ><i class="fas fa-user"></i> Profile</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/cart" class="nav-link">
            <i class="fa fa-shopping-cart"></i>
            <span
              v-if="cartItemCount"
              class="cart-counter"
              >{{ cartItemCount }}</span
            >
          </router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <a class="nav-link" @click="performLogout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['isAuthenticated']),
    ...mapGetters(['cartItemCount']),  // Ensure you have this getter in your Vuex store
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

.nav-item .nav-link:hover {
    color: gold !important;
}

.cart-counter {
    background-color: red;
    border-radius: 50%;
    padding: 2px 8px;
    font-size: 12px;
    margin-left: 5px;
    vertical-align: middle;
    color: white;
}

.fa-shopping-cart, .fas.fa-film, .fas.fa-envelope, .fas.fa-user-shield, .fas.fa-user, .fas.fa-home, .fas.fa-info-circle {
    margin-right: 5px;  /* Spacing between icon and text */
}
</style>
