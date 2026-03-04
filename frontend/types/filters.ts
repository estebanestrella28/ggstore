export interface FiltersState {
  search?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  sort?: "price_asc" | "price_desc" | "newest" | "popular";
  page?: number;
}
