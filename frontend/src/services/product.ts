import { store } from '../store/store'
import { data } from '../utils/data'

export async function getProducts(params: {}) {
  const products = await data()

  store.dispatch('setProducts', products)

  store.dispatch('setFeatured', products.slice(0, 3))

  return products
}
