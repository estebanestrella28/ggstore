"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filters() {
  const router = useRouter();
  const params = useSearchParams();
  const category = params.get("category") ?? "";

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(params);
    newParams.set(key, value);

    router.push(`/catalog?${newParams.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-8">
      <h2 className="text-lg font-semibold">Filtros</h2>

      {/* Categoría */}
      <div>
        <h3 className="text-sm font-medium mb-3">Categoría</h3>

        <select
          value={category}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value={""}>Todas</option>
          <option value={"base"}>Bases</option>
          <option value={"labial"}>Labiales</option>
          <option value={"sombra"}>Sombras</option>
          <option value={"iluminador"}>Iluminadores</option>
        </select>
      </div>

      {/* Precio */}
      <div>
        <h3 className="text-sm font-medium mb-3">Precio</h3>

        <div className="flex gap-3">
          <input
            onChange={(e) => updateFilter("priceMin", e.target.value)}
            type="number"
            placeholder="Min"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />

          <input
            defaultValue={undefined}
            onChange={(e) => updateFilter("priceMax", e.target.value)}
            type="number"
            placeholder="Max"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Disponibilidad */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Solo disponibles</span>

        <input type="checkbox" className="w-4 h-4 accent-rose-500" />
      </div>

      {/* Botones */}
      <div className="space-y-3">
        <button className="w-full bg-rose-500 text-white py-2 rounded-xl text-sm hover:bg-rose-600 transition">
          Aplicar filtros
        </button>

        <button className="w-full border border-neutral-300 py-2 rounded-xl text-sm hover:bg-neutral-100 transition">
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
