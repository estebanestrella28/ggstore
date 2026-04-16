import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProductsById } from "@/lib/strapi";
import { CartItem } from "@/types/cart";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@/lib/generated/prisma/enums";

export async function POST(req: Request) {
  try {
    // VALIDAR QUE OBTENGO LOS ITEMS DEL CARRITO Y EXTRAER LOS IDS

    const { items }: { items: CartItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "El carrito está vacío" },
        { status: 400 },
      );
    }
    const ids = items.map((item: any) => item.variantId);

    // OBTENER LOS PRODUCTOS DE STRAPI
    const { products } = await getProductsById(ids);

    if (products.length !== ids.length) {
      throw new Error("Algunos productos no existen.");
    }

    const productMap = new Map(
      products.map((product) => [product.id, product]),
    );

    // CREAR EL SNAPSHOT DE LOS PRODUCTOS
    const itemsSnapshot = items.map((item: CartItem) => {
      const product = productMap.get(item.variantId);

      if (!product) {
        throw new Error(`Producto no encontrado: ${item.variantId}`);
      }

      const price = product.price;
      const name = product.title;

      return {
        productId: product.id,
        name,
        price,
        quantity: item.quantity,
        subtotal: price * item.quantity,
      };
    });

    // OBTENER EL VALOR DE LOS PRODUCTOS

    const totalAmount = itemsSnapshot.reduce((acc, item) => {
      return acc + item.subtotal;
    }, 0);

    const amountInCents = Math.round(totalAmount * 100);

    // Verifica si existe una orden pendiente

    let order = await prisma.order.findFirst({
      where: {
        status: OrderStatus.pending,
        amount: amountInCents,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    let paymentIntent;

    if (order) {
      // recuperar el payment intent de la orden
      if (order.stripePaymentIntentId) {
        paymentIntent = await stripe.paymentIntents.retrieve(
          order.stripePaymentIntentId,
        );

        if (
          paymentIntent?.status === "canceled" ||
          paymentIntent?.status === "succeeded"
        ) {
          // CREAR EL PAYMENT INTENT
          paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: "usd",
            automatic_payment_methods: {
              enabled: true,
            },
            metadata: {
              orderId: order.id,
            },
          });
          // Vincula el nuevo PI con la orden recuperada
          await prisma.order.update({
            where: { id: order.id },
            data: {
              stripePaymentIntentId: paymentIntent.id,
            },
          });
        }

        if (paymentIntent?.amount !== amountInCents && paymentIntent?.id) {
          paymentIntent = await stripe.paymentIntents.update(paymentIntent.id, {
            amount: amountInCents,
          });
          // Si el amount es diferente es porque algo en el carrito cambió
          // Vincula el nuevo amount y ItemSnapshot del order pendiente recuperada
          await prisma.order.update({
            where: { id: order.id },
            data: {
              amount: amountInCents,
              items: itemsSnapshot,
            },
          });
        }
      } else {
        // Si el order no tiene un paymentIntent viculado

        // CREAR EL PAYMENT INTENT
        paymentIntent = await stripe.paymentIntents.create({
          amount: amountInCents,
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
          metadata: {
            orderId: order.id,
          },
        });

        await prisma.order.update({
          where: { id: order.id },
          data: {
            stripePaymentIntentId: paymentIntent.id,
          },
        });
      }
    } else {
      // Crear orden en db
      order = await prisma.order.create({
        data: {
          amount: amountInCents,
          status: OrderStatus.pending,
          items: itemsSnapshot,
        },
      });

      // CREAR EL PAYMENT INTENT
      paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          orderId: order.id,
        },
      });

      // Vincular la orden con Stripe
      await prisma.order.update({
        where: { id: order.id },
        data: {
          stripePaymentIntentId: paymentIntent.id,
        },
      });
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);

    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 },
    );
  }
}
