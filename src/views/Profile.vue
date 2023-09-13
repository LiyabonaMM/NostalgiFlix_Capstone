<template>
  <div class="profile-container bg-dark text-white">
    <!-- If no token is present, prompt user to login -->
    <div v-if="!token" class="center-content">
      <h1>Please Log In</h1>
      <p>Login to manage your profile.</p>
      <button @click="redirectToLogin" class="btn btn-gold">Login</button>
    </div>

    <!-- If token is present but profile hasn't been clicked to view -->
    <div v-else-if="token && !profileClicked" class="center-content">
      <button @click="loadProfile" class="btn btn-gold">
        Click here to view profile
      </button>
    </div>

    <!-- If token is present and profile is loading -->
    <div v-else-if="loading" class="center-content">Loading...</div>

    <!-- If profile data is available -->
    <div v-else-if="profile && profile.email" class="profile-details">
      <i class="fas fa-user-circle profile-icon"></i>
      <h1>Welcome, {{ profile.firstName }} {{ profile.lastName }}</h1>
      <div class="profile-info">
        <p><strong>ID:</strong> {{ profile.id }}</p>
        <p><strong>Email:</strong> {{ profile.email }}</p>
        <p v-if="profile.isAdmin"><strong>Role:</strong> Admin</p>
      </div>
      <button @click="promptDeleteProfile" class="btn btn-danger mt-3">
        Delete Profile
      </button>
    </div>

    <!-- If there's an error -->
    <div v-if="error" class="center-content">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script>
import router from '../router';

export default {
  data() {
    return {
      token: localStorage.getItem('authToken'),
      profile: null,
      loading: false,
      profileClicked: false,
      error: null
    };
  },
  methods: {
    redirectToLogin() {
      router.push('/login');
    },
    async loadProfile() {
      this.profileClicked = true;

      // Fetch the user's profile
      this.loading = true;
      try {
        const response = await fetch("https://backendnost.onrender.com/api/users/profile", {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        });
        if(response.ok) {
          this.profile = await response.json();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch profile.');
        }
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    promptDeleteProfile() {
      const confirmed = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");
      if (confirmed) {
        this.deleteProfile();
      }
    },
    async deleteProfile() {
  this.loading = true;
  try {
    const response = await fetch("https://backendnost.onrender.com/api/users/delete", {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    });
    if(response.ok) {
      localStorage.removeItem('authToken');
      this.$store.commit('setAuthenticated', false);  // Assuming you're using Vuex to manage state
      router.push('/'); // Redirect to the home page
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete profile.');
    }
  } catch (error) {
    this.error = error.message;
  } finally {
    this.loading = false;
  }
}
  }
};
</script>

<style scoped>
.profile-container {
  font-family: 'Roboto', sans-serif;
  padding: 2rem;
  max-width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: gold;
}

.center-content {
  text-align: center;
}

.profile-details {
  border: 2px solid gold;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
}

.profile-info p {
  font-size: 1.2rem;
  margin-top: 10px;
}

.btn-gold, .btn-danger {
  font-weight: bold;
  border: none;
  transition: background-color 0.3s;
  padding: 10px 20px;
  border-radius: 5px;
}

.btn-gold {
  background-color: gold;
  color: black;
}

.btn-gold:hover {
  background-color: #FFD700;
  color: black;
}

.btn-danger {
  background-color: red;
  color: white;
  margin-top: 10px;
}

.btn-danger:hover {
  background-color: darkred;
  color: white;
}
.profile-icon {
  font-size: 5rem; /* Change the size as needed */
  margin-bottom: 15px;
  color: gold;
}
</style>
