"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createDownwardReveal } from "@/lib/gsap-scroll-reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: string;
  copy: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  copy,
}: SectionHeadingProps) {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const animateHeading = (start: string) => {
        if (!root.current) {
          return;
        }

        const eyebrowElement = root.current.querySelector<HTMLElement>("[data-section-heading-eyebrow]");
        const titleElement = root.current.querySelector<HTMLElement>("[data-section-heading-title]");
        const copyElement = root.current.querySelector<HTMLElement>("[data-section-heading-copy]");

        if (!eyebrowElement || !titleElement || !copyElement) {
          return;
        }

        createDownwardReveal({
          target: eyebrowElement,
          trigger: root.current,
          start,
          from: {
            y: 16,
            autoAlpha: 0,
          },
          to: {
            y: 0,
            autoAlpha: 1,
            duration: 0.54,
            ease: "power3.out",
          },
        });

        createDownwardReveal({
          target: titleElement,
          trigger: root.current,
          start,
          from: {
            yPercent: 14,
            autoAlpha: 0,
          },
          to: {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.72,
            delay: 0.06,
            ease: "power3.out",
          },
        });

        createDownwardReveal({
          target: copyElement,
          trigger: root.current,
          start,
          from: {
            y: 18,
            autoAlpha: 0,
          },
          to: {
            y: 0,
            autoAlpha: 1,
            duration: 0.62,
            delay: 0.12,
            ease: "power2.out",
          },
        });
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          "[data-section-heading-eyebrow], [data-section-heading-title], [data-section-heading-copy]",
          { clearProps: "all" }
        );
      });

      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        animateHeading("top 92%");
      });

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        animateHeading("top 86%");
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="max-w-3xl">
      <p data-section-heading-eyebrow className="eyebrow">
        {eyebrow}
      </p>
      <h2
        id={id}
        data-section-heading-title
        className="mt-6 text-4xl leading-[0.96] text-balance text-(--ink) sm:text-5xl lg:text-[4rem]"
      >
        {title}
      </h2>
      <p
        data-section-heading-copy
        className="mt-5 max-w-2xl text-base leading-8 text-(--muted) sm:text-lg"
      >
        {copy}
      </p>
    </div>
  );
}
