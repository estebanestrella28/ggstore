import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/strapi";
import { FiltersState } from "@/types/filters";
import type { Product } from "@/types/products";

interface Props {
  filters: FiltersState;
}

export default async function ProductsGrid({ filters }: Props) {
  const { products } = await getProducts({ filters });

  if (!products.length) {
    return <h2>No hay elementos que mostrar</h2>;
  }

  return (
    <section className=" grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
