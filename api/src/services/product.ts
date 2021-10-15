import faunadb from 'faunadb'
import type { FaunaProduct, Product } from '../bindings'
const q = faunadb.query

const client = new faunadb.Client({
  //@ts-expect-error secret not shown
  secret: globalThis.FAUNA_KEY,
})

export async function getProductById(params: { id: string }): Promise<Product> {
  const faunaProduct = await client.query<FaunaProduct>(
    q.Get(q.Ref(q.Collection('Products'), params.id)),
  )

  var product: Product = {
    id: faunaProduct.ref.id,
    ...faunaProduct.data,
  }

  return product
}

export async function getProductByLink(params: {
  link: string
}): Promise<Product> {
  const res = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('product_by_link'), `/${params.link}`)),
      q.Lambda('href', q.Get(q.Var('href'))),
    ),
  )

  var product: Product = {
    // @ts-expect-error
    id: res.data[0].ref.id,
    // @ts-expect-error
    ...res.data[0].data,
  }

  return product
}

export async function getProducts(params: { limit: number; after?: string }) {
  const data = client.query(
    q.Paginate(q.Documents(q.Collection('Products')), {
      size: params.limit,
      after: params.after
        ? [q.Ref(q.Collection('Products'), params.after)]
        : undefined,
    }),
  )

  return data
}
