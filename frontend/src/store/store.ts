import { createStore } from 'vuex'
import type { cartProduct, product, stateType } from '../types'

// getters
const getters = {
  getProducts(state: stateType) {
    return state.items
  },
  getFeatured(state: stateType) {
    return state.featured
  },
  getShowCart(state: stateType) {
    return state.showCart
  },
  getCartQuantity(state: stateType) {
    return state.cartQuantity
  },
  getCart(state: stateType) {
    const products = Array<product>()
    state.items.forEach((product) => {
      const quantity = state.cart.get(product.id)

      if (quantity != undefined) {
        products.push({
          ...product,
          quantity,
        })
      }
    })
    console.warn(products)
    return products
  },
  getSubTotal(state: stateType) {
    return state.subtotal
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
  changeShowCart(state: stateType, status: boolean) {
    state.showCart = status
  },
  changeCartQuantity(state: stateType, amount: number) {
    if (amount == 0) {
      state.cartQuantity += 1
    } else if (amount < 0) {
      state.cartQuantity -= amount
    } else {
      state.cartQuantity += amount
    }
  },
  changeCartProduct(state: stateType, product: cartProduct) {
    const cart = state.cart.get(product.id)

    if (cart == undefined) {
      if (!(product.quantity <= 0)) {
        state.cart.set(product.id, product.quantity)
      }
    } else {
      if (!(cart + product.quantity <= 0)) {
        state.cart.set(product.id, cart + product.quantity)
      } else {
        state.cart.delete(product.id)
      }
    }

    let amount = 0
    state.cart.forEach((number) => {
      amount += number
    })

    state.cartQuantity = amount
  },
  changeSubTotal(state: stateType, number: number) {
    state.subtotal = number
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
  setShowCart({ commit }: { commit: Function }, status: boolean) {
    commit('changeShowCart', status)
  },
  setCartQuantity({ commit }: { commit: Function }, amount: number) {
    commit('changeCartQuantity', amount)
  },
  setCartProduct({ commit }: { commit: Function }, product: cartProduct) {
    commit('changeCartProduct', product)
  },
  setSubTotal({ commit }: { commit: Function }, number: number) {
    commit('changeSubTotal', number)
  },
}

export const store = createStore({
  state: {
    showCart: false,
    cartQuantity: 0,
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
