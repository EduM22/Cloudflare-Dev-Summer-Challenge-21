import { Router } from 'itty-router'
import checkoutRouter from './routers/checkout'
import shopRouter from './routers/shop'

const router = Router()

router.all('/checkout/*', checkoutRouter.handle)
router.all('/shop/*', shopRouter.handle)

router.all('*', () => new Response('Not Found.', { status: 404 }))

addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)
