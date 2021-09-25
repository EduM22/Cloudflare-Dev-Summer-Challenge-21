import { createStore } from 'vuex'
import type { product, stateType } from '../types'

// getters
const getters = {
  getProducts(state: stateType) {
    return state.items
  },
  getFeatured(state: stateType) {
    return state.featured
  },
}

// mutations
const mutations = {
  changeProducts(state: stateType, products: Array<product>) {
    state.items = products
  },
  changeFeatured(state: stateType, products: Array<product>) {
    state.featured = products
  },
}

// actions
const actions = {
  setProducts({ commit }: { commit: Function }, products: Array<product>) {
    commit('changeProducts', products)
  },
  setFeatured({ commit }: { commit: Function }, products: Array<product>) {
    commit('changeFeatured', products)
  },
}

export const store = createStore({
  state: {
    featured: new Array<product>(),
    items: new Array<product>(),
    cart: new Map<string, number>(),
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
  mutations,
  actions,
  getters,
})
