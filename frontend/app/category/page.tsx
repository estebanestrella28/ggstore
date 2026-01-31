import CategoryCard from "@/components/CategoryCard";
import { getCategories } from "@/lib/strapi";

export default async function CategoriesPage() {
  const categories = await getCategories();

  if (!categories.length) {
    return <h2>No hay elementos que mostrar</h2>;
  }

  return (
    <div className=" grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
      {categories.map((category: any) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
