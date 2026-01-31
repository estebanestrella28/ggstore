export default function CategoryCard({ category }: { category: any }) {
  return (
    <a
      href={`/category/${category.slug}`}
      className="group block rounded-xl bg-white/80 p-3 shadow-sm transition hover:shadow-md "
    >
      <div className="relative mb-3 h-32 w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={category.image}
          alt={category.slug}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex justify-center mt-8">
        <h2 className="text-base font-semibold leading-tight line-clamp-2 ">
          {category.name}
        </h2>
      </div>
    </a>
  );
}
