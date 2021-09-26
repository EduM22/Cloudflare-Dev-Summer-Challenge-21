<template>
  <div class="relative bg-white overflow-hidden">
    <div class="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
        <div class="sm:max-w-lg">
          <h1
            class="
              text-4xl
              font font-extrabold
              tracking-tight
              text-gray-900
              sm:text-6xl
            "
          >
            Demo store
          </h1>
          <p class="mt-4 text-xl text-gray-500">
            For Cloudflare Developer Summer Challenge
            <br>Built with:
            <ul>
              <li class="text-gray-600"><a class="hover:text-blue-700" href="https://tailwindcss.com/" target="_blank">Tailwind</a></li>
              <li class="text-gray-600"><a class="hover:text-blue-700" href="https://www.npmjs.com/package/stripe-workers" target="_blank">Stripe-workers</a></li>
              <li class="text-gray-600"><a class="hover:text-blue-700" href="https://pages.cloudflare.com/" target="_blank">Cloudflare Pages</a></li>
              <li class="text-gray-600"><a class="hover:text-blue-700" href="https://workers.cloudflare.com/" target="_blank">Cloudflare workers</a></li>
              <li class="text-gray-600"><a class="hover:text-blue-700" href="https://developers.cloudflare.com/" target="_blank">+ more Cloudflare products</a></li>
            </ul>
          </p>
        </div>
        <div>
          <div class="mt-10">
            <!-- Decorative image grid -->
            <div
              aria-hidden="true"
              class="
                pointer-events-none
                lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full
              "
            >
              <div
                class="
                  absolute
                  transform
                  sm:left-1/2 sm:top-0 sm:translate-x-8
                  lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8
                "
              >
                <div class="flex items-center space-x-6 lg:space-x-8">
                  <div
                    class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8"
                  >
                    <div
                      class="
                        w-44
                        h-64
                        rounded-lg
                        overflow-hidden
                        sm:opacity-0
                        lg:opacity-100
                      "
                    >
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                        alt=""
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div class="w-44 h-64 rounded-lg overflow-hidden">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                        alt=""
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                  </div>
                  <div
                    class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8"
                  >
                    <div class="w-44 h-64 rounded-lg overflow-hidden">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                        alt=""
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div class="w-44 h-64 rounded-lg overflow-hidden">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                        alt=""
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div class="w-44 h-64 rounded-lg overflow-hidden">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                        alt=""
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                  </div>
                  <div
                    class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8"
                  >
                    <div class="w-44 h-64 rounded-lg overflow-hidden">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                        alt=""
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div class="w-44 h-64 rounded-lg overflow-hidden">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                        alt=""
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'About',
  components: {},
})
</script>
