import { getCategories } from "@/lib/strapi";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="flex gap-2 justify-center items-center w-full h-screen m-auto">
      {categories.map((cat: any) => {
        return (
          <div key={cat.id}>
            <img src={cat.image} width={100} height={100} alt={cat.slug} />
            <h2>{cat.name}</h2>
            <p>{cat.id}</p>
          </div>
        );
      })}
    </main>
  );
}
