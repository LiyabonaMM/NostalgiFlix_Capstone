<template>
  <div class="movies-container bg-dark text-white">
    <section class="text-center py-5">
      <h1>Movies Collection</h1>
      <p>Relive the magic of classic cinema with our collection.</p>
    </section>

    <!-- Search, Sort, and Filter Section -->
    <section class="filters-section py-4">
      <div class="filter-item">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search for a movie..."
        />
      </div>
      <div class="filter-item">
        <label>Sort By: </label>
        <select v-model="sortKey">
          <option value="title">Title</option>
          <option value="rating">Rating</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div class="filter-item">
        <label>Minimum Rating: </label>
        <input type="number" v-model="minRating" min="1" max="5" step="0.5" />
      </div>
    </section>

    <!-- Loading spinner -->
    <div v-if="isLoading" class="spinner-container">
      <div class="spinner"></div>
    </div>

    <!-- Movies list (only show if not loading) -->
    <section v-else class="movies-list py-5">
      <div class="row">
        <div
          v-for="movie in filteredMovies"
          :key="movie.id"
          class="col-lg-4 col-md-6 mb-4"
        >
          <div class="card">
            <div class="card-header">
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
import Swal from 'sweetalert2';

export default {
  name: "Movies",
  data() {
    return {
      movies: [],
      searchTerm: '',
      sortKey: 'title',
      minRating: 1,
      isLoading: true  // Initial state is true since we're loading data initially
    };
  },
  computed: {
    filteredMovies() {
      let filtered = this.movies.filter(movie => {
        return movie.title.toLowerCase().includes(this.searchTerm.toLowerCase()) && movie.rating >= this.minRating;
      });

      if (this.sortKey === 'title') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortKey === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (this.sortKey === 'price') {
        filtered.sort((a, b) => a.price - b.price);
      }

      return filtered;
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    async handleAddToCart(movie) {
      this.addToCart(movie);

      // Use SweetAlert2 to show a success message
      await Swal.fire({
        icon: 'success',
        title: '<span class="swal2-title-text">Added to Cart!</span>',
        html: `<span class="swal2-text">${movie.title} has been added to your cart.</span>`,
        background: '#121212',
        confirmButtonColor: '#FFD700',
        confirmButtonText: 'OK'
      });
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
    } finally {
      this.isLoading = false;
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

.filters-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
}

.filter-item {
  flex: 1;
  margin: 0 10px;
}

input, select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.1);
  color: white;
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

/* Spinner styles */
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.spinner {
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 5px solid #FFD700;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* SweetAlert2 Custom Styles */
.swal2-popup {
  font-family: "Roboto", sans-serif;
  background-color: #121212;
}

.swal2-title-text {
  color: #FFD700;
  font-size: 1.6rem;
  font-weight: bold;
}

.swal2-text {
  color: rgba(255, 255, 255, 0.95);
}

.swal2-confirm {
  background-color: #FFD700;
  border: none;
  color: #333;
}

.swal2-confirm:hover {
  background-color: #e6bf00;
}
</style>
