<template>
  <div>
    <metainfo>
      <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>
    <promo-header />
    <div
      class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2
        class="text-2xl font font-extrabold tracking-tight text-gray-900 mb-2"
      >
        Featured Products
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import PromoHeader from '../components/PromoHeader.vue'
import { getProducts } from '../services/product'
import { store } from '../store/store'
import { useMeta } from 'vue-meta'

export default defineComponent({
  name: 'Home',
  components: {
    ProductCard,
    PromoHeader,
  },
  setup () {
    useMeta({
      title: "Shopy - Home",
      meta: [
        { name: 'description', content: 'Shopy has all the products you need for your writing/thinking needs' },
        // TODO: remove on real site   
        { name: 'robots', content: 'noindex,nofollow' } 
      ]
    })
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
