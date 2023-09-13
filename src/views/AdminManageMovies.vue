<template>
  <div class="admin-movies">
    <div v-if="isAuthenticated">
      <h2>Manage Movies</h2>

      <!-- Edit Form -->
      <div v-if="selectedMovie">
        <h3>Edit Movie: {{ selectedMovie.title }}</h3>
        <form @submit.prevent="updateMovie">
          <input v-model="selectedMovie.title" placeholder="Title" />
          <input v-model="selectedMovie.imageUrl" placeholder="Image URL" />
          <textarea
            v-model="selectedMovie.description"
            placeholder="Description"
          ></textarea>
          <input
            v-model="selectedMovie.releaseDate"
            placeholder="Release Date (YYYY-MM-DD)"
          />
          <input v-model="selectedMovie.rating" placeholder="Rating" />
          <input v-model="selectedMovie.price" placeholder="Price" />
          <button type="submit">Update Movie</button>
        </form>
      </div>

      <ul v-if="movies && movies.length" class="movie-list">
        <li v-for="movie in movies" :key="movie.id">
          <div>
            <h3 @click="editMovie(movie.id)">{{ movie.title }}</h3>
            <img :src="movie.imageUrl" alt="" width="150" />
            <p>{{ movie.description }}</p>
            <p>
              <strong>Release Date:</strong>
              {{ new Date(movie.releaseDate).toLocaleDateString() }}
            </p>
            <p><strong>Rating:</strong> {{ movie.rating }}</p>
            <p><strong>Price:</strong> {{ movie.price }}</p>
          </div>
          <button @click="deleteMovie(movie.id)">Delete</button>
        </li>
      </ul>
      <p v-else>No movies found.</p>
    </div>
    <div v-else>
      <p>You are not authenticated. Please log in first.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      movies: [],
      selectedMovie: null,
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
      try {
        const response = await axios.get("https://backendnost.onrender.com/api/movies/movies");
        this.movies = response.data[0];
      } catch (err) {
        console.error(err);
      }
    }
  },
  methods: {
    async deleteMovie(movieId) {
      try {
        const response = await axios.delete(`https://backendnost.onrender.com/api/movies/movie/${movieId}`, {
          headers: {
            "Authorization": `Bearer ${this.authToken}`
          }
        });

        if (response.status === 200 || response.status === 204) {
          this.movies = this.movies.filter(movie => movie.id !== movieId);
          this.showSwalSuccess("Movie deleted successfully!");
        } else {
          console.error("Error deleting movie:", response.data);
          this.showSwalError("Failed to delete the movie.");
        }
      } catch (err) {
        console.error("Error deleting movie:", err);
        this.showSwalError("Error occurred while deleting the movie.");
      }
    },
    editMovie(movieId) {
      const movieToEdit = this.movies.find(movie => movie.id === movieId);
      this.selectedMovie = { ...movieToEdit };
    },
    async updateMovie() {
      try {
        const response = await axios.put(`https://backendnost.onrender.com/api/movies/movie/${this.selectedMovie.id}`, this.selectedMovie, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.authToken}`
          }
        });

        if (response.status === 200 || response.status === 204) {
          const index = this.movies.findIndex(movie => movie.id === this.selectedMovie.id);
          this.movies.splice(index, 1, this.selectedMovie);
          this.selectedMovie = null;
        } else {
          console.error("Error updating movie:", response.data);
          this.showSwalError("Error occurred while updating the movie.");
        }
      } catch (err) {
        console.error("Error updating movie:", err);
        this.showSwalError("Error occurred while updating the movie.");
      }
    },

    showSwalSuccess(message) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
        timer: 1500,
        showConfirmButton: false,
        background: '#2c2c2c',
        iconColor: 'gold',
        confirmButtonColor: 'gold'
      });
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
.admin-movies {
  padding: 20px;
  background-color: #2c2c2c;
  border-radius: 10px;
}

.movie-list {
  list-style-type: none;
  padding: 0;
}

.movie-list li {
  border-bottom: 1px solid #444;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h2, h3, p {
  color: #ffffff;
}

h3 {
  cursor: pointer;
  color: gold;
  transition: color 0.3s;
}

h3:hover {
  color: #bbae00;
}

button {
  background-color: gold;
  color: #333;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #bbae00;
}
</style>
