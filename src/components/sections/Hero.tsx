"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FlourCanvas } from "../canvas/FlourCanvas";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Parallax background
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Text reveal
    if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { y: 150, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            stagger: 0.15,
            ease: "power4.out",
            delay: 0.2
          }
        );

        // Text parallax
        gsap.to(textRef.current, {
          yPercent: -50,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
    }
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-[150vh] w-full overflow-hidden bg-[var(--color-espresso)] text-[var(--color-linen)] flex flex-col items-center pt-[30vh]">

      {/* Huge Parallax Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          ref={bgRef}
          src="/IMG_20260909_152152.png"
          alt="Artisan bakery background"
          className="w-full h-[120%] object-cover object-center absolute -top-[10%] brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-espresso)]/40 via-transparent to-[var(--color-linen)]" />
      </div>

      <FlourCanvas />

      <div className="z-10 text-center px-4 max-w-5xl relative mt-24 md:mt-32">
        <h1 ref={textRef} className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.85] tracking-tighter mix-blend-overlay">
          <span className="block overflow-hidden pb-4"><span className="inline-block">Slow</span></span>
          <span className="block overflow-hidden pb-4"><span className="inline-block text-[var(--color-semolina)] italic">Fermented.</span></span>
          <span className="block overflow-hidden pb-4"><span className="inline-block">Crafted.</span></span>
        </h1>
      </div>

    </section>
  );
}
