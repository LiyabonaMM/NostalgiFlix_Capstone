<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="social-icons">
        <a href="https://www.facebook.com/"
          ><i class="fab fa-facebook-f"></i
        ></a>
        <a href="https://twitter.com/"><i class="fab fa-twitter"></i></a>
        <a href="https://www.instagram.com/"
          ><i class="fab fa-instagram"></i
        ></a>
      </div>
      <div class="footer-info">
        <p>&copy; 2023 NostalgiFlix. All rights reserved.</p>
        <p>
          <a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a> |
          <a href="#">FAQs</a> | <a href="#">Contact</a>
        </p>
        <p>Email: support@nostalgiflix.com | Phone: +1 (800) 123-4567</p>
        <p>Address: 123 Movie Lane, Film City, FC 45678</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.app-footer {
    background-color: #212121; /* matching the dark theme */
    color: #E0E0E0; /* Light text color from Home */
    padding: 2rem 0;
    font-family: 'Roboto', sans-serif;
}

.footer-content {
    text-align: center;
    width: 80%;
    margin: auto;
}

.social-icons {
    margin-bottom: 1rem;
}

.social-icons a {
    margin: 0 15px;
    color: #FFA726; /* Matching the highlight color from Home */
    font-size: 1.5rem;
}

.footer-info p {
    margin: 0.5rem 0;
}

.footer-info a {
    color: #E0E0E0;
    text-decoration: none;
    margin: 0 5px;
}

.footer-info a:hover {
    text-decoration: underline;
}
</style>
