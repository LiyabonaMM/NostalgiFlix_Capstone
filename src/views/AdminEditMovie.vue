<template>
  <div class="wrapper">
    <div v-if="isAuthenticated" class="edit-movie">
      <h3>Edit Movie</h3>
      <form @submit.prevent="updateMovie">
        <div class="input-group">
          <label for="title">Movie Title</label>
          <input type="text" id="title" v-model="movie.title" required />
        </div>

        <div class="input-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="movie.description"
            required
          ></textarea>
        </div>

        <div class="input-group">
          <label for="releaseDate">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            v-model="movie.releaseDate"
            required
          />
        </div>

        <div class="input-group">
          <label for="rating">Rating</label>
          <input type="text" id="rating" v-model="movie.rating" required />
        </div>

        <div class="input-group">
          <label for="imageUrl">Image URL</label>
          <input type="url" id="imageUrl" v-model="movie.imageUrl" required />
        </div>

        <div class="input-group">
          <label for="price">Price</label>
          <input type="text" id="price" v-model="movie.price" required />
        </div>

        <button type="submit">Update</button>
      </form>
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
      movie: {
        title: '',
        description: '',
        releaseDate: '',
        rating: '',
        imageUrl: '',
        price: ''
      }
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  watch: {
    isAuthenticated(val) {
      if (!val) {
        this.$router.push("/admin");  // Redirect back to Admin login if not authenticated
      }
    }
  },
  async created() {
    if (this.isAuthenticated) {
      const movieId = this.$route.params.id;
      try {
        const response = await axios.get(`https://backendnost.onrender.com/api/movies/movie/${movieId}`);
        this.movie = response.data;
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    }
  },
  methods: {
    async updateMovie() {
      const movieId = this.$route.params.id;
      try {
        const response = await axios.put(`https://backendnost.onrender.com/api/movies/movie/${movieId}`, this.movie);
        if (response.status === 200) {
          this.$router.push('/admin/movies'); // Navigate back to movies list after successful update
        } else {
          console.error("Error updating movie:", response.data);
        }
      } catch (err) {
        console.error("Error updating movie:", err);
      }
    }
  }
};
</script>
<style scoped>
.wrapper {
  background-color: #2c2c2c;
  min-height: 100vh;
  padding: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-movie {
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #ffffff;
}

input, textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: #2c2c2c;
  color: #fff;
}

button {
  background-color: gold;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #bbae00;
}

p {
  color: #ffffff;
}
</style>
