<template>
  <div class="contact-container bg-dark text-white">
    <!-- Contact Header -->
    <section class="contact-header text-center py-5">
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you. Send us your thoughts, feedback, or any
        inquiries you might have.
      </p>
    </section>

    <!-- Contact Form -->
    <section class="contact-form py-5">
      <form
        action="https://formspree.io/f/xoqowldw"
        method="POST"
        class="mx-auto"
      >
        <div class="form-group">
          <label for="email">Your Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            class="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="message">Your Message:</label>
          <textarea
            name="message"
            id="message"
            class="form-control"
            rows="5"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>
        <div class="text-center">
          <button type="submit" class="btn-submit">Send</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Contact'
};
</script>

<style scoped>
.contact-container {
  font-family: 'Roboto', sans-serif;
  padding: 2rem;
  max-width: 100%;
  overflow-x: hidden;
}

h1 {
  font-weight: 700;
  font-size: 2.5rem;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-control {
  border: 1px solid #FFF;
  border-radius: 5px;
  background-color: transparent;
  color: #FFF;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  padding: 0.6rem 1rem;
}

.form-control::placeholder {
  color: #aaa;
}

.form-group label {
  font-weight: 600;
}

.btn-submit {
  background-color: #FFD700;  /* golden color for button */
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.btn-submit:hover {
  background-color: #E8C400; /* slightly darker gold for hover effect */
  transform: scale(1.05);
}
</style>
