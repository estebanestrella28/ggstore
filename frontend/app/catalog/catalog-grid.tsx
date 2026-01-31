import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/strapi";

export default async function CatalogGrid() {
  const products = await getProducts();

  if (!products.length) {
    return <h2>No hay elementos que mostrar</h2>;
  }

  return (
    <div className=" grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
