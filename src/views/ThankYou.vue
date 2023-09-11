<template>
  <div class="thankyou-container">
    <div class="thankyou-box">
      <h1>Thank You!</h1>
      <p>
        Thank you for your purchase. Your order will be processed soon. In the
        meantime, feel free to continue shopping with us.
      </p>
      <button @click="goToHome" class="shop-btn">Back to Shop</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push('/');  // Redirect back to home page
    }
  }
}
</script>

<style scoped>
.thankyou-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #121212, #333);
}

.thankyou-box {
  max-width: 600px;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeIn 1s;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #FFD700;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.95);
}

.shop-btn {
  background-color: #FFD700;
  color: #121212;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.shop-btn:hover {
  background-color: #e6bf00;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
