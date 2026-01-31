export default function ProductCard({ product }: { product: any }) {
  return (
    <a
      href={`/product/${product.id}`}
      className="group block rounded-xl bg-white/80 p-3 shadow-sm transition hover:shadow-md"
    >
      <div className="relative mb-3 h-32 w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.slug}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium leading-tight line-clamp-2">
          {product.title}
        </h2>

        <span className="text-lg font-bold text-red-400">{product.price}</span>
      </div>
    </a>
  );
}
