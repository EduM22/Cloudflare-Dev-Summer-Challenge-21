import { Router } from 'itty-router'
import type { Product } from '../bindings'
import { getProductById, getProductByLink, getProducts } from '../services/product'
import { CorsHeaders } from '../utils/utils'

const router = Router({ base: '/shop' })

router.get('/products', async (req: Request) => {
  try {
    // @ts-expect-error
    const { limit, after } = req.query

    const data = await getProducts({
      limit: limit ? parseInt(limit) : 5,
      after: after ? after : undefined
    })

    let products = Array<Promise<Product>>()

    // @ts-expect-error
    data.data.forEach((doc) => {
      products.push(getProductById({ id: doc.id }))
    })

    const results = await Promise.all(products)

    return new Response(
      JSON.stringify({
        products: results,
      }),
      {
        headers: CorsHeaders(req.headers.get('Origin')),
      },
    )
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: CorsHeaders(req.headers.get('Origin')),
    })
  }
})

router.get('/product/:id', async (req: Request) => {
  try {
    // @ts-expect-error
    const link = req.params.id
    const data = await getProductByLink({
      link: link
    })

    return new Response(JSON.stringify(data), {
      headers: CorsHeaders(req.headers.get('Origin')),
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: CorsHeaders(req.headers.get('Origin')),
    })
  }
})

export default router
