import CategorySelector from "@/components/CategorySelector";
import Search from "@/components/Search";
import Slider from "@/components/Slider";
import { getCategories } from "@/lib/strapi";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="flex flex-col w-full h-screen m-auto justify-start gap-10 mt-4">
      <Search />
      <Slider />
      <CategorySelector />
    </main>
  );
}
