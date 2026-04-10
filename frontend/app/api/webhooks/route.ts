import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const StripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!StripeWebhookSecret) {
  throw new Error("Couldn't get stripe webhook");
}

export async function POST(req: Request) {
  let event;

  try {
    const signature = (await headers()).get("stripe-signature");
    if (!signature) {
      throw new Error("Missing stripe-signature header");
    }

    event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      StripeWebhookSecret!,
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    console.error(
      "Error message: ",
      err instanceof Error ? err.message : String(err),
    );
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    );
  }

  const permittedEvents = ["payment_intent.succeeded"];

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      switch (event.type) {
        case "payment_intent.succeeded":
          data = event.data.object as Stripe.PaymentIntent;

          console.log(`_________________________`);
          console.log(`Payment status: ${data.status}`);
          console.log(`Pago confirmado: ${data.id}`);
          console.log(`Monto: ${data.amount}`);
          console.log(`Metadata: ${data.metadata.items}`);
          console.log(`_________________________`);

          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: `Webhook handler failed` },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ message: `Received` }, { status: 200 });
}
