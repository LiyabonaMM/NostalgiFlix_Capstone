<template>
  <div
    :class="['home-container', 'bg-dark', 'text-white', !isAuthenticated ? 'bg-image' : '']"
  >
    <!-- Content for Authenticated Users -->
    <div v-if="isAuthenticated">
      <div class="text-center mt-5">
        <h1>Welcome to NostalgiFlix</h1>
        <p>
          Dive into our extensive collection of unforgettable movies that have
          stood the test of time.
        </p>
      </div>

      <!-- Movie Carousel -->
      <div id="movieCarousel" class="carousel slide mt-5" data-ride="carousel">
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
                side...
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
        </div>
        <a
          class="carousel-control-prev"
          href="#movieCarousel"
          role="button"
          data-slide="prev"
        >
        </a>
        <a
          class="carousel-control-next"
          href="#movieCarousel"
          role="button"
          data-slide="next"
        >
        </a>
      </div>

      <!-- Customer Reviews -->
      <div class="customer-reviews mt-5">
        <h2 class="text-center">What Our Customers Are Saying</h2>
        <div class="row mt-4">
          <div class="col-md-4 text-center">
            <img
              src="https://i.postimg.cc/d0ct4Y0j/12.png"
              alt="Customer 1"
              class="rounded-circle"
            />
            <h5>Marcel Brown</h5>
            <p>"This platform brings back so many memories. I love it!"</p>
          </div>
          <div class="col-md-4 text-center">
            <img
              src="https://i.postimg.cc/xCbw7kFk/zuzu.png"
              alt="Customer 2"
              class="rounded-circle"
            />
            <h5>Zulaigaih Benjamin</h5>
            <p>"Amazing collection. Takes me right back to my childhood."</p>
          </div>
          <div class="col-md-4 text-center">
            <img
              src="https://i.postimg.cc/8cfLLGcg/zubai.png"
              alt="Customer 3"
              class="rounded-circle"
            />
            <h5>Zubair Mathew</h5>
            <p>"Finally, a place where I can relive the classics."</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content for Non-Authenticated Users -->
    <div v-else class="content-container text-center mt-5">
      <h1>Welcome to NostalgiFlix</h1>
      <p>
        Discover classics, relive the memories, and enjoy the magic of timeless
        movies. To get started:
      </p>

      <!-- Video Embed Start -->
      <div
        style="height: 0; padding-bottom: calc(80.00%); position:relative; width: 100%;"
      >
        <iframe
          allow="autoplay; gyroscope;"
          allowfullscreen
          height="100%"
          referrerpolicy="strict-origin"
          src="https://www.kapwing.com/e/64f83ea4317f7e00116ed074?autoplay=true&muted=true"
          style="border:0; height:100%; left:0; overflow:hidden; position:absolute; top:0; width:100%"
          title="Embedded content made on Kapwing"
          width="100%"
        >
        </iframe>
      </div>
      <p style="font-size: 12px; text-align: right;">
        Video edited on
        <a href="https://www.kapwing.com/video-editor">Kapwing</a>
      </p>

      <!-- Video Embed End -->

      <div class="auth-actions">
        <router-link to="/register" class="btn-action">
          📝 Register Now
        </router-link>
        <span class="or-divider">or</span>
        <router-link to="/login" class="btn-action"> 🔑 Login </router-link>
      </div>
      <p class="mt-4">Already a member? Dive right in!</p>
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
.home-container {
  font-family: 'Roboto', sans-serif;
  padding: 2rem;
  max-width: 100%;
  overflow-x: hidden;
}

.bg-image {
  background-image: url('https://i.postimg.cc/NMgQwK0W/4224720-2.jpg');
  background-size: cover;
  background-position: center center;
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

.btn-action {
  background-color: gold;
  padding: 0.6rem 1.5rem;
  border-radius: 3px;
  font-weight: 600;
  transition: background-color 0.3s;
  margin: 0 0.5rem;
  color: black;
}

.btn-action:hover {
  background-color: #FFD700;
  text-decoration: none;
}

.auth-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.or-divider {
  margin: 0 10px;
  font-weight: bold;
}

.btn-action {
  background-color: gold;
  padding: 0.6rem 1.5rem;
  border-radius: 3px;
  font-weight: 600;
  transition: background-color 0.3s;
  margin: 0 0.5rem;
  color: black;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.btn-action:hover {
  background-color: #FFD700;
  text-decoration: none;
}

.video-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
