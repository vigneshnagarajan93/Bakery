"use client";

import { useEffect, useState, useRef } from "react";
import { nextThursday, differenceInSeconds } from "date-fns";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function WeeklyDrops() {
  const container = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const nextDrop = nextThursday(new Date());
    nextDrop.setHours(12, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date();
      const diffInSeconds = differenceInSeconds(nextDrop, now);

      if (diffInSeconds <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      const h = Math.floor(diffInSeconds / 3600);
      const m = Math.floor((diffInSeconds % 3600) / 60);
      const s = diffInSeconds % 60;

      setTimeLeft({ hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    const els = gsap.utils.toArray('.anim-drop');
    gsap.fromTo(els,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      }
    );

    // Subtle image parallax
    gsap.to('.drop-img', {
       yPercent: 15,
       ease: 'none',
       scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
       }
    })
  }, { scope: container });

  return (
    <section ref={container} className="relative py-48 px-6 md:px-12 bg-[var(--color-linen)] overflow-hidden">

      {/* Decorative Image */}
      <div className="absolute right-[-10%] top-[20%] w-1/3 md:w-1/4 aspect-[3/4] opacity-80 pointer-events-none img-parallax-container rounded-2xl hidden md:block">
         <img src="https://images.unsplash.com/photo-1596706788880-9114d69bc7d5?q=80&w=800&auto=format&fit=crop" alt="Flour dusting" className="drop-img absolute inset-0 w-full h-[120%] object-cover object-center -top-[10%]" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-32 relative z-10">

        <div className="flex-1 space-y-8">
           <h2 className="anim-drop font-mono text-sm uppercase tracking-[0.3em] text-[var(--color-terracotta)]">The Weekly Drop</h2>
           <div className="anim-drop font-serif text-5xl md:text-7xl leading-tight">
             Fresh Baked<br/>
             <span className="italic text-[var(--color-espresso)]/60">Every Week</span>
           </div>
           <p className="anim-drop font-sans text-[var(--color-espresso)]/70 max-w-md text-lg">
              Our microbakery operates on a weekly pre-order model. We ferment slowly and bake in small batches. Once they are gone, they are gone until next week.
           </p>
        </div>

        <div className="anim-drop flex-1 w-full max-w-sm">
           <div className="p-12 bg-[var(--color-semolina)]/50 backdrop-blur-sm rounded-3xl border border-[var(--color-espresso)]/5 shadow-2xl relative overflow-hidden">

             <div className="absolute -right-12 -top-12 w-48 h-48 bg-[var(--color-linen)] rounded-full blur-3xl opacity-50 pointer-events-none"></div>

             <span className="block text-sm font-sans font-medium uppercase tracking-widest text-[var(--color-espresso)]/60 mb-6 text-center">Orders close in</span>

             {timeLeft ? (
                <div className="font-mono text-5xl md:text-6xl font-light tracking-tighter flex justify-center gap-4">
                  <div className="flex flex-col items-center">
                    <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="text-xs mt-2 text-[var(--color-espresso)]/40 uppercase tracking-widest">hrs</span>
                  </div>
                  <span className="opacity-30 -mt-2">:</span>
                  <div className="flex flex-col items-center">
                    <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="text-xs mt-2 text-[var(--color-espresso)]/40 uppercase tracking-widest">min</span>
                  </div>
                </div>
             ) : (
                <div className="h-24 flex items-center justify-center opacity-50">Calculating...</div>
             )}

             <div className="mt-12 pt-8 border-t border-[var(--color-espresso)]/10 text-center space-y-2">
                <p className="font-sans text-sm font-medium">Pickup Times</p>
                <p className="font-serif italic text-lg text-[var(--color-terracotta)]">Mon-Thu 12pm - 6pm</p>
             </div>
           </div>
        </div>

      </div>
    </section>
  );
}
