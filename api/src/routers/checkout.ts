import { Router } from 'itty-router'
import { Stripe } from 'stripe-workers'
import { CorsHeaders } from '../utils/utils'

const router = Router({ base: '/checkout' })

const stripe = new Stripe('TEST_ID')

router.post('/config', (req: Request) => {
  return new Response('config checkout', {
    headers: CorsHeaders(req.headers.get('Origin')),
  })
})

router.post('/pay', async (req: Request) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    })

    //res.redirect(303, session.url);
    return new Response('', {
      status: 303,
      headers: {
        //@ts-expect-error not on types
        Location: session.url,
        ...CorsHeaders(req.headers.get('Origin')),
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error,
      }),
      {
        headers: CorsHeaders(req.headers.get('Origin')),
      },
    )
  }
})

export default router
