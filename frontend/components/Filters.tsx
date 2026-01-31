export default function Filters() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-8">
      <h2 className="text-lg font-semibold">Filtros</h2>

      {/* Precio */}
      <div>
        <h3 className="text-sm font-medium mb-3">Precio</h3>

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />

          <input
            type="number"
            placeholder="Max"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Categoría */}
      <div>
        <h3 className="text-sm font-medium mb-3">Categoría</h3>

        <select className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500">
          <option>Todas</option>
          <option>Bases</option>
          <option>Labiales</option>
          <option>Sombras</option>
          <option>Iluminadores</option>
        </select>
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
