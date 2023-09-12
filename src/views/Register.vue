<template>
  <div class="register-container bg-dark text-white">
    <div class="text-center mt-5">
      <h1>Join NostalgiFlix</h1>
      <p>Register and dive into our collection of unforgettable movies.</p>
    </div>

    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <div v-if="isLoading" class="spinner-container">
      <div class="spinner"></div>
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
import router from '@/router'
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isAdminCode: '',
      errorMessage: ''
    };
  },
  methods: {
    ...mapActions(['setAuthenticated']),

    validateForm() {
      if (!this.firstName || !this.lastName || !this.email || !this.password) {
        this.errorMessage = "Please fill in all required fields.";
        return false;
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(this.email)) {
        this.errorMessage = "Invalid email format.";
        return false;
      }

      if (this.password.length < 8) {
        this.errorMessage = "Password should be at least 8 characters.";
        return false;
      }

      this.errorMessage = '';
      return true;
    },

    async register() {
      if (!this.validateForm()) {
        return;
      }

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
          localStorage.setItem('authToken', data.token);
          this.setAuthenticated(true);
          // this.$router.push({ name: '/' });
          router.push( '/' );
        } else {
          this.errorMessage = data.message || 'Error registering the user.';
        }
      } catch (error) {
        router.push( '/login' );
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
