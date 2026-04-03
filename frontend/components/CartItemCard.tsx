"use client";

import { useCartStore } from "@/store/cartStore";
import formatCurrency from "@/util/formatCurrency";

type CartItem = {
  variantId: number;
  quantity: number;
  product?: {
    id: number;
    title: string;
    price: number;
    images: string[];
  };
};

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const updateQuantity = useCartStore((store) => store.updateQuantity);
  const removeItem = useCartStore((store) => store.removeItem);

  const product = item.product;

  if (!product) {
    return (
      <div className="p-4 border rounded-xl">
        <p className="text-sm text-gray-500">Cargando producto...</p>
      </div>
    );
  }

  const subtotal = product.price * item.quantity;

  return (
    <div className="flex gap-4 p-4 border rounded-xl bg-white shadow-sm">
      {/* Imagen */}
      <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={product.images?.[0] ?? "/logo2.png"}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 gap-2">
        <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>

        <span className="text-sm text-gray-500">
          Precio: {formatCurrency(product.price)}
        </span>

        {/* Controles */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
            className="px-2 py-1 border rounded-md"
          >
            -
          </button>

          <span className="text-sm font-medium">{item.quantity}</span>

          <button
            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
            className="px-2 py-1 border rounded-md"
          >
            +
          </button>

          <button
            onClick={() => removeItem(item.variantId)}
            className="ml-auto text-sm text-red-500"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="flex flex-col justify-between items-end">
        <span className="text-sm text-gray-500">Subtotal</span>
        <span className="text-base font-semibold">
          {formatCurrency(subtotal)}
        </span>
      </div>
    </div>
  );
}
