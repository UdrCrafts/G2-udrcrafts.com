"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Heart,
  Star,
  ArrowRight,
} from "lucide-react";

// --- Types & Interfaces ---

interface Product {
  id: string;
  title: string;
  price: number;
  stock: number;
  images: string[];
  vendorId: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
}

interface ApiData {
  products: Product[];
  pagination: Pagination;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

// --- UI Components ---

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "default",
  className = "",
  ...props
}) => {
  // REMOVED global "inline-flex" to avoid display conflicts with responsive utilities like "hidden md:inline-flex"
  const baseStyles =
    "items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white";

  const variants = {
    primary: "bg-stone-900 text-stone-50 hover:bg-stone-900/90",
    secondary: "bg-stone-100 text-stone-900 hover:bg-stone-200",
    outline:
      "border border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900",
    ghost: "hover:bg-stone-100 hover:text-stone-900",
  };

  // KEEP display out of sizes as well. We'll add display where we need it in usages.
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div
    className={`rounded-lg border border-stone-200 bg-white text-stone-950 shadow-sm ${className}`}
  >
    {children}
  </div>
);

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full border border-stone-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 text-stone-950 ${className}`}
  >
    {children}
  </span>
);

// --- Mock Data (Typed & Updated) ---

const API_DATA: ApiData = {
  products: [
    {
      id: "p1",
      title: "Organic Cotton T-Shirt",
      price: 1299,
      stock: 12,
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
      ],
      vendorId: "v001",
    },
    {
      id: "p2",
      title: "Vintage Red Sneakers",
      price: 4500,
      stock: 5,
      images: [
        "https://images.unsplash.com/photo-1542272617-08f086302542?auto=format&fit=crop&q=80&w=800",
      ],
      vendorId: "v001",
    },
    {
      id: "p3",
      title: "Olive Green Hoodie",
      price: 2499,
      stock: 8,
      images: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
      ],
      vendorId: "v002",
    },
    {
      id: "p4",
      title: "Formal Leather Loafers",
      price: 3800,
      stock: 3,
      images: [
        "https://images.unsplash.com/photo-1560769629-9fa2a578ee1f?auto=format&fit=crop&q=80&w=800",
      ],
      vendorId: "v003",
    },
  ],
  pagination: {
    page: 1,
    limit: 10,
    total: 4,
  },
};

const CATEGORIES = [
  "Electronics",
  "Clothing & Apparel",
  "Home & Kitchen",
  "Books & Media",
  "Sports & Outdoors",
  "Health & Beauty",
  "Toys & Games",
  "Automotive",
];

// --- Main Page Component ---

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      {/* Setup Verification Banner */}
      <div className="bg-stone-800 text-white text-center py-2 text-sm font-medium">
        It's just a Setup interface of the Homepage
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-stone-900 flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-stone-900">
                udrcrafts
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
              <a href="#" className="text-stone-900 font-semibold">
                Home
              </a>
              <a href="#" className="hover:text-stone-900 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-stone-900 transition-colors">
                Features
              </a>
              <a href="#" className="hover:text-stone-900 transition-colors">
                Pricing
              </a>
              <a href="#" className="hover:text-stone-900 transition-colors">
                Contact
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Hide on mobile - show on md+ */}
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex"
              >
                Log in
              </Button>

              <Button
                variant="primary"
                size="sm"
                className="hidden md:inline-flex"
              >
                Start selling
              </Button>

              {/* Show only on mobile - ensure inline-flex on mobile by adding it here */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden inline-flex"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Categories Section */}
      <section className="bg-white border-b border-stone-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="relative flex items-center w-full max-w-2xl mx-auto mb-4">
            <Search className="absolute left-3 h-5 w-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search for handcrafted items..."
              className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all placeholder:text-stone-400"
            />
          </div>
          {/* Categories/Tags */}
          <div className="flex flex-wrap gap-2 justify-center text-sm text-stone-600 mt-2">
            {CATEGORIES.map((category, index) => (
              <a
                key={index}
                href="#"
                className="hover:text-stone-900 hover:underline transition-colors text-xs px-2 py-1 rounded-full bg-stone-100 hover:bg-stone-200"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden shadow-lg border-r border-stone-200`}
      >
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <span className="text-lg font-semibold">Menu</span>
          <Button
            variant="ghost"
            size="icon"
            className="inline-flex"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-stone-700 hover:bg-stone-100 font-semibold"
          >
            Home
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-stone-700 hover:bg-stone-100"
          >
            About
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-stone-700 hover:bg-stone-100"
          >
            Features
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-stone-700 hover:bg-stone-100"
          >
            Pricing
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-stone-700 hover:bg-stone-100"
          >
            Contact
          </a>
          <div className="pt-4 border-t border-stone-200 mt-4 space-y-2">
            <Button variant="outline" className="w-full inline-flex">
              Log in
            </Button>
            <Button variant="primary" className="w-full inline-flex">
              Start selling
            </Button>
          </div>
        </nav>
      </div>
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Hero Section - Black & White / Minimalist */}
      <section className="bg-stone-50 py-16 text-center border-b border-stone-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl md:text-6xl mb-4">
            Welcome to <span className="text-stone-600">udrcrafts</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-stone-500 mb-8">
            Your marketplace for unique products and services. Discover, sell,
            and connect.
          </p>
          <Button size="lg" className="inline-flex gap-2">
            Explore Marketplace <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">
              Our Products
            </h2>
            <Button
              variant="ghost"
              className="hidden sm:inline-flex gap-2 text-stone-600"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {API_DATA.products.map((product: Product) => (
              <Card key={product.id} className="group overflow-hidden">
                <div className="relative aspect-square overflow-hidden rounded-t-lg bg-stone-100">
                  {product.stock < 10 && (
                    <div className="absolute top-2 left-2 z-10">
                      <Badge className="bg-stone-900 text-white border-stone-900">
                        Only {product.stock} Left
                      </Badge>
                    </div>
                  )}
                  <button className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 text-stone-500 opacity-0 group-hover:opacity-100 transition-all hover:text-red-500 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </button>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg leading-tight text-stone-900">
                    {product.title}
                  </h3>
                  <p className="font-bold text-stone-900">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">
                    Vendor: {product.vendorId}
                  </p>
                  <Button onClick={handleAddToCart} className="w-full mt-2">
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-stone-700 flex items-center justify-center text-white text-xs font-bold">
                U
              </div>
              <span>udrcrafts, Inc.</span>
            </div>
            <span>© 2025. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
