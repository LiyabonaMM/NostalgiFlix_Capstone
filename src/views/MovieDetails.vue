<template>
  <div class="details-container bg-dark text-white">
    <div v-if="movie" class="movie-details">
      <div class="movie-image">
        <img :src="movie.imageUrl" alt="Movie Poster" class="detail-img" />
      </div>
      <div class="movie-info">
        <h1 class="movie-title">{{ movie.title }}</h1>
        <p class="movie-description">{{ movie.description }}</p>
        <div class="rating">
          <i
            v-for="n in 5"
            :key="n"
            class="fa"
            :class="n <= Math.round(movie.rating) ? (n > movie.rating ? 'fa-star-half-o' : 'fa-star') : 'fa-star-o'"
          ></i>
        </div>
        <p class="movie-price">R{{ movie.price }}</p>
        <button @click="handleAddToCart(movie)" class="btn-add-to-cart">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      movie: null
    };
  },
  methods: {
    ...mapActions(['addToCart']),

    handleAddToCart(movie) {
      this.addToCart(movie);
      alert(`${movie.title} added to cart!`);
    },

    async fetchMovieById(id) {
      try {
        const response = await fetch(`https://backendnost.onrender.com/api/movies/movie/${id}`);
        const data = await response.json();
        this.movie = data[0][0];
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    }
  },
  mounted() {
    const movieId = this.$route.params.id;
    this.fetchMovieById(movieId);
  }
};
</script>

<style scoped>
.details-container {
  font-family: "Roboto", sans-serif;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #121212, #333);
}

.movie-details {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
}

.movie-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail-img {
  max-width: 100%;
  border-radius: 10px;
}

.movie-info {
  flex: 2;
  padding-left: 2rem;
}

.movie-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.movie-description {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.btn-add-to-cart {
  background-color: #FFD700;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
}

.btn-add-to-cart:hover {
  background-color: #e6bf00;
}
</style>
