"use client";

import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types/products";
import formatCurrency from "@/util/formatCurrency";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const image = product.images?.[0] || "/logo2.png";

  const formatedCurrency = formatCurrency(product.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // 🔴 evita navegar si está dentro de <a>
    addItem(product.id, 1);
  };

  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      {/* Imagen + link */}
      <a href={`/product/${product.id}`} className="block">
        <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src={image}
            alt={product.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium leading-tight line-clamp-2">
            {product.title}
          </h2>

          <span className="text-lg font-bold text-red-500">
            {formatedCurrency}
          </span>
        </div>
      </a>

      {/* Acción */}
      <button
        onClick={handleAddToCart}
        className="mt-3 w-full rounded-lg bg-red-500 py-2 text-sm font-medium text-white transition hover:bg-red-600 active:scale-[0.98]"
      >
        Añadir al carrito
      </button>
    </div>
  );
}
