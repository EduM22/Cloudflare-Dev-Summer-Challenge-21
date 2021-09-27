import faunadb from 'faunadb'
const q = faunadb.query

const client = new faunadb.Client({
  secret: 'KEY',
})

export async function getProductById(params: {
  id: string
}) {
  return client.query(q.Get(q.Ref(q.Collection('Products'), params.id)))
}

export async function getProducts(params: {
  limit: number
  after?: string
}) {
  return client.query(
    q.Paginate(
      q.Documents(q.Collection('Products')),
      {
        size: params.limit,
        after: (params.after ? [ q.Ref(q.Collection('Products'), params.after) ] : undefined ),
      }
    )
  )
  
}