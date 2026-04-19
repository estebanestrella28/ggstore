import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paymentIntent = searchParams.get("payment_intent");

  if (!paymentIntent) {
    return NextResponse.json(
      { error: "Missing payment_intent" },
      { status: 400 },
    );
  }

  const order = await prisma.order.findFirst({
    where: {
      stripePaymentIntentId: paymentIntent,
    },
    select: {
      status: true,
    },
  });

  if (!order) {
    return NextResponse.json({ status: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ status: order.status });
}
