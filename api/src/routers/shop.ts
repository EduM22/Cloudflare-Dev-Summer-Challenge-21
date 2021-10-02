import { Router } from 'itty-router'
import { getProductById, getProducts } from '../services/product'
import { CorsHeaders } from '../utils/utils'

const router = Router({ base: '/shop' })

router.get('/products', async (req: Request) => {
  try {
    const data = await getProducts({
      limit: 3,
    })

    let products = Array<Promise<unknown>>()

    // @ts-expect-error
    data.data.forEach((doc) => {
      products.push(getProductById({ id: doc.id }))
    })

    const rawData = await Promise.all(products)
    const results = rawData.map((doc) => {
      return {
        // @ts-expect-error
        data: doc.data,
        // @ts-expect-error
        id: doc.ref.id,
      }
    })
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
      headers: CorsHeaders(req.headers.get('Origin')),
    })
  }
})

router.get('/product/:id', async (req: Request) => {
  try {
    const data = await getProductById({
      id: '310903682760704588',
    })
    return new Response(JSON.stringify(data), {
      headers: CorsHeaders(req.headers.get('Origin')),
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: CorsHeaders(req.headers.get('Origin')),
    })
  }
})

export default router
