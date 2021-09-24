type product = {
  id: string
  title: string
  image: string
  price: number
  taxes: [
    {
      id: string
      country: string
      type: string
      value: number
    },
  ]
}

export type stateType = {
  items: Array<product>
  cart: Map<string, number>
  subtotal: number
  shipping: number
  tax: number
  total: number
}
