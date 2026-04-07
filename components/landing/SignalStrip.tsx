"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { createDownwardReveal } from "@/lib/gsap-scroll-reveal";
import { usePortfolioLocale } from "./PortfolioLocaleProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SignalStrip() {
  const root = useRef<HTMLElement | null>(null);
  const { content } = usePortfolioLocale();
  const { heroMetrics } = content;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const animateCards = (start: string, mobile = false) => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-metric-card]", root.current);

        cards.forEach((card, index) => {
          createDownwardReveal({
            target: card,
            start,
            from: {
              y: mobile ? 30 : 24,
              x: mobile ? (index % 2 === 0 ? -12 : 12) : 0,
              scale: 0.965,
              autoAlpha: 0,
            },
            to: {
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.72,
              ease: "power3.out",
            },
          });
        });
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-metric-card]", { clearProps: "all" });
      });

      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        animateCards("top 92%", true);
      });

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        animateCards("top 84%");
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="shell pb-20 sm:pb-24">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {heroMetrics.map((item) => (
          <article
            key={item.label}
            data-metric-card
            className="panel-soft rounded-[1.6rem] px-5 py-6"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-(--muted)">
              {item.label}
            </p>
            <p className="mt-4 text-3xl leading-none text-(--ink)">{item.value}</p>
            <p className="mt-3 text-sm leading-7 text-(--muted)">{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
