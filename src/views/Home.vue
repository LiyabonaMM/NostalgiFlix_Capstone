<template>
  <div
    :class="['home-container', 'bg-dark', 'text-white', !isAuthenticated ? 'bg-image' : '']"
  >
    <!-- Content for Authenticated Users -->
    <div v-if="isAuthenticated">
      <div class="text-center mt-5">
        <h1>Welcome to <span class="inner-span">NostalgiFlix</span></h1>
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
              src="https://i.postimg.cc/7YdXdjnQ/Wallpaper-Dog-5452575.jpg"
              class="d-block w-100"
              alt="Movie1"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Blood Of the Vampire</h5>
              <p>Old School Retro Vampire Vhs from the 1700...</p>
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
              src="https://i.postimg.cc/GpWxSDP8/zzzzzz.png"
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;
}

.bg-image {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://i.postimg.cc/MKcGDdv7/In-Shot-20230915-140808700.gif');
  background-size: cover;
  background-position: center center;
}

h1, h2 {
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}

h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 2.5rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
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

.customer-reviews div:hover {
  transform: translateY(-10px);
  transition: transform 0.3s;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
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
  padding: 0.8rem 2rem;
  border-radius: 3px;
  font-weight: 600;
  transition: all 0.3s;
  margin: 0 0.5rem;
  color: black;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 1.2rem;
}

.btn-action:hover {
  background-color: #FFD700;
  transform: scale(1.05);
  text-decoration: none;
  box-shadow: 0 2px 15px rgba(255, 215, 0, 0.4);
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

/* Responsive font-sizes */
@media (min-width: 992px) {
  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.2rem;
  }
}

@media (max-width: 991px) and (min-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  p {
    font-size: 1.1rem;
  }

  .btn-action {
    font-size: 1.1rem;
  }
}

@media (max-width: 767px) {
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  p {
    font-size: 1rem;
  }

  .btn-action {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.7rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 0.9rem;
  }

  .btn-action {
    font-size: 0.9rem;
  }
}
</style>
