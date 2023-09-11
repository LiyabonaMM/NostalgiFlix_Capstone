<template>
  <div class="checkout-container">
    <h1>Complete Your Purchase</h1>

    <form @submit.prevent="completeCheckout">
      <!-- Personal Details -->
      <div class="section">
        <h2><i class="fas fa-user"></i> Personal Details</h2>
        <div class="input-group">
          <label for="fullname">Full Name</label>
          <input type="text" id="fullname" v-model="fullname" required />
        </div>
        <div class="input-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="email" required />
        </div>
      </div>

      <!-- Shipping Details -->
      <div class="section">
        <h2><i class="fas fa-shipping-fast"></i> Shipping Address</h2>
        <div class="input-group">
          <label for="address">Address</label>
          <textarea id="address" v-model="address" required></textarea>
        </div>
      </div>

      <!-- Billing Details -->
      <div class="section">
        <h2><i class="fas fa-file-invoice-dollar"></i> Billing Details</h2>
        <div class="input-group">
          <label for="billingAddress">Street Address</label>
          <textarea
            id="billingAddress"
            v-model="billingAddress"
            required
          ></textarea>
        </div>
        <div class="input-group">
          <label for="city">City</label>
          <input type="text" id="city" v-model="city" required />
        </div>
        <div class="input-group">
          <label for="state">State/Province</label>
          <input type="text" id="state" v-model="state" required />
        </div>
        <div class="input-group">
          <label for="zip">ZIP/Postal Code</label>
          <input type="text" id="zip" v-model="zip" required />
        </div>
        <div class="input-group">
          <label for="country">Country</label>
          <input type="text" id="country" v-model="country" required />
        </div>
        <div class="input-group">
          <label for="creditCard">Credit Card Number</label>
          <input
            type="text"
            id="creditCard"
            v-model="creditCard"
            required
            placeholder="1234 5678 9101 1121"
          />
        </div>
        <div class="input-group">
          <label for="expiry">Expiry Date</label>
          <input
            type="text"
            id="expiry"
            v-model="expiry"
            required
            placeholder="MM/YY"
          />
        </div>
        <div class="input-group">
          <label for="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            v-model="cvv"
            required
            placeholder="123"
          />
        </div>
      </div>

      <!-- Submit -->
      <button class="complete-btn" type="submit">Complete Checkout</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullname: '',
      email: '',
      address: '',
      billingAddress: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      creditCard: '',
      expiry: '',
      cvv: ''
    };
  },
  methods: {
    completeCheckout() {
      // Placeholder logic - replace with actual API call
      this.$store.commit('CLEAR_CART');
      this.$router.push('/thank-you');
    }
  }
}
</script>

<style scoped>
.checkout-container {
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.95);
  background: linear-gradient(to bottom, #121212, #333);
}

h1, h2 {
  font-family: 'Roboto', sans-serif;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #FFD700;
}

h2 {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.section {
  margin-bottom: 1.5rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.5);
  padding-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #FFD700;
}

input, textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.complete-btn {
  background-color: #FFD700;
  color: #121212;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.complete-btn:hover {
  background-color: #e6bf00;
}
</style>
