import { store } from '../store/store'
import type { Product } from '../types'

export async function getProducts(params: {}) {
  const response = await fetch(
    `https://api.iexploreit.workers.dev/shop/products`,
  )

  if (!response.ok) throw new Error('Not OK')

  const data: { products: Array<Product> } = await response.json()

  store.dispatch('setProducts', data.products)

  store.dispatch('setFeatured', data.products.slice(0, 4))

  return data.products
}

export async function getProductById(params: { id: string }) {
  const response = await fetch(
    `https://api.iexploreit.workers.dev/shop/product/${params.id}`,
  )

  if (!response.ok) throw new Error('Not OK')

  const product: Product = await response.json()

  return product
}
