import type { ReactNode } from "react";

export default function CatalogLayout({ children }: { children: ReactNode }) {
  return (
    <section className=" min-h-screen px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Catálogo</h1>
        <p className="text-gray-500 mt-2">Explora nuestros productos</p>
      </header>
      <div className=" max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
