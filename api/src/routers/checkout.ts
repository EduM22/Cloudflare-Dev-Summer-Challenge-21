import { Router } from 'itty-router'
import { Stripe } from 'stripe-workers'

const router = Router({ base: '/checkout' })

const stripe = new Stripe('TEST_ID')

router.post('/config', () => {
  return new Response('config checkout')
})

router.post('/pay', async () => {
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
      //@ts-expect-error not on types
      headers: { Location: session.url },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error,
      }),
    )
  }
})

export default router
