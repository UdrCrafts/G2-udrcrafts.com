"use client";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  link: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.link}
      target="_blank"
      className="border rounded-lg p-3 block hover:shadow-md"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-44 object-cover rounded"
      />

      <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
      <p className="mt-1 font-semibold">₹{product.price}</p>
    </a>
  );
}