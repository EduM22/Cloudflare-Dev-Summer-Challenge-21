<template>
  <div class="bg-white" v-if="!loading">
    <div class="pt-6">
      <!-- Image gallery -->
      <div
        class="
          mt-6
          max-w-2xl
          mx-auto
          sm:px-6
          lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8
        "
      >
        <div
          class="
            aspect-w-4 aspect-h-5
            sm:rounded-lg sm:overflow-hidden
            lg:aspect-w-3 lg:aspect-h-4
          "
        >
          <img
            :src="product.images[0].src"
            :alt="product.images[0].alt"
            class="w-full h-full object-center object-cover"
          />
        </div>
        <!-- Product info -->
        <div class="lg:mt-24 max-w-2xl mx-auto pt-10 pb-2 px-4 sm:px-6">
          <div class="lg:col-span-2 lg:border-gray-200 lg:pr-8">
            <h1
              class="
                text-2xl
                font-extrabold
                tracking-tight
                text-gray-900
                sm:text-3xl
              "
            >
              {{ product.name }}
            </h1>
          </div>

          <!-- Options -->
          <div class="mt-4 lg:mt-0 lg:row-span-3">
            <h2 class="sr-only">Product information</h2>
            <p class="text-3xl text-gray-900">{{ price }}</p>

            <!-- Reviews -->
            <div class="mt-6" v-if="reviews">
              <h3 class="sr-only">Reviews</h3>
              <div class="flex items-center">
                <div class="flex items-center">
                  <StarIcon
                    v-for="rating in [0, 1, 2, 3, 4]"
                    :key="rating"
                    :class="[
                      reviews.average > rating
                        ? 'text-gray-900'
                        : 'text-gray-200',
                      'h-5 w-5 flex-shrink-0',
                    ]"
                    aria-hidden="true"
                  />
                </div>
                <p class="sr-only">{{ reviews.average }} out of 5 stars</p>
                <a
                  :href="reviews.href"
                  class="
                    ml-3
                    text-sm
                    font-medium
                    text-indigo-600
                    hover:text-indigo-500
                  "
                  >{{ reviews.totalCount }} reviews</a
                >
              </div>
            </div>

            <form class="mt-10 mb-10">
              <button
                type="submit"
                @click.prevent="submit(product)"
                class="
                  mt-10
                  w-full
                  bg-indigo-600
                  border border-transparent
                  rounded-md
                  py-3
                  px-8
                  flex
                  items-center
                  justify-center
                  text-base
                  font-medium
                  text-white
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                "
              >
                Add to bag
              </button>
            </form>
          </div>

          <div
            class="
              py-10
              lg:pt-6
              lg:pb-5
              lg:col-start-1
              lg:col-span-2
              lg:border-gray-200
              lg:pr-8
            "
          >
            <!-- Description and details -->
            <div v-if="product.description">
              <h3 class="sr-only">Description</h3>

              <div class="space-y-6">
                <p class="text-base text-gray-900">{{ product.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>loading...</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { StarIcon } from '@heroicons/vue/solid'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import type { Product } from '../types'
import { store } from '../store/store'
import { getProductById } from '../services/product'
import { displayToCurrency } from '../utils/utils'

export default defineComponent({
  name: 'Product',
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    StarIcon,
  },
  data() {
    return {
      loading: true,
      reviews: { href: '#', average: 4, totalCount: 117 },
      product: {},
    }
  },
  async mounted() {
    //await getProducts({})
    const id = this.$route.params.id

    const localProduct = await getProductById({
      id: Array.isArray(id) ? id[0] : id,
    })

    this.product = localProduct
    this.loading = false
  },
  computed: {
    price() {
      return displayToCurrency({ number: this.product.price })
    },
  },
  methods: {
    submit(product: Product) {
      store.dispatch('setCartProduct', { id: product.id, quantity: 1 })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
})
</script>
