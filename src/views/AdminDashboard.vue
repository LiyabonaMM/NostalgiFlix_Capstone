<template>
  <div class="admin-dashboard">
    <div v-if="isAuthenticated">
      <h1>Admin Dashboard</h1>

      <!-- Navigation Links -->
      <nav>
        <router-link to="/admin-dashboard/movies" class="nav-link"
          ><i class="fas fa-film"></i> Manage Movies</router-link
        >
        <router-link to="/admin-dashboard/movies/create" class="nav-link"
          ><i class="fas fa-plus-circle"></i> Create Movie</router-link
        >
        <router-link to="/admin-dashboard/users" class="nav-link"
          ><i class="fas fa-users"></i> Manage Users</router-link
        >
        <button @click="logout">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
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
// Assuming that you're using FontAwesome for icons
// Add this line at the top of your script to use FontAwesome icons in Vue
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'AdminDashboard',
  components: {
    FontAwesomeIcon
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  watch: {
    isAuthenticated(val) {
      if (!val) {
        this.$router.push("/admin");
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

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background-color: #444;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.nav-link:hover {
  background-color: #555;
  transform: scale(1.05);
}

router-link, button {
  text-decoration: none;
  padding: 10px 15px;
  background-color: gold;
  color: #333;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

router-link.active, router-link:hover, button:hover {
  background-color: #bbae00;
}

button {
  background-color: #8B4513;
}

button:hover {
  background-color: #A0522D;
}

/* For the FontAwesome icons */
.fas {
  font-size: 16px;
  margin-right: 5px;
}
</style>
