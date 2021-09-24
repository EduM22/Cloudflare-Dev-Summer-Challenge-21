<template>
  <div>
    <checkout-cart />
    <div>Hello</div>
    <products-list />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductsList from '../components/ProductsCard.vue'
import CheckoutCart from '../components/ShoppingCart.vue'

export default defineComponent({
  name: 'Home',
  components: {
      ProductsList,
      CheckoutCart
  },
})
</script>
