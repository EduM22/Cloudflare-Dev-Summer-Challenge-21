import { Router } from 'itty-router'
import checkoutRouter from './routers/checkout'
import shopRouter from './routers/shop'
import { CorsHeaders } from './utils/utils'

const router = Router()

router.options('*', (req: Request) => {
  return new Response('', {
    headers: CorsHeaders(req.headers.get('Origin')),
  })
})

router.all('/checkout/*', checkoutRouter.handle)
router.all('/shop/*', shopRouter.handle)

router.get('/ping', (req: Request) => {
  return new Response(JSON.stringify({
    msg: 'pong' 
  }), {
    headers: CorsHeaders(req.headers.get('Origin')),
  })
})

router.all(
  '*',
  (req: Request) =>
    new Response('Not Found.', {
      status: 404,
      headers: CorsHeaders(req.headers.get('Origin')),
    }),
)

addEventListener('fetch', (event) =>
  event.respondWith(router.handle(event.request)),
)
