import { Router } from 'itty-router'
import { getProductById, getProducts } from '../services/product'

const router = Router({ base: '/shop' })

router.get('/products', async () => {
  try {
    const data = await getProducts({
      limit: 3,
    })

    let products = Array<Promise<unknown>>()

    // @ts-expect-error
    data.data.forEach(doc => {
      products.push(getProductById({id: doc.id}))
    });

    const rawData = await Promise.all(products)
    const results = rawData.map((doc) => {
      return {
        // @ts-expect-error
        data: doc.data,
        // @ts-expect-error
        id: doc.ref.id,
      }
    })
    return new Response(JSON.stringify({
      products: results
    }))
  } catch (error) {
    return new Response(JSON.stringify(error))
  }
})

router.get('/product/:id', async () => {
  try {
    const data = await getProductById({
      id: "310903682760704588"
    })
    return new Response(JSON.stringify(data))
  } catch (error) {
    return new Response(JSON.stringify(error))
  }
})

export default router
