import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProductsById } from "@/lib/strapi";
import { CartItem } from "@/types/cart";

const amountInCents = (amount: number): number => Math.round(amount * 100);

async function calculateOrderAmount(
  ids: number[],
  cartItems: CartItem[],
): Promise<number> {
  const { products } = await getProductsById(ids);

  if (products.length !== ids.length) {
    throw new Error("Algunos productos no existen.");
  }

  const productMap = new Map(products.map((product) => [product.id, product]));

  return cartItems.reduce((acc, item) => {
    const product = productMap.get(item.variantId);

    if (!product) {
      throw new Error(`Producto no encontrado: ${item.variantId}`);
    }

    return acc + product.price * item.quantity;
  }, 0);
}

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

    // OBTENER EL VALOR DE LOS PRODUCTOS

    const total = await calculateOrderAmount(ids, items);

    // CREAR EL PAYMENT INTENT
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents(total),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        items: JSON.stringify(items),
      },
    });

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
