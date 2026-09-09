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
    // Title animation
    gsap.fromTo('.showcase-title',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: container.current, start: "top 75%" } }
    );

    // Grid stagger
    const items = gsap.utils.toArray('.product-card');

    gsap.fromTo(items,
      { y: 150, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scrollWrapper.current,
          start: "top 80%",
        }
      }
    );

    // Product Image Parallax
    const images = gsap.utils.toArray('.prod-img-parallax');
    images.forEach((img) => {
        gsap.to(img as Element, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: (img as Element).parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-48 px-6 md:px-12 bg-[var(--color-semolina)] rounded-[3rem] sm:rounded-[5rem]">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <h2 className="showcase-title font-serif text-6xl md:text-8xl leading-tight">Curated<br/><span className="italic text-[var(--color-terracotta)]">Offerings.</span></h2>
            <p className="showcase-title font-sans max-w-sm text-[var(--color-espresso)]/70 text-lg">Baked at dawn. Served fresh. Browse our selection of slow-fermented goods.</p>
        </div>

        <div ref={scrollWrapper} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="product-card group relative">
              <QuickView product={product} trigger={
                <button className="w-full text-left">
                  <div className="relative aspect-[4/5] mb-8 img-parallax-container rounded-2xl">
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText}
                      className="prod-img-parallax img-parallax transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[var(--color-espresso)]/0 group-hover:bg-[var(--color-espresso)]/10 transition-colors duration-500" />

                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                       {product.tags.map(tag => (
                         <span key={tag} className="text-[10px] uppercase tracking-widest text-[var(--color-linen)] bg-[var(--color-espresso)]/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                           {tag}
                         </span>
                       ))}
                    </div>

                    <div className="absolute bottom-6 right-6 w-14 h-14 bg-[var(--color-linen)] text-[var(--color-espresso)] rounded-full flex items-center justify-center opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out shadow-xl">
                       <Plus className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex justify-between items-start gap-4 px-2">
                    <div>
                      <h3 className="font-serif text-3xl mb-2">{product.title}</h3>
                      <p className="font-sans text-base text-[var(--color-espresso)]/60 line-clamp-2 pr-4">{product.description}</p>
                    </div>
                    <span className="font-mono text-lg shrink-0 mt-1">${product.priceRange.minVariantPrice} - ${product.priceRange.maxVariantPrice}</span>
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
