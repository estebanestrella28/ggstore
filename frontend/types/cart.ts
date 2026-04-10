export type CartItem = {
  variantId: number;
  quantity: number;
};
export type Cart = {
  items: CartItem[];
};
