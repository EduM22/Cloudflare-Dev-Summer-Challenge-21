type product = {
  id: string
  name: string
  href: string
  price: string
  imageSrc: string
  imageAlt: string
}

export type stateType = {
  featured: Array<product>
  items: Array<product>
  cart: Map<string, number>
  subtotal: number
  shipping: number
  tax: number
  total: number
}
