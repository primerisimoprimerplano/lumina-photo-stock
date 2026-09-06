import { NextResponse } from 'next/server';
import { createOrder } from '../paypal';

export async function POST(request) {
  try {
    const body = await request.json();
    const { items } = body;
    
    // Calculate total from items
    const total = items.reduce((sum, item) => sum + item.price, 0);

    if (total <= 0) {
      return NextResponse.json({ error: "Invalid total" }, { status: 400 });
    }

    const { jsonResponse, httpStatusCode } = await createOrder(total);
    
    return NextResponse.json(jsonResponse, { status: httpStatusCode });
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "Failed to create order." }, { status: 500 });
  }
}
