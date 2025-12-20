"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  slug: string;
};

const PRODUCTS_PER_PAGE = 8;

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "priceLow" | "priceHigh">("name");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/mock_api/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === "priceLow") list.sort((a, b) => a.price - b.price);
    if (sortBy === "priceHigh") list.sort((a, b) => b.price - a.price);
    if (sortBy === "name") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [products, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  return (
    <section className="p-4">
      <div className="flex justify-end mb-4">
        <select
          className="border p-2 rounded"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value as any);
            setPage(1);
          }}
        >
          <option value="name">Sort by Name</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <a
            key={product.id}
            href={`https://www.udrcrafts.com/product/${product.slug}`}
            target="_blank"
            className="border rounded-xl p-3 hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
            <p className="font-semibold text-green-700">₹{product.price}</p>
          </a>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}