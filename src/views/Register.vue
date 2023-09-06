<template>
  <div class="register-container bg-dark text-white">
    <div class="text-center mt-5">
      <h1>Join NostalgiFlix</h1>
      <p>Register and dive into our collection of unforgettable movies.</p>
    </div>

    <div class="registration-form mt-5">
      <div class="mb-3">
        <label for="firstName" class="form-label">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          v-model="firstName"
        />
      </div>

      <div class="mb-3">
        <label for="lastName" class="form-label">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          v-model="lastName"
        />
      </div>

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

      <div class="mb-3">
        <label for="isAdminCode" class="form-label"
          >Admin Code (Optional)</label
        >
        <input
          type="password"
          class="form-control"
          id="isAdminCode"
          v-model="isAdminCode"
        />
      </div>

      <button class="btn btn-gold" @click="register">Register</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isAdminCode: ''
    };
  },
  methods: {
    ...mapActions(['setAuthenticated']),

    async register() {
      const registrationInfo = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        isAdminCode: this.isAdminCode
      };

      try {
        const response = await fetch("https://backendnost.onrender.com/api/users/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registrationInfo)
        });

        if (response.status !== 200) {
          throw new Error(`Server responded with status code: ${response.status}`);
        }

        const data = await response.json();

        if (data.token) {
          // Store the token in localStorage
          localStorage.setItem('authToken', data.token);

          // Authenticate the user
          this.setAuthenticated(true);

          // Redirect the user to the movies page
          this.$router.push({ name: 'movies' });
        } else {
          alert(data.message || 'Error registering the user.');
        }
      } catch (error) {
        console.error("Error registering:", error);
        alert('An error occurred while registering. Please see console for more details.');
      }
    }
  }
};
</script>
<style scoped>
.register-container {
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

.registration-form {
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
