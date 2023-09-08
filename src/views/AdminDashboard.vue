<template>
  <div class="admin-dashboard">
    <div v-if="isAuthenticated">
      <h1>Admin Dashboard</h1>

      <!-- Navigation Links -->
      <nav>
        <router-link to="/admin-dashboard/movies">Manage Movies</router-link>
        <router-link to="/admin-dashboard/movies/create"
          >Create Movie</router-link
        >
        <router-link to="/admin-dashboard/movies/edit">Edit Movie</router-link>
        <router-link to="/admin-dashboard/users">Manage Users</router-link>
        <button @click="logout">Logout</button>
      </nav>

      <!-- Display the Components -->
      <router-view></router-view>
    </div>
    <div v-else>
      <p>You are not authenticated. Please log in first.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  watch: {
    isAuthenticated(val) {
      if (!val) {
        this.$router.push("/admin");  // Redirect back to Admin login if not authenticated
      }
    }
  },
  methods: {
    logout() {
      this.$store.commit('setAuthenticated', false);
      this.$router.push('/admin');
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  background-color: #1a1a1a;
  color: #FFFFFF;
  min-height: 100vh;
}

h1 {
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

nav {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

router-link, button {
  text-decoration: none;
  padding: 10px 15px;
  background-color: #007BFF;
  color: #FFFFFF;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

router-link.active, router-link:hover, button:hover {
  background-color: #0056b3;
}

button {
  background-color: #FF5555;
}

button:hover {
  background-color: #DD3333;
}
</style>
