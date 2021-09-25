<template>
  <div>
    <products-list />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductsList from '../components/ProductsCard.vue'

export default defineComponent({
  name: 'Products',
  components: {
    ProductsList,
  },
})
</script>
