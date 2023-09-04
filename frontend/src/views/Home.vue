<template>
  <div class="home-container bg-dark text-white">
    <div class="text-center mt-5">
      <h1>Welcome to NostalgiFlix</h1>
      <p>
        Dive into our extensive collection of unforgettable movies that have
        stood the test of time.
      </p>
    </div>

    <!-- Movie Carousel -->
    <div id="movieCarousel" class="carousel slide mt-4" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://images2.imgbox.com/ea/6a/0YNCtFz3_o.jpg"
            class="d-block w-100"
            alt="Movie1"
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Star Wars The Empire Strikes Back</h5>
            <p>
              Darth Vader is adamant about turning Luke Skywalker to the dark
              side. Master Yoda trains Luke to become a Jedi Knight while his
              friends try to fend off the Imperial fleet.
            </p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="https://images2.imgbox.com/68/2d/U1gkvAAi_o.jpg"
            class="d-block w-100"
            alt="Movie2"
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Movie 2</h5>
            <p>Some description about Movie 2</p>
          </div>
        </div>
        <!-- ... add more carousel items as needed -->
      </div>
      <a
        class="carousel-control-prev"
        href="#movieCarousel"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#movieCarousel"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <!-- Customer Reviews -->
    <div class="customer-reviews mt-5">
      <h2 class="text-center">What Our Customers Are Saying</h2>
      <div class="row mt-4">
        <div class="col-md-4">
          <img
            src="https://images2.imgbox.com/ff/f2/ITxrXMKp_o.jpg"
            class="rounded-circle mx-auto d-block"
            alt="User1"
          />
          <p class="text-center mt-3">
            "Loved the collection at NostalgiFlix! A trip down memory lane."
          </p>
          <h5 class="text-center">- User1</h5>
        </div>
        <div class="col-md-4">
          <img
            src="https://images2.imgbox.com/ff/f2/ITxrXMKp_o.jpg"
            class="rounded-circle mx-auto d-block"
            alt="User2"
          />
          <p class="text-center mt-3">
            "A delightful experience. Highly recommended!"
          </p>
          <h5 class="text-center">- User2</h5>
        </div>
        <div class="col-md-4">
          <img
            src="https://images2.imgbox.com/ff/f2/ITxrXMKp_o.jpg"
            class="rounded-circle mx-auto d-block"
            alt="User3"
          />
          <p class="text-center mt-3">
            "Best movie platform for classics. Period."
          </p>
          <h5 class="text-center">- User3</h5>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="text-center mt-5 mb-5">
      <p>
        Ready to dive in? <router-link to="/login">Register</router-link> or
        <router-link to="/login">login</router-link> to access our collection of
        movies.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>

<style scoped>
.home-container {
    font-family: 'Roboto', sans-serif;
    padding: 2rem;
    max-width: 100%;
    overflow-x: hidden;
}

h1, h2 {
    font-weight: 700;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

p {
    font-size: 1.1rem;
}

.carousel-inner {
    max-height: 500px;
    overflow: hidden;
}

.carousel-item img {
    object-fit: cover;
    height: 500px;
}

.carousel-caption {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 1rem;
    border-radius: 5px;
    bottom: 20%;
}

.customer-reviews {
    padding: 2rem 0;
}

.customer-reviews img {
    width: 80px;
    height: 80px;
    object-fit: cover;
}

.customer-reviews h5, .customer-reviews p {
    margin-top: 1rem;
}

@media (max-width: 768px) {
    .carousel-item img {
        height: 300px;
    }

    .carousel-inner {
        max-height: 300px;
    }
}
</style>
