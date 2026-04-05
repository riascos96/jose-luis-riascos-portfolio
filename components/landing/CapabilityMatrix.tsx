"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "./SectionHeading";
import { usePortfolioLocale } from "./PortfolioLocaleProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function CapabilityMatrix() {
  const root = useRef<HTMLElement | null>(null);
  const { content } = usePortfolioLocale();
  const { strengths, strengthsSection } = content;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const animateCards = (elements: Element[]) => {
          gsap.fromTo(
            elements,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.74,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: true,
            }
          );
        };

        ScrollTrigger.batch("[data-strength-card]", {
          start: "top 84%",
          onEnter: animateCards,
          onEnterBack: animateCards,
          onLeaveBack: (elements) => {
            gsap.set(elements, { y: 24, autoAlpha: 0 });
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="fortalezas"
      ref={root}
      aria-labelledby="fortalezas-title"
      className="section-spacing"
    >
      <div className="shell">
        <SectionHeading
          id="fortalezas-title"
          eyebrow={strengthsSection.eyebrow}
          title={strengthsSection.title}
          copy={strengthsSection.copy}
        />

        <div className="mt-14 grid gap-5 xl:grid-cols-3">
          {strengths.map((strength, index) => (
            <article
              key={strength.title}
              data-strength-card
              className="panel relative overflow-hidden rounded-4xl p-7"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,119,182,0.1),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(27,59,90,0.08),transparent_24%)]" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.26em] text-(--muted)">
                    {strengthsSection.strengthLabel}
                  </p>
                  <span className="font-mono text-xs text-(--muted)">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-4 min-h-[6.4rem] text-3xl leading-tight text-(--ink) lg:min-h-[7.6rem]">
                  {strength.title}
                </h3>
                <p className="mt-5 min-h-[8.6rem] text-base leading-8 text-(--muted) lg:min-h-42">
                  {strength.copy}
                </p>
                <div className="mt-6 rounded-[1.4rem] border border-(--line) bg-white/64 px-4 py-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-(--accent-strong)">
                    {strengthsSection.outcomeLabel}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-(--ink)">
                    {strength.outcome}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {strength.skills.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
