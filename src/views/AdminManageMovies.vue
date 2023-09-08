<template>
  <div class="admin-movies">
    <div v-if="isAuthenticated">
      <h2>Manage Movies</h2>
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
export default {
  data() {
    return {
      movies: [],
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  async created() {
    if (this.isAuthenticated) {
      try {
        const response = await fetch("https://backendnost.onrender.com/api/movies/movies");
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        this.movies = data[0]; // Assuming data is wrapped in an additional array based on the provided response.
      } catch (err) {
        console.error(err);
      }
    }
  },
  methods: {
    async deleteMovie(movieId) {
      try {
        const response = await fetch(`https://backendnost.onrender.com/api/movies/movies/${movieId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          this.movies = this.movies.filter(movie => movie.id !== movieId);  // Update movies list
        } else {
          throw new Error("Failed to delete the movie");
        }
      } catch (err) {
        console.error(err);
      }
    },
    editMovie(movieId) {
      this.$router.push({ path: `/admin/movies/edit/${movieId}` });  // Redirect to edit movie page with the movie's ID
    }
  }
};
</script>

<style scoped>
.admin-movies {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.movie-list {
  list-style-type: none;
  padding: 0;
}

.movie-list li {
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h3 {
  cursor: pointer;
  color: #007BFF;
  transition: color 0.3s;
}

h3:hover {
  color: #0056b3;
}

button {
  background-color: #FF0000;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #cc0000;
}
</style>
