"use client";

import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/products";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.items); // 1- obtiene los ids y cantidades de zustang
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!cartItems.length) return;

    const fetchProducts = async () => {
      const ids = [...new Set(cartItems.map((i) => i.variantId))].join(","); // 2- extrae los ids

      const res = await fetch(`/api/products?ids=${ids}`); // 3- llama al al api route con los ids y devuelve los productos
      const data = await res.json();

      setProducts(data.products); // 4- almacena los productos en el estado
    };

    fetchProducts();
  }, [cartItems]);

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

      <button
        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        // reemplaza con tu función de pago
      >
        Pay Now
      </button>
    </div>
  );
}
