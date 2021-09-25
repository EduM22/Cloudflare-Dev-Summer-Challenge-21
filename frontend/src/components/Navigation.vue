<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open">
      <Dialog
        as="div"
        class="fixed inset-0 flex z-40 lg:hidden"
        @close="open = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="
              relative
              max-w-xs
              w-full
              bg-white
              shadow-xl
              pb-12
              flex flex-col
              overflow-y-auto
            "
          >
            <div class="px-4 pt-5 pb-2 flex">
              <button
                type="button"
                class="
                  -m-2
                  p-2
                  rounded-md
                  inline-flex
                  items-center
                  justify-center
                  text-gray-400
                "
                @click="open = false"
              >
                <span class="sr-only">Close menu</span>
                <XIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div class="border-t border-gray-200 py-6 px-4 space-y-6">
              <div
                v-for="page in navigation.pages"
                :key="page.name"
                class="flow-root"
              >
                <router-link
                  :to="page.href"
                  class="-m-2 p-2 block font-medium text-gray-900"
                  >{{ page.name }}</router-link
                >
              </div>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-white">
      <p
        class="
          bg-indigo-600
          h-10
          flex
          items-center
          justify-center
          text-sm
          font-medium
          text-white
          px-4
          sm:px-6
          lg:px-8
        "
      >
        Test e-commerce site for
        <a
          href="https://challenge.developers.cloudflare.com/"
          class="hover:text-blue-400 ml-1"
          target="_blank"
          >Cloudflare Developer Summer Challenge</a
        ><!--Get free delivery on orders over $100-->
      </p>

      <nav aria-label="Top" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="h-16 flex items-center">
            <button
              type="button"
              class="bg-white p-2 rounded-md text-gray-400 lg:hidden"
              @click="open = true"
            >
              <span class="sr-only">Open menu</span>
              <MenuIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <router-link to="/">
                <span class="sr-only">Workflow</span>
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </router-link>
            </div>

            <!-- Flyout menus -->
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="h-full flex space-x-8">
                <router-link
                  v-for="page in navigation.pages"
                  :key="page.name"
                  :to="page.href"
                  class="
                    flex
                    items-center
                    text-sm
                    font-medium
                    text-gray-700
                    hover:text-gray-800
                  "
                >
                  {{ page.name }}
                </router-link>
              </div>
            </PopoverGroup>

            <div class="ml-auto flex items-center">
              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <button
                  @click="showCart"
                  class="group -m-2 p-2 flex items-center"
                >
                  <ShoppingBagIcon
                    class="
                      flex-shrink-0
                      h-6
                      w-6
                      text-gray-400
                      group-hover:text-gray-500
                    "
                    aria-hidden="true"
                  />
                  <span
                    class="
                      ml-2
                      text-sm
                      font-medium
                      text-gray-700
                      group-hover:text-gray-800
                    "
                    >{{ cartQuantity }}</span
                  >
                  <span class="sr-only">items in cart, view bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
import {
  Dialog,
  DialogOverlay,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from '@heroicons/vue/outline'
import { store } from '../store/store'

const navigation = {
  pages: [
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
  ],
}

export default defineComponent({
  name: 'Navigation',
  components: {
    Dialog,
    DialogOverlay,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
    MenuIcon,
    SearchIcon,
    ShoppingBagIcon,
    XIcon,
  },
  setup() {
    const open = ref(false)

    return {
      navigation,
      open,
    }
  },
  methods: {
    showCart() {
      store.dispatch('setShowCart', true)
    },
  },
  computed: {
    cartQuantity() {
      return store.getters.getCartQuantity
    },
  },
})
</script>
