<template>
  <div>
    <h2>Your Cart</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.title }} - R{{ item.price }} (x{{ item.quantity }})
        <button @click="removeFromCart(item)">Remove</button>
      </li>
    </ul>
    <button @click="proceedToCheckout" v-if="cartItems.length">
      Proceed to Checkout
    </button>
  </div>
</template>

<script>
export default {
  props: {
    cartItems: Array,
  },
  methods: {
    removeFromCart(movie) {
      this.$emit('remove-from-cart', movie);
    },
    proceedToCheckout() {
      this.$emit('checkout');
    }
  }
};
</script>
