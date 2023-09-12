<template>
  <div class="login-container bg-dark text-white">
    <div v-if="isLoading" class="spinner-overlay">
      <div class="spinner"></div>
    </div>

    <div class="text-center mt-5">
      <h1>Welcome Back to NostalgiFlix</h1>
      <p>Login to continue exploring our collection.</p>
    </div>

    <div class="login-form mt-5">
      <div class="mb-3">
        <label for="email" class="form-label">Email Address</label>
        <input type="email" class="form-control" id="email" v-model="email" />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
        />
      </div>

      <button class="btn btn-gold" @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '../router';

export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false  // <-- Add this for the loading state
    };
  },
  methods: {
    ...mapActions(['setAuthenticated']),

    async login() {
      this.isLoading = true;  // <-- Start the spinner

      const loginInfo = {
        email: this.email,
        password: this.password
      };

      try {
        const response = await fetch("https://backendnost.onrender.com/api/users/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginInfo)
        });

        const data = await response.json();

        if (data.token) {
          localStorage.setItem('authToken', data.token);
          this.setAuthenticated(true);
          router.push('/');
        } else {
          alert(data.message || 'Error logging in.');
        }
      } catch (error) {
        console.error("Error logging in:", error.message);
        alert('An error occurred while logging in. Please try again.');
      } finally {
        this.isLoading = false;  // <-- Stop the spinner
      }
    }
  }
};
</script>

<style scoped>
.login-container {
    font-family: 'Roboto', sans-serif;
    padding: 2rem;
    max-width: 100%;
    overflow-x: hidden;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: gold;
}

.login-form {
    max-width: 500px;
    margin: auto;
}

.btn-gold {
    background-color: gold;
    color: black;
    font-weight: bold;
    border: none;
    transition: background-color 0.3s;
}

.btn-gold:hover {
    background-color: #FFD700;
    color: black;
}

.spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 4px solid gold;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
