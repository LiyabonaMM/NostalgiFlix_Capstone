vue Copy code
<template>
  <div class="admin-users">
    <div v-if="isAuthenticated">
      <h3>Manage Users</h3>
      <div v-if="loading" class="spinner"></div>
      <div v-else class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th><i class="fas fa-user-circle"></i> First Name</th>
              <th><i class="fas fa-user-circle"></i> Last Name</th>
              <th><i class="fas fa-envelope"></i> Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      users: [],
      loading: false //
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
        this.$router.push("/admin");
      }
    }
  },
  async created() {
    if (this.isAuthenticated) {
      this.loading = true; // Start the spinner when loading begins
      try {
        const response = await axios.get("https://backendnost.onrender.com/api/users/all", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.authToken}`
          }
        });
        this.users = response.data;
      } catch (err) {
        console.error("Error fetching users:", err);
        if (err.response && err.response.status === 401) {
          this.$store.commit("setAuthentication", false);
        }
      } finally {
        this.loading = false; // Stop the spinner after loading completes
      }
    }
  }
};
</script>

<style scoped>
.admin-users {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: black;
}

h3 {
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
  margin-bottom: 20px;
  color: #444;
}

.table-wrapper {
  overflow-x: auto;
  background: black;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: black;
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

/* FontAwesome icons styles */
th i.fas {
  margin-right: 8px;
  color: gold;
}

.fa-user-circle {
  font-size: 1.2em;
}

/* Responsive styles */
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
}
/* Spinner styles */
.spinner {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid goldenrod; /* Goldenrod */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  margin: 20px auto; /* Center the spinner */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
