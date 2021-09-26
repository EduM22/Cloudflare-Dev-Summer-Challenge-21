<template>
  <router-link :to="product.href" class="group">
    <div
      class="
        w-full
        aspect-w-1 aspect-h-1
        bg-gray-200
        rounded-lg
        overflow-hidden
        xl:aspect-w-7 xl:aspect-h-8
      "
    >
      <img
        :src="product.images[0].src"
        :alt="product.images[0].alt"
        class="w-full h-full object-center object-cover group-hover:opacity-75"
      />
    </div>
    <h3 class="mt-4 text-sm text-gray-700">
      {{ product.name }}
    </h3>
    <p class="mt-1 text-lg font-medium text-gray-900">
      {{ product.price }}
    </p>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductsCard',
  props: {
    product: Object,
  },
  components: {},
})
</script>
