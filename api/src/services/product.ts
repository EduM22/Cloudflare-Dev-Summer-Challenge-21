import faunadb from 'faunadb'
import type { FaunaProduct, Product } from '../bindings'
const q = faunadb.query

const client = new faunadb.Client({
  //@ts-expect-error secret not shown
  secret: globalThis.FAUNA_KEY,
})

export async function getProductById(params: { id: string }) : Promise<Product> {
  const faunaProduct = await client.query<FaunaProduct>(q.Get(q.Ref(q.Collection('Products'), params.id)))

  var product: Product = {
    id: faunaProduct.ref.id,
    ...faunaProduct.data
  }

  return product
}

export async function getProducts(params: { limit: number; after?: string }) {
  return client.query(
    q.Paginate(q.Documents(q.Collection('Products')), {
      size: params.limit,
      after: params.after
        ? [q.Ref(q.Collection('Products'), params.after)]
        : undefined,
    }),
  )
}
