<template>
  <div class="login-container bg-dark text-white">
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

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['setAuthenticated']),

    async login() {
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
          this.setAuthenticated(true);
          this.$router.push({ name: 'movies' });
        } else {
          alert(data.message || 'Error logging in.');
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert('An error occurred while logging in. Please try again.');
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
</style>
