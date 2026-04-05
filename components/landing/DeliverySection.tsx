"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "./SectionHeading";
import { usePortfolioLocale } from "./PortfolioLocaleProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function DeliverySection() {
  const root = useRef<HTMLElement | null>(null);
  const { content } = usePortfolioLocale();
  const { experienceItems, trajectorySection } = content;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-timeline-progress]",
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-timeline-shell]",
              start: "top 26%",
              end: "bottom 76%",
              scrub: 0.8,
            },
          }
        );

        gsap.from("[data-experience-card]", {
          scrollTrigger: {
            trigger: root.current,
            start: "top 82%",
            toggleActions: "restart none restart reset",
          },
          y: 28,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.82,
          ease: "power3.out",
        });

        gsap.from("[data-experience-marker]", {
          scrollTrigger: {
            trigger: root.current,
            start: "top 84%",
            toggleActions: "restart none restart reset",
          },
          scale: 0.88,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        });

        const cards = gsap.utils.toArray<HTMLElement>("[data-experience-card]");

        if (window.innerWidth >= 1024) {
          const syncFocusedExperience = () => {
            const anchor = window.innerHeight * 0.46;

            cards.forEach((card) => {
              const rect = card.getBoundingClientRect();
              const center = rect.top + rect.height / 2;
              const distance = Math.abs(anchor - center);
              const focus = gsap.utils.clamp(0, 1, 1 - distance / (window.innerHeight * 0.72));
              const emphasis = focus * focus;

              const shell = card.querySelector<HTMLElement>("[data-experience-shell]");
              const marker = card.querySelector<HTMLElement>("[data-experience-marker]");
              const markerInner = card.querySelector<HTMLElement>("[data-experience-marker-inner]");
              const meta = card.querySelector<HTMLElement>("[data-experience-meta]");
              const date = card.querySelector<HTMLElement>("[data-experience-date]");

              if (shell) {
                gsap.to(shell, {
                  scale: 0.76 + emphasis * 0.32,
                  y: 10 - emphasis * 26,
                  opacity: 0.34 + emphasis * 0.66,
                  filter: `blur(${(1 - emphasis) * 1.8}px)`,
                  borderColor:
                    emphasis > 0.42 ? "rgba(0, 119, 182, 0.28)" : "rgba(27, 59, 90, 0.08)",
                  boxShadow:
                    emphasis > 0.42
                      ? "0 42px 110px rgba(0, 119, 182, 0.2)"
                      : "0 10px 28px rgba(27, 59, 90, 0.05)",
                  duration: 0.24,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }

              if (meta) {
                gsap.to(meta, {
                  x: emphasis * 14,
                  opacity: 0.42 + emphasis * 0.58,
                  duration: 0.24,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }

              if (date) {
                gsap.to(date, {
                  scale: 0.9 + emphasis * 0.14,
                  backgroundColor: emphasis > 0.42 ? "#eaf7fd" : "#f5fbfe",
                  borderColor: emphasis > 0.42 ? "rgba(0, 119, 182, 0.28)" : "rgba(207, 225, 238, 1)",
                  duration: 0.24,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }

              if (marker) {
                gsap.to(marker, {
                  scale: 0.92 + emphasis * 0.62,
                  backgroundColor: `rgba(0, 119, 182, ${0.06 + emphasis * 0.2})`,
                  boxShadow: `0 0 0 ${Math.round(emphasis * 18)}px rgba(0, 119, 182, ${0.03 + emphasis * 0.06})`,
                  duration: 0.24,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }

              if (markerInner) {
                gsap.to(markerInner, {
                  scale: 0.9 + emphasis * 0.44,
                  backgroundColor: emphasis > 0.42 ? "var(--accent-strong)" : "var(--accent)",
                  duration: 0.24,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }
            });
          };

          ScrollTrigger.create({
            trigger: root.current,
            start: "top top",
            end: "max",
            scrub: 0.4,
            onUpdate: syncFocusedExperience,
            onRefresh: syncFocusedExperience,
          });

          requestAnimationFrame(syncFocusedExperience);
        }
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="trayectoria"
      ref={root}
      aria-labelledby="trayectoria-title"
      className="section-spacing"
    >
      <div className="shell">
        <SectionHeading
          id="trayectoria-title"
          eyebrow={trajectorySection.eyebrow}
          title={trajectorySection.title}
          copy={trajectorySection.copy}
        />

        <div data-timeline-shell className="relative mt-14 pb-12 lg:pb-24">
          <div className="absolute bottom-0 left-[2.15rem] top-0 hidden w-px bg-(--line) lg:block" />
          <div
            data-timeline-progress
            className="absolute bottom-0 left-[2.15rem] top-0 hidden w-px origin-top bg-[linear-gradient(180deg,var(--accent),rgba(0,119,182,0.12))] lg:block"
          />

          <div className="space-y-8">
          {experienceItems.map((item) => {
            const isCurrent = /actualidad|present/i.test(item.period);

            return (
            <article
              key={`${item.role}-${item.company}`}
              data-experience-card
              className="relative"
            >
              <div className="relative grid gap-6 lg:grid-cols-[3rem_minmax(0,1fr)] lg:gap-8">
                <div data-experience-meta className="relative min-h-full">
                  <span
                    data-experience-marker
                    className="absolute left-[2.15rem] top-8 z-10 hidden h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-[rgba(0,119,182,0.08)] lg:flex"
                  >
                    <span
                      data-experience-marker-inner
                      className="h-3.5 w-3.5 rounded-full bg-(--accent)"
                    />
                  </span>
                </div>

                <div
                  data-experience-shell
                  className={`relative origin-left rounded-4xl border bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(248,250,252,0.92))] p-6 shadow-[0_24px_64px_rgba(27,59,90,0.08)] sm:p-7 lg:p-8 ${
                    isCurrent
                      ? "border-[rgba(0,119,182,0.26)]"
                      : "border-(--line)"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-[1.9rem] bg-[radial-gradient(circle_at_top_left,rgba(0,119,182,0.1),transparent_42%)]" />

                  <div className="relative">
                    <div className="border-b border-(--line) pb-6">
                      <div className="mb-5 flex flex-wrap items-center gap-2">
                        <div
                          data-experience-date
                          className="inline-flex rounded-full border border-[#cfe1ee] bg-[#f5fbfe] px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-(--accent-strong)"
                        >
                          {item.period}
                        </div>
                        <span className="rounded-full border border-(--line) bg-white px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-(--ink)">
                          {item.company}
                        </span>
                        <span className="rounded-full border border-(--line) bg-white px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-(--muted)">
                          {item.location}
                        </span>
                        {isCurrent ? (
                          <span className="rounded-full border border-[#bfe2f5] bg-[#eaf7fd] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-(--accent-strong)">
                            {trajectorySection.currentLabel}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="max-w-3xl text-3xl leading-tight text-(--ink) sm:text-[3.1rem]">
                        {item.role}
                      </h3>
                      <p className="mt-4 max-w-2xl text-base leading-8 text-(--muted)">
                        {item.summary}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[#d7e8f4] bg-[#f6fbfe] px-3 py-2 text-[0.78rem] font-medium text-[#0077b6]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {item.note ? (
                      <div className="mt-5 rounded-[1.35rem] border border-(--line) bg-[#f9fbfd] px-4 py-4 text-sm leading-7 text-(--muted)">
                        {item.note}
                      </div>
                    ) : null}

                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          data-experience-bullet
                          className="rounded-[1.35rem] border border-(--line) bg-white/88 px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#bfdcf0] hover:shadow-[0_18px_40px_rgba(27,59,90,0.08)]"
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-(--accent)" />
                            <p className="text-sm leading-7 text-(--ink)">{bullet}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
