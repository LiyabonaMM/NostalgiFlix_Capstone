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
import Swal from 'sweetalert2';
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
    async logout() {
      this.$store.commit('setAuthenticated', false);

      // Show sweet alert and refresh the page once it's confirmed
      await Swal.fire({
        icon: 'success',
        title: 'Logged Out Successfully',
        text: 'You have been logged out.',
        timer: 1500,
        background: '#2c2c2c',
        iconColor: 'gold',
        confirmButtonColor: 'gold'
      });

      // Refresh the page
      //location.reload();
      this.$router.push('/');
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
  flex-wrap: wrap;  /* Allow the items to wrap in smaller screens */
  justify-content: space-between; /* Distribute space evenly between the links */
  gap: 20px;
  margin-bottom: 20px;
}

.nav-link, button {
  flex: 1 0 calc(48% - 10px); /* Take roughly half the container's width accounting for the gap */
  display: flex;
  align-items: center;
  justify-content: center; /* Center the items horizontally */
  gap: 8px;
  padding: 10px 15px;
  background-color: #444;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
  text-align: center; /* Ensures text is centered even if there's no icon */
}

.nav-link:hover, button:hover {
  background-color: #555;
  transform: scale(1.05);
}

router-link, button {
  text-decoration: none;
  color: #333;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

router-link.active, router-link:hover {
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

/* Media Queries for larger screens */
@media screen and (min-width: 768px) {
  .nav-link, button {
    flex: 1 0 auto; /* Restore natural width for larger screens */
  }
}
</style>
