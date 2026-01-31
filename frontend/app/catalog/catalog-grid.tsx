import categoryCard from "@/components/categoryCard";
import { getCategories } from "@/lib/strapi";

export default async function CatalogGrid() {
  const categories = await getCategories();

  if (!categories.length) {
    return <h2>No hay elementos que mostrar</h2>;
  }

  return (
    <div className=" grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] ">
      {categories.map((cat: any) => categoryCard(cat))}
    </div>
  );
}
