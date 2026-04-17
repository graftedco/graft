import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const GRAFT_PRICE_GBP_PENCE = 4999;
