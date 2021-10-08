<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="fixed inset-0 overflow-hidden"
      @close="open = false"
    >
      <div class="absolute inset-0 overflow-hidden">
        <TransitionChild
          as="template"
          enter="ease-in-out duration-500"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in-out duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="
              absolute
              inset-0
              bg-gray-500 bg-opacity-75
              transition-opacity
            "
          />
        </TransitionChild>

        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <div class="w-screen max-w-md">
              <div
                class="
                  h-full
                  flex flex-col
                  bg-white
                  shadow-xl
                  overflow-y-scroll
                "
              >
                <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <DialogTitle class="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div class="ml-3 h-7 flex items-center">
                      <button
                        type="button"
                        class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        @click="open = false"
                      >
                        <span class="sr-only">Close panel</span>
                        <XIcon class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div class="mt-8">
                    <div class="flow-root">
                      <ul
                        role="list"
                        class="-my-6 divide-y divide-gray-200"
                        v-if="cart.length > 0"
                      >
                        <li
                          v-for="product in cart"
                          :key="product.id"
                          class="py-6 flex"
                        >
                          <div
                            class="
                              flex-shrink-0
                              w-24
                              h-24
                              border border-gray-200
                              rounded-md
                              overflow-hidden
                            "
                          >
                            <img
                              :src="product.images[0].src"
                              :alt="product.images[0].alt"
                              class="w-full h-full object-center object-cover"
                            />
                          </div>

                          <div class="ml-4 flex-1 flex flex-col">
                            <div>
                              <div
                                class="
                                  flex
                                  justify-between
                                  text-base
                                  font-medium
                                  text-gray-900
                                "
                              >
                                <h3>
                                  <router-link :to="product.href">
                                    {{ product.name }}
                                  </router-link>
                                </h3>
                                <p class="ml-4">
                                  {{ convertPrice(product.price) }}
                                </p>
                              </div>
                              <p class="mt-1 text-sm text-gray-500">
                                {{ product.color }}
                              </p>
                            </div>
                            <div
                              class="
                                flex-1 flex
                                items-end
                                justify-between
                                text-sm
                              "
                            >
                              <p class="text-gray-500">
                                Qty {{ product.quantity }}
                              </p>

                              <div class="flex">
                                <button
                                  type="button"
                                  class="
                                    font-medium
                                    text-indigo-600
                                    hover:text-indigo-500
                                  "
                                  @click.prevent="remove(product)"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div v-else>
                        No products, please add a product to the cart
                      </div>
                    </div>
                  </div>
                </div>

                <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div
                    class="
                      flex
                      justify-between
                      text-base
                      font-medium
                      text-gray-900
                    "
                  >
                    <p>Subtotal</p>
                    <p>{{ subTotal }}</p>
                  </div>
                  <p class="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div class="mt-6">
                    <button
                      :class="
                        isDisabled
                          ? 'w-full text-lg bg-gray-400 p-2 rounded-md'
                          : 'flex w-full justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                      "
                      @click.prevent="submit"
                      :disabled="isDisabled"
                    >
                      Checkout
                    </button>
                  </div>
                  <div
                    class="
                      mt-6
                      flex
                      justify-center
                      text-sm text-center text-gray-500
                    "
                  >
                    <p>
                      or
                      <button
                        type="button"
                        class="
                          text-indigo-600
                          font-medium
                          hover:text-indigo-500
                        "
                        @click="open = false"
                      >
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import type { product } from '../types'
import { XIcon } from '@heroicons/vue/outline'
import { store } from '../store/store'
import { displayToCurrency } from '../utils/utils'

export default defineComponent({
  name: 'ShoppingCart',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
  },
  data() {
    return {
      disableButton: false
    }
  },
  computed: {
    open: {
      get() {
        return store.getters.getShowCart
      },
      set(value: boolean) {
        return store.dispatch('setShowCart', value)
      },
    },
    cart() {
      return store.getters.getCart
    },
    subTotal() {
      return displayToCurrency({ number: store.getters.getSubTotal })
    },
    isDisabled() {
      const cart = store.getters.getCart
      return cart.length <= 0 || this.disableButton ? true : false
    },
  },
  methods: {
    async submit() {
      try {
        const cart = store.getters.getCart

        this.disableButton = true
        const res = await fetch('https://api.iexploreit.workers.dev/checkout/pay', {
          method: 'POST',
          body: JSON.stringify({ cart })
        })

        if (!res.ok) throw Error('Not status ok')

        const data = await res.json()

        window.location.replace(data.url)
        this.disableButton = false
      } catch (error) {
        console.log(error)
      }
    },
    remove(product: product) {
      store.dispatch('setCartProduct', { id: product.id, quantity: -1 })
    },
    convertPrice(number: number) {
      return displayToCurrency({ number: number })
    },
  },
})
</script>
