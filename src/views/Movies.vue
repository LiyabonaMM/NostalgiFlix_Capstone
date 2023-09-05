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
          <div class="card bg-secondary">
            <img
              :src="movie.imageUrl"
              alt="Movie Poster"
              class="card-img-top"
            />
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
              <div class="mt-3">
                <button class="btn btn-primary btn-block">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Movies",
  data() {
    return {
      movies: [], // Placeholder for the fetched movies
    };
  },
  async created() {
    try {
      const response = await fetch("https://backendnost.onrender.com/api/movies/movies");
      const data = await response.json();
      this.movies = data[0].map(movie => ({ // Access the first index
        ...movie,
        rating: parseFloat(movie.rating) // Convert the string rating to a float
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
}

h1, h2, h3 {
  font-weight: 700;
}

.card {
  border: none;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-10px);
}

.rating {
  margin: 15px 0;
}

.fa {
  color: #FFD700; /* golden color for icons */
  margin-right: 5px;
}

.fa-star-o {
  color: rgba(255, 215, 0, 0.5); /* slightly transparent golden color for non-rated stars */
}
</style>
