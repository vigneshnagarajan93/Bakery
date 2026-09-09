"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TIMELINE = [
  { step: "01", title: "The Wild Starter", desc: "Nurtured daily with organic flour and filtered water, our mother dough is the soul of every loaf. It breathes life and character into the crumb.", img: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=800&auto=format&fit=crop" },
  { step: "02", title: "Long Cold Retard", desc: "A 36-hour cold fermentation develops complex flavors and breaks down gluten for better digestion. Patience is our primary ingredient.", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop" },
  { step: "03", title: "The Score", desc: "Each loaf is hand-scored to guide the expansion and create our signature blistered crust. It's the baker's final mark before the fire.", img: "https://images.unsplash.com/photo-1589367920969-ab8e050eb0e9?q=80&w=800&auto=format&fit=crop" },
  { step: "04", title: "The Hearth Bake", desc: "Baked directly on a blazing hot stone to achieve maximum oven spring and a deeply caramelized, aggressive exterior.", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop" },
];

export function OurStory() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Title animation
    gsap.fromTo('.story-title',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: container.current, start: "top 75%" } }
    );

    const steps = gsap.utils.toArray('.story-step');

    steps.forEach((step) => {
      // Reveal Step
      gsap.fromTo(step as Element,
        { opacity: 0, y: 150 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step as Element,
            start: "top 85%",
          }
        }
      );
    });

    // Image Parallax
    const images = gsap.utils.toArray('.story-img');
    images.forEach((img) => {
      gsap.to(img as Element, {
        yPercent: 20,
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
    <section ref={container} className="py-48 px-6 md:px-12 bg-[var(--color-espresso)] text-[var(--color-linen)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-24 lg:gap-32">

          <div className="md:w-5/12 md:sticky md:top-48 h-fit">
            <h2 className="story-title font-serif text-6xl md:text-7xl lg:text-8xl mb-8 leading-[0.9]">Fermentation<br/><span className="italic text-[var(--color-terracotta)]">Anatomy.</span></h2>
            <p className="story-title text-[var(--color-linen)]/70 font-sans text-lg leading-relaxed mb-16 max-w-md">
              Bread making is a practice of absolute patience. We do not rush the process. Commercial yeast is never used in our sourdough. Only wild yeast, time, and temperature control.
            </p>

            <div className="story-title space-y-6 border-t border-[var(--color-linen)]/10 pt-12">
               <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-terracotta)]"></div>
                  <span className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-linen)]/60">Licensed Cottage Kitchen</span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-terracotta)]"></div>
                  <span className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-linen)]/60">Small Batch Daily</span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-terracotta)]"></div>
                  <span className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-linen)]/60">Clean Ingredients</span>
               </div>
            </div>
          </div>

          <div className="md:w-7/12 space-y-48 pt-24 md:pt-48">
            {TIMELINE.map((item) => (
              <div key={item.step} className="story-step flex flex-col gap-8">

                <div className="img-parallax-container w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[var(--color-linen)]/5">
                   <img src={item.img} alt={item.title} className="story-img img-parallax opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000" />
                </div>

                <div className="flex gap-8 items-start px-4">
                  <span className="font-mono text-4xl md:text-5xl font-light text-[var(--color-terracotta)] shrink-0 pt-2">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-serif text-4xl md:text-5xl mb-6">{item.title}</h3>
                    <p className="font-sans text-lg md:text-xl text-[var(--color-linen)]/70 leading-relaxed max-w-xl">
                      {item.desc}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
