"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/products";
import CartItemCard from "@/components/CartItemCard";

export default function CartPage() {
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

  const enrichedCart = cartItems.map((item) => {
    // 5- Une los datos del carrito con los de los productos
    const product = products.find((p) => p.id === item.variantId);

    return {
      ...item,
      product,
    };
  });

  return (
    <>
      {enrichedCart.map((el) => (
        <CartItemCard key={el.variantId} item={el} />
      ))}

      <a
        href="/checkout"
        className=" flex justify-center w-full mt-5 rounded-xl py-3 text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition active:scale-[0.98]"
      >
        Proceder al checkout
      </a>
    </>
  );
}
