"use client";

import { useEffect, useState } from "react";
import { nextThursday, differenceInSeconds } from "date-fns";

export function WeeklyDrops() {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    // Mock drop time: Next Thursday at 12:00 PM
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

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--color-linen)] border-b border-[var(--color-espresso)]/10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-terracotta)] mb-8">The Weekly Drop</h2>

        <div className="font-serif text-3xl md:text-5xl leading-tight mb-12">
          Weekly Pickup<br/>
          <span className="italic text-[var(--color-espresso)]/60">Mon-Thu 12-6 PM</span>
        </div>

        {timeLeft && (
          <div className="inline-flex flex-col items-center p-6 bg-[var(--color-semolina)] rounded-xl border border-[var(--color-espresso)]/5">
            <span className="text-xs font-sans font-medium uppercase tracking-widest text-[var(--color-espresso)]/60 mb-4">Orders close in</span>
            <div className="font-mono text-4xl md:text-5xl font-light tracking-tighter flex gap-2">
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] mt-1 text-[var(--color-espresso)]/40 uppercase">hrs</span>
              </div>
              <span className="opacity-30 -mt-1">:</span>
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] mt-1 text-[var(--color-espresso)]/40 uppercase">min</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
