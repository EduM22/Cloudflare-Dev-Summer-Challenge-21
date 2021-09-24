import { createStore } from 'vuex'
import type { product, stateType } from '../types'

// getters
const getters = {
  getProducts(state: stateType) {
    return state.items
  },
}

// mutations
const mutations = {
  changeProducts(state: stateType, products: Array<product>) {
    state.items = products
  },
}

// actions
const actions = {
  setProducts({ commit }: { commit: Function }, products: Array<product>) {
    commit('changeProducts', products)
  },
}

export const store = createStore({
  state: {
    items: [],
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
