export type FaunaProduct = {
  ref: {
    id: string
  }
  data: {
    name: string
    href: string
    price: number
    description: string
    images: Array<{
      src: string
      alt: string
    }>
  } 
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

export {}
declare global {
  const STRIPE_SECRET_KEY: string
  const FAUNA_KEY: string
  const STRIPE_PUBLISHABLE_KEY: string
  const DOMAIN: string
}