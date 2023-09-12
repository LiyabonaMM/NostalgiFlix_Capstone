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
    </div>
    <!-- If already logged in, you can have sections for Movie and User management here... -->
  </div>
</template>

<script>
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
      loginError: null
    };
  },
  computed: {
    authToken() {
      return this.$store.state.token;
    }
  },
  methods: {
    async signInAsAdmin() {
  this.loginError = null;
  try {
    const response = await fetch("https://backendnost.onrender.com/api/users/login", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.adminCredentials)
    });
    const data = await response.json();

    if (data.token && data.user.isAdmin === 1) {  // Check if the user is an admin
      this.$store.commit('SET_TOKEN', data.token);
      this.$store.commit('SET_AUTHENTICATED', true);
      this.$router.push('/admin-dashboard');
    } else if (data.token) { // User is authenticated but not an admin
      this.loginError = "You are not authorized to access the admin dashboard.";
    } else {
      this.loginError = "Incorrect email or password.";
    }
  } catch (error) {
    console.error("Error logging in:", error);
    this.loginError = "Error occurred while logging in.";
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

.error-message {
  color: red;
  margin: 10px 0;
}
</style>
