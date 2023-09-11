<template>
  <div class="movies-container bg-dark text-white">
    <section class="text-center py-5">
      <h1>Movies Collection</h1>
      <p>Relive the magic of classic cinema with our collection.</p>
    </section>

    <section class="movies-list py-5">
      <div class="row">
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="col-lg-4 col-md-6 mb-4"
        >
          <div class="card">
            <div class="card-header">
              <!-- Added router-link to navigate to MovieDetails with movie ID -->
              <router-link :to="`/movie/${movie.id}`">
                <img
                  :src="movie.imageUrl"
                  alt="Movie Poster"
                  class="card-img"
                />
              </router-link>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">{{ movie.description }}</p>
              <div class="rating">
                <i
                  v-for="n in 5"
                  :key="n"
                  class="fa"
                  :class="n <= Math.floor(movie.rating) ? 'fa-star' : 'fa-star-o'"
                ></i>
              </div>
              <p class="movie-price">R{{ movie.price }}</p>
              <div class="mt-3">
                <button
                  @click="handleAddToCart(movie)"
                  class="btn btn-primary btn-block"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "Movies",
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    ...mapActions(['addToCart']),

    handleAddToCart(movie) {
      this.addToCart(movie);
    }
  },
  async created() {
    try {
      const response = await fetch("https://backendnost.onrender.com/api/movies/movies");
      const data = await response.json();
      this.movies = data[0].map(movie => ({
        ...movie,
        rating: parseFloat(movie.rating)
      }));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  },
};
</script>

<style scoped>
.movies-container {
  font-family: "Roboto", sans-serif;
  padding: 2rem;
  max-width: 100%;
  overflow-x: hidden;
  background: linear-gradient(to bottom, #121212, #333);
}

.card {
  overflow: hidden;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(5px);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border-radius: 15px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.25);
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
}

.card-header {
  height: 600px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  transition: transform 0.3s ease-in-out;
}

.card-header:hover .card-img {
  transform: scale(1.1);
}

.card-body {
  padding: 15px;
  color: rgba(255, 255, 255, 0.95);
}

.rating {
  margin: 15px 0;
}

.fa {
  color: #FFD700;
  margin-right: 5px;
}

.fa-star-o {
  color: rgba(255, 215, 0, 0.5);
}

.movie-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #FFD700;
  margin: 10px 0;
}

.btn-primary {
  background-color: #FFD700;
  border: none;
}

.btn-primary:hover {
  background-color: #e6bf00;
}
</style>
