"use client";

import { useCartStore } from "@/store/cartStore";
import { Bell, Search as SearchIcon, ShoppingBagIcon } from "lucide-react";

export default function Search() {
  const count = useCartStore((state) => state.items.length);

  return (
    <section className="flex items-center gap-6 w-full">
      <div className="w-40 flex justify-end">
        <img
          className="h-8 object-contain opacity-80"
          src="/logo2.png"
          alt="logo"
        />
      </div>

      <div className="flex items-center w-full max-w-xl rounded-xl border border-gray-300 bg-white transition focus-within:border-red-300 focus-within:ring-1 focus-within:ring-red-300">
        <select
          className="bg-transparent px-3 py-2 text-sm outline-none"
          name="categoria"
        >
          <option value="all">All Categories</option>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </select>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300" />

        <label className="flex items-center flex-1 cursor-text">
          <SearchIcon className="w-5 h-5 ml-2 text-gray-500/80" />
          <input
            className="w-full px-3 py-2 text-sm bg-transparent outline-none"
            type="text"
            placeholder="Search product or brand here..."
          />
        </label>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="/cart"
          className="flex items-center gap-1 p-2 rounded-md hover:bg-gray-100 transition"
        >
          <ShoppingBagIcon className="w-5 h-5 text-gray-500 hover:text-gray-800" />
          <span className="text-sm">{count}</span>
        </a>
        <button className="p-2 rounded-md hover:bg-gray-100 transition">
          <Bell className="w-5 h-5 text-gray-500 hover:text-gray-800" />
        </button>
      </div>
    </section>
  );
}
