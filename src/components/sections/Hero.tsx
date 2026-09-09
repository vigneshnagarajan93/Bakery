"use client";

import { useRef } from "react";
import { FlourCanvas } from "../canvas/FlourCanvas";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    // Simple fade up for now, could use SplitText if we had the premium plugin
    gsap.fromTo(
      textRef.current.children,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5
      }
    );

    gsap.to(container.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      yPercent: 30,
      opacity: 0,
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[var(--color-espresso)] text-[var(--color-linen)]">
      <FlourCanvas />

      <div className="z-10 text-center px-4 max-w-4xl mix-blend-difference pointer-events-none">
        <h1 ref={textRef} className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter">
          <span className="block overflow-hidden"><span className="inline-block">Slow Fermented.</span></span>
          <span className="block overflow-hidden"><span className="inline-block text-[var(--color-semolina)] italic">Handcrafted</span></span>
          <span className="block overflow-hidden"><span className="inline-block">with Heart.</span></span>
        </h1>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-[10px] font-mono uppercase tracking-widest opacity-50 z-10 pointer-events-none">
        Scroll to explore
      </div>
    </section>
  );
}
