import Filters from "@/components/Filters";
import CatalogGrid from "./CatalogGrid";

export default function CatalogPage() {
  return (
    <>
      <main className="w-full h-screen flex gap-4">
        <aside className="hidden sm:block max-w-80 w-1/4 h-full p-4 flex-1 bg-gray-100 rounded-2xl">
          <Filters />
        </aside>

        <div className=" p-4 flex-1 bg-gray-100 rounded-2xl">
          <CatalogGrid categoryId="base" />
        </div>
      </main>
    </>
  );
}
