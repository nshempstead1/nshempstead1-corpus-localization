import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const stripe = require('stripe')(Netlify.env.STRIPE_SECRET_KEY);
    const body = await req.json();
    
    const { 
      amount, 
      currency = 'usd', 
      customerEmail,
      customerName,
      description = 'Corpus Localization Service'
    } = body;

    // Validate required fields
    if (!amount || !customerEmail) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: amount and customerEmail' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      description: description,
      receipt_email: customerEmail,
      metadata: {
        customerName: customerName || '',
        service: 'corpus-localization'
      }
    });

    return new Response(JSON.stringify({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Stripe payment error:', error);
    
    return new Response(JSON.stringify({
      error: 'Payment processing failed',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config: Config = {
  path: "/api/create-payment-intent"
};
