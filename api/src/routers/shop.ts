import { Router } from 'itty-router'

const router = Router({ base: '/shop' })

const products = [
    {
        id: 1,
        name: `test product`,
        price: 24000
    },
    {
        id: 2,
        name: `test product 2`,
        price: 13000
    }
]

router.get('/products', () => {
    return new Response(JSON.stringify(products))
})
    

router.get('/product/:id', () => {
    return new Response(JSON.stringify(products[0]))
})

export default router