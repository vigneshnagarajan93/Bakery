"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

export function Header() {
  const { setIsOpen, items } = useCartStore();

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 mix-blend-difference text-[var(--color-linen)] p-6 md:px-12 md:py-8 flex justify-between items-center pointer-events-none">
      <div className="font-serif text-xl tracking-tight pointer-events-auto">
        B.P.B.
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="pointer-events-auto relative flex items-center gap-2 group hover:opacity-80 transition-opacity"
      >
        <span className="font-mono text-xs uppercase tracking-widest hidden sm:inline-block">Cart</span>
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[var(--color-terracotta)] text-[var(--color-linen)] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>
      </button>
    </header>
  );
}
