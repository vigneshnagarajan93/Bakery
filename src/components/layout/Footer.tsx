"use client";

import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--color-espresso)] text-[var(--color-linen)] py-20 px-6 md:px-12 rounded-t-3xl sm:rounded-t-[3rem] mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Newsletter */}
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-3xl md:text-5xl mb-4 leading-tight">First Access to<br/>the Oven Drops.</h3>
            <p className="text-[var(--color-linen)]/70 font-sans max-w-md">Join our VIP club for SMS and email alerts when fresh batches go live. Small-batch means they go fast.</p>
          </div>

          <form className="flex border-b border-[var(--color-linen)]/30 pb-2 max-w-md group focus-within:border-[var(--color-linen)] transition-colors">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-none outline-none flex-1 placeholder:text-[var(--color-linen)]/30"
            />
            <button type="submit" className="opacity-50 group-focus-within:opacity-100 transition-opacity">
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Details */}
        <div className="md:justify-self-end flex flex-col justify-between">
          <div className="space-y-6 text-sm font-mono uppercase tracking-widest text-[var(--color-linen)]/70">
            <div>
              <p className="text-[var(--color-linen)] mb-1">Visit</p>
              <p>157 McKinnon Ave NE</p>
              <p>Concord, NC 28025</p>
            </div>
            <div>
              <p className="text-[var(--color-linen)] mb-1">Contact</p>
              <p>barelyproofedbakes@gmail.com</p>
              <p>(704) 267-6439</p>
            </div>
          </div>

          <div className="mt-16 md:mt-0 text-[10px] font-mono uppercase tracking-widest text-[var(--color-linen)]/40">
            © {new Date().getFullYear()} Barely Proofed Bakes. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
