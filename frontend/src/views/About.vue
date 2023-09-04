<template>
  <div class="about-container bg-dark text-white">
    <!-- Introduction Section -->
    <section class="introduction text-center py-5">
      <h1>About NostalgiFlix</h1>
      <p>
        Discover the story behind our vast collection of unforgettable cinematic
        treasures.
      </p>
    </section>

    <!-- Mission Statement -->
    <section class="mission py-5">
      <div class="row">
        <div class="col-lg-6">
          <img
            src="https://images2.imgbox.com/df/3b/OWgGPOjt_o.png"
            alt="Classic Movies"
            class="img-fluid rounded"
          />
        </div>
        <div class="col-lg-6 d-flex flex-column justify-content-center">
          <h2>Our Mission</h2>
          <p>
            To curate and present the world's most unforgettable movies that
            have truly stood the test of time. We aim to ignite nostalgia and
            bring families together over shared memories of cinematic magic.
          </p>
        </div>
      </div>
    </section>

    <!-- History Section -->
    <section class="history text-center py-5">
      <h2>Our Journey</h2>
      <p>
        Founded in 2020, NostalgiFlix began as a dream to bring the golden age
        of cinema back to modern audiences. From humble beginnings, we've grown
        into a global platform cherished by millions.
      </p>
      <div class="timeline">
        <!-- You can add more events to this timeline as required -->
        <div class="timeline-item">
          <h4>2020</h4>
          <p>
            NostalgiFlix was born. Our first film was streamed by a handful of
            users.
          </p>
        </div>
        <div class="timeline-item">
          <h4>2021</h4>
          <p>
            We reached our first million users and expanded our collection
            tenfold.
          </p>
        </div>
        <div class="timeline-item">
          <h4>2023</h4>
          <p>
            NostalgiFlix became the go-to platform for classic film enthusiasts
            worldwide.
          </p>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values py-5">
      <h2 class="text-center">Our Core Values</h2>
      <div class="row mt-4">
        <!-- Value 1 -->
        <div class="col-md-4 text-center">
          <i class="fa fa-film fa-3x"></i>
          <h3>Integrity</h3>
          <p>
            We stay true to the classics, ensuring authentic experiences for our
            users.
          </p>
        </div>
        <!-- Value 2 -->
        <div class="col-md-4 text-center">
          <i class="fa fa-users fa-3x"></i>
          <h3>Community</h3>
          <p>
            We foster a community of film lovers, encouraging sharing and
            discovery.
          </p>
        </div>
        <!-- Value 3 -->
        <div class="col-md-4 text-center">
          <i class="fa fa-heart fa-3x"></i>
          <h3>Passion</h3>
          <p>
            Every film in our collection is a testament to our love for classic
            cinema.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About'
};
</script>

<style scoped>
.about-container {
  font-family: 'Roboto', sans-serif;
  padding: 2rem;
  max-width: 100%;
  overflow-x: hidden;
}

h1, h2, h3 {
  font-weight: 700;
}

.timeline {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.timeline-item {
  padding: 20px 0;
  position: relative;
}

.timeline-item h4, .timeline-item p {
  margin-bottom: 0;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  height: 20px;
  width: 2px;
  background-color: #fff;
}

.fa {
  color: #FFD700; /* golden color for icons */
  margin-bottom: 10px;
}
</style>
