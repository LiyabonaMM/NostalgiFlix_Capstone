<template>
  <div v-if="isAuthenticated" class="admin-dashboard">
    <h1>Admin Dashboard</h1>

    <!-- Navigation Links -->
    <nav>
      <router-link to="/admin-dashboard/movies">Manage Movies</router-link>
      <router-link to="/admin-dashboard/movies/create"
        >Create Movie</router-link
      >
      <router-link to="/admin-dashboard/movies/edit">Edit Movie</router-link>
      <router-link to="/admin-dashboard/users">Manage Users</router-link>
    </nav>

    <!-- Display the Components -->
    <router-view></router-view>
  </div>
  <div v-else>
    <p>You are not authenticated. Please log in first.</p>
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
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

nav {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

router-link {
  text-decoration: none;
  padding: 10px 15px;
  background-color: #007BFF;
  color: #FFFFFF;
  border-radius: 5px;
  transition: background-color 0.3s;
}

router-link.active, router-link:hover {
  background-color: #0056b3;
}
</style>
