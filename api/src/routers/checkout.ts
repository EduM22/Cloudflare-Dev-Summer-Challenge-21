import { Router } from 'itty-router'
import { Stripe } from 'stripe-workers'
import { CorsHeaders } from '../utils/utils'

const router = Router({ base: '/checkout' })

//@ts-expect-error secret not shown
const stripe = new Stripe(globalThis.STRIPE_SECRET_KEY)

router.post('/config', (req: Request) => {
  return new Response('config checkout', {
    headers: CorsHeaders(req.headers.get('Origin')),
  })
})

router.post('/pay', async (req: Request) => {
  try {
    const data = await req.json()

    // @ts-expect-error
    const lineItems = data.cart.map((element) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: element.product.name,
            images: [
              element.product.images[0]
                ? element.product.images[0].src
                : undefined,
            ],
          },
          unit_amount: element.product.price * 100,
        },
        quantity: element.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      //@ts-expect-error secret not shown
      success_url: `${globalThis.DOMAIN}/success`,
      //@ts-expect-error secret not shown
      cancel_url: `${globalThis.DOMAIN}/cancel`,
    })

    //res.redirect(303, session.url);
    return new Response(
      JSON.stringify({
        //@ts-expect-error not on types
        url: session.url,
      }),
      {
        status: 200,
        headers: CorsHeaders(req.headers.get('Origin')),
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error,
      }),
      {
        status: 500,
        headers: CorsHeaders(req.headers.get('Origin')),
      },
    )
  }
})

export default router
