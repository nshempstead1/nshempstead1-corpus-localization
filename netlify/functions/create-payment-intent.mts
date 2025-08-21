import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Add CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers
    });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers
    });
  }

  try {
    // Check if Stripe key exists
    if (!Netlify.env.STRIPE_SECRET_KEY) {
      return new Response(JSON.stringify({ 
        error: 'Stripe configuration missing' 
      }), {
        status: 500,
        headers
      });
    }

    const stripe = require('stripe')(Netlify.env.STRIPE_SECRET_KEY);
    
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return new Response(JSON.stringify({ 
        error: 'Invalid JSON in request body' 
      }), {
        status: 400,
        headers
      });
    }
    
    const { 
      amount, 
      currency = 'usd', 
      customerEmail,
      customerName,
      description = 'Corpus Localization Service',
      serviceType = 'translation'
    } = body;

    // Validate required fields
    if (!amount || !customerEmail) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: amount and customerEmail' 
      }), {
        status: 400,
        headers
      });
    }

    // Validate amount is a number
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return new Response(JSON.stringify({ 
        error: 'Invalid amount provided' 
      }), {
        status: 400,
        headers
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(numAmount * 100), // Convert to cents
      currency: currency,
      description: description,
      receipt_email: customerEmail,
      metadata: {
        customerName: customerName || '',
        service: serviceType,
        website: 'corpuslocalization.com'
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return new Response(JSON.stringify({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    }), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('Stripe payment error:', error);
    
    return new Response(JSON.stringify({
      error: 'Payment processing failed',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }), {
      status: 500,
      headers
    });
  }
};

export const config: Config = {
  path: "/api/create-payment-intent"
};
