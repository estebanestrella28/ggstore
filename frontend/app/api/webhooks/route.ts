import { OrderStatus } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
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

  const permittedEvents = [
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
    "payment_intent.canceled",
  ];

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
          console.log(`Metadata: ${data.metadata.orderId}`);
          console.log(`_________________________`);

          // Actializar orden status en DB
          await prisma.order.updateMany({
            where: {
              id: data.metadata.orderId,
              status: { in: [OrderStatus.pending] },
            },
            data: {
              status: OrderStatus.paid,
            },
          });

          break;
        case "payment_intent.payment_failed":
          data = event.data.object as Stripe.PaymentIntent;

          console.log(`_________________________`);
          console.log(`Payment status: ${data.status}`);
          console.log(`Pago fallido: ${data.id}`);
          console.log(`Monto: ${data.amount}`);
          console.log(`Metadata: ${data.metadata.orderId}`);
          console.log(`_________________________`);

          // Actializar orden status en DB
          await prisma.order.updateMany({
            where: {
              id: data.metadata.orderId,
              status: { in: [OrderStatus.pending] },
            },
            data: {
              status: OrderStatus.failed,
            },
          });

          break;
        case "payment_intent.canceled":
          data = event.data.object as Stripe.PaymentIntent;

          console.log(`_________________________`);
          console.log(`Payment status: ${data.status}`);
          console.log(`Pago cancelado: ${data.id}`);
          console.log(`Monto: ${data.amount}`);
          console.log(`Metadata: ${data.metadata.orderId}`);
          console.log(`_________________________`);

          // Actializar orden status en DB
          await prisma.order.updateMany({
            where: {
              id: data.metadata.orderId,
              status: { in: [OrderStatus.pending, OrderStatus.failed] },
            },
            data: {
              status: OrderStatus.canceled,
            },
          });

          break;
        default:
          throw new Error(`Unhandled payment event: ${event.type}`);
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
