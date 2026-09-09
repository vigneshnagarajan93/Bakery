"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Footer() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const els = gsap.utils.toArray('.footer-anim');
    gsap.fromTo(els,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%"
        }
      }
    );
  }, { scope: container });

  return (
    <footer ref={container} className="bg-[var(--color-espresso)] text-[var(--color-linen)] py-32 px-6 md:px-12 rounded-t-[3rem] sm:rounded-t-[5rem] mt-48 relative overflow-hidden">

      {/* Decorative large bg text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[20vw] opacity-5 pointer-events-none whitespace-nowrap">
        Barely Proofed
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 relative z-10">

        {/* Newsletter */}
        <div className="space-y-12">
          <div className="footer-anim">
            <h3 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">First Access to<br/>the Oven Drops.</h3>
            <p className="text-[var(--color-linen)]/70 font-sans text-lg max-w-md">Join our VIP club for SMS and email alerts when fresh batches go live. Small-batch means they go fast.</p>
          </div>

          <form className="footer-anim flex border-b border-[var(--color-linen)]/30 pb-4 max-w-md group focus-within:border-[var(--color-linen)] transition-colors">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-none outline-none flex-1 placeholder:text-[var(--color-linen)]/30 text-xl font-sans"
            />
            <button type="submit" className="opacity-50 group-focus-within:opacity-100 transition-opacity">
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </div>

        {/* Details */}
        <div className="md:justify-self-end flex flex-col justify-between">
          <div className="space-y-12 text-sm font-mono uppercase tracking-[0.2em] text-[var(--color-linen)]/70">
            <div className="footer-anim">
              <p className="text-[var(--color-linen)] mb-4 text-xs tracking-[0.3em] opacity-50">Visit</p>
              <p className="text-lg">157 McKinnon Ave NE</p>
              <p className="text-lg">Concord, NC 28025</p>
            </div>
            <div className="footer-anim">
              <p className="text-[var(--color-linen)] mb-4 text-xs tracking-[0.3em] opacity-50">Contact</p>
              <p className="text-lg">barelyproofedbakes@gmail.com</p>
              <p className="text-lg">(704) 267-6439</p>
            </div>
          </div>

          <div className="footer-anim mt-24 md:mt-0 text-[10px] font-mono uppercase tracking-widest text-[var(--color-linen)]/40">
            © {new Date().getFullYear()} Barely Proofed Bakes. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
