import { createRouter, createWebHistory } from 'vue-router'

export const routerHistory = createWebHistory()
export const router = createRouter({
  history: routerHistory,
  strict: false,
  routes: [
    { path: '/', component: () => import('../views/Home.vue') },
    { path: '/product/:id', component: () => import('../views/Home.vue') },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})
