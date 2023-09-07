<template>
  <div class="admin-container">
    <!-- Admin Login -->
    <div v-if="!authToken" class="login-section">
      <h3>Admin Login</h3>
      <input v-model="adminCredentials.email" placeholder="Email" />
      <input
        type="password"
        v-model="adminCredentials.password"
        placeholder="Password"
      />
      <p v-if="loginError" class="error-message">{{ loginError }}</p>
      <button @click="signInAsAdmin">Sign In</button>

      <!-- Registration Section -->
      <div class="register-section">
        <h3>Register New User</h3>
        <input v-model="registrationData.firstName" placeholder="First Name" />
        <input v-model="registrationData.lastName" placeholder="Last Name" />
        <input v-model="registrationData.email" placeholder="Email" />
        <input
          type="password"
          v-model="registrationData.password"
          placeholder="Password"
        />
        <input
          v-model="registrationData.isAdminCode"
          placeholder="Admin Code (if registering as admin)"
        />
        <button @click="registerUser">Register</button>
      </div>
    </div>
    <!-- If already logged in, you can have sections for Movie and User management here... -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      authToken: null,
      adminCredentials: { email: '', password: '' },
      registrationData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isAdminCode: ''
      },
      loginError: null
    };
  },
  methods: {
    async signInAsAdmin() {
      this.loginError = null;
      try {
        const response = await fetch("https://backendnost.onrender.com/api/users/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.adminCredentials)
        });
        const data = await response.json();
        if (data.token) {
          this.authToken = data.token;
          this.$router.push('/admin-dashboard'); // Redirect to AdminDashboard.vue
        } else {
          this.loginError = "Incorrect email or password.";
        }
      } catch (error) {
        console.error("Error logging in:", error);
        this.loginError = "Error occurred while logging in.";
      }
    },
    async registerUser() {
      try {
        await fetch("https://backendnost.onrender.com/api/users/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.registrationData)
        });
        alert('User registered successfully.');
      } catch (error) {
        console.error("Error registering:", error);
      }
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

.register-section {
  margin-top: 3em;
  border-top: 1px solid #444;
  padding-top: 3em;
}

.error-message {
  color: red;
  margin: 10px 0;
}
</style>
