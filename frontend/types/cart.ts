export type CartItem = {
  variantId: number;
  productName: string;
  variantLabel: string;
  image: string;
  price: number;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};
