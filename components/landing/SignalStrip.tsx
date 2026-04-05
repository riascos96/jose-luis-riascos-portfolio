"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePortfolioLocale } from "./PortfolioLocaleProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SignalStrip() {
  const root = useRef<HTMLElement | null>(null);
  const { content } = usePortfolioLocale();
  const { heroMetrics } = content;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-metric-card]", {
          scrollTrigger: {
            trigger: root.current,
            start: "top 86%",
            toggleActions: "restart none restart reset",
          },
          y: 20,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
        });
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
