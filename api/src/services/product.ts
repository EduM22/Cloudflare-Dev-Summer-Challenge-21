import faunadb from 'faunadb'
import type { FaunaProduct, Product } from '../bindings'
const q = faunadb.query

const client = new faunadb.Client({
  //@ts-expect-error secret not shown
  secret: globalThis.FAUNA_KEY,
})

const cache = caches.default

export async function getProductById(params: { id: string }) : Promise<Product> {

  const cacheKey = `getProductById-${params.id}-cache`

  var response = await cache.match(cacheKey)

  if (!response) {
    const faunaProduct = await client.query<FaunaProduct>(q.Get(q.Ref(q.Collection('Products'), params.id)))
  
    var product: Product = {
      id: faunaProduct.ref.id,
      ...faunaProduct.data
    }

    cache.put(cacheKey, new Response(JSON.stringify(product)))
  
    return product
  }

  return await response.json()
}

export async function getProductByLink(params: { link: string }) : Promise<Product> {
  const cacheKey = `getProductByLink-${params.link}-cache`

  var response = await cache.match(cacheKey)

  if (!response) {
    const res = await client.query(q.Map(
      q.Paginate(
        q.Match(q.Index("product_by_link"), `/${params.link}`)
      ),
      q.Lambda(
        "href",
        q.Get(q.Var("href"))
      )
    ))

    var product: Product = {
      // @ts-expect-error
      id: res.data[0].ref.id,
      // @ts-expect-error
      ...res.data[0].data
    }

    cache.put(cacheKey, new Response(JSON.stringify(product)))

    return product
  }

  return await response.json()

}

export async function getProducts(params: { limit: number; after?: string }) {
  const cacheKey = `getProducts-cache`

  var response = await cache.match(cacheKey)

  if (!response) {
    const data = client.query(
      q.Paginate(q.Documents(q.Collection('Products')), {
        size: params.limit,
        after: params.after
          ? [q.Ref(q.Collection('Products'), params.after)]
          : undefined,
      }),
    )

    cache.put(cacheKey, new Response(JSON.stringify(data)))

    return data
  }

  return response.json()
}
