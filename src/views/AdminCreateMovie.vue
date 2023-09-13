<template>
  <div class="wrapper">
    <div v-if="isAuthenticated" class="create-movie">
      <h3>Create Movie</h3>
      <form @submit.prevent="createMovie">
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

        <button type="submit">Create</button>
      </form>
    </div>
    <div v-else>
      <p>You are not authenticated. Please log in first.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

function getAuthHeaders(token) {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

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
    },
    authToken() {
      return this.$store.state.token;
    }
  },
  methods: {
    async createMovie() {
      try {
        const response = await axios.post(
          'https://backendnost.onrender.com/api/movies/movie',
          this.movie,
          { headers: getAuthHeaders(this.authToken) }
        );

        if (response.status === 200 || response.status === 201) {
          this.$router.push('');
          this.showSwalSuccess("Movie created successfully!");
        } else {
          console.error("Error creating movie:", response.data);
          this.showSwalError("Failed to create the movie.");
        }
      } catch (err) {
        console.error("Error creating movie:", err);
        this.showSwalError("Error occurred while creating the movie.");
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
.wrapper {
  background-color: #2c2c2c;
  min-height: 100vh;
  padding: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.create-movie {
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
