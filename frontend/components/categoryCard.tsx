export default function categoryCard(category: any) {
  return (
    <div key={category.id}>
      <a href={`/category/${category.id}`}>
        <div className="flex flex-col justify-center items-center gap-4">
          <img
            className="rounded-2xl"
            src={category.image}
            width={150}
            height={150}
            alt={category.slug}
          />
          <h2 className=" text-xl font-bold ">{category.name}</h2>
        </div>
      </a>
    </div>
  );
}
