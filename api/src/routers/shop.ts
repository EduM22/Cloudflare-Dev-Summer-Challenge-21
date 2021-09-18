import { Router } from 'itty-router'

const router = Router()

router.get('/products', () => new Response('get products'))

router.get('/product/:id', () => new Response('get product'))

export default router