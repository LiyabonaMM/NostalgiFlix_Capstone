<template>
  <div class="admin-users">
    <div v-if="isAuthenticated">
      <h3>Manage Users</h3>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>You are not authenticated. Please log in first.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: []
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  async created() {
    if (this.isAuthenticated) {
      // Fetch users when the component is created
      try {
        const response = await axios.get("https://backendnost.onrender.com/api/users/all");
        this.users = response.data;
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
  },
  methods: {
    async deleteUser(userId) {
      try {
        const response = await axios.delete(`https://backendnost.onrender.com/api/users/admin/delete/${userId}`);
        if (response.status === 200) {
          // Remove user from the local list
          this.users = this.users.filter(user => user.id !== userId);
        } else {
          console.error("Error deleting user:", response.data);
        }
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  }
};
</script>

<style scoped>
.admin-users {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
}

button {
  background-color: #FF0000;  /* Red color for delete button */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #cc0000;  /* Darker red on hover */
}
</style>
