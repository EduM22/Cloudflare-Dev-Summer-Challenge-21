type product = {
  id: string
  name: string
  href: string
  price: string
  imageSrc: string
  imageAlt: string
  color: string
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