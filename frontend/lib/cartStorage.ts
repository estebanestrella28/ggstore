import { Cart } from "@/types/cart";

export function getCart(): Cart {
  // Busca en el localStorage si existe un cart

  const cart = localStorage.getItem("cart");

  if (cart !== null) {
    return JSON.parse(cart);
  }

  return { items: [] } as Cart;
}

export function saveCart(cart: Cart) {
  // guarda el cart en el localstorage
  localStorage.setItem("cart", JSON.stringify(cart));
}
