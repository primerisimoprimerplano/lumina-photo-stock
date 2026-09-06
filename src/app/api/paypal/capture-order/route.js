import { NextResponse } from 'next/server';
import { capturePayment } from '../paypal';

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderID } = body;
    
    if (!orderID) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    const { jsonResponse, httpStatusCode } = await capturePayment(orderID);
    
    return NextResponse.json(jsonResponse, { status: httpStatusCode });
  } catch (error) {
    console.error("Failed to capture order:", error);
    return NextResponse.json({ error: "Failed to capture order." }, { status: 500 });
  }
}
