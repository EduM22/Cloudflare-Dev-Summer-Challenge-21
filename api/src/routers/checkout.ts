import { Router } from 'itty-router'

const router = Router()

router.post('/config', () => new Response('config checkout'))

router.post('/pay', () => new Response('config checkout'))

export default router