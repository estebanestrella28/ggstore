import CatalogGrid from "@/app/catalog/CatalogGrid";
import { getProducts } from "@/lib/strapi";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const { products } = await getProducts({ categoryId });

  if (!products.length) {
    return <h5>No hay elementos que mostrar</h5>;
  }

  return (
    <>
      <CatalogGrid categoryId={categoryId} />
    </>
  );
}
