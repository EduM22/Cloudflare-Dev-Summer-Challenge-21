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
  async mounted() {
    try {
      //https://api.iexploreit.workers.dev/ping
      //http://127.0.0.1:8787/ping
      const res = await fetch('https://api.iexploreit.workers.dev/ping')
      console.log(await res.json())
    } catch (error) {
      console.warn(error)
    }
  }
})
</script>
