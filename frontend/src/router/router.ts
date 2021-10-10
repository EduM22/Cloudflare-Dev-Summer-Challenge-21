import { createRouter, createWebHistory } from 'vue-router'

export const routerHistory = createWebHistory()
export const router = createRouter({
  history: routerHistory,
  strict: false,
  routes: [
    { path: '/', component: () => import('../views/Home.vue') },
    { path: '/products', component: () => import('../views/Products.vue') },
    { path: '/product/:id', component: () => import('../views/Product.vue') },
    { path: '/about', component: () => import('../views/About.vue') },
    { path: '/success', component: () => import('../views/Home.vue') },
    { path: '/cancel', component: () => import('../views/Home.vue') },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})
