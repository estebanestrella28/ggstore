export interface FiltersState {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  sort?: "price_asc" | "price_desc" | "newest" | "popular";
  page?: number;
}
