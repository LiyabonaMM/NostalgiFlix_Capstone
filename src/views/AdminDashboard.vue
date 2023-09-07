<template>
  <div class="dashboard-container container mt-5">
    <!-- Movie Management -->
    <div class="movie-section mb-5">
      <h3 class="text-gold">Manage Movies</h3>
      <button @click="showAddMovieModal = true" class="btn btn-gold mb-3">
        Add Movie
      </button>

      <!-- Add Movie Modal -->
      <div
        v-if="showAddMovieModal"
        class="modal d-flex align-items-center justify-content-center"
      >
        <div class="modal-content p-4">
          <span @click="showAddMovieModal = false" class="close-button"
            >&times;</span
          >
          <input
            v-model="newMovie.title"
            placeholder="Enter movie title"
            class="form-control my-2"
          />
          <textarea
            v-model="newMovie.description"
            placeholder="Enter movie description"
            class="form-control my-2"
          ></textarea>
          <input
            v-model="newMovie.releaseDate"
            type="date"
            placeholder="Enter release date"
            class="form-control my-2"
          />
          <input
            v-model="newMovie.rating"
            placeholder="Enter movie rating"
            class="form-control my-2"
          />
          <input
            v-model="newMovie.imageUrl"
            placeholder="Enter image URL"
            class="form-control my-2"
          />
          <input
            v-model="newMovie.price"
            placeholder="Enter price"
            class="form-control my-2"
          />
          <button @click="createMovie" class="btn btn-gold mt-2">Add</button>
        </div>
      </div>

      <!-- Edit Movie Modal -->
      <div
        v-if="showEditMovieModal"
        class="modal d-flex align-items-center justify-content-center"
      >
        <div class="modal-content p-4">
          <span @click="showEditMovieModal = false" class="close-button"
            >&times;</span
          >
          <input
            v-model="editingMovie.title"
            placeholder="Enter movie title"
            class="form-control my-2"
          />
          <textarea
            v-model="editingMovie.description"
            placeholder="Enter movie description"
            class="form-control my-2"
          ></textarea>
          <input
            v-model="editingMovie.releaseDate"
            type="date"
            placeholder="Enter release date"
            class="form-control my-2"
          />
          <input
            v-model="editingMovie.rating"
            placeholder="Enter movie rating"
            class="form-control my-2"
          />
          <input
            v-model="editingMovie.imageUrl"
            placeholder="Enter image URL"
            class="form-control my-2"
          />
          <input
            v-model="editingMovie.price"
            placeholder="Enter price"
            class="form-control my-2"
          />
          <button @click="updateMovie" class="btn btn-gold mt-2">Update</button>
        </div>
      </div>

      <!-- Movies List -->
      <ul class="list-group">
        <li
          v-for="movie in movies"
          :key="movie.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          {{ movie.title }}
          <div>
            <button
              @click="openEditMovieModal(movie)"
              class="btn btn-primary mr-2"
            >
              Edit
            </button>
            <button @click="deleteMovie(movie.id)" class="btn btn-danger">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- User Management -->
    <div class="user-section">
      <h3 class="text-gold">Manage Users</h3>

      <ul class="list-group">
        <li
          v-for="user in users"
          :key="user.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          {{ user.email }}
          <button @click="deleteUserAsAdmin(user.id)" class="btn btn-danger">
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      movies: [],
      users: [],
      newMovie: {},
      editingMovie: {},
      showAddMovieModal: false,
      showEditMovieModal: false,
      //... any other required data properties you may have
    };
  },
  async created() {
    await this.fetchAllMovies();
    await this.fetchAllUsers();
  },
  methods: {
    async fetchAllMovies() {
      const url = "https://backendnost.onrender.com/api/movies/movies";
      try {
        const response = await axios.get(url);
        this.movies = response.data;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    async fetchAllUsers() {
      const url = "https://backendnost.onrender.com/api/users/users";
      try {
        const response = await axios.get(url);
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async createMovie() {
      const url = "https://backendnost.onrender.com/api/movies/movie";
      try {
        await axios.post(url, this.newMovie);
        this.fetchAllMovies();  // Refresh movie list after adding
        this.showAddMovieModal = false;
      } catch (error) {
        console.error("Error creating movie:", error);
      }
    },
    async deleteMovie(id) {
      const url = `https://backendnost.onrender.com/api/movies/movie/${id}`;
      try {
        await axios.delete(url);
        this.fetchAllMovies();  // Refresh movie list after deletion
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    },
    async deleteUserAsAdmin(id) {
      const url = `https://backendnost.onrender.com/api/users/user/${id}`;
      try {
        await axios.delete(url);
        this.fetchAllUsers();  // Refresh users list after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    openEditMovieModal(movie) {
      this.editingMovie = { ...movie }; // Clone the movie data
      this.showEditMovieModal = true;
    },
    async updateMovie() {
      const url = `https://backendnost.onrender.com/api/movies/movie/${this.editingMovie.id}`;
      try {
        await axios.put(url, this.editingMovie);
        this.fetchAllMovies();  // Refresh movie list after updating
        this.showEditMovieModal = false;
      } catch (error) {
        console.error("Error updating movie:", error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.text-gold {
  color: #d4af37;
}
</style>
