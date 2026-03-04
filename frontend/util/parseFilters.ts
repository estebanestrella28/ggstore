import { FiltersState } from "@/types/filters";

export function parseFilters(
  params: Record<string, string | string[] | undefined>,
): FiltersState {
  return {
    search: typeof params.search === "string" ? params.search : undefined,

    category: typeof params.category === "string" ? params.category : undefined,

    inStock: params.stock === "true",

    priceMin:
      typeof params.priceMin === "string" ? Number(params.priceMin) : undefined,

    priceMax:
      typeof params.priceMax === "string" ? Number(params.priceMax) : undefined,
  };
}
