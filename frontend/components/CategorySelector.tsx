type CategoryItemProps = {
  name: string;
  img: string;
  link: string;
};

function CategoryItem({ name, img, link }: CategoryItemProps) {
  return (
    <a href={link} className="flex flex-col items-center gap-2 shrink-0 group">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-300/80 transition-transform group-hover:scale-105">
        <img src={img} alt={name} className="w-full h-full object-cover" />
      </div>

      <p className="text-sm font-semibold text-center">{name}</p>
    </a>
  );
}

export default function CategorySelector() {
  const categories = [
    { img: "/base-category.png", link: "/#link", name: "Tonos" },
    { img: "/base-category.png", link: "/#link", name: "Glow" },
    { img: "/base-category.png", link: "/#link", name: "Base" },
    { img: "/base-category.png", link: "/#link", name: "Labial" },
    { img: "/base-category.png", link: "/#link", name: "Brochas" },
    { img: "/base-category.png", link: "/#link", name: "a" },
    { img: "/base-category.png", link: "/#link", name: "b" },
  ];

  return (
    <section className="px-4">
      <div className="flex gap-6 overflow-x-auto scrollbar-hide py-2 justify-center">
        {categories.map((cat) => (
          <CategoryItem key={cat.name} {...cat} />
        ))}

        <CategoryItem name="View All" img="/base-category.png" link="/all" />
      </div>
    </section>
  );
}
