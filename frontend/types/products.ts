export type Product = {
  id: string | number;
  slug: string;
  title: string;
  description?: string;
  price: number | string;
  images: string[];
  category?: string;
  stock?: number;
  [key: string]: unknown;
};

type Image = {
  id: number;
  documentId: string;
  url: string;
};

type Category = {
  id: number;
  documentId: string;
  name: string;
};

export type ProductAPI = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt?: string | null; // puede ser null o ausente
  locale: string;
  stock: number;
  images: Image[] | null;
  category: Category;
};
