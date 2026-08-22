import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(req) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 });
    }

    // Convert our cart items into Stripe's line_items format
    const line_items = items.map((item) => {
      // Create a description that mentions the rights and size
      let sizeName = item.size === 'full' ? 'Full Calidad (Original)' 
                   : item.size === 'medium' ? 'Mediana (Impresión standard)' 
                   : 'Pequeña (Web / Redes)';

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${item.name} - ${sizeName}`,
            description: `Derechos de uso incluidos para: Libros, Prensa, Editoriales, Ilustración y Diseño. (Sin marca de agua).`,
          },
          // Stripe requires price in cents
          unit_amount: item.price * 100, 
        },
        quantity: 1,
      };
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
