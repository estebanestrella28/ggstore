import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/strapi";
import { Product } from "@/types/products";

const testProducts: Product[] = [
  {
    id: "p1",
    slug: "camiseta-basica-blanca",
    title: "Camiseta Básica Blanca",
    description:
      "Camiseta de algodón 100%, corte unisex, perfecta para uso diario.",
    price: 19.99,
    images: [
      "https://images.example.com/p1-1.jpg",
      "https://images.example.com/p1-2.jpg",
    ],
    category: "Ropa",
    stock: 120,
  },
  {
    id: "p2",
    slug: "zapatillas-running-azules",
    title: "Zapatillas Running Azules",
    description: "Zapatillas ligeras con amortiguación y suela antideslizante.",
    price: 89.5,
    images: ["https://images.example.com/p2-1.jpg"],
    category: "Calzado",
    stock: 45,
  },
  {
    id: "p3",
    slug: "mug-ceramica-negro",
    title: "Taza de Cerámica Negra",
    description: "Taza 350ml, apta para microondas y lavavajillas.",
    price: "12.00",
    images: ["https://images.example.com/p3-1.jpg"],
    category: "Hogar",
    stock: 250,
  },
  {
    id: "p4",
    slug: "auriculares-wireless",
    title: "Auriculares Wireless con Cancelación de Ruido",
    description: "Hasta 30 horas de batería y conexión multipunto.",
    price: 129.99,
    images: [
      "https://images.example.com/p4-1.jpg",
      "https://images.example.com/p4-2.jpg",
      "https://images.example.com/p4-3.jpg",
    ],
    category: "Electrónica",
    stock: 30,
  },
  {
    id: "p5",
    slug: "mochila-urbana-gris",
    title: "Mochila Urbana Gris 20L",
    description:
      'Compartimento para portátil 15", material resistente al agua.',
    price: 49.0,
    images: ["https://images.example.com/p5-1.jpg"],
    category: "Accesorios",
    stock: 75,
  },
  {
    id: "p6",
    slug: "libro-recetas-vegetarianas",
    title: "Libro: Recetas Vegetarianas",
    description: "Recetario con 80 platos fáciles y saludables.",
    price: 24.9,
    images: ["https://images.example.com/p6-1.jpg"],
    category: "Libros",
    stock: 150,
  },
  {
    id: "p7",
    slug: "lampara-escritorio-led",
    title: "Lámpara de Escritorio LED",
    description: "Luz regulable, brazo flexible y puerto USB integrado.",
    price: "34.99",
    images: ["https://images.example.com/p7-1.jpg"],
    category: "Hogar",
    stock: 60,
  },
  {
    id: "p8",
    slug: "silla-oficina-ergonomica",
    title: "Silla de Oficina Ergonómica",
    description: "Respaldo ajustable, soporte lumbar y ruedas silenciosas.",
    price: 199.95,
    images: [
      "https://images.example.com/p8-1.jpg",
      "https://images.example.com/p8-2.jpg",
    ],
    category: "Muebles",
    stock: 18,
  },
  {
    id: "p9",
    slug: "set-cuchillos-cocina",
    title: "Set de Cuchillos de Cocina 6 piezas",
    description: "Acero inoxidable, mango antideslizante y soporte incluido.",
    price: 59.0,
    images: ["https://images.example.com/p9-1.jpg"],
    category: "Cocina",
    stock: 90,
  },
  {
    id: "p10",
    slug: "plantita-suculenta",
    title: "Suculenta en Maceta",
    description: "Pequeña suculenta de interior, riego mínimo requerido.",
    price: 8.5,
    images: ["https://images.example.com/p10-1.jpg"],
    category: "Plantas",
    stock: 300,
  },
];

export default async function CatalogGrid({
  categoryId,
}: {
  categoryId: string | undefined;
}) {
  const { products } = await getProducts({ categoryId });

  if (!categoryId) {
    return <h2>Categoría inválida</h2>;
  }

  if (!products.length) {
    return <h2>No hay elementos que mostrar</h2>;
  }

  return (
    <div className=" grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-4 gap-2">
      {testProducts.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
