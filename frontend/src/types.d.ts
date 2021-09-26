type product = {
  id: string
  name: string
  href: string
  price: string
  image: Array<{
    src: string
    alt: string
  }>
  colors: Array<{ name: string, class: string, selectedClass: string }>
  quantity: number
}

type cartProduct = {
  id: string
  quantity: number
}

export type stateType = {
  showCart: boolean
  cartQuantity: number
  featured: Array<product>
  items: Array<product>
  cart: Map<string, number>
  subtotal: number
  shipping: number
  tax: number
  total: number
}
