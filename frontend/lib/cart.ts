import { CartItem } from "@/types/cart";
import { getCart, saveCart } from "./cartStorage";

export function addToCart(item: CartItem): void {
  //pushea el item al la lista de items. Si el item ya se encuentra en el cart aumenta el quantity en 1 (updateQuantity)
  const cart = getCart();

  const existingItem = cart.items.find(
    (cartItem) => cartItem.variantId === item.variantId,
  );

  let newItems;

  if (!existingItem) {
    newItems = [...cart.items, item];
  } else {
    newItems = cart.items.map((cartItem) =>
      cartItem.variantId === item.variantId
        ? {
            ...cartItem,
            quantity: cartItem.quantity + item.quantity,
          }
        : cartItem,
    );
  }
  calculateCartTotal(newItems);

  saveCart({ items: newItems });
}

export function removeFromCart(variantId: number) {
  // busca en el localstorage el cart y elimina el item de la lista que coincida con el id

  const cart = getCart();

  const newItems = cart.items.filter((item) => item.variantId !== variantId);

  saveCart({ items: newItems });
}

export function updateQuantity(variantId: number, quantity: number) {
  // busca en el localstorage el cart y actualiza su quantity
  // si quantity = 0: eliminar del carrito (removeFromCart)

  const cart = getCart();

  if (quantity <= 0) {
    removeFromCart(variantId);
    return;
  }

  const newItems = cart.items.map((item) =>
    item.variantId === variantId ? { ...item, quantity } : item,
  );
  saveCart({ items: newItems });
}

export function calculateCartTotal(items: CartItem[]) {
  // recibe la lista de CartItems y calcula la sumatoria de sus precios

  const cartTotal = items.reduce(
    (acc, curr) => acc + Number(curr.price) * Number(curr.quantity),
    0,
  );
  console.log("🚀 ~ calculateCartTotal ~ cartTotal:", cartTotal);
  return cartTotal;
}
