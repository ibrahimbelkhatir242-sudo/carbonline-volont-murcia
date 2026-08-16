"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop/audi", label: "Audi" },
  { href: "/shop/bmw", label: "BMW" },
  { href: "/shop/mercedes", label: "Mercedes" },
  { href: "/shop/porsche", label: "Porsche" },
  { href: "/custom", label: "Custom" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-void/85 backdrop-blur-md border-b border-steel/60" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display font-800 text-xl md:text-2xl tracking-widest2 uppercase text-bone">
            CARBON<span className="text-signal">LINE</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="spec-label !text-[11px] hover:text-bone transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="hidden md:inline-flex text-muted hover:text-bone transition-colors"
          >
            <Search size={20} strokeWidth={1.6} />
          </button>
          <button
            aria-label="Account"
            className="hidden md:inline-flex text-muted hover:text-bone transition-colors"
          >
            <User size={20} strokeWidth={1.6} />
          </button>
          <button
            aria-label={`Cart, ${itemCount} items`}
            onClick={openCart}
            className="relative text-muted hover:text-bone transition-colors"
          >
            <ShoppingCart size={20} strokeWidth={1.6} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-signal text-bone text-[10px] font-mono w-4 h-4 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
          <button
            aria-label="Toggle menu"
            className="lg:hidden text-bone"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} strokeWidth={1.6} /> : <Menu size={24} strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden bg-void border-t border-steel/60 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-2xl uppercase tracking-wide text-bone"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
