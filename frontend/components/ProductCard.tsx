"use client";

import { addToCart } from "@/lib/cart";
import type { Product } from "@/types/products";
import { use } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div>
      <a
        href={`/product/${product.id}`}
        className="group block rounded-xl bg-white/80 p-3 shadow-sm transition hover:shadow-md"
      >
        <div className="relative mb-3 h-32 w-32 overflow-hidden rounded-lg bg-gray-100">
          {product.images?.length && (
            <img
              src={product.images[0]}
              alt={product.slug}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium leading-tight line-clamp-2">
            {product.title}
          </h2>

          <span className="text-lg font-bold text-red-400">
            {product.price}
          </span>
        </div>
      </a>
      <div>
        <button
          onClick={() =>
            addToCart({
              variantId: product.id,
              productName: product.slug,
              variantLabel: product.title,
              image: product.images[0],
              price: product.price,
              quantity: 1,
            })
          }
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
