"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NavbarSidebar } from "./navbar-sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className="h-20 flex items-center border-b justify-between font-medium bg-white">

      {/* Logo */}
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funroad
        </span>
      </Link>

      {/* Desktop items */}
      <div className="hidden lg:flex items-center gap-4">
        {navbarItems.map((item) => (
          <Button
            asChild
            key={item.href}
            variant="outline"
            className={cn(
              "bg-transparent hover:bg-transparent rounded-full border-transparent px-3.5 text-lg",
              pathname === item.href && "bg-black text-white"
            )}
          >
            <Link href={item.href}>{item.children}</Link>
          </Button>
        ))}
      </div>

      {/* Desktop right side buttons */}
      <div className="hidden lg:flex">
        <Button asChild variant="secondary" className="border-l px-12 h-full rounded-none bg-white">
          <Link href="/sign-in">Log in</Link>
        </Button>

        <Button asChild variant="secondary" className="border-l px-12 h-full rounded-none bg-white">
          <Link href="/sign-up">Start selling</Link>
        </Button>
      </div>

      {/* 🔥 Mobile only menu icon (correct position) */}
      <div className="flex lg:hidden pr-4">
        <Button
          variant="ghost"
          className="size-12"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-7 h-7" />
        </Button>
      </div>

      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
    </nav>
  );
};
