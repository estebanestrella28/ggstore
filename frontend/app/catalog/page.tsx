import Filters from "@/components/Filters";
import ProductsGrid from "./ProductsGrid";
import { parseFilters } from "@/util/parseFilters";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CatalogPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = parseFilters(params);
  return (
    <>
      <main className="w-full h-screen flex gap-4">
        <aside className="hidden sm:block max-w-80 w-1/4 h-full p-4 flex-1 bg-gray-100 rounded-2xl">
          <Filters />
        </aside>

        <div className=" p-4 flex-1 bg-gray-100 rounded-2xl">
          <ProductsGrid filters={filters} />
        </div>
      </main>
    </>
  );
}
