"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { NavbarSidebar } from "./navbar-sidebar";
import { MenuIcon, ShoppingCart } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({
  href,
  children,
  isActive,
}: NavbarItemProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white",
      )}
    >
      <Link href={href}>
        {children}
      </Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

// ---- Types matching your mock APIs ----
interface OrdersResponse {
  orders: {
    orderId: string;
    total: number;
    items: {
      productId: string;
      qty: number;
    }[];
  }[];
}

interface AuthResponse {
  user: {
    _id: string;
    email: string;
    role: string;
    tenantId: string;
  } | null;
}

// --------------------------------------

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    // User Session (Navbar Login) -> /mock_api/auth_me.json
    fetch("/mock_api/auth_me.json", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: AuthResponse) => {
        setUser(data.user ?? null);
      })
      .catch((err) => {
        console.error("Failed to load auth_me.json", err);
      });

    // Cart Count -> /mock_api/orders_user.json
    fetch("/mock_api/orders_user.json", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: OrdersResponse) => {
        const count =
          data.orders?.reduce((sum, order) => {
            return (
              sum +
              order.items.reduce((inner, item) => inner + (item.qty ?? 0), 0)
            );
          }, 0) ?? 0;

        setCartCount(count);
      })
      .catch((err) => {
        console.error("Failed to load orders_user.json", err);
      });
  }, []);

  const isLoggedIn = !!user;
  const userEmail = user?.email;

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      {/* Logo */}
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funroad
        </span>
      </Link>

      {/* Sidebar for mobile */}
      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      {/* Center nav items (desktop) */}
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {/* Right side: cart + user session (desktop) */}
      <div className="hidden lg:flex items-center gap-4 pr-6">
        {/* Cart with count */}
        <Link href="/cart" className="relative flex items-center">
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* If logged in, show email; else show auth buttons */}
        {isLoggedIn ? (
          <span className="text-sm text-neutral-700">
            Hi, {userEmail}
          </span>
        ) : null}

        {!isLoggedIn && (
          <>
            <Button
              asChild
              variant="secondary"
              className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
            >
              <Link href="/sign-in">
                Log in
              </Link>
            </Button>
            <Button
              asChild
              className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
            >
              <Link href="/sign-up">
                Start selling
              </Link>
            </Button>
          </>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant="ghost"
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
