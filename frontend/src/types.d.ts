type product = {
  product: Product
  quantity: number
}

export type Product = {
  id: string
  name: string
  href: string
  price: number
  description: string
  images: Array<{
    src: string
    alt: string
  }>
}

type cartProduct = {
  id: string
  quantity: number
}

export type stateType = {
  currency: string
  showCart: boolean
  cartQuantity: number
  featured: Array<Product>
  items: Array<Product>
  cart: Map<string, number>
  subtotal: number
  shipping: number
  tax: number
  total: number
}
