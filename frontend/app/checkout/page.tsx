"use client";

import CheckoutForm from "@/components/Checkout";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/products";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!hasHydrated || cartItems.length === 0) return;

    const fetchProducts = async () => {
      const ids = [...new Set(cartItems.map((i) => i.variantId))].join(","); // 2- extrae los ids

      const res = await fetch(`/api/products?ids=${ids}`); // 3- llama al al api route con los ids y devuelve los productos
      const data = await res.json();

      setProducts(data.products); // 4- almacena los productos en el estado
    };

    fetchProducts();
  }, [cartItems]);

  useEffect(() => {
    if (!hasHydrated || cartItems.length === 0) return;
    const fetchClientSecret = async () => {
      const res = await fetch("/api/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      if (!res.ok) {
        throw new Error("Error al crear el Payment Intent");
      }

      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, [cartItems, hasHydrated]);

  if (!hasHydrated) {
    return <p>Cargando carrito...</p>;
  }

  if (cartItems.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  if (!clientSecret) {
    return <p>Cargando pago...</p>;
  }

  const mergedItems = products.map((product) => {
    const cartItem = cartItems.find((item) => item.variantId === product.id);

    const quantity = cartItem?.quantity ?? 0;

    return {
      ...product,
      quantity,
    };
  });

  const subtotal = mergedItems.reduce(
    (acc, current) => acc + current.price * current.quantity,
    0,
  );

  const shipping = 0;

  const discounts = 0;

  const total = subtotal + shipping - discounts;

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Price ({mergedItems.length} items)
          </span>
          <span className="font-medium">${subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">$0</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Discounts</span>
          <span className="font-medium">$0</span>
        </div>

        <hr className="my-2 border-gray-300" />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      {/* Stripe Form */}
      <div>
        <CheckoutForm clientSecret={clientSecret} />
      </div>
      {/* <button onClick={}
        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        // reemplaza con tu función de pago
      >
        Pay Now
      </button> */}
    </div>
  );
}
