import { store } from '../store/store'
import type { product } from '../types'
import { data } from '../utils/data'

export async function getProducts(params: {}) {
  const products = await data()

  store.dispatch('setProducts', products)

  store.dispatch('setFeatured', products.slice(0, 3))

  return products
}

export async function getProductById(params: { id: string }) {
  const products = store.getters.getProducts

  let localProduct: product | undefined = undefined

  products.forEach((product: product) => {
    if (product.id == params.id) {
      localProduct = product
    }
  })

  return localProduct
}
