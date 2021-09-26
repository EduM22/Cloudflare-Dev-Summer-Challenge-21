<template>
  <div
    class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
  >
    <h2 class="text-2xl font font-extrabold tracking-tight text-gray-900 mb-2">
      All Products
    </h2>
    <div
      class="
        grid grid-cols-1
        gap-y-10
        sm:grid-cols-2
        gap-x-6
        lg:grid-cols-3
        xl:grid-cols-4 xl:gap-x-8
      "
    >
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { getProducts } from '../services/product'
import { store } from '../store/store'

export default defineComponent({
  name: 'Products',
  components: {
    ProductCard,
  },
  async mounted() {
    await getProducts({})
  },
  computed: {
    products() {
      return store.getters.getProducts
    },
  },
})
</script>
