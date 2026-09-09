"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MOCK_PRODUCTS } from "../../lib/shopify/mock-data";
import { QuickView } from "../ui/QuickView";
import { Plus } from "lucide-react";

export function ProductShowcase() {
  const container = useRef<HTMLDivElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // We'll just do a nice staggered fade up for the grid to keep it reliable and performant
    const items = gsap.utils.toArray('.product-card');

    gsap.fromTo(items,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-6 md:px-12 bg-[var(--color-linen)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl md:text-6xl mb-16">Curated Offerings.</h2>

        <div ref={scrollWrapper} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="product-card group relative">
              <QuickView product={product} trigger={
                <button className="w-full text-left">
                  <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[var(--color-semolina)] rounded-lg">
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                       {product.tags.map(tag => (
                         <span key={tag} className="text-[9px] uppercase tracking-widest text-[var(--color-espresso)] bg-[var(--color-linen)]/90 backdrop-blur-sm px-2 py-1 rounded-sm">
                           {tag}
                         </span>
                       ))}
                    </div>

                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-[var(--color-linen)] rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                       <Plus className="w-4 h-4 text-[var(--color-espresso)]" />
                    </div>
                  </div>

                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-serif text-xl mb-1">{product.title}</h3>
                      <p className="font-sans text-sm text-[var(--color-espresso)]/60 line-clamp-1">{product.description}</p>
                    </div>
                    <span className="font-mono text-sm shrink-0">${product.priceRange.minVariantPrice} - ${product.priceRange.maxVariantPrice}</span>
                  </div>
                </button>
              } />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
