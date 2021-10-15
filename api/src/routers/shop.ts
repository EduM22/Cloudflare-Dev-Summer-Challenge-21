import { Router } from 'itty-router'
import type { Product } from '../bindings'
import {
  getProductById,
  getProductByLink,
  getProducts,
} from '../services/product'
import { CorsHeaders } from '../utils/utils'

const router = Router({ base: '/shop' })

//const cache = caches.default

router.get('/products', async (req: Request) => {
  try {
    // @ts-expect-error
    const { limit, after } = req.query

    const limitVal = limit ? parseInt(limit) : 5
    const afterVal = after ? after : undefined

    const data = await getProducts({
      limit: limitVal,
      after: afterVal,
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

    /*const cacheKey = `getProducts-${limitVal}-${afterVal}-cache`

    var response = await cache.match(cacheKey)

    if (!response) {
      const data = await getProducts({
        limit: limitVal,
        after: afterVal,
      })

      let products = Array<Promise<Product>>()

      // @ts-expect-error
      data.data.forEach((doc) => {
        products.push(getProductById({ id: doc.id }))
      })

      const results = await Promise.all(products)

      response = new Response(
        JSON.stringify({
          products: results,
        }),
        {
          headers: CorsHeaders(req.headers.get('Origin')),
        },
      )

      cache.put(cacheKey, response)

      return response
    }
    return response*/
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
      link: link,
    })

    return new Response(JSON.stringify(data), {
      headers: CorsHeaders(req.headers.get('Origin')),
    })

    /*const cacheKey = `getProduct-${link}-cache`

    var response = await cache.match(cacheKey)

    if (!response) {
      const data = await getProductByLink({
        link: link,
      })

      response = new Response(JSON.stringify(data), {
        headers: CorsHeaders(req.headers.get('Origin')),
      })

      cache.put(cacheKey, response)

      return response
    }
    return response*/
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: CorsHeaders(req.headers.get('Origin')),
    })
  }
})

export default router
