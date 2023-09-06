<template>
  <div class="home-container bg-dark text-white">
    <!-- Content for Non-Authenticated Users -->
    <div v-if="!isAuthenticated" class="content-container">
      <h1>Welcome to NostalgiFlix</h1>
      <p>
        Please
        <router-link to="/register" class="btn-action">Register</router-link>
        or <router-link to="/login" class="btn-action">Login</router-link> to
        access our collection of movies.
      </p>
    </div>

    <!-- Content for Authenticated Users -->
    <div v-if="isAuthenticated" class="auth-content-container">
      <h1>Welcome Back to NostalgiFlix!</h1>

      <!-- Movies Section -->
      <div class="movies-section">
        <h2>Top Movies</h2>
        <!-- Placeholder for movies, can be populated dynamically -->
        <div class="movie">
          <img src="path_to_movie_poster.jpg" alt="Movie Name" />
          <p>Movie Name</p>
        </div>
      </div>

      <!-- Customer Reviews Section -->
      <div class="reviews-section">
        <h2>What Our Customers Say</h2>
        <!-- Placeholder for reviews, can be populated dynamically -->
        <div class="review">
          <p>"Amazing service! Loved the collection!" - John Doe</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState(['isAuthenticated'])
  }
};
</script>

<style scoped>
.bg-dark {
  background-color: #333;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.btn-action {
  background-color: #ff5722;
  color: #fff;
  padding: 10px 15px;
  border-radius: 4px;
  margin: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.btn-action:hover {
  background-color: #e64a19;
}

/* Additional styles for movies and reviews */
.movies-section, .reviews-section {
  margin-top: 20px;
  width: 80%;
}

.movie {
  margin-top: 10px;
}

.review {
  margin-top: 10px;
}
</style>
