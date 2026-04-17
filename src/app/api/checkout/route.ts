import { NextRequest, NextResponse } from 'next/server';
import { stripe, GRAFT_PRICE_GBP_PENCE } from '@/lib/stripe';

async function createSession(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'GRAFT — The Complete Ecommerce Blueprint',
            description:
              '9 complete modules with embedded video lessons. Lifetime access. 30 day money back guarantee.',
          },
          unit_amount: GRAFT_PRICE_GBP_PENCE,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/`,
    metadata: { product: 'graft_course' },
  });

  return session;
}

export async function GET(req: NextRequest) {
  try {
    const session = await createSession(req);
    return NextResponse.redirect(session.url!, { status: 303 });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.redirect(new URL('/?checkout=error', req.nextUrl.origin), { status: 303 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await createSession(req);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
