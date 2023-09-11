<template>
  <div class="cart-container">
    <h1>Your Cart</h1>

    <!-- Display a message if the cart is empty -->
    <div v-if="cart.length === 0">Your cart is empty.</div>

    <!-- Display cart items if present -->
    <div v-else>
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <img :src="item.imageUrl" alt="Movie Poster" class="cart-img" />
        <div class="cart-details">
          <div class="cart-title">{{ item.title }}</div>
          <div class="cart-price">R{{ item.price * item.quantity }}</div>
          <div class="cart-quantity-control">
            <button @click="decreaseItemQuantity(item)">-</button>
            {{ item.quantity }}
            <button @click="increaseItemQuantity(item)">+</button>
          </div>
          <button @click="removeFromCart(item)" class="remove-btn">
            Remove
          </button>
        </div>
      </div>
      <div class="cart-total">
        Total: R{{ totalAmount }}
        <button class="checkout-btn" @click="goToCheckout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['cart']),
    totalAmount() {
      return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
  },
  methods: {
    ...mapActions([
      'increaseItemQuantity',
      'decreaseItemQuantity',
      'removeFromCart'
    ]),
    goToCheckout() {
      this.$router.push('/checkout');
    }
  }
};
</script>

<style scoped>
.cart-container {
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to bottom, #121212, #333);
  color: rgba(255, 255, 255, 0.95);
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.cart-img {
  width: 100px;
  margin-right: 15px;
}

.cart-details {
  flex: 1;
}

.cart-title {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.cart-price {
  margin-bottom: 8px;
  color: #FFD700;
}

.cart-quantity {
  margin-bottom: 8px;
}

.cart-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  color: #FFD700;
  margin-top: 20px;
}

.checkout-btn {
  background-color: #FFD700;
  border: none;
  padding: 10px 20px;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover {
  background-color: #e6bf00;
}
.cart-quantity-control {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.cart-quantity-control > button {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.remove-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
.user-id-info {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  color: #FFD700;
  font-weight: bold;
}
</style>
