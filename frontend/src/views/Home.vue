<template>
  <div>
    <promo-header />
    <div
      class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2 class="sr-only">Products</h2>
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import PromoHeader from '../components/PromoHeader.vue'
import { getProducts } from '../services/product'
import { store } from '../store/store'

export default defineComponent({
  name: 'Home',
  components: {
    ProductCard,
    PromoHeader,
  },
  async mounted() {
    await getProducts({})
  },
  computed: {
    products() {
      return store.getters.getFeatured
    },
  },
})
</script>
