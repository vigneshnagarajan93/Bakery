"use client";

import { useRef } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Header() {
  const { setIsOpen, items } = useCartStore();
  const headerRef = useRef<HTMLElement>(null);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useGSAP(() => {
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 1 }
    );
  }, { scope: headerRef });

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-40 mix-blend-difference text-[var(--color-linen)] p-8 md:px-16 md:py-12 flex justify-between items-center pointer-events-none">
      <div className="font-serif text-3xl tracking-tight pointer-events-auto">
        B.P.B.
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="pointer-events-auto relative flex items-center gap-4 group hover:opacity-80 transition-opacity"
      >
        <span className="font-mono text-sm uppercase tracking-widest hidden sm:inline-block">Cart</span>
        <div className="relative">
          <ShoppingBag className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[var(--color-terracotta)] text-[var(--color-linen)] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>
      </button>
    </header>
  );
}
