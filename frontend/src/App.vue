<template>
  <div>
    <checkout-cart />
    <navigation />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navigation from './components/Navigation.vue'
import CheckoutCart from './components/ShoppingCart.vue'
export default defineComponent({
  name: 'App',
  components: {
    Navigation,
    CheckoutCart,
  },
})
</script>
