"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TIMELINE = [
  { step: "01", title: "The Wild Starter", desc: "Nurtured daily with organic flour and filtered water, our mother dough is the soul of every loaf." },
  { step: "02", title: "Long Cold Retard", desc: "A 36-hour cold fermentation develops complex flavors and breaks down gluten for better digestion." },
  { step: "03", title: "The Score", desc: "Each loaf is hand-scored to guide the expansion and create our signature blistered crust." },
  { step: "04", title: "The Hearth Bake", desc: "Baked directly on a blazing hot stone to achieve maximum oven spring and a deeply caramelized exterior." },
];

export function OurStory() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const steps = gsap.utils.toArray('.story-step');

    steps.forEach((step) => {
      gsap.fromTo(step as Element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: step as Element,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-6 md:px-12 bg-[var(--color-espresso)] text-[var(--color-linen)] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32">

          <div className="md:w-1/3 md:sticky md:top-32 h-fit">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Fermentation<br/>Anatomy.</h2>
            <p className="text-[var(--color-linen)]/70 font-sans text-sm leading-relaxed mb-12">
              Bread making is a practice of patience. We do not rush the process. Commercial yeast is never used in our sourdough. Only wild yeast, time, and temperature control.
            </p>

            <div className="space-y-4 border-t border-[var(--color-linen)]/10 pt-8">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-wild-herb)]"></div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-linen)]/50">Licensed Cottage Kitchen</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-wild-herb)]"></div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-linen)]/50">Small Batch Daily</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-wild-herb)]"></div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-linen)]/50">Clean Ingredients</span>
               </div>
            </div>
          </div>

          <div className="md:w-2/3 space-y-24 pt-12">
            {TIMELINE.map((item) => (
              <div key={item.step} className="story-step flex gap-8">
                <span className="font-mono text-3xl md:text-5xl font-light text-[var(--color-terracotta)] shrink-0">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl mb-4">{item.title}</h3>
                  <p className="font-sans text-[var(--color-linen)]/70 leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
