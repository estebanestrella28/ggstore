import type { ReactNode } from "react";

export default function CatalogLayout({ children }: { children: ReactNode }) {
  return (
    <section className=" min-h-screen px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Carrito</h1>
      </header>
      <div className=" mx-auto">{children}</div>
    </section>
  );
}
