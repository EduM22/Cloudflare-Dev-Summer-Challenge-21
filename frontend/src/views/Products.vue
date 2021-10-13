<template>
  <div
    v-if="!loading"
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
        v-bind:key="product.id"
        :product="product"
      />
    </div>
  </div>
  <div v-else-if="error">
    <h3>error</h3>
  </div>
  <div v-else>
    <h3>loading...</h3>
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
    try {
      this.loading = true
      await getProducts({})
      this.loading = false
    } catch (error) {
      console.log(error)
      this.error = true
      this.loading = false
    }
  },
  data() {
    return {
      loading: true,
      error: false,
      //products: []
    }
  },
  computed: {
    products() {
      return store.getters.getProducts
    },
  },
})
</script>
