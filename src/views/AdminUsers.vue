<template>
  <div class="admin-users">
    <div v-if="isAuthenticated">
      <h3>Manage Users</h3>
      <div class="table-wrapper">
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
    </div>
    <div v-else>
      <p>You are not authenticated. Please log in first.</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

// Helper function to retrieve the authentication headers
function getAuthHeaders(token) {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

export default {
  data() {
    return {
      users: []
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    authToken() {
      return this.$store.state.token;
    }
  },
  watch: {
    isAuthenticated(val) {
      if (!val) {
        this.$router.push("/admin"); // Redirect back to Admin login if not authenticated
      }
    }
  },
  async created() {
    if (this.isAuthenticated) {
      try {
        const response = await axios.get("https://backendnost.onrender.com/api/users/all", {
          headers: getAuthHeaders(this.authToken) // Add this line to ensure that the user fetching is authenticated
        });
        this.users = response.data;
      } catch (err) {
        console.error("Error fetching users:", err);
        if (err.response && err.response.status === 401) {
          this.$store.commit("setAuthentication", false); // Log out the user if unauthorized
        }
      }
    }
  },
  methods: {
    async deleteUser(userId) {
      try {
        const response = await axios.delete(
          `https://backendnost.onrender.com/api/users/delete/${userId}`, // Adjust the endpoint to match your server's
          { headers: getAuthHeaders(this.authToken) }
        );

        if (response.status === 200) {
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
  font-family: 'Arial', sans-serif;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: black;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: left;
}

thead th {
  background-color: #333;
  color: white;
}

tbody tr:hover {
  background-color: goldenrod;
}

tbody tr:last-child td {
  border-bottom: none;
}

button {
  background-color: #FF0000;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #cc0000;
}

@media only screen and (max-width: 768px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tbody tr {
    margin: 0 0 1rem 0;
    border-bottom: none;
  }

  td {
    border: none;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-weight: bold;
    white-space: nowrap;
  }

  td:nth-of-type(1):before { content: "First Name"; }
  td:nth-of-type(2):before { content: "Last Name"; }
  td:nth-of-type(3):before { content: "Email"; }
  td:nth-of-type(4):before { content: "Actions"; }
}
</style>
