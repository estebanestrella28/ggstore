export interface Product {
  id: string | number;
  slug: string;
  title: string;
  description?: string;
  price: number | string;
  images: ProductImage[];
  category?: string;
  stock?: number;
  [key: string]: unknown;
}

export type ProductImage = string;
