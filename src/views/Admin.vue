<template>
  <div class="admin-container">
    <!-- Admin Login -->
    <div v-if="!authToken && !isLoading" class="login-section">
      <h3>Admin Login</h3>
      <input v-model="adminCredentials.email" placeholder="Email" />
      <input
        type="password"
        v-model="adminCredentials.password"
        placeholder="Password"
      />
      <p v-if="loginError" class="error-message">{{ loginError }}</p>
      <button @click="signInAsAdmin">Sign In</button>
    </div>

    <!-- Loading spinner -->
    <div v-if="isLoading" class="spinner-container">
      <div class="spinner"></div>
    </div>

    <!-- If already logged in, you can have sections for Movie and User management here... -->
  </div>
</template>

<script>
import Swal from 'sweetalert2';

function getAuthHeaders(token) {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

export default {
  data() {
    return {
      adminCredentials: { email: '', password: '' },
      loginError: null,
      isLoading: false
    };
  },
  computed: {
    authToken() {
      return this.$store.state.token;
    }
  },
  methods: {
    async signInAsAdmin() {
      this.isLoading = true; // Start loading
      this.loginError = null;
      try {
        const response = await fetch("https://backendnost.onrender.com/api/users/login", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.adminCredentials)
        });
        const data = await response.json();

        if (data.token && data.user.isAdmin === 1) {
          this.$store.commit('SET_TOKEN', data.token);
          this.$store.commit('SET_AUTHENTICATED', true);
          this.$router.push('/admin-dashboard');
          Swal.fire({
            icon: 'success',
            title: 'Logged in successfully!',
            text: 'Welcome to the admin dashboard!',
            timer: 1500,
            showConfirmButton: false,
            background: '#2c2c2c',
            iconColor: 'gold',
            confirmButtonColor: 'gold'
          });
        } else if (data.token) {
          this.showSwalError("You are not authorized to access the admin dashboard.");
        } else {
          this.showSwalError("Incorrect email or password.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        this.showSwalError("Error occurred while logging in.");
      } finally {
        this.isLoading = false; // Stop loading
      }
    },

    showSwalError(message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        background: '#2c2c2c',
        iconColor: 'red',
        confirmButtonColor: 'gold'
      });
    }
  }
};
</script>

<style scoped>
.admin-container {
  background-color: #2c2c2c;
  min-height: 100vh;
  padding: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  color: #ffffff;
  margin-bottom: 2em;
}

input {
  padding: 15px;
  margin: 10px 0;
  width: 250px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
}

button {
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  background-color: gold;
  color: #333;
  margin-top: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #bbae00;
}

.error-message {
  color: red;
  margin: 10px 0;
}
/* Spinner*/
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.spinner {
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 5px solid #FFD700;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
